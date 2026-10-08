const I={
 today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 board:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/></svg>',
 inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/></svg>',
 bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>',
 rep:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M20 4v5h-5M4 20v-5h5"/></svg>',
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 flag:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 21V4h11l-1.5 4L16 12H5"/></svg>',
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18.5a4.5 4.5 0 0 1-.7-8.95A6 6 0 0 1 17.8 8.6 4.5 4.5 0 0 1 17.5 18.5H7z"/></svg>',
 palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.3-4-7.7-9-7.7z"/><circle cx="7.5" cy="11.5" r="1.2" fill="currentColor"/><circle cx="10" cy="7.5" r="1.2" fill="currentColor"/><circle cx="14.5" cy="7.5" r="1.2" fill="currentColor"/></svg>',
 list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>'
};
// etichette di partenza: l'id coincide col nome, così le card salvate prima delle etichette personalizzate restano valide
const LABELS={urgente:'--l-red',lavoro:'--l-blue',casa:'--l-green',personale:'--l-violet',idea:'--l-violet',attesa:'--l-amber'};
const defaultLabels=()=>Object.entries(LABELS).map(([k,v])=>({id:k,name:k,c:v}));
// colori: i primi seguono il tema, gli altri sono fissi e leggibili sia su chiaro che su scuro
const LAB_COLORS=['--l-red','--l-amber','--l-green','--l-blue','--l-violet','#14b8a6','#ec4899','#f97316','#8a94a6'];
const REM=[[null,'Nessuno'],[0,"All'orario"],[10,'10 minuti prima'],[30,'30 minuti prima'],[60,'1 ora prima'],[1440,'1 giorno prima']];
const REC={none:'Non si ripete',daily:'Ogni giorno',d2:'Ogni 2 giorni',d3:'Ogni 3 giorni',d4:'Ogni 4 giorni',d5:'Ogni 5 giorni',d6:'Ogni 6 giorni',weekly:'Ogni settimana',monthly:'Ogni mese',dates:'Date sparse (le scegli tu)'};
// nome storico della chiave: cambiarlo farebbe perdere i dati già salvati. La versione dei dati è in S.v (vedi migrate)
const KEY='agenda-proto-v1';
const ALLDAY_AT='09:00';
const uid=()=>Math.random().toString(36).slice(2,9);
const fmtDay=s=>new Date(s+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'});
const fmtShort=s=>new Date(s+'T12:00').toLocaleDateString('it-IT',{weekday:'short',day:'numeric',month:'short'});

/* dati di partenza: tre board vuote */
function sample(){
  const t=todayIso();
  const boards=[
   {id:'b1',name:'Lavoro',c:'--l-blue',lists:[{id:'l1',name:'Da fare'},{id:'l3',name:'Fatto',done:true}]},
   {id:'b2',name:'Casa',c:'--l-green',lists:[{id:'l4',name:'Da fare'},{id:'l5',name:'Da comprare'},{id:'l6',name:'Fatto',done:true}]},
   {id:'b3',name:'Personale',c:'--l-violet',lists:[{id:'l7',name:'Da fare'},{id:'l9',name:'Fatto',done:true}]}
  ];
  return {v:SCHEMA,boards,cards:[],labels:defaultLabels(),view:'oggi',board:'b1',month:t.slice(0,7),sel:t};
}
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
if(!S||!S.boards)S=sample();
migrate(S);if(!S.labels)S.labels=defaultLabels();repair(S);
// chiede al browser di non cancellare i dati quando manca spazio sul telefono
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist().catch(()=>{})}catch(e){}
/* segna quando una card è stata completata: serve alla pulizia automatica della colonna "Fatto" */
function stampDone(){const now=Date.now();S.cards.forEach(c=>{if(c.done&&!c.doneAt)c.doneAt=now;else if(!c.done&&c.doneAt)delete c.doneAt})}
const DONE_KEEP_DAYS=30;
/* toglie le card dalla board: quelle con una data restano nel calendario come storico, le altre vengono eliminate */
function clearCards(test){let del=0,arc=0;S.cards=S.cards.filter(c=>{if(c.archived||!test(c))return true;if(c.date){c.archived=true;c.listId=null;arc++;return true}del++;return false});return {del,arc}}
function purgeDone(){const lim=Date.now()-DONE_KEEP_DAYS*864e5,r=clearCards(c=>c.done&&c.doneAt&&c.doneAt<lim);return r.del+r.arc}
/* se localStorage è pieno lo dico subito (una volta), invece di perdere le modifiche in silenzio */
let saveWarned=false;
function store(){
  try{localStorage.setItem(KEY,JSON.stringify(S));saveWarned=false;return true}
  catch(e){if(!saveWarned){saveWarned=true;setTimeout(()=>toast('Memoria piena: le ultime modifiche non sono salvate su questo dispositivo. '+(SYNC?'Il backup le conserva finché resti online.':'Attiva il backup o svuota la colonna "Fatto".'),null,15000))}return false}
}
function save(){stampDone();stampSync();store();schedulePush();queueSync()}
/* ---------- backup sul server ----------
   I dati partono cifrati con una chiave ricavata dal codice di backup: il server vede solo testo illeggibile.
   Ogni card/board/etichetta segna l'istante di modifica di ciascun campo (vedi stampItem in logic.js)
   e le eliminazioni lasciano una traccia (S.tomb): due dispositivi si uniscono campo per campo. */
