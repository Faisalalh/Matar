const C='radar-8.8';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.png','data/cams.js','data/emirates.js','data/roads/index.js'])).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('files.json'))return;
  /* the page itself: always the newest when online, the saved copy when offline */
  if(e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){e.respondWith((async()=>{const c=await caches.open(C);try{const r=await Promise.race([fetch(e.request,{cache:'no-store'}),new Promise((_,j)=>setTimeout(j,4000))]);if(r&&r.ok){c.put('index.html',r.clone());return r;}throw 0;}catch(x){return (await c.match('index.html'))||(await c.match('./'))||Response.error();}})());return;}
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r;}catch(x){return hit||Response.error();}}));});
