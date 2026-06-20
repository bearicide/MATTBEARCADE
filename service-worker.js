const CACHE='mbarcade-v2-0-console';
const ASSETS=[
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/icons/mattbearcade-icon.svg'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(key=>key===CACHE?null:caches.delete(key))))
  );
});