var SYNC=null,syncSnap=null,syncTO=null,syncBusy=false,syncAgain=false;
try{SYNC=JSON.parse(localStorage.getItem('mytask-sync'))}catch(e){}
function syncKeep(){try{if(SYNC)localStorage.setItem('mytask-sync',JSON.stringify(SYNC));else localStorage.removeItem('mytask-sync')}catch(e){}}
/* orologio logico: mai indietro rispetto agli istanti già visti, anche con l'orologio del telefono sbagliato */
function tick(){const t=Math.max(Date.now(),(S.hlc||0)+1);S.hlc=t;return t}
function snapOf(){const m={};S.cards.forEach(c=>m['c'+c.id]=fieldsOf(c));S.boards.forEach(b=>m['b'+b.id]=fieldsOf(b));S.labels.forEach(l=>m['l'+l.id]=fieldsOf(l));return m}
function stampSync(){
  const old=syncSnap;S.tomb=S.tomb||{};
  if(old){
    const now=tick(),seen=new Set(),chk=(p,x)=>{const k=p+x.id;seen.add(k);if(stampItem(x,old[k],now))delete S.tomb[k]};
    S.cards.forEach(c=>chk('c',c));S.boards.forEach(b=>chk('b',b));S.labels.forEach(l=>chk('l',l));
    for(const k in old)if(!seen.has(k))S.tomb[k]=now;
  }
  const lim=Date.now()-TOMB_KEEP_DAYS*864e5;for(const k in S.tomb)if(S.tomb[k]<lim)delete S.tomb[k];
  syncSnap=snapOf();
}
function applyMerged(m){
  S.hlc=Math.max(S.hlc||0,maxStamp(m));
  const same=sameDoc(m,{cards:S.cards,boards:S.boards,labels:S.labels,tomb:m.tomb});S.tomb=m.tomb;
  if(same){store();return}
  S.cards=m.cards;S.labels=m.labels;if(m.boards.length)S.boards=m.boards;if(!board(S.board))S.board=S.boards[0].id;
  // riparo dopo aver fissato la fotografia: le correzioni contano come modifiche locali e partono col prossimo salvataggio
  syncSnap=snapOf();if(repair(S)){stampSync();queueSync()}
  store();schedulePush();render();
}
const SYNC_AL='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function newSyncCode(){return [...crypto.getRandomValues(new Uint8Array(20))].map(b=>SYNC_AL[b&31]).join('')}
function normCode(v){const c=String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');return c.length===20&&[...c].every(x=>SYNC_AL.includes(x))?c:null}
const fmtCode=c=>c.match(/.{5}/g).join('-');
async function syncKeys(code){
  const h=async x=>new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x)));
  return {id:[...await h('mytask-id:'+code)].map(b=>b.toString(16).padStart(2,'0')).join(''),
    key:await crypto.subtle.importKey('raw',await h('mytask-key:'+code),'AES-GCM',false,['encrypt','decrypt'])};
}
async function seal(k,obj){
  const iv=crypto.getRandomValues(new Uint8Array(12)),ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},k.key,new TextEncoder().encode(JSON.stringify(obj))));
  const all=new Uint8Array(12+ct.length);all.set(iv);all.set(ct,12);let b='';for(let i=0;i<all.length;i+=8192)b+=String.fromCharCode(...all.subarray(i,i+8192));return btoa(b);
}
async function unseal(k,str){const all=Uint8Array.from(atob(str),x=>x.charCodeAt(0));return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:all.slice(0,12)},k.key,all.slice(12))))}
async function backupCall(body){
  // text/plain evita la richiesta preliminare CORS
  const r=await fetch(PUSH_URL+'/backup',{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body)});
  let j={};try{j=await r.json()}catch(e){}return {status:r.status,...j};
}
function queueSync(){if(!SYNC)return;clearTimeout(syncTO);syncTO=setTimeout(syncNow,2500)}
async function syncNow(){
  if(!SYNC||!PUSH_URL)return;if(syncBusy){syncAgain=true;return}
  syncBusy=true;clearTimeout(syncTO);syncTO=null;
  try{
    const k=await syncKeys(SYNC.code);let r=await backupCall({op:'get',id:k.id}),ok=false;
    for(let i=0;i<4&&!ok;i++){
      if(r.status!==200||r.data===undefined)throw new Error('server '+r.status);
      const remote=r.data?await unseal(k,r.data):null,local={cards:S.cards,boards:S.boards,labels:S.labels,tomb:S.tomb||{}};
      const m=remote?mergeDoc(local,remote,SYNC.base):local;
      applyMerged(m);
      // base: tutto ciò che è segnato fino a qui adesso è anche sul server (serve a mergeDoc per le eliminazioni)
      const base=maxStamp(m);
      if(remote&&sameDoc(m,remote)){SYNC.rev=r.rev;SYNC.base=base;ok=true;break}
      const p=await backupCall({op:'put',id:k.id,rev:r.rev,data:await seal(k,m)});
      if(p.status===200){SYNC.rev=p.rev;SYNC.base=base;ok=true;break}
      if(p.status!==409)throw new Error('server '+p.status);
      // un altro dispositivo ha salvato nel frattempo: riparto dalla sua versione
      r=p.data!==undefined?{status:200,rev:p.rev,data:p.data}:await backupCall({op:'get',id:k.id});
    }
    if(!ok)throw new Error('conflitto');
    if(SYNC){SYNC.last=Date.now();SYNC.err=null}
  }catch(e){if(SYNC)SYNC.err=String(e.message||e);console.warn('Backup non riuscito',e)}
  finally{syncBusy=false;syncKeep();syncUI();if(syncAgain){syncAgain=false;syncNow()}}
}
function syncUI(){
  const st=!SYNC?'off':SYNC.err?'err':'ok';
  document.querySelectorAll('[data-settings]').forEach(b=>b.dataset.sync=st);
  if(document.getElementById('bk'))openBackup();else if(document.getElementById('set'))openSettings();
}
/* ---------- ricerca: titolo, note, etichette, checklist e board, senza badare ad accenti e maiuscole ---------- */
const fold=x=>String(x||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
function searchHits(q){
  const words=fold(q).split(/\s+/).filter(Boolean);if(!words.length)return [];
  return S.cards.filter(c=>{const hay=fold([c.title,c.notes,cardLabs(c).map(l=>l.name).join(' '),c.checklist.map(i=>i.t).join(' '),board(c.boardId)?.name||'Inbox'].join(' '));return words.every(w=>hay.includes(w))})
    .sort((a,b)=>(a.done-b.done)||((a.date||'9999')+(a.time||'')).localeCompare((b.date||'9999')+(b.time||'')));
}
function markHit(text,q){
  // evidenzia le parole cercate nel titolo (confronto senza accenti, posizioni sul testo originale)
  const f=fold(text);if(f.length!==text.length)return esc(text);
  const ws=fold(q).split(/\s+/).filter(Boolean),on=new Array(text.length).fill(false);
  ws.forEach(w=>{let i=f.indexOf(w);while(i>=0){for(let k=i;k<i+w.length;k++)on[k]=true;i=f.indexOf(w,i+w.length)}});
  let out='',open=false;for(let i=0;i<text.length;i++){if(on[i]!==open){out+=on[i]?'<mark>':'</mark>';open=on[i]}out+=esc(text[i])}return out+(open?'</mark>':'');
}
function drawHits(){
  const q=document.getElementById('sr-q').value,box=document.getElementById('sr-res');if(!box)return;
  if(!q.trim()){box.innerHTML='<span class="note">Cerca nei titoli, nelle note, nelle etichette e nelle checklist. Trova anche le card completate.</span>';return}
  const hits=searchHits(q);
  box.innerHTML=hits.length?`<span class="note">${hits.length===1?'1 card':hits.length+' card'}</span><div class="sr-list">${hits.slice(0,80).map(c=>{
    const where=[c.date?fmtShort(c.date)+(c.time?' '+c.time:''):null,board(c.boardId)?.name||'Inbox',c.done?'completata':null,cardLabs(c).length?cardLabs(c).map(l=>l.name).join(', '):null].filter(Boolean).join(' · ');
    return `<button type="button" class="sr ${c.done?'done':''}" data-sr="${c.id}"><b>${prioMark(c)}${markHit(c.title,q)}</b><span>${esc(where)}</span></button>`}).join('')}</div>`
    :'<span class="note">Nessuna card trovata.</span>';
}
function openSearch(){
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="srch" role="dialog" aria-label="Cerca"><h3>Cerca</h3>
   <div class="f"><input id="sr-q" type="search" placeholder="Es. bolletta, lavoro, dentista" autocomplete="off" enterkeyhint="search" aria-label="Cerca"></div>
   <div id="sr-res" style="display:flex;flex-direction:column;gap:8px"></div>
   <div class="actions"><span></span><button type="button" class="btn" id="e-cancel">Chiudi</button></div></div></div>`;
  modalOpened();drawHits();
  const i=document.getElementById('sr-q');i.addEventListener('input',drawHits);setTimeout(()=>i.focus(),0);
}

/* ---------- rimanda: scelte rapide per riavere il promemoria più tardi ---------- */
function snoozeChoices(){
  const n=new Date(),at=(d,h)=>{const x=new Date(n);x.setDate(x.getDate()+d);x.setHours(h,0,0,0);return x.getTime()};
  const out=[['Tra 1 ora',n.getTime()+3600e3],['Tra 3 ore',n.getTime()+3*3600e3]];
  if(n.getHours()<19)out.push(['Stasera alle 20',at(0,20)]);
  out.push(['Domani alle 9',at(1,9)]);
  if(n.getDay()!==6&&n.getDay()!==0)out.push(['Sabato alle 10',at((6-n.getDay()+7)%7,10)]);
  out.push(['Lunedì alle 9',at((8-n.getDay())%7||7,9)]);
  return out;
}
function snoozeText(ts){
  const d=new Date(ts),t=todayIso(),day=iso(d),hm=pad(d.getHours())+':'+pad(d.getMinutes());
  return day===t?'oggi alle '+hm:day===addDays(t,1)?'domani alle '+hm:fmtShort(day)+' alle '+hm;
}
function doSnooze(c,ts){
  const undo=undoFor([c.id]);c.snooze=ts;save();render();
  toast('Ti ricordo di nuovo '+snoozeText(ts),undo);
}
function openSnooze(id){
  const c=card(id);if(!c)return;
  const now=new Date(Date.now()+3600e3),def=iso(now)+'T'+pad(now.getHours())+':'+pad(now.getMinutes());
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="snz" data-id="${c.id}" role="dialog" aria-label="Rimanda"><h3>${esc(c.title)}</h3>
   <p class="note">${esc(whenText(c,c.date))}</p>
   <span class="flab">Ricordamelo di nuovo</span>
   <div class="snz">${snoozeChoices().map(([n,ts])=>`<button type="button" class="btn" data-snz="${ts}">${n}</button>`).join('')}</div>
   <div class="f"><label for="snz-at">Oppure scegli tu</label><div class="add"><input type="datetime-local" id="snz-at" value="${def}"><button type="button" class="btn" data-snz="pick">OK</button></div></div>
   <div class="actions"><div style="display:flex;gap:8px">${c.done?'':'<button type="button" class="btn" data-snz="done">Fatto</button>'}<button type="button" class="btn" data-snz="open">Apri card</button></div><button type="button" class="btn" id="e-cancel">Chiudi</button></div></div></div>`;
  modalOpened();
}
function snoozeAct(v){
  const c=card(document.getElementById('snz').dataset.id);if(!c)return closeEditor();
  if(v==='open')return openEditor(c.id);
  if(v==='done'){closeEditor();if(!c.done)toggleDone(c);return}
  let ts=+v;if(v==='pick'){const x=document.getElementById('snz-at').value;ts=x?new Date(x).getTime():NaN;if(!(ts>Date.now()))return toast('Scegli un momento nel futuro')}
  closeEditor();doSnooze(c,ts);
}

/* ---------- etichette: crea, rinomina, cambia colore, elimina ---------- */
var lbArm=null;
function addLabel(name){
  name=String(name||'').trim().slice(0,24);if(!name)return null;
  const same=S.labels.find(l=>fold(l.name)===fold(name));if(same)return same;
  const used=S.labels.map(l=>l.c),c=LAB_COLORS.find(x=>!used.includes(x))||LAB_COLORS[S.labels.length%LAB_COLORS.length];
  const l={id:'lb'+uid(),name,c};S.labels.push(l);save();render();return l;
}
function openLabels(){
  const n=id=>S.cards.filter(c=>c.labels.includes(id)).length;
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="lbm" role="dialog" aria-label="Etichette"><h3>Etichette</h3>
   <p class="note">Tocca il pallino per cambiare colore, il nome per rinominarla.</p>
   <div class="lbm-list">${S.labels.map(l=>`<div class="lbm-row">
     <button type="button" class="lbdot" data-lbc="${l.id}" style="background:${labCss(l.c)}" aria-label="Cambia colore di ${esc(l.name)}"></button>
     <input data-lbn="${l.id}" value="${esc(l.name)}" maxlength="24" aria-label="Nome etichetta">
     <span class="note" title="Card con questa etichetta">${n(l.id)} card</span>
     <button type="button" class="btn ghost danger" data-lbx="${l.id}">${lbArm===l.id?'Elimina?':'×'}</button></div>`).join('')||'<span class="note">Nessuna etichetta.</span>'}</div>
   ${lbArm?`<span class="note">${(c=>c?'La tolgo da '+(c===1?'1 card':c+' card')+'. ':'')(n(lbArm))}Tocca di nuovo per confermare.</span>`:''}
   <div class="f"><label for="lbm-new">Nuova etichetta</label><div class="add"><input id="lbm-new" placeholder="Es. scuola" maxlength="24" autocomplete="off"><button class="btn" type="button" id="lbm-add">Aggiungi</button></div></div>
   <div class="actions"><span></span><button type="button" class="btn primary" id="lbm-close">${draft?'Torna alla card':'Fatto'}</button></div></div></div>`;
  modalOpened();
}
function closeLabels(){lbArm=null;if(draft)drawEditor();else closeEditor()}
function labelsAct(t){
  if(t.id==='lbm-close'||t.id==='scrim')return closeLabels();
  if(t.id==='lbm-add'){lbArm=null;addLabel(document.getElementById('lbm-new').value);openLabels();document.getElementById('lbm-new').focus();return}
  if(t.dataset.lbc){const l=lab(t.dataset.lbc);l.c=LAB_COLORS[(LAB_COLORS.indexOf(l.c)+1)%LAB_COLORS.length];lbArm=null;save();render();return openLabels()}
  if(t.dataset.lbx){const id=t.dataset.lbx;if(lbArm!==id){lbArm=id;return openLabels()}
    lbArm=null;const name=lab(id).name,li=S.labels.findIndex(l=>l.id===id),lj=JSON.stringify(S.labels[li]),undo=undoFor(S.cards.filter(c=>c.labels.includes(id)).map(c=>c.id));
    S.labels=S.labels.filter(l=>l.id!==id);S.cards.forEach(c=>{if(c.labels.includes(id))c.labels=c.labels.filter(x=>x!==id)});
    if(draft)draft.labels=draft.labels.filter(x=>x!==id);
    save();render();openLabels();
    toast('Etichetta "'+name+'" eliminata',()=>{if(!lab(id))S.labels.splice(Math.min(li,S.labels.length),0,JSON.parse(lj));undo();if(document.getElementById('lbm'))openLabels()});return}
}

/* ---------- board: rinomina, colore, colonne (rinomina, sposta, elimina), elimina board ---------- */
const BOARD_COLORS=['--l-blue','--l-green','--l-violet','--l-amber','--l-red'];
var bdArm=null;
function openBoardEdit(){
  const b=board(S.board);if(!b)return;
  const n=lid=>S.cards.filter(c=>c.listId===lid).length,open=b.lists.filter(l=>!l.done).length;
  const arm=(k,txt)=>bdArm===k?'Conferma':txt;
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="bdm" role="dialog" aria-label="Modifica board"><h3>Modifica board</h3>
   <div class="f"><label for="bd-name">Nome</label><div class="lbm-row" style="grid-template-columns:auto 1fr"><button type="button" class="lbdot" data-bdc style="background:${labCss(b.c)}" aria-label="Cambia colore"></button><input id="bd-name" value="${esc(b.name)}" maxlength="40"></div></div>
   <div class="f"><span class="flab">Colonne</span><div class="lbm-list">${b.lists.map((l,i)=>`<div class="lbm-row bd-col">
     <input data-bln="${l.id}" value="${esc(l.name)}" maxlength="40" aria-label="Nome colonna">
     <span class="note">${n(l.id)} card${l.done?' · completate':''}</span>
     <span style="display:flex;gap:4px"><button type="button" class="btn" data-blm="${l.id}" data-dir="-1" ${i?'':'disabled'} aria-label="Sposta a sinistra">‹</button><button type="button" class="btn" data-blm="${l.id}" data-dir="1" ${i<b.lists.length-1?'':'disabled'} aria-label="Sposta a destra">›</button></span>
     ${l.done||open<2&&!l.done?'<span></span>':`<button type="button" class="btn ghost danger" data-blx="${l.id}">${arm(l.id,'×')}</button>`}</div>`).join('')}</div>
    <span class="note">${bdArm&&bdArm!=='board'?'Le card della colonna passano nella prima colonna rimasta. Tocca di nuovo per confermare.':'La colonna delle completate non si elimina: serve a segnare le card come fatte.'}</span></div>
   ${S.boards.length>1?`<div class="f"><button type="button" class="btn danger" data-bdx>${bdArm==='board'?'Conferma: elimina la board':'Elimina board'}</button><span class="note">Le sue card non vanno perse: finiscono nell'Inbox.</span></div>`:''}
   <div class="actions"><span></span><button type="button" class="btn primary" id="bdm-close">Fatto</button></div></div></div>`;
  modalOpened();
}
function boardAct(t){
  const b=board(S.board);if(!b)return closeEditor();
  if(t.id==='bdm-close'||t.id==='scrim'||t.id==='e-cancel'){bdArm=null;return closeEditor()}
  if(t.closest('[data-bdc]')){b.c=BOARD_COLORS[(BOARD_COLORS.indexOf(b.c)+1)%BOARD_COLORS.length];bdArm=null;save();render();return openBoardEdit()}
  const mv=t.closest('[data-blm]');if(mv){const i=b.lists.findIndex(l=>l.id===mv.dataset.blm),j=i+Number(mv.dataset.dir);if(j<0||j>=b.lists.length)return;b.lists=[...b.lists];[b.lists[i],b.lists[j]]=[b.lists[j],b.lists[i]];bdArm=null;save();render();return openBoardEdit()}
  const x=t.closest('[data-blx]');if(x){const id=x.dataset.blx;if(bdArm!==id){bdArm=id;return openBoardEdit()}
    bdArm=null;const li=b.lists.findIndex(l=>l.id===id),lj=JSON.stringify(b.lists[li]),ids=S.cards.filter(c=>c.listId===id).map(c=>c.id),undo=undoFor(ids);
    b.lists=b.lists.filter(l=>l.id!==id);const to=b.lists.find(l=>!l.done)||b.lists[0];S.cards.forEach(c=>{if(c.listId===id)c.listId=to.id});
    save();render();openBoardEdit();
    toast('Colonna eliminata',()=>{if(!b.lists.some(l=>l.id===id)){b.lists=[...b.lists];b.lists.splice(li,0,JSON.parse(lj))}undo();if(document.getElementById('bdm'))openBoardEdit()});return}
  if(t.closest('[data-bdx]')){if(bdArm!=='board'){bdArm='board';return openBoardEdit()}
    bdArm=null;const bi=S.boards.indexOf(b),bj=JSON.stringify(b),undo=undoFor(S.cards.filter(c=>c.boardId===b.id).map(c=>c.id));
    S.cards.forEach(c=>{if(c.boardId===b.id){c.boardId=null;c.listId=null;delete c.archived}});
    S.boards=S.boards.filter(x=>x!==b);S.board=S.boards[0].id;closeEditor();save();render();
    toast('Board "'+b.name+'" eliminata: le card sono nell’Inbox',()=>{if(!board(b.id)){S.boards.splice(Math.min(bi,S.boards.length),0,JSON.parse(bj));S.board=b.id}undo()});return}
}

/* ---------- svuota colonna: conferma in un pop-up ---------- */
function openClear(listId){
  const b=board(S.board),l=b&&b.lists.find(x=>x.id===listId);if(!l)return;
  const cs=S.cards.filter(c=>c.listId===listId&&!c.archived),arc=cs.filter(c=>c.date).length,del=cs.length-arc;
  const lines=[del?(del===1?'1 card verrà eliminata.':del+' card verranno eliminate.'):'',arc?(arc===1?'1 card con data resta nel calendario come storico.':arc+' card con data restano nel calendario come storico.'):''].filter(Boolean);
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="clr" data-list="${l.id}" role="alertdialog" aria-label="Svuota colonna"><h3>Svuotare "${esc(l.name)}"?</h3>
   <p class="note">${lines.join('<br>')}<br>Potrai annullare subito dopo.</p>
   <div class="actions"><span></span><div style="display:flex;gap:8px"><button type="button" class="btn" id="e-cancel">Annulla</button><button type="button" class="btn danger-fill" id="clr-ok">Svuota (${cs.length})</button></div></div></div></div>`;
  modalOpened();
}
function doClear(listId){
  const undo=undoFor(S.cards.filter(c=>c.listId===listId).map(c=>c.id)),r=clearCards(c=>c.listId===listId);save();render();
  const msg=[];if(r.del)msg.push(r.del===1?'1 card eliminata':r.del+' card eliminate');
  if(r.arc)msg.push(r.arc===1?'1 card con data resta nel calendario':r.arc+' card con data restano nel calendario');
  toast(msg.join(', ')||'Colonna già vuota',undo);
}

/* ---------- impostazioni: notifiche, backup, temi. Le sotto-finestre aperte da qui tornano qui ---------- */
var subOf=false;
var PREFS={digest:false,digestAt:'08:00'};
try{Object.assign(PREFS,JSON.parse(localStorage.getItem('mytask-prefs'))||{})}catch(e){}
function savePrefs(){try{localStorage.setItem('mytask-prefs',JSON.stringify(PREFS))}catch(e){}schedulePush()}
function notifState(){return !('Notification' in window)?'unsupported':Notification.permission}
function openSettings(){
  subOf=false;
  const ns=notifState(),th=(THEMES.find(x=>x[0]===curTheme())||THEMES[0])[1];
  const nTxt=ns==='granted'?(PREFS.digest?'Attive · riepilogo alle '+PREFS.digestAt:'Attive'):ns==='denied'?'Bloccate':ns==='default'?'Da attivare':'Non disponibili';
  const bTxt=!SYNC?'Non attivo':SYNC.err?'Errore: riprovo appena c\'è rete':'Attivo'+(SYNC.last?' · '+new Date(SYNC.last).toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}):'');
  const item=(k,ic,n,sub,err)=>`<button type="button" class="set-item" data-set="${k}"><span class="set-ic">${ic}</span><span class="set-tx"><b>${n}</b><span${err?' style="color:var(--l-red)"':''}>${esc(sub)}</span></span><span class="set-go">›</span></button>`;
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="set" role="dialog" aria-label="Impostazioni"><h3>Impostazioni</h3>
   <div class="set-list">${item('notif',I.bell,'Notifiche',nTxt,ns==='denied')}${item('backup',I.cloud,'Backup',bTxt,SYNC&&SYNC.err)}${item('themes',I.palette,'Temi',th)}</div>
   <div class="actions"><span class="note">MyTask</span><button type="button" class="btn primary" id="e-cancel">Chiudi</button></div></div></div>`;
  modalOpened();
}
function openNotifs(){
  const ns=notifState();
  const st={granted:'Notifiche attive su questo dispositivo.'+(pushOn?' Arrivano anche ad app chiusa.':''),
    default:'Le notifiche non sono ancora attive.',
    denied:'Le notifiche sono bloccate. Riattivale dalle impostazioni del telefono: App › MyTask › Notifiche.',
    unsupported:'Questo browser non supporta le notifiche.'}[ns];
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="ntf" role="dialog" aria-label="Notifiche"><h3>Notifiche</h3>
   <p class="note">${st}</p>
   <div class="bkrow">${ns==='default'?'<button class="btn primary" type="button" id="askNotif">Attiva notifiche</button>':''}${ns==='granted'?'<button class="btn" type="button" data-nt="test">Prova una notifica</button>':''}</div>
   <div class="f"><span class="flab">Riepilogo del mattino</span>
    <label class="tog"><input type="checkbox" id="nt-digest" ${PREFS.digest?'checked':''} ${ns==='granted'?'':'disabled'}><span>Ricevi ogni giorno quanti task hai in programma e quanti in ritardo</span></label>
    ${ns==='granted'&&PREFS.digest?`<span class="flab" style="margin-top:6px">Orario</span>${wheelHTML('nt-at')}`:''}
    <span class="note">Arriva anche ad app chiusa. Nei giorni senza task non arriva niente. Vale solo per questo dispositivo.</span></div>
   <div class="actions"><span></span><button type="button" class="btn primary" id="e-cancel">${subOf?'Indietro':'Chiudi'}</button></div></div></div>`;
  modalOpened();setWheel('nt-at',PREFS.digestAt);
}
function openSub(k){subOf=true;({notif:openNotifs,backup:()=>openBackup(),themes:openThemes})[k]()}
/* riepilogo: una voce per ciascuno dei prossimi 14 giorni nella lista dei promemoria inviata al server.
   Il testo viene ricalcolato a ogni salvataggio, quindi è aggiornato all'ultima modifica fatta. */
