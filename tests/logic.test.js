// Test della logica pura dell'app (logic.js): date, ripetizioni, unione tra dispositivi, migrazioni.
const test = require('node:test');
const assert = require('node:assert/strict');
const L = require('../logic.js');

test('ogni mese: il 31 diventa l\'ultimo giorno del mese e poi torna al 31', () => {
  const c = { recur: 'monthly', mday: 31 };
  assert.equal(L.nextDate(c, '2026-01-31'), '2026-02-28');
  assert.equal(L.nextDate(c, '2026-02-28'), '2026-03-31');
  assert.equal(L.nextDate(c, '2026-03-31'), '2026-04-30');
  assert.equal(L.nextDate(c, '2026-12-31'), '2027-01-31');
  assert.equal(L.nextDate(c, '2028-01-31'), '2028-02-29'); // anno bisestile
});

test('ogni mese senza mday usa il giorno della data', () => {
  assert.equal(L.nextDate({ recur: 'monthly' }, '2026-05-15'), '2026-06-15');
});

test('ogni mese: in un anno ci sono 12 date, tutte a fine mese', () => {
  const c = { recur: 'monthly', mday: 31, date: '2026-01-31', done: false };
  const d = L.occ(c, '2026-01-01', '2026-12-31');
  assert.equal(d.length, 12);
  assert.deepEqual(d.slice(0, 4), ['2026-01-31', '2026-02-28', '2026-03-31', '2026-04-30']);
});

test('ripetizioni a passo fisso e date sparse', () => {
  assert.equal(L.nextDate({ recur: 'daily' }, '2026-10-08'), '2026-10-09');
  assert.equal(L.nextDate({ recur: 'weekly' }, '2026-10-08'), '2026-10-15');
  assert.equal(L.nextDate({ recur: 'd3' }, '2026-10-30'), '2026-11-02');
  assert.equal(L.nextDate({ recur: 'dates', dates: ['2026-10-01', '2026-10-20', '2026-10-10'] }, '2026-10-08'), '2026-10-10');
  assert.equal(L.nextDate({ recur: 'none' }, '2026-10-08'), null);
});

test('il passaggio all\'ora legale non sposta i giorni', () => {
  assert.equal(L.addDays('2026-03-28', 1), '2026-03-29');
  assert.equal(L.addDays('2026-03-29', 1), '2026-03-30');
  assert.equal(L.addDays('2026-10-25', 1), '2026-10-26');
});

test('completare una ripetizione in ritardo salta i giorni persi fino a oggi', () => {
  const today = '2026-10-08';
  assert.equal(L.nextAfterDone({ recur: 'daily', date: '2026-10-03' }, today), '2026-10-08');
  assert.equal(L.nextAfterDone({ recur: 'daily', date: '2026-10-08' }, today), '2026-10-09');
  assert.equal(L.nextAfterDone({ recur: 'weekly', date: '2026-09-21' }, today), '2026-10-12');
  assert.equal(L.nextAfterDone({ recur: 'monthly', mday: 31, date: '2026-07-31' }, today), '2026-10-31');
  // date sparse tutte passate: la ripetizione è finita
  assert.equal(L.nextAfterDone({ recur: 'dates', dates: ['2026-09-01', '2026-09-05'], date: '2026-09-01' }, today), null);
});

