// Test del Worker dei promemoria (push/src/index.js) con un database finto, senza Cloudflare.
const test = require('node:test');
const assert = require('node:assert/strict');

const load = () => import('../push/src/index.js');
const ORIGIN = 'https://silviocrescidev.github.io';
const SUB = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys: { p256dh: 'k', auth: 'a' } };
const DEVICE = 'device-0123456789abcdef';

// database finto: risponde alle poche query che il Worker usa
function fakeDB({ rows = 0, exists = false } = {}) {
  const log = [];
  return {
    log,
    prepare(sql) {
      const st = { args: [], bind(...a) { st.args = a; return st },
        async first() { log.push(sql); if (/COUNT/.test(sql)) return { n: rows }; if (/SELECT 1/.test(sql)) return exists ? { 1: 1 } : null; return null },
        async run() { log.push(sql); return { meta: { changes: 1 } } },
        async all() { log.push(sql); return { results: [] } } };
      return st;
    },
  };
}
const post = (path, body, origin = ORIGIN) => new Request('https://w.example' + path, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'text/plain' }, body: JSON.stringify(body) });

test('validEndpoint accetta solo i servizi push dei browser', async () => {
  const { validEndpoint } = await load();
  assert.ok(validEndpoint('https://fcm.googleapis.com/fcm/send/x'));
  assert.ok(validEndpoint('https://updates.push.services.mozilla.com/wpush/v2/x'));
  assert.ok(validEndpoint('https://wns2-db5p.notify.windows.com/w/?token=x'));
  assert.ok(validEndpoint('https://web.push.apple.com/x'));
  assert.ok(!validEndpoint('https://evil.example/x'));
  assert.ok(!validEndpoint('https://fcm.googleapis.com.evil.example/x'));
  assert.ok(!validEndpoint('http://fcm.googleapis.com/x'));
  assert.ok(!validEndpoint('https://fcm.googleapis.com:8443/x'));
  assert.ok(!validEndpoint('https://user@fcm.googleapis.com/x'));
  assert.ok(!validEndpoint(42));
});

test('nextDue salta i promemoria inviati e quelli troppo vecchi', async () => {
  const { nextDue } = await load();
  const now = 10_000_000;
  const rem = [{ id: 'a', at: now - 7200e3 }, { id: 'b', at: now + 50 }, { id: 'c', at: now + 10 }];
  assert.equal(nextDue(rem, new Set(), now), now + 10);
  assert.equal(nextDue(rem, new Set(['c@' + (now + 10)]), now), now + 50);
  assert.equal(nextDue([], new Set(), now), null);
});

test('/sync rifiuta origini sconosciute', async () => {
  const w = (await load()).default;
  const r = await w.fetch(post('/sync', { device: DEVICE, sub: SUB }, 'https://evil.example'), { DB: fakeDB() });
  assert.equal(r.status, 403);
});

test('/sync e /backup rispettano il limite di richieste', async () => {
  const w = (await load()).default;
  const env = { DB: fakeDB(), LIMITER: { limit: async () => ({ success: false }) } };
  assert.equal((await w.fetch(post('/sync', { device: DEVICE, sub: SUB }), env)).status, 429);
  assert.equal((await w.fetch(post('/backup', { op: 'get', id: 'a'.repeat(64) }), env)).status, 429);
});

test('/sync rifiuta un endpoint che non è un servizio push', async () => {
  const w = (await load()).default;
  const r = await w.fetch(post('/sync', { device: DEVICE, sub: { ...SUB, endpoint: 'https://evil.example/x' } }), { DB: fakeDB() });
  assert.equal(r.status, 400);
});

test('/sync: con la tabella piena si rifiutano solo i dispositivi nuovi', async () => {
  const w = (await load()).default;
  const body = { device: DEVICE, sub: SUB, reminders: [{ id: 'c', at: Date.now() + 1e6, title: 't', body: 'b' }] };
  assert.equal((await w.fetch(post('/sync', body), { DB: fakeDB({ rows: 5000 }) })).status, 507);
  assert.equal((await w.fetch(post('/sync', body), { DB: fakeDB({ rows: 5000, exists: true }) })).status, 200);
  assert.equal((await w.fetch(post('/sync', body), { DB: fakeDB({ rows: 10 }) })).status, 200);
});

test('/backup: con la tabella piena non nascono backup nuovi', async () => {
  const w = (await load()).default;
  const r = await w.fetch(post('/backup', { op: 'put', id: 'b'.repeat(64), rev: 0, data: 'x' }), { DB: fakeDB({ rows: 5000 }) });
  assert.equal(r.status, 507);
});