function digestReminders(){
  if(!PREFS.digest||!/^\d\d:\d\d$/.test(PREFS.digestAt))return [];
  const now=Date.now(),t=todayIso(),out=[],map=entries(t,addDays(t,13));
  for(let i=0;i<14;i++){
    const d=addDays(t,i),at=new Date(d+'T'+PREFS.digestAt).getTime();if(at<=now)continue;
    const list=(map[d]||[]).filter(e=>!e.c.done).map(e=>e.c).sort(byPrio),late=S.cards.filter(c=>c.date&&c.date<d&&!c.done&&!list.includes(c)).length;
    if(!list.length&&!late)continue;
    const head=[list.length?(list.length===1?'1 task in programma':list.length+' task in programma'):'',late?(late===1?'1 in ritardo':late+' in ritardo'):''].filter(Boolean).join(' · ');
    const names=list.slice(0,3).map(c=>(c.time?c.time+' ':'')+c.title).join(', ')+(list.length>3?'…':'');
    out.push({id:'digest-'+d,at,title:i===0?'Il tuo riepilogo di oggi':'Il tuo riepilogo di '+fmtDay(d).split(' ')[0],body:head+(names?': '+names:'')});
  }
  return out;
}

function openBackup(msg){
  const when=SYNC&&SYNC.last?new Date(SYNC.last).toLocaleString('it-IT',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):null;
  const link=SYNC?location.origin+location.pathname+'#sync='+SYNC.code:'';
  const status=!SYNC?'':SYNC.err?'⚠️ Ultimo tentativo non riuscito ('+esc(SYNC.err)+"). Riprovo da solo appena c'è rete.":when?'Backup attivo. Ultimo salvataggio: '+when+'.':'Backup attivo. Primo salvataggio in corso…';
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" id="bk" role="dialog" aria-label="Backup"><h3>Backup</h3>
   ${SYNC?`<p class="note">${status}</p>
    <div class="f"><span class="flab">Il tuo codice</span><div class="bkcode">${fmtCode(SYNC.code)}</div>
     <span class="note">Conservalo in un posto sicuro (password manager, nota, email a te stesso). Senza codice il backup non si può recuperare. Chi ha il codice vede i tuoi task.</span></div>
    <div class="bkrow"><button type="button" class="btn" data-bk="copy">Copia codice</button><button type="button" class="btn" data-bk="copylink" data-link="${esc(link)}">Copia link per un altro dispositivo</button></div>
    <div class="bkrow"><button type="button" class="btn" data-bk="now">Sincronizza ora</button><button type="button" class="btn ghost danger" data-bk="off">${msg==='off?'?'Conferma: disattiva':'Disattiva su questo dispositivo'}</button></div>`
   :`<p class="note">Salva i tuoi task sul server, cifrati: se cambi telefono o cancelli i dati non perdi niente, e puoi usare gli stessi task su più dispositivi.</p>
    <button type="button" class="btn primary" data-bk="on">Attiva backup</button>
    <div class="f"><label for="bk-code">Hai già un codice?</label><div class="add"><input id="bk-code" placeholder="XXXXX-XXXXX-XXXXX-XXXXX" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn" type="button" data-bk="link">Collega</button></div>
     ${msg&&msg!=='off?'?`<span class="note" style="color:var(--l-red)">${esc(msg)}</span>`:'<span class="note">I task di questo dispositivo si uniscono a quelli del backup.</span>'}</div>`}
   <div class="actions"><span></span><button type="button" class="btn primary" id="e-cancel">Chiudi</button></div></div></div>`;
  modalOpened();
}
async function linkCode(code){
  const k=await syncKeys(code),r=await backupCall({op:'get',id:k.id});
  if(r.status!==200)throw new Error('Server non raggiungibile, riprova.');
  if(!r.data)throw new Error('Nessun backup con questo codice.');
  SYNC={code,rev:0};syncKeep();await syncNow();
}
async function backupAct(a,btn){
  if(a==='on'){SYNC={code:newSyncCode(),rev:0};syncKeep();openBackup();await syncNow();return}
  if(a==='link'){const c=normCode(document.getElementById('bk-code').value);if(!c)return openBackup('Il codice ha 20 caratteri, lettere e numeri.');
    btn.disabled=true;try{await linkCode(c);toast('Backup collegato')}catch(e){openBackup(e.message)}return}
  if(a==='copy'||a==='copylink'){const v=a==='copy'?fmtCode(SYNC.code):btn.dataset.link;try{await navigator.clipboard.writeText(v);toast('Copiato')}catch(e){prompt('Copia da qui:',v)}return}
  if(a==='now'){btn.disabled=true;await syncNow();toast(SYNC&&!SYNC.err?'Sincronizzato':'Non riuscito');return}
  if(a==='off'){if(btn.textContent.startsWith('Conferma')){SYNC=null;syncKeep();syncUI();toast('Backup disattivato su questo dispositivo')}else openBackup('off?')}
}
// temi: id (null = classico), nome, descrizione, anteprima [sfondo, superficie, accento, accento 2], emoji, colore barra di sistema
const THEMES=[
 [null,'Classico','Blu, segue chiaro/scuro',['#edf0f5','#ffffff','#2b4fd4','#86a0ff'],'','#1b2440'],
 ['color','Colorato','Rosa e viola, chiaro/scuro',['#fff6ec','#ffffff','#f0386b','#7b4dff'],'🎨','#f0386b'],
 ['pastel','Pastello','Chiaro, lilla e menta',['#f7f3ff','#ffffff','#8b6cf0','#3fb994'],'🍬','#8b6cf0'],
 ['mint','Menta','Chiaro, verde fresco',['#eefaf5','#ffffff','#0f9f76','#0ea5e9'],'🌿','#0f9f76'],
 ['ocean','Oceano','Scuro, turchese',['#061a26','#0b2735','#22d3ee','#3b82f6'],'🌊','#061a26'],
 ['sunset','Tramonto','Scuro, arancio e fucsia',['#1e0e16','#2a1420','#ff7a45','#ff3d77'],'🌅','#1e0e16'],
 ['cats','Gatti','Zampette e orecchie',['#fbf3e8','#fffaf3','#ee7d1f','#a0583a'],'🐱','#ee7d1f'],
 ['cartoon','Cartoon','Bordi neri, stile fumetto',['#fff6cc','#ffe98a','#ff3d7f','#1fb6ff'],'💥','#ffcf1f'],
 ['catoon','Gatti cartoon','Fumetto rosa coi gattini',['#ffe8f1','#ffd0e2','#ff5c9a','#8f5cff'],'😸','#ff5c9a']
];
const curTheme=()=>document.documentElement.dataset.style||null;
function syncStyle(){const t=THEMES.find(x=>x[0]===curTheme())||THEMES[0];const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t[5]}
function setTheme(id){const r=document.documentElement;if(id)r.dataset.style=id;else delete r.dataset.style;try{localStorage.setItem('mytask-style',id||'classic')}catch(e){}syncStyle()}
function openThemes(){
  const cur=curTheme();
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-label="Temi"><h3>Temi</h3>
   <div class="themes">${THEMES.map(([id,n,d,c,em])=>`<button type="button" class="theme" data-theme-pick="${id||'classic'}" aria-pressed="${id===cur}">
     <span class="tp" style="background:linear-gradient(135deg,${c[0]} 55%,${c[1]})"><i style="background:${c[2]}"></i><i style="background:${c[3]}"></i>${em?`<span>${em}</span>`:''}</span>
     <span class="tn">${n}<span class="td">${d}</span></span></button>`).join('')}</div>
   <div class="actions"><span class="note">La scelta resta salvata su questo dispositivo.</span><button type="button" class="btn primary" id="e-cancel">Fatto</button></div></div></div>`;
  modalOpened();
}
syncStyle();
/* il calendario si apre sempre sul giorno di oggi */
function calToday(){S.sel=todayIso();S.month=S.sel.slice(0,7)}
calToday();
stampDone();purgeDone();save();
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&purgeDone()){save();render()}});
const board=id=>S.boards.find(b=>b.id===id);
const card=id=>S.cards.find(c=>c.id===id);
const lab=id=>S.labels.find(l=>l.id===id);
const cardLabs=c=>c.labels.map(lab).filter(Boolean);
const doneList=b=>b&&b.lists.find(l=>l.done);

