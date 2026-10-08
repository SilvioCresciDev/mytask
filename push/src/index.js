// MyTask push: riceve i promemoria dall'app e invia le notifiche Web Push all'ora giusta.
// Un dispositivo = una riga in D1 con la sua iscrizione push e la lista dei promemoria futuri.

const ALLOWED_ORIGINS = ['https://silviocrescidev.github.io', 'http://localhost:8000'];
const MAX_BODY = 128 * 1024;
const MAX_BACKUP = 1900 * 1024; // sotto il limite di 2 MB per riga di D1
const MAX_REMINDERS = 300;
const LATE_LIMIT = 3600e3; // un promemoria in ritardo di oltre un'ora non viene più inviato
// tetti contro chi riempie il database con richieste finte: oltre questi numeri si rifiutano solo le righe nuove
const MAX_DEVICES = 5000;
const MAX_BACKUPS = 5000;
// pulizia: la lista dei promemoria arriva al massimo a un anno, quindi un dispositivo che non si fa sentire da 400 giorni
// non ha più niente da ricevere; lo stesso vale per un backup mai letto né scritto da 400 giorni
const DEVICE_TTL = 400 * 864e5;
const BACKUP_TTL = 400 * 864e5;
// solo i servizi push dei browser: il Worker non deve diventare un modo per mandare richieste a indirizzi qualsiasi
const PUSH_HOSTS = [/^fcm\.googleapis\.com$/, /^updates\.push\.services\.mozilla\.com$/, /^[a-z0-9.-]+\.notify\.windows\.com$/, /^web\.push\.apple\.com$/, /^[a-z0-9.-]+\.push\.apple\.com$/];

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

    if (req.method === 'POST' && (url.pathname === '/sync' || url.pathname === '/backup')) {
      if (!ALLOWED_ORIGINS.includes(origin)) return reply(403, { error: 'origin' });
      // l'Origin si può falsificare fuori dal browser: il limite per indirizzo IP frena gli abusi
      if (!(await allowed(env, req))) return reply(429, { error: 'slow down' });
    }
    if (req.method === 'POST' && url.pathname === '/sync') {
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
      if (!validEndpoint(s.endpoint) || !s.keys || typeof s.keys.p256dh !== 'string' || typeof s.keys.auth !== 'string') return reply(400, { error: 'sub' });
      const rem = (Array.isArray(d.reminders) ? d.reminders : []).slice(0, MAX_REMINDERS)
        .filter(r => r && typeof r.id === 'string' && Number.isFinite(r.at))
        .map(r => ({ id: r.id.slice(0, 64), at: Math.round(r.at), title: String(r.title || '').slice(0, 200), body: String(r.body || '').slice(0, 300) }));
      if (!(await hasRoom(env, 'devices', 'device', d.device, MAX_DEVICES))) return reply(507, { error: 'full' });
      // next_due ignora i promemoria già inviati: se è uno di quelli, il cron lo scopre e ricalcola
      await env.DB.prepare(
        `INSERT INTO devices(device,endpoint,p256dh,auth,reminders,sent,updated,next_due) VALUES(?,?,?,?,?,'[]',?,?)
         ON CONFLICT(device) DO UPDATE SET endpoint=excluded.endpoint,p256dh=excluded.p256dh,auth=excluded.auth,reminders=excluded.reminders,updated=excluded.updated,next_due=excluded.next_due`
      ).bind(d.device, s.endpoint, s.keys.p256dh, s.keys.auth, JSON.stringify(rem), Date.now(), nextDue(rem, new Set(), Date.now())).run();
      return reply(200, { ok: true, count: rem.length });
    }
    // backup: il server conserva solo dati già cifrati dall'app; rev evita di sovrascrivere modifiche di un altro dispositivo
    if (req.method === 'POST' && url.pathname === '/backup') {
      const text = await req.text();
      if (text.length > MAX_BACKUP) return reply(413, { error: 'too large' });
      let d;
      try { d = JSON.parse(text) } catch { return reply(400, { error: 'json' }) }
      if (typeof d.id !== 'string' || !/^[0-9a-f]{64}$/.test(d.id)) return reply(400, { error: 'id' });
      const row = await env.DB.prepare('SELECT rev,data FROM backups WHERE id=?').bind(d.id).first();
      if (d.op === 'get') {
        if (row) await touchBackup(env, d.id);
        return reply(200, row ? { rev: row.rev, data: row.data } : { rev: 0, data: null });
      }
      if (d.op !== 'put' || typeof d.data !== 'string' || !Number.isInteger(d.rev)) return reply(400, { error: 'op' });
      if (!row && !(await hasRoom(env, 'backups', 'id', d.id, MAX_BACKUPS))) return reply(507, { error: 'full' });
      const cur = row ? row.rev : 0;
      if (d.rev !== cur) return reply(409, { rev: cur, data: row ? row.data : null });
      const res = row
        ? await env.DB.prepare('UPDATE backups SET rev=?,data=?,updated=? WHERE id=? AND rev=?').bind(cur + 1, d.data, Date.now(), d.id, cur).run()
        : await env.DB.prepare('INSERT OR IGNORE INTO backups(id,rev,data,updated) VALUES(?,1,?,?)').bind(d.id, d.data, Date.now()).run();
      if (!res.meta.changes) return reply(409, { error: 'retry' });
      return reply(200, { rev: cur + 1 });
    }
    if (url.pathname === '/') return reply(200, { ok: true, service: 'mytask-push' });
    return reply(404, { error: 'not found' });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendDue(env));
    // una volta al giorno, alle 3:17 UTC
    const t = new Date(event.scheduledTime);
    if (t.getUTCHours() === 3 && t.getUTCMinutes() === 17) ctx.waitUntil(cleanup(env, t.getTime()));
  },
};

