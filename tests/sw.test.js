// Controlla che il service worker salvi per l'uso offline tutti i file che la pagina usa, e che esistano.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const FILES = JSON.parse(read('sw.js').match(/const FILES=(\[[\s\S]*?\]);/)[1].replace(/'/g, '"'));

test('ogni file in FILES esiste', () => {
  for (const f of FILES) if (f !== './') assert.ok(fs.existsSync(path.join(root, f)), f);
});

test('FILES contiene tutto ciò che index.html e app.css caricano', () => {
  const html = read('index.html'), css = read('app.css');
  const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"/g)].map(m => m[1])
    .concat([...css.matchAll(/url\((fonts\/[^)]+)\)/g)].map(m => m[1]));
  for (const r of refs) if (!r.endsWith('.png') || r === 'icon-192.png') assert.ok(FILES.includes(r), 'manca in FILES: ' + r);
});

test('la pagina non carica niente da altri siti', () => {
  const html = read('index.html');
  assert.ok(!/(?:src|href)="https?:/.test(html));
  assert.ok(!/<script>/.test(html), 'niente script in linea: la CSP non ha unsafe-inline per gli script');
});