function entries(from,to){
  const m={};
  S.cards.forEach(c=>occ(c,from,to).forEach(d=>(m[d]=m[d]||[]).push({c,d,v:d!==c.date})));
  Object.values(m).forEach(l=>l.sort((x,y)=>(x.c.time||'99').localeCompare(y.c.time||'99')));
  return m;
}
function toggleDone(c){
  const undo=undoFor([c.id]);
  if(!c.done&&c.recur!=='none'&&c.date){
    const nd=nextAfterDone(c,todayIso());
    if(nd){
      c.date=nd;c.notified=false;c.snooze=null;c.checklist.forEach(i=>i.d=false);
      toast('Completata. Prossima volta: '+fmtShort(nd),undo);save();render();return;
    }
  }
  c.done=!c.done;
  if(!c.done&&c.archived){delete c.archived;const ab=board(c.boardId);if(ab&&!c.listId)c.listId=ab.lists[0].id}
  const b=board(c.boardId);
  if(b){const dl=doneList(b);if(c.done&&dl)c.listId=dl.id;else if(!c.done&&c.listId===dl?.id)c.listId=b.lists[0].id}
  save();render();if(c.done)toast('Completata',undo);
}

function meta(c,opt={}){
  const b=board(c.boardId);let h='';
  if(opt.board!==false&&b)h+=`<span class="chip" style="--c:${labCss(b.c)};color:${labCss(b.c)}"><i></i><span style="color:var(--fg)">${esc(b.name)}</span></span>`;
  if(opt.date&&c.date)h+=`<span class="${c.date<todayIso()&&!c.done?'time late':''}">${fmtShort(c.date)}${c.time?' · '+c.time:''}</span>`;
  cardLabs(c).forEach(l=>h+=`<span class="chip lab" style="--c:${labCss(l.c)}">${esc(l.name)}</span>`);
  if(c.checklist.length){const d=c.checklist.filter(i=>i.d).length,n=c.checklist.length;h+=`<span class="ico clp ${d===n?'full':''}" title="Checklist: ${d} di ${n}">${I.list}${d}/${n}<i style="--p:${Math.round(d/n*100)}%"></i></span>`}
  if(c.reminder!=null&&c.date)h+=`<span class="ico" title="Promemoria">${I.bell}</span>`;
  if(c.recur!=='none')h+=`<span class="ico" title="${REC[c.recur]}">${I.rep}${c.recur==='dates'?(c.dates||[]).filter(x=>x>=(c.date||'')).length+' date':(REC[c.recur]||'').toLowerCase()}</span>`;
  return h?`<div class="meta">${h}</div>`:'';
}
function row(c,late,future){
  return `<div class="row ${c.done?'done':''} ${future?'future':''}" data-open="${c.id}">
   ${future?`<span class="rep-slot" title="Ripetizione futura">${I.rep}</span>`:`<input type="checkbox" class="check" data-toggle="${c.id}" ${c.done?'checked':''} aria-label="Completa ${esc(c.title)}">`}
   <span class="time ${late?'late':''}">${late?fmtShort(c.date).replace(/^\w+\.? /,''):(c.time||'—')}</span>
   <div style="min-width:0"><div class="title">${prioMark(c)}${esc(c.title)}</div>${meta(c)}</div></div>`;
}
const byTime=(a,b)=>(a.date+(a.time||'99')).localeCompare(b.date+(b.time||'99'));
// in "Oggi" le card con priorità più alta vengono prima, a parità di priorità vale l'orario
const byPrio=(a,b)=>((b.prio||0)-(a.prio||0))||byTime(a,b);
const PRIO=['Normale','Media','Alta'];
const prioMark=c=>c.prio?`<span class="prio p${c.prio}" title="Priorità ${PRIO[c.prio].toLowerCase()}">${I.flag}</span>`:'';

const VIEWS=[['oggi','Oggi',I.today],['calendario','Calendario',I.cal],['board','Board',I.board],['inbox','Inbox',I.inbox]];
function renderNav(){
  const inboxN=S.cards.filter(c=>!c.boardId&&!c.done).length;
  const todayN=S.cards.filter(c=>c.date&&c.date<=todayIso()&&!c.done).length;
  const cnt={oggi:todayN,inbox:inboxN};
  document.getElementById('nav').innerHTML=VIEWS.map(([k,n,ic])=>`<button type="button" data-view="${k}" ${S.view===k?'aria-current="page"':''}>${ic}${n}${cnt[k]?`<span class="count">${cnt[k]}</span>`:''}</button>`).join('');
  document.getElementById('bottom').innerHTML=VIEWS.map(([k,n,ic])=>`<button type="button" data-view="${k}" ${S.view===k?'aria-current="page"':''}>${ic}${n}</button>`).join('');
}

function vOggi(){
  const t=todayIso(),act=S.cards.filter(c=>c.date&&!c.done);
  const late=act.filter(c=>c.date<t).sort(byPrio);
  const today=S.cards.filter(c=>c.date===t).sort(byPrio);
  const nextMap=entries(addDays(t,1),addDays(t,7));
  let h=`<div class="head"><div><h1>Oggi</h1><div class="sub">${fmtDay(t)}</div></div><div class="headbtns"><button class="btn palette-btn" data-search type="button" aria-label="Cerca" title="Cerca">${I.search}</button><button class="btn palette-btn" data-settings data-sync="${!SYNC?'off':SYNC.err?'err':'ok'}" type="button" aria-label="Impostazioni" title="Impostazioni">${I.gear}</button></div></div>`;
  if('Notification' in window&&Notification.permission!=='granted')h+=`<div class="empty" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;border-style:solid"><span style="flex:1;min-width:200px">${Notification.permission==='denied'?'Le notifiche sono bloccate. Riattivale dalle impostazioni del telefono: App › MyTask › Notifiche.':'Attiva le notifiche per ricevere i promemoria.'}</span>${Notification.permission==='default'?'<button class="btn primary" type="button" id="askNotif">Attiva notifiche</button>':''}</div>`;
  if(late.length)h+=`<h2 class="late">In ritardo <span class="n">${late.length}</span></h2><div class="rows">${late.map(c=>row(c,true)).join('')}</div>`;
  h+=`<h2>Programma di oggi <span class="n">${today.length}</span></h2>`+(today.length?`<div class="rows">${today.map(c=>row(c)).join('')}</div>`:`<div class="empty">Niente in programma oggi. Usa il pulsante + per aggiungere qualcosa.</div>`);
  const days=Object.keys(nextMap).sort().map(d=>[d,nextMap[d].filter(e=>!e.c.done)]).filter(x=>x[1].length);
  const nN=days.reduce((a,x)=>a+x[1].length,0);
  h+=`<h2>Prossimi 7 giorni <span class="n">${nN}</span></h2>`;
  h+=days.length?days.map(([d,es])=>`<div class="sub" style="margin:12px 0 6px;font-weight:700;color:var(--fg)">${fmtDay(d)}</div><div class="rows">${es.map(e=>row(e.c,false,e.v)).join('')}</div>`).join(''):`<div class="empty">Settimana libera.</div>`;
  return h;
}

function vCal(){
  const [y,m]=S.month.split('-').map(Number);
  const first=new Date(y,m-1,1);const start=new Date(first);start.setDate(1-((first.getDay()+6)%7));
  const t=todayIso();let cells='';
  const gEnd=new Date(start);gEnd.setDate(start.getDate()+41);const map=entries(iso(start),iso(gEnd));
  for(let i=0;i<42;i++){
    const d=new Date(start);d.setDate(start.getDate()+i);const s=iso(d);
    const cs=map[s]||[];
    cells+=`<button type="button" class="day ${d.getMonth()!==m-1?'out':''} ${s===t?'today':''} ${s===S.sel?'sel':''}" data-day="${s}" aria-label="${fmtDay(s)}, ${cs.length} card">
     <span class="dn">${d.getDate()}</span>${cs.slice(0,3).map(({c,v})=>`<span class="ev ${c.done?'done':''} ${v?'future':''}" style="--c:${labCss(board(c.boardId)?.c)}">${c.time?c.time+' ':''}${esc(c.title)}</span>`).join('')}${cs.length>3?`<span class="more">+${cs.length-3} altre</span>`:''}</button>`;
    if(i===34&&d.getMonth()!==m-1)break;
  }
  const label=first.toLocaleDateString('it-IT',{month:'long',year:'numeric'});
  const selCards=entries(S.sel,S.sel)[S.sel]||[];
  return `<div class="head"><div><h1 style="text-transform:capitalize">${label}</h1></div>
   <div class="calbar"><button class="btn" data-mon="-1" type="button" aria-label="Mese precedente">‹</button><button class="btn" data-mon="0" type="button">Oggi</button><button class="btn" data-mon="1" type="button" aria-label="Mese successivo">›</button></div></div>
   <div class="calwrap"><div class="cal">${['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(d=>`<div class="dow">${d}</div>`).join('')}${cells}</div></div>
   <h2>${fmtDay(S.sel)} <span class="n">${selCards.length}</span></h2>
   ${selCards.length?`<div class="rows">${selCards.map(e=>row(e.c,false,e.v)).join('')}</div>`:`<div class="empty">Nessuna card in questo giorno. <button class="btn" type="button" data-new-date="${S.sel}" style="margin-left:6px">Aggiungi</button></div>`}`;
}

