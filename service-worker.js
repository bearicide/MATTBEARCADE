const CACHE='mbarcade-v1-1-1';
const ASSETS=[
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/icons/mattbearcade-icon.svg'
];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(ASSETS))
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;

  e.respondWith(
    caches.match(e.request).then(cached=>{
      return cached || fetch(e.request)
        .then(response=>response)
        .catch(()=>cached);
    })
  );
});
