// MyTask push: riceve i promemoria dall'app e invia le notifiche Web Push all'ora giusta.
// Un dispositivo = una riga in D1 con la sua iscrizione push e la lista dei promemoria futuri.

const ALLOWED_ORIGINS = ['https://silviocrescidev.github.io', 'http://localhost:8000'];
const MAX_BODY = 64 * 1024;
const MAX_REMINDERS = 300;
const LATE_LIMIT = 3600e3; // un promemoria in ritardo di oltre un'ora non viene più inviato

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(req.url);
    const reply = (status, body) => new Response(body ? JSON.stringify(body) : null, { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'POST' && url.pathname === '/sync') {
      if (!ALLOWED_ORIGINS.includes(origin)) return reply(403, { error: 'origin' });
      const text = await req.text();
      if (text.length > MAX_BODY) return reply(413, { error: 'too large' });
      let d;
      try { d = JSON.parse(text) } catch { return reply(400, { error: 'json' }) }
      if (!validDevice(d.device)) return reply(400, { error: 'device' });
      if (d.sub === null) {
        await env.DB.prepare('DELETE FROM devices WHERE device=?').bind(d.device).run();
        return reply(200, { ok: true });
      }
      const s = d.sub || {};
      if (typeof s.endpoint !== 'string' || !s.endpoint.startsWith('https://') || !s.keys || typeof s.keys.p256dh !== 'string' || typeof s.keys.auth !== 'string') return reply(400, { error: 'sub' });
      const rem = (Array.isArray(d.reminders) ? d.reminders : []).slice(0, MAX_REMINDERS)
        .filter(r => r && typeof r.id === 'string' && Number.isFinite(r.at))
        .map(r => ({ id: r.id.slice(0, 64), at: Math.round(r.at), title: String(r.title || '').slice(0, 200), body: String(r.body || '').slice(0, 300) }));
      await env.DB.prepare(
        `INSERT INTO devices(device,endpoint,p256dh,auth,reminders,sent,updated) VALUES(?,?,?,?,?,'[]',?)
         ON CONFLICT(device) DO UPDATE SET endpoint=excluded.endpoint,p256dh=excluded.p256dh,auth=excluded.auth,reminders=excluded.reminders,updated=excluded.updated`
      ).bind(d.device, s.endpoint, s.keys.p256dh, s.keys.auth, JSON.stringify(rem), Date.now()).run();
      return reply(200, { ok: true, count: rem.length });
    }
    if (url.pathname === '/') return reply(200, { ok: true, service: 'mytask-push' });
    return reply(404, { error: 'not found' });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendDue(env));
  },
};

const validDevice = d => typeof d === 'string' && /^[A-Za-z0-9-]{20,64}$/.test(d);
const key = r => r.id + '@' + r.at;

async function sendDue(env) {
  const now = Date.now();
  const { results } = await env.DB.prepare('SELECT * FROM devices').all();
  for (const dev of results) {
    const rem = JSON.parse(dev.reminders || '[]');
    const sent = new Set(JSON.parse(dev.sent || '[]'));
    const due = rem.filter(r => r.at <= now && r.at > now - LATE_LIMIT && !sent.has(key(r)));
    if (!due.length) continue;
    let gone = false;
    for (const r of due) {
      const status = await sendPush(env, dev, { id: r.id, title: r.title, body: r.body });
      if (status === 404 || status === 410) { gone = true; break }
      if (status >= 200 && status < 300) sent.add(key(r));
      else console.warn('push failed', status, dev.device);
    }
    if (gone) {
      await env.DB.prepare('DELETE FROM devices WHERE device=?').bind(dev.device).run();
      continue;
    }
    // tiene solo le chiavi dei promemoria ancora nella lista, così la colonna non cresce all'infinito
    const live = new Set(rem.map(key));
    await env.DB.prepare('UPDATE devices SET sent=? WHERE device=?').bind(JSON.stringify([...sent].filter(k => live.has(k))), dev.device).run();
  }
}

/* ---------- Web Push (RFC 8291 + VAPID RFC 8292) con WebCrypto ---------- */

const enc = new TextEncoder();
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - s.length % 4) % 4)), c => c.charCodeAt(0));
const concat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let i = 0; for (const x of a) { o.set(x, i); i += x.length } return o };

async function hmac(key, data) {
  const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, data));
}

async function vapidHeader(env, endpoint) {
  const jwk = JSON.parse(env.VAPID_PRIVATE_JWK);
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const head = b64u(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const claims = b64u(enc.encode(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.VAPID_SUBJECT })));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(head + '.' + claims));
  return `vapid t=${head}.${claims}.${b64u(sig)}, k=${env.VAPID_PUBLIC_KEY}`;
}

async function encrypt(dev, payload) {
  const uaPublic = unb64u(dev.p256dh);
  const authSecret = unb64u(dev.auth);
  const local = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const asPublic = new Uint8Array(await crypto.subtle.exportKey('raw', local.publicKey));
  const uaKey = await crypto.subtle.importKey('raw', uaPublic, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const ecdh = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: uaKey }, local.privateKey, 256));
  const prkKey = await hmac(authSecret, ecdh);
  const ikm = await hmac(prkKey, concat(enc.encode('WebPush: info\0'), uaPublic, asPublic, new Uint8Array([1])));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk = await hmac(salt, ikm);
  const cek = (await hmac(prk, concat(enc.encode('Content-Encoding: aes128gcm\0'), new Uint8Array([1])))).slice(0, 16);
  const nonce = (await hmac(prk, concat(enc.encode('Content-Encoding: nonce\0'), new Uint8Array([1])))).slice(0, 12);
  const aes = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const plain = concat(enc.encode(payload), new Uint8Array([2]));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, aes, plain));
  const header = new Uint8Array(21);
  header.set(salt, 0);
  new DataView(header.buffer).setUint32(16, 4096);
  header[20] = asPublic.length;
  return concat(header, asPublic, cipher);
}

async function sendPush(env, dev, data) {
  const body = await encrypt(dev, JSON.stringify(data));
  const res = await fetch(dev.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': await vapidHeader(env, dev.endpoint),
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      'TTL': '3600',
      'Urgency': 'high',
    },
    body,
  });
  return res.status;
}