function vBoard(){
  const b=board(S.board)||S.boards[0];S.board=b.id;
  const tabs=S.boards.map(x=>`<button type="button" class="tab" data-board="${x.id}" aria-pressed="${x.id===b.id}" style="--c:${labCss(x.c)}"><i></i>${esc(x.name)}</button>`).join('')+`<button type="button" class="tab" id="newBoard">+ Nuova board</button>`;
  const cols=b.lists.map(l=>{
    const cs=S.cards.filter(c=>c.listId===l.id);
    const clear=l.done&&cs.length?`<button type="button" class="btn ghost danger clear-done" data-clear="${l.id}">Svuota</button>`:'';
    return `<section class="col" data-drop-list="${l.id}"><div class="colh"><span class="colt">${esc(l.name)} <span>${cs.length}</span></span>${clear}</div>
     ${cs.map(c=>`<article class="card ${c.done?'done':''}" draggable="true" data-drag="${c.id}" data-open="${c.id}" style="border-left-color:${cardLabs(c)[0]?labCss(cardLabs(c)[0].c):'transparent'}"><div class="title">${prioMark(c)}${esc(c.title)}</div>${meta(c,{board:false,date:true})}</article>`).join('')}
     <form class="add" data-add-list="${l.id}"><input id="add-${l.id}" placeholder="Aggiungi una card" aria-label="Nuova card in ${esc(l.name)}"><button class="btn" type="submit">+</button></form></section>`;
  }).join('');
  return `<div class="head"><div><h1>${esc(b.name)}</h1><div class="sub">Trascina le card tra le colonne (dal telefono: tieni premuto, poi sposta). Portarle in “Fatto” le segna come completate.</div></div><div class="headbtns"><button class="btn palette-btn" data-board-edit type="button" aria-label="Modifica board" title="Rinomina, colonne, elimina">${I.gear}</button></div></div>
   <div class="tabs">${tabs}</div><div class="cols">${cols}<form class="newcol" id="newList"><input id="newListName" class="btn" placeholder="+ Nuova colonna" aria-label="Nome nuova colonna" style="text-align:left"></form></div>`;
}

function vInbox(){
  const cs=S.cards.filter(c=>!c.boardId&&!c.done);
  return `<div class="head"><div><h1>Inbox</h1><div class="sub">Scrivi al volo, smista dopo in una board o dagli una data.</div></div></div>
   <form class="capture" id="capture"><input id="captureInput" placeholder="Cosa ti devi ricordare?" autocomplete="off"><button class="btn primary" type="submit">Aggiungi</button></form>
   ${cs.length?`<div class="rows" style="margin-top:14px">${cs.map(c=>`<div class="irow"><input type="checkbox" class="check" data-toggle="${c.id}" aria-label="Completa"><span class="title">${esc(c.title)}</span><button class="btn" type="button" data-open="${c.id}">Smista</button></div>`).join('')}</div>`:`<div class="empty" style="margin-top:14px">Inbox vuota. Tutto smistato.</div>`}`;
}

