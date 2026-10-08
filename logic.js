/* MyTask: logica pura (date, ripetizioni, unione dei dati tra dispositivi, migrazioni).
   Niente DOM e niente localStorage, così i test la provano con `node --test`.
   Nel browser è uno script classico: le funzioni restano globali e app.js le usa direttamente. */

const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addDays=(s,n)=>{const d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return iso(d)};
const todayIso=()=>iso(new Date());
const daysInMonth=(y,m)=>new Date(y,m,0).getDate(); // m da 1 a 12
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- ripetizioni ---------- */
const STEP={daily:1,d2:2,d3:3,d4:4,d5:5,d6:6,weekly:7};
/* "ogni mese" resta legata al giorno scelto (c.mday): il 31 diventa l'ultimo giorno nei mesi più corti
   e torna al 31 appena il mese lo permette, invece di slittare per sempre */
function nextDate(c,d){
  if(STEP[c.recur])return addDays(d,STEP[c.recur]);
  if(c.recur==='monthly'){
    const y=+d.slice(0,4),m=+d.slice(5,7),ny=m===12?y+1:y,nm=m===12?1:m+1,want=c.mday||+d.slice(8,10);
    return ny+'-'+pad(nm)+'-'+pad(Math.min(want,daysInMonth(ny,nm)));
  }
  if(c.recur==='dates')return (c.dates||[]).filter(x=>x>d).sort()[0]||null;
  return null;
}
/* tutte le date in cui una card compare tra from e to (per le ripetizioni: anche quelle future) */
function occ(c,from,to){
  if(!c.date)return [];
  if(c.done||c.recur==='none')return c.date>=from&&c.date<=to?[c.date]:[];
  const out=[];let d=c.date,n=0;
  while(d&&d<=to&&n<800){if(d>=from)out.push(d);d=nextDate(c,d);n++}
  return out;
}
/* data successiva quando si completa una ripetizione: quelle rimaste indietro si saltano fino a oggi,
   così un'attività ferma da giorni non va spuntata una volta per ogni giorno perso */
function nextAfterDone(c,today){
  let nd=nextDate(c,c.date),n=0;
  while(nd&&nd<today&&n<5000){nd=nextDate(c,nd);n++}
  return nd;
}

