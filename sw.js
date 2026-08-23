
const CACHE_NAME='contato-certo-sp-v3';
const urlsToCache=['/','/index.html','/manifest.json','/logo-contato-certo-sp.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(resp=>{
      return resp || fetch(e.request).then(r=>{
        // Não cacheia supabase
        if(e.request.url.includes('supabase')) return r;
        return caches.open(CACHE_NAME).then(cache=>{cache.put(e.request,r.clone()); return r;});
      });
    })
  );
});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));});