/* scorrimento di entrata: dir 1 = arriva da destra, -1 = da sinistra */
function slide(sel,dir){
  const el=document.querySelector(sel);if(!el||!dir||!el.animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  el.animate([{transform:`translateX(${dir*48}px)`,opacity:0},{transform:'none',opacity:1}],{duration:240,easing:'cubic-bezier(.2,.8,.2,1)'});
}
function goView(v,still){const d=Math.sign(VIEWS.findIndex(x=>x[0]===v)-VIEWS.findIndex(x=>x[0]===S.view));S.view=v;if(v==='calendario')calToday();save();render();document.getElementById('main').scrollTop=0;if(!still)slide('#main',d)}
function goMonth(n,still){const[y,m]=S.month.split('-').map(Number);S.month=iso(new Date(y,m-1+n,1)).slice(0,7);save();render();if(!still){slide('.calwrap',n);slide('#main .head h1',n)}}
function render(force){
  renderNav();
  document.documentElement.classList.toggle('touch',touchUsed);
  const m=document.getElementById('main'),pc=m.querySelector('.cols'),colsKey=S.view+'/'+S.board,sl=pc&&render.colsKey===colsKey?pc.scrollLeft:0;
  // se il risultato è identico non tocco la pagina: niente lavoro inutile, e focus e selezione restano dove sono
  const html={oggi:vOggi,calendario:vCal,board:vBoard,inbox:vInbox}[S.view]();
  if(!force&&html===render.html&&m.childElementCount)return;
  render.html=html;m.innerHTML=html;
  if(touchUsed||matchMedia('(pointer: coarse)').matches)m.querySelectorAll('[draggable="true"]').forEach(x=>x.draggable=false);
  // ridisegnare la board non deve riportare le colonne all'inizio
  const nc=m.querySelector('.cols');if(nc&&sl)nc.scrollLeft=sl;render.colsKey=colsKey;
}

/* ---------- editor ---------- */
let draft=null,draftOrig=null;
function openEditor(id,preset={}){
  const c=id?card(id):{id:null,title:'',notes:'',boardId:null,listId:null,date:null,time:null,labels:[],checklist:[],recur:'none',reminder:null,done:false,...preset};
  draft=JSON.parse(JSON.stringify(c));draftOrig=canon(cleanDraft());drawEditor();
}
/* la card senza i campi di lavoro del form (quelli che iniziano con _) */
function cleanDraft(){const o={};for(const k in draft)if(k[0]!=='_')o[k]=draft[k];return o}
function draftDirty(){if(!draft||!document.getElementById('edit'))return false;readForm();return canon(cleanDraft())!==draftOrig}
/* chiusura "per sbaglio" (tocco fuori, Esc, tasto indietro): se ci sono modifiche chiedo prima di buttarle */
function tryCloseEditor(){if(draftDirty()){draft._ask=true;drawEditor();document.getElementById('e-discard')?.focus();return}closeEditor()}
function drawEditor(){
  const d=draft,b=board(d.boardId),prev=document.querySelector('#edit.sheet'),top=prev?prev.scrollTop:0;
  document.getElementById('modal').innerHTML=`<div class="scrim" id="scrim"><form class="sheet" id="edit" role="dialog" aria-label="Modifica card">
   <h3>${d.id?'Modifica card':'Nuova card'}</h3>${d.archived?'<p class="note">Tolta dalla board, resta nel calendario come storico. Scegli una colonna per rimetterla nella board.</p>':''}
   <div class="f"><label for="e-title">Titolo</label><input id="e-title" value="${esc(d.title)}" required placeholder="Es. Chiamare il commercialista"></div>
   <div class="grid2">
    <div class="f"><label for="e-board">Board</label><select id="e-board"><option value="">Inbox</option>${S.boards.map(x=>`<option value="${x.id}" ${x.id===d.boardId?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div>
    <div class="f"><label for="e-list">Colonna</label><select id="e-list" ${b?'':'disabled'}>${b&&d.archived?`<option value="" ${d.listId?'':'selected'}>Solo calendario</option>`:''}${b?b.lists.map(l=>`<option value="${l.id}" ${l.id===d.listId?'selected':''}>${esc(l.name)}</option>`).join(''):'<option>—</option>'}</select></div>
    ${d.recur==='dates'?`<div class="f"><span class="flab">Data</span><span class="note" style="padding:9px 0">Scegli i giorni qui sotto</span></div>`:`<div class="f"><label for="e-date">Data</label><input type="date" id="e-date" value="${d.date||''}"></div>`}
   </div>
   ${timeWheel(d)}
   <div class="f"><span class="flab">Priorità</span><div class="daytog">${PRIO.map((n,i)=>`<button type="button" class="btn ${(d.prio||0)===i?'primary':''}" data-prio="${i}" aria-pressed="${(d.prio||0)===i}">${i?`<span class="prio p${i}">${I.flag}</span>`:''}${n}</button>`).join('')}</div></div>
   <div class="grid2">
    <div class="f"><label for="e-rem">Promemoria</label><select id="e-rem">${REM.map(([v,n])=>`<option value="${v??''}" ${String(d.reminder??'')===String(v??'')?'selected':''}>${n}</option>`).join('')}${d.reminder!=null&&!REM.some(r=>r[0]===d.reminder)?`<option value="${d.reminder}" selected>${d.reminder} min prima</option>`:''}</select></div>
    <div class="f"><label for="e-rec">Ripeti</label><select id="e-rec">${Object.entries(REC).map(([k,n])=>`<option value="${k}" ${d.recur===k?'selected':''}>${n}</option>`).join('')}</select></div>
   </div>
   ${d.recur==='dates'?picker(d):''}
   <div class="f"><span class="flab">Etichette</span><div class="labs">${S.labels.map(l=>`<button type="button" class="chip lab" data-lab="${l.id}" aria-pressed="${d.labels.includes(l.id)}" style="--c:${labCss(l.c)}">${esc(l.name)}</button>`).join('')}
     ${d._newLab?'':'<button type="button" class="chip lab-act" id="lab-add">+ Nuova</button>'}<button type="button" class="chip lab-act" id="lab-manage">Modifica</button></div>
     ${d._newLab?`<div class="add"><input id="lab-new" placeholder="Nome etichetta" maxlength="24" autocomplete="off"><button class="btn" type="button" id="lab-new-ok">Aggiungi</button></div>`:''}</div>
   <div class="f"><span class="flab">Checklist</span><div class="cl">${d.checklist.map((i,n)=>`<div class="cli"><input type="checkbox" class="check" data-cli="${n}" ${i.d?'checked':''} aria-label="Fatto"><input type="text" id="cl-${n}" data-clt="${n}" value="${esc(i.t)}"><button type="button" class="x" data-clx="${n}" aria-label="Rimuovi">×</button></div>`).join('')}
    <div class="add"><input id="cl-new" placeholder="Aggiungi un elemento"><button class="btn" type="button" id="cl-add">+</button></div></div></div>
   <div class="f"><label for="e-notes">Note</label><textarea id="e-notes">${esc(d.notes)}</textarea></div>
   ${d._ask?`<div class="ask" role="alert"><span>Hai modifiche non salvate.</span><span style="display:flex;gap:8px"><button type="button" class="btn danger" id="e-discard">Scarta</button><button type="submit" class="btn primary">Salva</button></span></div>`:''}
   <div class="actions"><div>${d.id?`<button type="button" class="btn ghost danger" id="e-del">${draft._confirm?'Conferma eliminazione':'Elimina'}</button>`:''}</div>
    <div style="display:flex;gap:8px"><button type="button" class="btn" id="e-cancel">Annulla</button><button type="submit" class="btn primary">Salva</button></div></div>
  </form></div>`;
  modalOpened();
  // ridisegnare il form non deve riportarlo in cima (etichette, checklist, giorni...)
  if(top)document.getElementById('edit').scrollTop=top;
  setTimeout(()=>{if(!draft)return;if(!draft._focused){document.getElementById('e-title')?.focus();draft._focused=true}initWheel()},0);
}
const WHEEL_IT=36;
function timeWheel(d){
  const allDay=!d.time;
  let h=`<div class="f"><span class="flab">Ora</span><div class="daytog">
   <button type="button" class="btn ${allDay?'primary':''}" id="e-time-allday" aria-pressed="${allDay}">Tutto il giorno</button>
   <button type="button" class="btn ${allDay?'':'primary'}" id="e-time-specific" aria-pressed="${!allDay}">Orario specifico</button>
  </div>`;
  if(!allDay)h+=wheelHTML('e-time');
  return h+'</div>';
}
/* rotella ore:minuti come quella della sveglia; prefix-h e prefix-m sono le due colonne.
   Con mouse e tastiera (PC) la rotella è scomoda: lì c'è un campo orario dove si scrive l'ora */
const FINE_PTR=()=>!touchUsed&&matchMedia('(hover: hover) and (pointer: fine)').matches;
function wheelHTML(prefix){
  if(FINE_PTR())return `<input type="time" class="time-in" id="${prefix}-in" step="60" aria-label="Orario">`;
  const hs=Array.from({length:24},(_,i)=>pad(i)),ms=Array.from({length:60},(_,i)=>pad(i));
  return `<div class="wheel-row">
     <div class="wheel"><div class="wband"></div>
      <div class="wcol" id="${prefix}-h">${hs.map(x=>`<div class="wi" data-v="${x}">${x}</div>`).join('')}</div>
      <div class="wsep">:</div>
      <div class="wcol" id="${prefix}-m">${ms.map(x=>`<div class="wi" data-v="${x}">${x}</div>`).join('')}</div>
     </div></div>`;
}
function setWheel(prefix,hm){
  const ti=document.getElementById(prefix+'-in');if(ti){ti.value=hm||'';return}
  const h=document.getElementById(prefix+'-h'),m=document.getElementById(prefix+'-m');if(!h||!hm)return;
  h.scrollTop=(+hm.slice(0,2))*WHEEL_IT;m.scrollTop=(+hm.slice(3,5))*WHEEL_IT;markWheelSel(h);markWheelSel(m);
}
function initWheel(){
  if(draft.time)setWheel('e-time',draft.time);
}
function markWheelSel(col){
  const idx=Math.round(col.scrollTop/WHEEL_IT);
  col.querySelectorAll('.wi.sel').forEach(x=>x.classList.remove('sel'));
  col.children[idx]?.classList.add('sel');
}
function picker(d){
  const t=todayIso();d.dates=d.dates||[];
  d._pm=d._pm||(d.dates.find(x=>x>=t)||d.date||t).slice(0,7);
  const [y,m]=d._pm.split('-').map(Number);const first=new Date(y,m-1,1);const lead=(first.getDay()+6)%7;
  const n=new Date(y,m,0).getDate();let cells='';
  for(let i=0;i<lead;i++)cells+='<span class="blank"></span>';
  for(let i=1;i<=n;i++){const s=y+'-'+pad(m)+'-'+pad(i);cells+=`<button type="button" data-pick="${s}" aria-pressed="${d.dates.includes(s)}" class="${s<t?'past':''} ${s===t?'is-today':''}" aria-label="${fmtDay(s)}">${i}</button>`}
  const up=d.dates.filter(x=>x>=t).sort();
  return `<div class="f"><span class="flab">Giorni scelti <span class="pill">${up.length}</span></span>
   <div class="pkbar"><button type="button" class="btn" data-pm="-1" aria-label="Mese precedente">‹</button><strong style="text-transform:capitalize">${first.toLocaleDateString('it-IT',{month:'long',year:'numeric'})}</strong><button type="button" class="btn" data-pm="1" aria-label="Mese successivo">›</button></div>
   <div class="pk">${['L','M','M','G','V','S','D'].map(x=>`<span class="pkd">${x}</span>`).join('')}${cells}</div>
   <span class="note">${up.length?'Prossime: '+up.slice(0,6).map(fmtShort).join(', ')+(up.length>6?'…':''):'Tocca i giorni in cui ti serve il promemoria.'}</span></div>`;
}
function readForm(){
  const g=id=>document.getElementById(id);
  draft.title=g('e-title').value.trim();draft.notes=g('e-notes').value;
  if(g('e-date'))draft.date=g('e-date').value||null;
  const ti=g('e-time-in');if(ti&&/^\d\d:\d\d/.test(ti.value))draft.time=ti.value.slice(0,5);
  const wh=g('e-time-h'),wm=g('e-time-m');if(wh&&wm)draft.time=pad(Math.round(wh.scrollTop/WHEEL_IT))+':'+pad(Math.round(wm.scrollTop/WHEEL_IT));
  const r=g('e-rem').value;draft.reminder=r===''?null:Number(r);draft.recur=g('e-rec').value;
  document.querySelectorAll('[data-clt]').forEach(x=>draft.checklist[x.dataset.clt].t=x.value);
}
/* form e temi aggiungono una voce alla cronologia: il tasto indietro del telefono li chiude come "Annulla" invece di uscire dall'app */
let modalHist=false,skipPop=0;
function modalOpened(){if(!modalHist){modalHist=true;history.pushState({modal:1},'')}}
function closeEditor(fromBack){draft=null;draftOrig=null;subOf=false;document.getElementById('modal').innerHTML='';if(modalHist){modalHist=false;if(fromBack!==true){skipPop++;history.back()}}}
window.addEventListener('popstate',()=>{if(skipPop){skipPop--;return}if(!modalHist)return;if(subOf){modalHist=false;openSettings();return}if(document.getElementById('lbm')&&draft){modalHist=false;lbArm=null;drawEditor();return}if(draftDirty()){modalHist=false;draft._ask=true;drawEditor();return}closeEditor(true)});
document.getElementById('modal').addEventListener('click',e=>{
  const t=e.target;
  if(t.id==='scrim'&&document.getElementById('lbm'))return closeLabels();
  if((t.id==='scrim'||t.id==='e-cancel')&&subOf)return openSettings();
  if(t.id==='e-cancel'||t.id==='e-discard')return closeEditor();
  if(t.id==='scrim')return tryCloseEditor();
  const si=t.closest('[data-set]');if(si)return openSub(si.dataset.set);
  if(t.closest('[data-nt="test"]')){const c=S.cards.filter(c=>!c.done&&c.date).sort(byTime).find(c=>c.date>=todayIso())||S.cards.find(c=>!c.done);return c?notify(c):toast('Aggiungi una card per provare')}
  const bk=t.closest('[data-bk]');if(bk)return backupAct(bk.dataset.bk,bk);
  if(t.id==='clr-ok'){const id=document.getElementById('clr').dataset.list;closeEditor();return doClear(id)}
  if(document.getElementById('lbm'))return labelsAct(t);
  if(document.getElementById('bdm'))return boardAct(t);
  const sr=t.closest('[data-sr]');if(sr)return openEditor(sr.dataset.sr);
  const sz=t.closest('[data-snz]');if(sz)return snoozeAct(sz.dataset.snz);
  const tp=t.closest('[data-theme-pick]');if(tp){const v=tp.dataset.themePick;setTheme(v==='classic'?null:v);openThemes();return render()}
  if(t.dataset.pick){readForm();const s=t.dataset.pick;draft.dates=draft.dates.includes(s)?draft.dates.filter(x=>x!==s):[...draft.dates,s].sort();drawEditor();return}
  if(t.dataset.pm){readForm();const[y,m]=draft._pm.split('-').map(Number);draft._pm=iso(new Date(y,m-1+Number(t.dataset.pm),1)).slice(0,7);drawEditor();return}
  if(t.id==='lab-add'){readForm();draft._newLab=true;drawEditor();document.getElementById('lab-new')?.focus();return}
  if(t.id==='lab-new-ok'){readForm();const l=addLabel(document.getElementById('lab-new').value);draft._newLab=false;if(l&&!draft.labels.includes(l.id))draft.labels.push(l.id);drawEditor();return}
  if(t.id==='lab-manage'){readForm();return openLabels()}
  if(t.dataset.lab){readForm();const l=t.dataset.lab;draft.labels=draft.labels.includes(l)?draft.labels.filter(x=>x!==l):[...draft.labels,l];drawEditor()}
  if(t.dataset.cli!==undefined){readForm();draft.checklist[t.dataset.cli].d=t.checked}
  if(t.dataset.clx!==undefined){readForm();draft.checklist.splice(+t.dataset.clx,1);drawEditor()}
  if(t.id==='cl-add'){readForm();const v=document.getElementById('cl-new').value.trim();if(v){draft.checklist.push({t:v,d:false});drawEditor();document.getElementById('cl-new').focus()}}
  if(t.id==='e-del'){if(!draft._confirm){readForm();draft._confirm=true;drawEditor()}else{const undo=undoFor([draft.id]);S.cards=S.cards.filter(c=>c.id!==draft.id);save();closeEditor();render();toast('Card eliminata',undo)}}
  if(t.id==='e-time-specific'){readForm();if(!draft.time){const n=new Date();draft.time=pad(n.getHours())+':'+pad(n.getMinutes())}drawEditor();return}
  if(t.id==='e-time-allday'){readForm();draft.time=null;drawEditor();return}
  const pr=t.closest('[data-prio]');if(pr){readForm();draft.prio=+pr.dataset.prio||0;if(!draft.prio)delete draft.prio;drawEditor();return}
});
document.getElementById('modal').addEventListener('change',e=>{
  if(e.target.id==='nt-at-in'){if(/^\d\d:\d\d/.test(e.target.value)){PREFS.digestAt=e.target.value.slice(0,5);savePrefs()}return}
  if(e.target.id==='e-time-in'){if(/^\d\d:\d\d/.test(e.target.value))draft.time=e.target.value.slice(0,5);return}
  if(e.target.id==='nt-digest'){PREFS.digest=e.target.checked;savePrefs();openNotifs();return}
  if(e.target.id==='bd-name'||e.target.dataset.bln){const b=board(S.board),v=e.target.value.trim().slice(0,40),l=e.target.dataset.bln&&b.lists.find(x=>x.id===e.target.dataset.bln),o=l||b;
    if(!v){e.target.value=o.name;return}if(v!==o.name){if(l){b.lists=b.lists.map(x=>x===l?{...x,name:v}:x)}else b.name=v;save();render()}return}
  const id=e.target.dataset.lbn;if(!id)return;const l=lab(id),v=e.target.value.trim().slice(0,24);
  if(!l)return;if(!v){e.target.value=l.name;return}if(v!==l.name){l.name=v;save();render()}
});
let wheelTO;
document.getElementById('modal').addEventListener('scroll',e=>{
  const t=e.target;if(!t.classList||!t.classList.contains('wcol'))return;
  const prefix=t.id.slice(0,-2);
  markWheelSel(t);
  clearTimeout(wheelTO);
  wheelTO=setTimeout(()=>{
    const h=document.getElementById(prefix+'-h'),m=document.getElementById(prefix+'-m');
    if(!h||!m)return;
    const hv=Math.round(h.scrollTop/WHEEL_IT),mv=Math.round(m.scrollTop/WHEEL_IT),hm=pad(hv)+':'+pad(mv);
    h.scrollTop=hv*WHEEL_IT;m.scrollTop=mv*WHEEL_IT;
    if(prefix==='e-time'&&draft)draft.time=hm;
    if(prefix==='nt-at'&&hm!==PREFS.digestAt){PREFS.digestAt=hm;savePrefs()}
    markWheelSel(h);markWheelSel(m);
  },120);
},true);
document.getElementById('modal').addEventListener('change',e=>{
  if(e.target.id==='e-board'){readForm();draft.boardId=e.target.value||null;const b=board(draft.boardId);draft.listId=b?b.lists[0].id:null;drawEditor()}
  if(e.target.id==='e-list'){draft.listId=e.target.value||null}
  if(e.target.id==='e-rec'){readForm();if(draft.recur==='dates'&&!(draft.dates||[]).length)draft.dates=draft.date?[draft.date]:[];drawEditor()}
});
document.getElementById('modal').addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.id==='lab-new'){e.preventDefault();document.getElementById('lab-new-ok').click();return}
  if(e.key==='Enter'&&e.target.id==='lbm-new'){e.preventDefault();document.getElementById('lbm-add').click();return}
  if(e.key==='Escape'){if(document.getElementById('lbm'))return closeLabels();if(subOf)return openSettings();return tryCloseEditor()}
  if(e.key==='Enter'&&e.target.id==='cl-new'){e.preventDefault();document.getElementById('cl-add').click()}
});
document.getElementById('modal').addEventListener('submit',e=>{
  e.preventDefault();readForm();if(!draft.title)return document.getElementById('e-title').focus();
  const b=board(draft.boardId);
  // card archiviata: resta completata fuori dalla board, a meno che non le venga scelta una colonna
  if(draft.archived&&!draft.listId)draft.done=true;
  else{delete draft.archived;if(b)draft.done=b.lists.find(l=>l.id===draft.listId)?.done||(draft.done&&!b.lists.some(l=>l.done))}
  if(draft.recur==='dates'){const t=todayIso();draft.dates=[...new Set(draft.dates||[])].sort();
    if(!draft.dates.length){draft.recur='none'}else draft.date=draft.dates.find(x=>x>=t)||draft.dates[draft.dates.length-1]}
  // "ogni mese" ricorda il giorno scelto: resta il 31 anche dopo un mese più corto
  if(draft.recur==='monthly'&&draft.date){const o=draft.id&&card(draft.id);if(!draft.mday||!o||o.date!==draft.date)draft.mday=+draft.date.slice(8,10)}else delete draft.mday;
  const clean=cleanDraft();
  // sostituisco la card invece di copiarci sopra i campi: così anche i campi tolti (priorità, giorno del mese...) spariscono davvero
  if(clean.id){const i=S.cards.findIndex(c=>c.id===clean.id),o=S.cards[i];if(o.date!==clean.date||o.time!==clean.time||o.reminder!==clean.reminder)clean.notified=false;S.cards[i]=clean}
  else S.cards.push({...clean,id:uid(),notified:false,snooze:null});
  save();closeEditor();render();toast('Salvata');
});

/* ---------- interazioni ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-settings],[data-search],[data-board-edit],[data-view],[data-toggle],[data-open],[data-board],[data-mon],[data-day],[data-new-date],[data-clear],#newBoard,#fab');
  if(!t||t.closest('#modal')||t.closest('#notifs'))return;
  if(t.dataset.clear)return openClear(t.dataset.clear);
  if(t.dataset.toggle){e.stopPropagation();return toggleDone(card(t.dataset.toggle))}
  if(t.dataset.view)return goView(t.dataset.view);
  if(t.dataset.open)return openEditor(t.dataset.open);
  if(t.dataset.board){S.board=t.dataset.board;save();return render()}
  if(t.dataset.mon!==undefined){const n=+t.dataset.mon;if(!n){S.month=todayIso().slice(0,7);S.sel=todayIso()}else return goMonth(n);save();return render()}
  if(t.dataset.day){S.sel=t.dataset.day;save();return render()}
  if(t.dataset.newDate)return openEditor(null,{date:t.dataset.newDate});
  if(t.id==='fab'){const p={};if(S.view==='board'){const b=board(S.board);p.boardId=b.id;p.listId=b.lists[0].id}if(S.view==='calendario')p.date=S.sel;if(S.view==='oggi')p.date=todayIso();return openEditor(null,p)}
  if(t.id==='newBoard'){const n=S.boards.length;const cs=['--l-amber','--l-red','--l-blue','--l-green','--l-violet'];const id='b'+uid();S.boards.push({id,name:'Board '+(n+1),c:cs[n%cs.length],lists:[{id:uid(),name:'Da fare'},{id:uid(),name:'Fatto',done:true}]});S.board=id;save();render();bdArm=null;return openBoardEdit()}
  if(t.hasAttribute('data-board-edit')){bdArm=null;return openBoardEdit()}
  if(t.hasAttribute('data-search'))return openSearch();
  if(t.hasAttribute('data-settings'))return openSettings();
});
document.addEventListener('submit',e=>{
  const f=e.target;if(f.closest('#modal'))return;e.preventDefault();
  if(f.id==='capture'){const i=document.getElementById('captureInput');const v=i.value.trim();if(!v)return;S.cards.unshift({id:uid(),title:v,notes:'',boardId:null,listId:null,date:null,time:null,labels:[],checklist:[],recur:'none',reminder:null,done:false,notified:false,snooze:null});save();render();document.getElementById('captureInput').focus()}
  if(f.dataset.addList){const i=f.querySelector('input');const v=i.value.trim();if(!v)return;const b=board(S.board);const l=b.lists.find(x=>x.id===f.dataset.addList);S.cards.push({id:uid(),title:v,notes:'',boardId:b.id,listId:l.id,date:null,time:null,labels:[],checklist:[],recur:'none',reminder:null,done:!!l.done,notified:false,snooze:null});save();render();document.getElementById('add-'+l.id)?.focus()}
  if(f.id==='newList'){const v=document.getElementById('newListName').value.trim();if(!v)return;const b=board(S.board);const di=b.lists.findIndex(l=>l.done);b.lists.splice(di<0?b.lists.length:di,0,{id:uid(),name:v});save();render()}
});
/* drag & drop */
let dragId=null;
document.addEventListener('dragstart',e=>{if(T||touchUsed){e.preventDefault();return}const t=e.target.closest('[data-drag]');if(!t)return;dragId=t.dataset.drag;t.classList.add('dragging');try{e.dataTransfer.setData('text/plain',dragId)}catch(_){}});
document.addEventListener('dragend',e=>{dragId=null;document.querySelectorAll('.dragging,.over').forEach(x=>x.classList.remove('dragging','over'))});
document.addEventListener('dragover',e=>{const cl=document.querySelector('.cols');if(cl&&dragId){const z=Math.max(60,innerWidth*.15);if(e.clientX>innerWidth-z)cl.scrollLeft+=12;else if(e.clientX<z)cl.scrollLeft-=12}const z=e.target.closest('[data-drop-list]');if(z&&dragId){e.preventDefault();document.querySelectorAll('.over').forEach(x=>x!==z&&x.classList.remove('over'));z.classList.add('over')}});
function dropOn(target){
  const z=target&&target.closest('[data-drop-list]');const c=card(dragId);if(!z||!c)return false;
  if(z.dataset.dropList){const b=board(S.board);const l=b.lists.find(x=>x.id===z.dataset.dropList);
    const over=target.closest('[data-drag]');S.cards=S.cards.filter(x=>x!==c);c.listId=l.id;c.done=!!l.done;
    const idx=over&&over.dataset.drag!==c.id?S.cards.findIndex(x=>x.id===over.dataset.drag):-1;
    if(idx>=0)S.cards.splice(idx,0,c);else S.cards.push(c)}
  dragId=null;save();render();return true;
}
document.addEventListener('drop',e=>{if(!dragId)return;e.preventDefault();dropOn(e.target)});

/* swipe orizzontale che segue il dito: sul calendario cambia mese, altrove passa alla sezione accanto */
let SW=null;
const VIEW_FN={oggi:()=>vOggi(),calendario:()=>vCal(),board:()=>vBoard(),inbox:()=>vInbox()};
function hScrollable(el){for(;el&&el!==document.body;el=el.parentElement){const o=getComputedStyle(el).overflowX;if((o==='auto'||o==='scroll')&&el.scrollWidth>el.clientWidth)return true}return false}
// HTML di una sezione o di un mese senza toccare lo stato
function peekHTML(fn){const m=S.month,sel=S.sel;try{return fn()}finally{S.month=m;S.sel=sel}}
function swipeStart(s,step){
  if(s.cal){
    const wrap=document.querySelector('.calwrap'),cal=wrap&&wrap.querySelector('.cal');if(!cal)return;
    const[y,m]=S.month.split('-').map(Number),t=document.createElement('template');
    t.innerHTML=peekHTML(()=>{S.month=iso(new Date(y,m-1+step,1)).slice(0,7);return vCal()});
    const pc=t.content.querySelector('.cal');pc.classList.add('peek');
    Object.assign(pc.style,{position:'absolute',left:cal.offsetLeft+'px',top:cal.offsetTop+'px',width:cal.offsetWidth+'px',pointerEvents:'none'});
    wrap.style.clipPath='inset(-200px 0 -200px 0)';wrap.appendChild(pc);
    s.els=[cal];s.peek=pc;s.w=wrap.clientWidth;s.wrap=wrap;
  }else{
    const m=document.getElementById('main'),n=VIEWS[VIEWS.findIndex(v=>v[0]===S.view)+step];s.step=step;if(!n){s.els=[m];return}
    const r=m.getBoundingClientRect(),pm=document.createElement('main');
    pm.innerHTML=peekHTML(()=>{if(n[0]==='calendario')calToday();return VIEW_FN[n[0]]()});
    Object.assign(pm.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',overflow:'hidden',pointerEvents:'none',zIndex:5});
    document.body.appendChild(pm);s.els=[m];s.peek=pm;s.w=r.width;s.view=n[0];
  }
  s.step=step;
}
function swipeMove(s,dx){
  if(!s.peek||Math.sign(-dx)!==s.step){s.els&&s.els.forEach(e=>e.style.transform=`translateX(${dx*.3}px)`);if(s.peek)s.peek.style.transform=`translateX(${s.step*s.w}px)`;return}
  s.els.forEach(e=>e.style.transform=`translateX(${dx}px)`);s.peek.style.transform=`translateX(${dx+s.step*s.w}px)`;
}
function swipeEnd(s,go){
  const all=[...(s.els||[]),s.peek].filter(Boolean),fast=matchMedia('(prefers-reduced-motion: reduce)').matches?0:220;
  const done=()=>{all.forEach(e=>{e.style.transition='';e.style.transform=''});if(s.wrap)s.wrap.style.clipPath='';
    if(go){if(s.cal)goMonth(s.step,true);else goView(s.view,true)}
    s.peek&&s.peek.remove()};
  all.forEach(e=>e.style.transition=`transform ${fast}ms cubic-bezier(.2,.8,.2,1)`);
  requestAnimationFrame(()=>{
    if(go){s.els.forEach(e=>e.style.transform=`translateX(${-s.step*s.w}px)`);s.peek.style.transform='translateX(0)'}
    else{all.forEach(e=>e.style.transform=e===s.peek?`translateX(${s.step*s.w}px)`:'translateX(0)')}
    setTimeout(done,fast+20);
  });
}
document.addEventListener('touchstart',e=>{
  if(SW&&SW.ending)return;SW=null;const t=e.target;
  if(e.touches.length>1||document.getElementById('modal').children.length||t.closest('input,textarea,select,.card[data-drag]')||hScrollable(t))return;
  const p=e.touches[0];SW={x:p.clientX,y:p.clientY,lx:p.clientX,lt:Date.now(),v:0,cal:!!t.closest('.cal')&&S.view==='calendario',lock:null};
},{passive:true});
document.addEventListener('touchmove',e=>{
  const s=SW;if(!s||s.ending||e.touches.length>1)return;const p=e.touches[0],dx=p.clientX-s.x,dy=p.clientY-s.y;
  if(!s.lock){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;if(Math.abs(dx)<=Math.abs(dy)){SW=null;return}s.lock=1;swipeStart(s,dx<0?1:-1)}
  e.preventDefault();
  const now=Date.now();if(now>s.lt){s.v=(p.clientX-s.lx)/(now-s.lt);s.lx=p.clientX;s.lt=now}
  s.dx=dx;swipeMove(s,dx);
},{passive:false});
function touchFinish(cancel){
  const s=SW;if(!s||!s.lock||s.ending){if(s&&!s.ending)SW=null;return}s.ending=1;
  const dx=s.dx||0,go=!cancel&&s.peek&&Math.sign(-dx)===s.step&&(Math.abs(dx)>s.w*.3||(Math.abs(dx)>30&&Math.sign(-s.v)===s.step&&Math.abs(s.v)>.4));
  swipeEnd(s,go);setTimeout(()=>{if(SW===s)SW=null},260);
}
document.addEventListener('touchend',()=>touchFinish(false),{passive:true});
document.addEventListener('touchcancel',()=>touchFinish(true),{passive:true});

/* trascinamento su telefono: tieni premuto ~0,4 s, poi sposta il dito */
let T=null,suppressClick=false,touchUsed=false;
document.addEventListener('touchstart',e=>{
  touchUsed=true;
  const el=e.target.closest('.card[data-drag]');if(!el||e.touches.length>1)return;
  document.querySelectorAll('[draggable="true"]').forEach(x=>x.draggable=false);
  const p=e.touches[0];
  T={el,x:p.clientX,y:p.clientY,active:false,timer:setTimeout(()=>{
    T.active=true;dragId=el.dataset.drag;try{navigator.vibrate&&navigator.vibrate(15)}catch(_){}
    const r=el.getBoundingClientRect();const g=el.cloneNode(true);g.className='card ghost';
    g.style.width=r.width+'px';T.dx=T.x-r.left;T.dy=T.y-r.top;T.ghost=g;document.body.appendChild(g);
    el.classList.add('dragging');T.lx=T.x;T.ly=T.y;moveGhost(T.x,T.y);requestAnimationFrame(autoScroll);
  },380)};
},{passive:true});
function moveGhost(x,y){
  T.ghost.style.transform=`translate(${x-T.dx}px,${y-T.dy}px) rotate(2deg)`;
  const under=document.elementFromPoint(x,y);const z=under&&under.closest('[data-drop-list]');
  document.querySelectorAll('.over').forEach(o=>o!==z&&o.classList.remove('over'));if(z)z.classList.add('over');
}
/* scorrimento automatico: finché il dito resta vicino a un bordo le colonne scorrono, più veloce quanto più sei vicino al bordo */
function autoScroll(){
  if(!T||!T.active)return;
  const x=T.lx,y=T.ly,zone=Math.max(60,innerWidth*.2),vz=Math.max(70,innerHeight*.12);
  const cols=document.querySelector('.cols');let moved=false;
  if(cols){
    let dx=0;
    if(x<zone)dx=-Math.ceil(14*(1-x/zone));
    else if(x>innerWidth-zone)dx=Math.ceil(14*(1-(innerWidth-x)/zone));
    if(dx){const b=cols.scrollLeft;cols.scrollLeft+=dx;moved=cols.scrollLeft!==b}
  }
  const m=document.getElementById('main');let dy=0;
  if(y<vz)dy=-Math.ceil(16*(1-y/vz));else if(y>innerHeight-vz-60)dy=Math.ceil(16*(1-(innerHeight-60-y)/vz));
  if(dy){const b=m.scrollTop;m.scrollTop+=dy;moved=moved||m.scrollTop!==b}
  if(moved)moveGhost(x,y);
  requestAnimationFrame(autoScroll);
}
document.addEventListener('touchmove',e=>{
  if(!T)return;const p=e.touches[0];
  if(!T.active){if(Math.hypot(p.clientX-T.x,p.clientY-T.y)>8){clearTimeout(T.timer);T=null}return}
  e.preventDefault();T.lx=p.clientX;T.ly=p.clientY;moveGhost(p.clientX,p.clientY);
},{passive:false});
function endTouch(cancel){
  if(!T)return;clearTimeout(T.timer);
  if(T.active){suppressClick=true;setTimeout(()=>suppressClick=false,400);T.ghost.remove();
    const under=!cancel&&T.lx!=null?document.elementFromPoint(T.lx,T.ly):null;
    if(!dropOn(under)){dragId=null;render(true)}}
  T=null;
}
document.addEventListener('touchend',()=>endTouch(false));document.addEventListener('touchcancel',()=>endTouch(true));
document.addEventListener('contextmenu',e=>{if(e.target.closest('.card[data-drag]'))e.preventDefault()});
document.addEventListener('click',e=>{if(suppressClick){e.stopPropagation();e.preventDefault()}},true);

/* ---------- notifiche (anteprima) ---------- */
const NOTIFS=document.getElementById('notifs');
function toast(msg,undo,ms){const d=document.createElement('div');d.className='notif';d.style.borderRadius='12px';
  d.innerHTML=`<div style="display:flex;align-items:center;gap:12px"><div class="nb" style="color:var(--fg);flex:1">${esc(msg)}</div>${undo?'<button type="button" class="btn">Annulla</button>':''}</div>`;
  if(undo)d.querySelector('button').onclick=()=>{d.remove();undo()};
  NOTIFS.appendChild(d);setTimeout(()=>d.remove(),ms||(undo?6000:2600))}
/* "Annulla" nei messaggi: rimette com'erano solo le card toccate dall'azione,
   così non cancella quello che nel frattempo è arrivato da un altro dispositivo */
function undoFor(ids){
  const snap=ids.map(id=>{const i=S.cards.findIndex(c=>c.id===id);return [id,i,i<0?null:JSON.stringify(S.cards[i])]});
  return ()=>{
    snap.forEach(([id,i,j])=>{const k=S.cards.findIndex(c=>c.id===id);
      if(j===null){if(k>=0)S.cards.splice(k,1);return}
      const o=JSON.parse(j);if(k>=0)S.cards[k]=o;else S.cards.splice(Math.min(i,S.cards.length),0,o)});
    save();render();toast('Annullato')};
}
function whenText(c,day){
  const w=day?(day===todayIso()?'Oggi':fmtShort(day))+(c.time?' alle '+c.time:''):'Senza data';
  return w+(board(c.boardId)?' · '+board(c.boardId).name:'');
}
function notify(c){
  if(!c)return;const d=document.createElement('div');d.className='notif';
  d.innerHTML=`<div class="nh"><b>${I.bell}</b>MyTask · adesso</div><div class="nt">${esc(c.title)}</div><div class="nb">${esc(whenText(c,c.date))}</div>
   <div class="na"><button type="button" data-n="done">Fatto</button><button type="button" data-n="snooze">Rimanda…</button><button type="button" data-n="open">Apri</button></div>`;
  d.addEventListener('click',e=>{const a=e.target.dataset.n;if(!a)return;
    if(a==='done'&&!c.done)toggleDone(c);
    // con il form aperto non lo sostituisco: rimanda di un'ora senza chiedere
    if(a==='snooze'){if(draft)doSnooze(c,Date.now()+3600e3);else openSnooze(c.id)}
    if(a==='open')openEditor(c.id);
    d.remove()});
  const inApp=()=>{NOTIFS.appendChild(d);setTimeout(()=>d.remove(),20000)};
  // con il push attivo la notifica di sistema la manda il server: qui solo quella dentro l'app
  if(!pushOn&&'serviceWorker' in navigator&&'Notification' in window&&Notification.permission==='granted'){
    // ready aspetta un service worker attivo: con la sola registrazione showNotification può fallire
    navigator.serviceWorker.ready.then(r=>r.showNotification(c.title,{body:d.querySelector('.nb').textContent,tag:c.id,renotify:true,icon:'icon-192.png',badge:'badge-96.png',data:{id:c.id},actions:[{action:'done',title:'Fatto'},{action:'snooze',title:'Rimanda di 1 ora'}]}))
      .catch(err=>{console.warn('Notifica non mostrata',err);if(document.visibilityState==='visible')return;try{new Notification(c.title,{body:d.querySelector('.nb').textContent,icon:'icon-192.png'})}catch(e){}});
    if(document.visibilityState!=='visible')return;
  }
  inApp();
}
function checkReminders(){
  const now=Date.now();let ch=false;
  S.cards.forEach(c=>{
    if(c.done)return;
    if(c.snooze&&now>=c.snooze){c.snooze=null;notify(c);ch=true;return}
    if(c.reminder==null||!c.date||c.notified)return;
    // card "tutto il giorno": il promemoria si riferisce alle 9:00
    const at=new Date(c.date+'T'+(c.time||ALLDAY_AT)).getTime();const due=at-c.reminder*60000;
    if(now>=due&&now<at+3600e3){c.notified=true;notify(c);ch=true}
  });
  if(ch)save();
}
let swReg=null;
function handleAction(a,id){if(/^(digest|sys)-/.test(String(id))){if(S.view!=='oggi')goView('oggi');return}const c=card(id);if(!c)return;if(a==='done'&&!c.done)toggleDone(c);if(a==='snooze')doSnooze(c,Date.now()+3600e3);if(a==='open'){if(draft||c.done)openEditor(id);else openSnooze(id)}}
/* applica i Fatto/Rimanda premuti sulle notifiche (coda salvata dal service worker); delete() garantisce che ogni azione valga una volta sola */
let draining=null;
function drainActions(){if(!('caches' in window))return Promise.resolve();return draining=(draining||Promise.resolve()).then(async()=>{try{const q=await caches.open('mytask-actions'),ks=(await q.keys()).sort((x,y)=>x.url<y.url?-1:1);for(const k of ks){const r=await q.match(k);if(r&&await q.delete(k)){const d=await r.json();handleAction(d.a,d.id)}}}catch(e){}})}
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').then(r=>{swReg=r}).catch(()=>{});
  navigator.serviceWorker.addEventListener('message',e=>{if(!e.data)return;if(e.data.sync)drainActions();else if(e.data.a)handleAction(e.data.a,e.data.id)});
  drainActions();
  const q=new URLSearchParams(location.search);if(q.get('a')){setTimeout(()=>handleAction(q.get('a'),q.get('id')),300);history.replaceState(null,'',location.pathname)}
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){drainActions();checkReminders()}});
}
/* ---------- push dal server: promemoria puntuali anche ad app chiusa ---------- */
const PUSH_URL='https://mytask-push.scresci-dev.workers.dev';// indirizzo del Worker Cloudflare (vuoto = push disattivato)
const PUSH_KEY='BD0-rc6SqlVCzJofoCmBhLqdqDyt2BZ6Y3lKDxBt2C1JQ5Qvcmz1HCwNKU6LLMLMJp0w-KycqqtBB9Lu4yrNXhk';
var pushSub=null,pushOn=false,pushTO=null;
function deviceId(){
  let d=null;try{d=localStorage.getItem('mytask-device')}catch(e){}
  if(!d){d=crypto.randomUUID();try{localStorage.setItem('mytask-device',d)}catch(e){}}
  return d;
}
/* i promemoria fino a un anno avanti, comprese le ripetizioni, già convertiti in istanti.
   Il server ne tiene al massimo 300: si mandano i più vicini e, se non ci stanno tutti, un avviso che chiede di riaprire l'app */
const PUSH_MAX=300,PUSH_DAYS=365;
function pushReminders(){
  const now=Date.now(),t=todayIso(),out=[];
  S.cards.forEach(c=>{
    if(c.done)return;
    if(c.snooze&&c.snooze>now)out.push({id:c.id,at:c.snooze,title:c.title,body:whenText(c,c.date)});
    if(c.reminder==null)return;
    occ(c,t,addDays(t,PUSH_DAYS)).forEach(day=>{
      if(day===c.date&&c.notified)return;
      const at=new Date(day+'T'+(c.time||ALLDAY_AT)).getTime()-c.reminder*60000;
      if(at>now-3600e3)out.push({id:c.id,at,title:c.title,body:whenText(c,day)});
    });
  });
  out.push(...digestReminders());
  return capReminders(out,PUSH_MAX);
}
function schedulePush(){if(!pushSub)return;clearTimeout(pushTO);pushTO=setTimeout(syncPush,800)}
async function syncPush(keepalive){
  clearTimeout(pushTO);pushTO=null;
  // keepalive: la richiesta parte anche se l'app viene chiusa subito dopo il salvataggio.
  // text/plain evita la richiesta preliminare CORS, che con keepalive non sempre è permessa
  try{const r=await fetch(PUSH_URL+'/sync',{method:'POST',keepalive:!!keepalive,headers:{'Content-Type':'text/plain'},body:JSON.stringify({device:deviceId(),sub:pushSub.toJSON(),reminders:pushReminders()})});pushOn=r.ok}
  catch(e){pushOn=false;console.warn('Sync push non riuscita',e)}
}
async function setupPush(){
  if(!PUSH_URL||!('serviceWorker' in navigator)||!('PushManager' in window)||Notification.permission!=='granted')return;
  try{
    const r=await navigator.serviceWorker.ready;
    const key=Uint8Array.from(atob(PUSH_KEY.replace(/-/g,'+').replace(/_/g,'/')),x=>x.charCodeAt(0));
    pushSub=await r.pushManager.getSubscription()||await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
    await syncPush();
  }catch(e){console.warn('Push non disponibile',e)}
}
document.addEventListener('visibilitychange',()=>{if(!pushSub)return;if(document.visibilityState==='visible')syncPush();else if(pushTO)syncPush(true)});
addEventListener('pagehide',()=>{if(pushSub&&pushTO)syncPush(true)});
setupPush();
document.addEventListener('click',e=>{if(e.target.id==='askNotif')Notification.requestPermission().then(async()=>{render();await setupPush();if(document.getElementById('ntf'))openNotifs()})});
syncSnap=snapOf();
render();setInterval(checkReminders,15000);setTimeout(checkReminders,1500);
/* link "#sync=CODICE" aperto su un altro dispositivo: collega il backup */
(()=>{const m=location.hash.match(/^#sync=([A-Za-z0-9-]+)/);if(!m)return;history.replaceState(null,'',location.pathname+location.search);const c=normCode(m[1]);
  if(c&&(!SYNC||SYNC.code!==c))linkCode(c).then(()=>toast('Backup collegato: i task sono sincronizzati')).catch(e=>toast(e.message))})();
syncUI();setTimeout(syncNow,800);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')syncNow();else if(syncTO)syncNow()});
// controllo periodico ogni 5 minuti: le modifiche partono già subito dopo il salvataggio e all'apertura
setInterval(()=>{if(document.visibilityState==='visible')syncNow()},300000);
