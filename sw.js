// MyTask service worker: funziona offline e gestisce i pulsanti delle notifiche
const CACHE='mytask-v26',QUEUE='mytask-actions';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','badge-96.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(f,{cache:'no-store'}).then(r=>c.put(f,r))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x!==QUEUE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    // prima la rete (per ricevere gli aggiornamenti), poi la copia salvata se sei offline
    e.respondWith(fetch(req,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));return r}).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
  }else if(url.hostname.endsWith('gstatic.com')||url.hostname.endsWith('googleapis.com')){
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(n=>{const c=n.clone();caches.open(CACHE).then(x=>x.put(req,c));return n})));
  }
});
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(err){}
  e.waitUntil(self.registration.showNotification(d.title||'MyTask',{body:d.body||'',tag:d.id,renotify:true,icon:'icon-192.png',badge:'badge-96.png',data:{id:d.id},actions:[{action:'done',title:'Fatto'},{action:'snooze',title:'Rimanda di 1 ora'}]}));
});
// Fatto/Rimanda finiscono in una coda salvata: se l'app è congelata il messaggio si perderebbe,
// così l'app la svuota appena torna visibile
function queueAction(a,id){return caches.open(QUEUE).then(c=>c.put('act-'+Date.now()+'-'+Math.random().toString(36).slice(2),new Response(JSON.stringify({a,id}))))}
self.addEventListener('notificationclick',e=>{
  const a=e.action||'open',id=e.notification.data&&e.notification.data.id;e.notification.close();
  e.waitUntil((a==='open'?Promise.resolve():queueAction(a,id)).then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true})).then(list=>{
    if(a!=='open'){if(list.length){list.forEach(w=>w.postMessage({sync:1}));return}return self.clients.openWindow('./')}
    if(list.length){list[0].postMessage({a,id});return list[0].focus()}
    return self.clients.openWindow('./?a=open&id='+encodeURIComponent(id||''));
  }));
});