/* ---------- colori: solo variabili del tema o esadecimali, perché finiscono dentro attributi style ---------- */
const safeColor=c=>typeof c==='string'&&(/^--[a-z0-9-]{1,20}$/i.test(c)||/^#[0-9a-f]{3,8}$/i.test(c))?c:null;
const labCss=c=>{c=safeColor(c);return c?(c.startsWith('--')?`var(${c})`:c):'var(--muted)'};

/* ---------- unione tra dispositivi ----------
   Ogni card, board ed etichetta porta:
   - upd: ultima modifica dell'oggetto (serve per le eliminazioni);
   - c0: istante di partenza dei campi mai modificati da allora;
   - fu: per ogni campo modificato, l'istante della modifica.
   Così due modifiche a campi diversi (titolo sul telefono, checklist sul PC) si sommano invece di perdersene una.
   Gli istanti vengono da un orologio logico (tick): non tornano mai indietro rispetto a quanto già visto,
   anche se l'orologio di un dispositivo è avanti o indietro. */
const SYNC_META={id:1,upd:1,c0:1,fu:1};
function fieldsOf(x){const o={};for(const k in x)if(!SYNC_META[k]&&x[k]!==undefined)o[k]=JSON.stringify(x[k]);return o}
const fieldStamp=(x,k)=>(x.fu&&x.fu[k])||(x.c0!=null?x.c0:(x.upd||0));
/* segna come modificati i campi diversi dalla fotografia precedente; restituisce true se qualcosa è cambiato */
function stampItem(x,prev,now){
  const cur=fieldsOf(x);
  if(!prev){x.upd=now;x.c0=now;delete x.fu;return true}
  const ch=Object.keys({...prev,...cur}).filter(f=>prev[f]!==cur[f]);if(!ch.length)return false;
  if(x.c0==null)x.c0=x.upd||0;
  x.fu={...(x.fu||{})};ch.forEach(f=>x.fu[f]=now);x.upd=now;return true;
}
function mergeItem(a,b){
  const keys=new Set([...Object.keys(a),...Object.keys(b)].filter(k=>!SYNC_META[k])),out={id:a.id},fu={};
  const c0=[a.c0,b.c0].filter(x=>x!=null);if(c0.length)out.c0=Math.min(...c0);
  for(const k of keys){
    const sa=fieldStamp(a,k),sb=fieldStamp(b,k);
    // a parità di istante decide il contenuto, così ogni dispositivo arriva allo stesso risultato
    const w=sb>sa||(sb===sa&&String(JSON.stringify(b[k]))>String(JSON.stringify(a[k])))?b:a;
    if(k in w&&w[k]!==undefined)out[k]=w[k];
    // l'istante vincente resta segnato sul campo (anche quando il campo è stato tolto)
    const s=Math.max(sa,sb);if(out.c0!=null&&s>out.c0)fu[k]=s;
  }
  if(Object.keys(fu).length)out.fu=fu;
  out.upd=Math.max(a.upd||0,b.upd||0);
  return out;
}
/* L = dati locali, R = backup sul server. base = orologio locale all'ultima unione riuscita:
   un oggetto locale che allora c'era (upd <= base) e che ora manca sul server è stato eliminato altrove,
   anche se la traccia dell'eliminazione è già stata ripulita */
function mergeDoc(L,R,base){
  const tomb={...(R.tomb||{})};for(const k in L.tomb||{})tomb[k]=Math.max(tomb[k]||0,L.tomb[k]);
  const pick=(p,la,ra)=>{
    const lm=new Map(la.map(x=>[x.id,x])),rm=new Map(ra.map(x=>[x.id,x])),keep=x=>!(tomb[p+x.id]>=(x.upd||0)),out=[];
    la.forEach(l=>{const r=rm.get(l.id);
      if(r){const w=mergeItem(l,r);if(keep(w))out.push(w);return}
      if(keep(l)&&!(base&&(l.upd||0)<=base))out.push(l)});
    ra.forEach(r=>{if(!lm.has(r.id)&&keep(r))out.push(r)});
    return out};
  return {cards:pick('c',L.cards,R.cards||[]),boards:pick('b',L.boards,R.boards||[]),labels:pick('l',L.labels||[],R.labels||[]),tomb};
}
/* istante più recente presente nei dati: l'orologio logico non deve mai scendere sotto */
function maxStamp(doc){
  let m=0;const see=x=>{if(x.upd>m)m=x.upd;if(x.fu)for(const k in x.fu)if(x.fu[k]>m)m=x.fu[k]};
  (doc.cards||[]).forEach(see);(doc.boards||[]).forEach(see);(doc.labels||[]).forEach(see);
  for(const k in doc.tomb||{})if(doc.tomb[k]>m)m=doc.tomb[k];
  return m;
}
const TOMB_KEEP_DAYS=365;
/* JSON con le chiavi in ordine: due oggetti uguali danno lo stesso testo anche se costruiti in ordine diverso */
function canon(x){
  if(Array.isArray(x))return '['+x.map(canon).join(',')+']';
  if(x&&typeof x==='object')return '{'+Object.keys(x).filter(k=>x[k]!==undefined).sort().map(k=>JSON.stringify(k)+':'+canon(x[k])).join(',')+'}';
  return JSON.stringify(x);
}
/* stesso contenuto, senza badare all'ordine delle card (l'ordine non ha un istante e non giustifica un salvataggio) */
function sameDoc(a,b){
  const byId=l=>[...(l||[])].sort((x,y)=>x.id<y.id?-1:x.id>y.id?1:0);
  const c=d=>canon({cards:byId(d.cards),boards:byId(d.boards),labels:byId(d.labels),tomb:d.tomb||{}});
  return c(a)===c(b);
}

/* ---------- promemoria per il server ----------
   Si mandano i più vicini fino a max. Se la lista è tagliata, l'ultimo posto va a un avviso
   che chiede di aprire l'app, così i promemoria successivi non spariscono in silenzio */
function capReminders(list,max){
  const s=[...list].sort((a,b)=>a.at-b.at);if(s.length<=max)return s;
  const out=s.slice(0,max-1),last=out[out.length-1];
  out.push({id:'sys-refresh',at:last.at+60000,title:'MyTask',body:"Apri l'app per continuare a ricevere i promemoria."});
  return out;
}

/* ---------- migrazioni dei dati salvati ----------
   S.v è la versione dello schema; ogni passo porta i dati dalla versione precedente alla successiva */
const SCHEMA=3;
function migrate(S){
  if(!Array.isArray(S.labels))S.labels=null;
  const v=S.v||1;
  if(v<2){
    // via le colonne "In corso": le card tornano nella prima colonna non completata
    S.boards.forEach(b=>{const rm=b.lists.filter(l=>/^in corso$/i.test(l.name));if(!rm.length)return;b.lists=b.lists.filter(l=>!rm.includes(l));const first=b.lists.find(l=>!l.done)||b.lists[0];S.cards.forEach(c=>{if(rm.some(l=>l.id===c.listId))c.listId=first.id})});
  }
  if(v<3){
    // "ogni mese" ricorda il giorno di partenza
    S.cards.forEach(c=>{if(c.recur==='monthly'&&c.date&&!c.mday)c.mday=+c.date.slice(8,10)});
  }
  S.v=SCHEMA;
  return S;
}

/* card che puntano a board o colonne sparite (eliminate qui o su un altro dispositivo): tornano visibili.
   Senza board finiscono nell'Inbox, con una colonna sparita vanno nella prima colonna. Restituisce true se ha cambiato qualcosa */
function repair(S){
  let ch=false;const bm=new Map(S.boards.map(b=>[b.id,b]));
  S.cards.forEach(c=>{
    if(c.boardId&&!bm.has(c.boardId)){c.boardId=null;c.listId=null;delete c.archived;ch=true;return}
    const b=c.boardId&&bm.get(c.boardId);
    if(b&&c.listId&&!b.lists.some(l=>l.id===c.listId)){const l=c.done&&b.lists.find(x=>x.done)||b.lists.find(x=>!x.done)||b.lists[0];c.listId=l?l.id:null;ch=true}
  });
  return ch;
}

if(typeof module!=='undefined')module.exports={pad,iso,addDays,todayIso,daysInMonth,esc,STEP,nextDate,occ,nextAfterDone,safeColor,labCss,fieldsOf,stampItem,mergeItem,mergeDoc,maxStamp,TOMB_KEEP_DAYS,canon,sameDoc,capReminders,SCHEMA,migrate,repair};
