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
/* le raccolte di un documento e la lettera che precede l'id nelle tracce delle eliminazioni.
   joins = board condivise a cui partecipi (id della board + codice), viaggia solo nel backup personale */
const COLS={cards:'c',boards:'b',labels:'l',joins:'j'};
function mergeDoc(L,R,base){
  const tomb={...(R.tomb||{})};for(const k in L.tomb||{})tomb[k]=Math.max(tomb[k]||0,L.tomb[k]);
  const pick=(p,la,ra)=>{
    const lm=new Map(la.map(x=>[x.id,x])),rm=new Map(ra.map(x=>[x.id,x])),keep=x=>!(tomb[p+x.id]>=(x.upd||0)),out=[];
    la.forEach(l=>{const r=rm.get(l.id);
      if(r){const w=mergeItem(l,r);if(keep(w))out.push(w);return}
      if(keep(l)&&!(base&&(l.upd||0)<=base))out.push(l)});
    ra.forEach(r=>{if(!lm.has(r.id)&&keep(r))out.push(r)});
    return out};
  const out={tomb};for(const k in COLS)out[k]=pick(COLS[k],L[k]||[],R[k]||[]);
  return out;
}
/* istante più recente presente nei dati: l'orologio logico non deve mai scendere sotto */
function maxStamp(doc){
  let m=0;const see=x=>{if(x.upd>m)m=x.upd;if(x.fu)for(const k in x.fu)if(x.fu[k]>m)m=x.fu[k]};
  for(const k in COLS)(doc[k]||[]).forEach(see);
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
  const c=d=>{const o={tomb:d.tomb||{}};for(const k in COLS)o[k]=byId(d[k]);return canon(o)};
  return c(a)===c(b);
}

/* ---------- board condivise ----------
   Ogni board condivisa ha un suo documento cifrato sul server, con la board, le sue card e le etichette usate.
   Un id appartiene sempre a un solo documento: spostare una card dentro o fuori una board condivisa
   crea una copia con un id nuovo ed elimina l'originale, così le eliminazioni non si confondono tra documenti */
/* delle eliminazioni locali vanno nel documento condiviso solo quelle di oggetti che il documento contiene */
function routeTomb(tomb,remote){
  const keys=new Set(),out={};
  if(remote)for(const k in COLS)(remote[k]||[]).forEach(x=>keys.add(COLS[k]+x.id));
  for(const k in tomb||{})if(keys.has(k))out[k]=tomb[k];
  return out;
}
/* copia di un oggetto con un id nuovo e senza istanti: per l'altro documento è un oggetto appena creato */
function cloneAs(x,id){const o={...JSON.parse(JSON.stringify(x)),id};delete o.upd;delete o.c0;delete o.fu;return o}

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
const SCHEMA=4;
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
  if(v<4){
    // board condivise a cui partecipi
    if(!Array.isArray(S.joins))S.joins=[];
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

/* ---------- esporta / importa ----------
   Il file contiene card, board ed etichette. All'importazione ogni oggetto viene controllato e completato:
   un file rovinato o di un'altra app viene rifiutato con un messaggio chiaro invece di rompere i dati */
const EXPORT_APP='mytask';
function exportDoc(S,now){return {app:EXPORT_APP,v:SCHEMA,exported:new Date(now).toISOString(),cards:S.cards,boards:S.boards,labels:S.labels}}
function parseExport(text){
  let d;try{d=JSON.parse(text)}catch(e){throw new Error('Il file non è un backup di MyTask (non è JSON valido).')}
  if(!d||typeof d!=='object'||!Array.isArray(d.cards)||!Array.isArray(d.boards))throw new Error('Il file non è un backup di MyTask.');
  if(d.v>SCHEMA)throw new Error("Il file viene da una versione più nuova dell'app: aggiorna MyTask e riprova.");
  const str=(x,max)=>typeof x==='string'?x.slice(0,max):'';
  const id=x=>typeof x==='string'&&/^[\w-]{1,40}$/.test(x)?x:null;
  const stamps=(o,x)=>{if(Number.isFinite(x.upd))o.upd=x.upd;if(Number.isFinite(x.c0))o.c0=x.c0;if(x.fu&&typeof x.fu==='object'){const fu={};for(const k in x.fu)if(Number.isFinite(x.fu[k]))fu[k]=x.fu[k];if(Object.keys(fu).length)o.fu=fu}return o};
  const boards=d.boards.filter(b=>b&&id(b.id)&&Array.isArray(b.lists)).map(b=>stamps({id:b.id,name:str(b.name,40)||'Board',c:safeColor(b.c)||'--l-blue',
    lists:b.lists.filter(l=>l&&id(l.id)).map(l=>({id:l.id,name:str(l.name,40)||'Colonna',...(l.done?{done:true}:{})}))},b)).filter(b=>b.lists.length);
  const labels=(Array.isArray(d.labels)?d.labels:[]).filter(l=>l&&id(l.id)).map(l=>stamps({id:l.id,name:str(l.name,24)||l.id,c:safeColor(l.c)||'--l-blue'},l));
  const day=x=>typeof x==='string'&&/^\d{4}-\d\d-\d\d$/.test(x)?x:null;
  const cards=d.cards.filter(c=>c&&id(c.id)&&typeof c.title==='string'&&c.title.trim()).map(c=>{
    const o={id:c.id,title:str(c.title,500),notes:str(c.notes,20000),boardId:id(c.boardId),listId:id(c.listId),date:day(c.date),
      time:typeof c.time==='string'&&/^\d\d:\d\d$/.test(c.time)?c.time:null,
      labels:Array.isArray(c.labels)?c.labels.filter(id):[],
      checklist:Array.isArray(c.checklist)?c.checklist.filter(i=>i&&typeof i.t==='string').map(i=>({t:i.t.slice(0,500),d:!!i.d})):[],
      recur:typeof c.recur==='string'&&(c.recur in STEP||['none','monthly','dates'].includes(c.recur))?c.recur:'none',
      reminder:Number.isFinite(c.reminder)?c.reminder:null,done:!!c.done,notified:!!c.notified,snooze:Number.isFinite(c.snooze)?c.snooze:null};
    if(Array.isArray(c.dates))o.dates=c.dates.filter(day);
    if(c.prio===1||c.prio===2)o.prio=c.prio;
    if(Number.isInteger(c.mday)&&c.mday>=1&&c.mday<=31)o.mday=c.mday;
    if(Number.isFinite(c.doneAt))o.doneAt=c.doneAt;
    if(c.archived)o.archived=true;
    return stamps(o,c);
  });
  return {cards,boards,labels};
}

if(typeof module!=='undefined')module.exports={pad,iso,addDays,todayIso,daysInMonth,esc,STEP,nextDate,occ,nextAfterDone,safeColor,labCss,fieldsOf,stampItem,mergeItem,mergeDoc,COLS,routeTomb,cloneAs,maxStamp,TOMB_KEEP_DAYS,canon,sameDoc,capReminders,SCHEMA,migrate,repair,exportDoc,parseExport};