test('esc copre anche l\'apostrofo', () => {
  assert.equal(L.esc(`<a href="x" title='y'>&</a>`), '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
});

test('i colori accettano solo variabili del tema ed esadecimali', () => {
  assert.equal(L.labCss('--l-red'), 'var(--l-red)');
  assert.equal(L.labCss('#14b8a6'), '#14b8a6');
  assert.equal(L.labCss('red;background:url(x)'), 'var(--muted)');
  assert.equal(L.labCss('--x);color:red;--y:('), 'var(--muted)');
  assert.equal(L.labCss(undefined), 'var(--muted)');
});

/* ---------- unione ---------- */
const card = o => ({ id: 'a', title: 'T', notes: '', labels: [], ...o });
function edit(x, now, f) { const prev = L.fieldsOf(x); f(x); L.stampItem(x, prev, now); return x }
const clone = x => JSON.parse(JSON.stringify(x));

test('stampItem segna solo i campi cambiati', () => {
  const x = card({ upd: 100 });
  edit(x, 200, x => { x.title = 'Nuovo' });
  assert.deepEqual(x.fu, { title: 200 });
  assert.equal(x.c0, 100);
  assert.equal(x.upd, 200);
  assert.equal(L.stampItem(x, L.fieldsOf(x), 300), false);
});

test('modifiche a campi diversi su due dispositivi si sommano', () => {
  const base = card({ upd: 100, c0: 100 });
  const phone = edit(clone(base), 200, x => { x.title = 'Dal telefono' });
  const pc = edit(clone(base), 300, x => { x.notes = 'Dal PC' });
  const m = L.mergeItem(phone, pc);
  assert.equal(m.title, 'Dal telefono');
  assert.equal(m.notes, 'Dal PC');
  // e l'unione successiva non cambia più niente
  assert.equal(L.canon(L.mergeItem(m, pc)), L.canon(m));
  assert.equal(L.canon(L.mergeItem(phone, m)), L.canon(m));
});

test('stesso campo: vince la modifica più recente, e togliere un campo conta come modifica', () => {
  const base = card({ upd: 100, c0: 100, prio: 2 });
  const a = edit(clone(base), 200, x => { x.prio = 1 });
  const b = edit(clone(base), 300, x => { delete x.prio });
  assert.equal('prio' in L.mergeItem(a, b), false);
  assert.equal('prio' in L.mergeItem(b, a), false);
});

test('a parità di istante il risultato non dipende da chi unisce', () => {
  const a = card({ upd: 100, c0: 100, title: 'A' }), b = card({ upd: 100, c0: 100, title: 'B' });
  assert.equal(L.canon(L.mergeItem(a, b)), L.canon(L.mergeItem(b, a)));
});

test('dati di prima (senza c0 e fu) si uniscono ancora per ultima modifica', () => {
  const a = card({ upd: 100, title: 'vecchio' }), b = card({ upd: 200, title: 'nuovo' });
  assert.equal(L.mergeItem(a, b).title, 'nuovo');
  assert.equal(L.mergeItem(b, a).title, 'nuovo');
  // una modifica nuova su un lato non riporta indietro i campi più recenti dell'altro
  const a2 = edit(clone(a), 300, x => { x.notes = 'n' });
  const m = L.mergeItem(a2, b);
  assert.equal(m.title, 'nuovo');
  assert.equal(m.notes, 'n');
});

const doc = (cards, tomb = {}) => ({ cards, boards: [], labels: [], tomb });

test('mergeDoc: eliminazioni con traccia', () => {
  const L1 = doc([card({ id: 'x', upd: 100 })]);
  const R1 = doc([], { cx: 200 });
  assert.equal(L.mergeDoc(L1, R1).cards.length, 0);
  // modificata dopo l'eliminazione: resta
  const L2 = doc([card({ id: 'x', upd: 300 })]);
  assert.equal(L.mergeDoc(L2, R1).cards.length, 1);
});

test('mergeDoc: un oggetto già sincronizzato che manca sul server è stato eliminato altrove (traccia ripulita)', () => {
  const local = doc([card({ id: 'old', upd: 100 }), card({ id: 'new', upd: 600 }), card({ id: 'legacy' })]);
  const remote = doc([]);
  const ids = L.mergeDoc(local, remote, 500).cards.map(c => c.id);
  assert.deepEqual(ids, ['new']);
  // senza base (primo collegamento) non si toglie niente
  assert.equal(L.mergeDoc(local, remote, undefined).cards.length, 3);
});

test('mergeDoc: gli oggetti nuovi arrivano da entrambi i lati', () => {
  const m = L.mergeDoc(doc([card({ id: 'l', upd: 1 })]), doc([card({ id: 'r', upd: 1 })]));
  assert.deepEqual(m.cards.map(c => c.id).sort(), ['l', 'r']);
});

test('maxStamp guarda upd, fu e tracce', () => {
  assert.equal(L.maxStamp(doc([card({ upd: 5, fu: { title: 9 } })], { cz: 7 })), 9);
});

test('sameDoc ignora ordine delle card e delle chiavi', () => {
  const a = doc([card({ id: '1', upd: 1 }), card({ id: '2', upd: 2 })]);
  const b = doc([{ upd: 2, labels: [], notes: '', title: 'T', id: '2' }, card({ id: '1', upd: 1 })]);
  assert.ok(L.sameDoc(a, b));
  b.cards[0].title = 'diverso';
  assert.ok(!L.sameDoc(a, b));
});

test('capReminders: sotto il limite restano tutti, sopra arriva l\'avviso per riaprire l\'app', () => {
  const list = Array.from({ length: 10 }, (_, i) => ({ id: 'c' + i, at: 1000 * (10 - i) }));
  assert.equal(L.capReminders(list, 10).length, 10);
  const cut = L.capReminders(list, 5);
  assert.equal(cut.length, 5);
  assert.deepEqual(cut.slice(0, 4).map(r => r.at), [1000, 2000, 3000, 4000]);
  assert.equal(cut[4].id, 'sys-refresh');
  assert.ok(cut[4].at > cut[3].at);
});

test('migrate: toglie "In corso", ricorda il giorno del mese, segna la versione', () => {
  const S = {
    boards: [{ id: 'b', lists: [{ id: 'l1', name: 'Da fare' }, { id: 'l2', name: 'In corso' }, { id: 'l3', name: 'Fatto', done: true }] }],
    cards: [{ id: 'c', listId: 'l2', recur: 'monthly', date: '2026-01-31' }],
    labels: [],
  };
  L.migrate(S);
  assert.deepEqual(S.boards[0].lists.map(l => l.id), ['l1', 'l3']);
  assert.equal(S.cards[0].listId, 'l1');
  assert.equal(S.cards[0].mday, 31);
  assert.equal(S.v, L.SCHEMA);
  // una seconda volta non cambia niente
  const before = JSON.stringify(S);
  L.migrate(S);
  assert.equal(JSON.stringify(S), before);
});

test('repair: card di board o colonne sparite tornano visibili', () => {
  const S = {
    boards: [{ id: 'b', lists: [{ id: 'l1' }, { id: 'l2', done: true }] }],
    cards: [{ id: '1', boardId: 'gone', listId: 'x', archived: true }, { id: '2', boardId: 'b', listId: 'gone' }, { id: '3', boardId: 'b', listId: 'gone', done: true }, { id: '4', boardId: 'b', listId: 'l1' }],
  };
  assert.ok(L.repair(S));
  assert.deepEqual(S.cards.map(c => [c.boardId, c.listId]), [[null, null], ['b', 'l1'], ['b', 'l2'], ['b', 'l1']]);
  assert.ok(!('archived' in S.cards[0]));
  assert.ok(!L.repair(S));
});

test('esporta e reimporta: i dati tornano uguali', () => {
  const S = {
    boards: [{ id: 'b1', name: 'Lavoro', c: '--l-blue', lists: [{ id: 'l1', name: 'Da fare' }, { id: 'l2', name: 'Fatto', done: true }], upd: 5 }],
    labels: [{ id: 'urgente', name: 'urgente', c: '--l-red' }],
    cards: [{ id: 'c1', title: 'Affitto', notes: 'n', boardId: 'b1', listId: 'l1', date: '2026-01-31', time: '09:00', labels: ['urgente'], checklist: [{ t: 'a', d: true }],
      recur: 'monthly', mday: 31, reminder: 60, done: false, notified: false, snooze: null, prio: 2, upd: 7, c0: 3, fu: { title: 7 } }],
  };
  const back = L.parseExport(JSON.stringify(L.exportDoc(S, 0)));
  assert.equal(L.canon(back.cards), L.canon(S.cards));
  assert.equal(L.canon(back.boards), L.canon(S.boards));
  assert.equal(L.canon(back.labels), L.canon(S.labels));
});

test('importa: rifiuta file sbagliati e ripulisce i campi', () => {
  assert.throws(() => L.parseExport('ciao'), /non è un backup/);
  assert.throws(() => L.parseExport('{"cards":[]}'), /non è un backup/);
  assert.throws(() => L.parseExport(JSON.stringify({ v: 99, cards: [], boards: [] })), /più nuova/);
  const d = L.parseExport(JSON.stringify({
    boards: [{ id: 'b', name: 'B', c: 'red;x:y', lists: [{ id: 'l' }] }, { id: 'senza-colonne', lists: [] }],
    cards: [{ id: 'ok', title: 'T', date: 'domani', time: '9', recur: 'boh', labels: ['x', 5] }, { id: 'vuota', title: '  ' }, { title: 'senza id' }],
  }));
  assert.deepEqual(d.boards.map(b => [b.id, b.c]), [['b', '--l-blue']]);
  assert.equal(d.cards.length, 1);
  const c = d.cards[0];
  assert.deepEqual([c.date, c.time, c.recur, c.labels, c.notes, c.done], [null, null, 'none', ['x'], '', false]);
  assert.deepEqual(d.labels, []);
});