export function validEndpoint(e) {
  if (typeof e !== 'string' || e.length > 1000) return false;
  let u;
  try { u = new URL(e) } catch { return false }
  return u.protocol === 'https:' && !u.port && !u.username && PUSH_HOSTS.some(r => r.test(u.hostname));
}

// limite per IP con il Rate Limiting di Cloudflare (binding LIMITER in wrangler.toml); senza binding non limita
async function allowed(env, req) {
  if (!env.LIMITER) return true;
  try {
    const { success } = await env.LIMITER.limit({ key: req.headers.get('CF-Connecting-IP') || 'unknown' });
    return success;
  } catch { return true }
}

// una riga già esistente si aggiorna sempre; una nuova solo se la tabella non è piena
async function hasRoom(env, table, col, id, max) {
  const exists = await env.DB.prepare(`SELECT 1 FROM ${table} WHERE ${col}=?`).bind(id).first();
  if (exists) return true;
  const { n } = await env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first();
  return n < max;
}

// segna che il backup è ancora in uso (al massimo una scrittura al giorno); senza la colonna seen non fa niente
async function touchBackup(env, id) {
  const now = Date.now();
  try { await env.DB.prepare('UPDATE backups SET seen=? WHERE id=? AND (seen IS NULL OR seen<?)').bind(now, id, now - 864e5).run() } catch {}
}

async function cleanup(env, now) {
  const dev = await env.DB.prepare('DELETE FROM devices WHERE updated < ?').bind(now - DEVICE_TTL).run();
  let bk = { meta: { changes: 0 } };
  try { bk = await env.DB.prepare('DELETE FROM backups WHERE COALESCE(seen, updated) < ?').bind(now - BACKUP_TTL).run() } catch {}
  console.log('cleanup', dev.meta.changes, 'devices', bk.meta.changes, 'backups');
}

export const validDevice = d => typeof d === 'string' && /^[A-Za-z0-9-]{20,64}$/.test(d);
const key = r => r.id + '@' + r.at;
// istante del prossimo promemoria da inviare (null = nessuno): il cron legge solo i dispositivi con next_due scaduto
export const nextDue = (rem, sent, now) => rem.reduce((m, r) => !sent.has(key(r)) && r.at > now - LATE_LIMIT && (m === null || r.at < m) ? r.at : m, null);

async function sendDue(env) {
  const now = Date.now();
  const { results } = await env.DB.prepare('SELECT * FROM devices WHERE next_due <= ?').bind(now).all();
  for (const dev of results) {
    const rem = JSON.parse(dev.reminders || '[]');
    const sent = new Set(JSON.parse(dev.sent || '[]'));
    const due = rem.filter(r => r.at <= now && r.at > now - LATE_LIMIT && !sent.has(key(r)));
    if (!due.length) {
      await env.DB.prepare('UPDATE devices SET next_due=? WHERE device=?').bind(nextDue(rem, sent, now), dev.device).run();
      continue;
    }
    console.log('sending', due.length, 'reminders to', dev.device);
    let gone = false;
    for (const r of due) {
      const status = await sendPush(env, dev, { id: r.id, title: r.title, body: r.body });
      if (status === 404 || status === 410) { gone = true; break }
      if (status >= 200 && status < 300) { sent.add(key(r)); console.log('sent', r.id, status) }
      else console.warn('push failed', status, dev.device);
    }
    if (gone) {
      await env.DB.prepare('DELETE FROM devices WHERE device=?').bind(dev.device).run();
      continue;
    }
    // tiene solo le chiavi dei promemoria ancora nella lista, così la colonna non cresce all'infinito
    const live = new Set(rem.map(key));
    await env.DB.prepare('UPDATE devices SET sent=?,next_due=? WHERE device=?').bind(JSON.stringify([...sent].filter(k => live.has(k))), nextDue(rem, sent, now), dev.device).run();
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
  // toglie un eventuale BOM o a capo finiti nel secret quando è stato caricato da terminale
  const jwk = JSON.parse(env.VAPID_PRIVATE_JWK.replace(/^﻿/, '').trim());
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
