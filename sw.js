const staticCacheName = "v1";
const dynamicCacheName = "dv1";

const assets = [
  "/",
  "/index.html", 
  "/fallback.html",
  "/script.js", 
  "/style.css", 
  "/icons/volume.webp", 
  "/icons/volume-slash.webp", 
  "/audio/tick.mp3", 
  "/audio/strike-twelve.mp3"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(staticCacheName).then(async (cache) => {
    let ok;
    try {
      ok = await cache.addAll(assets);
    } catch (err) {
      for (let i of assets) {
        try {
          ok = await cache.add(i);
        } catch (err) {
          console.warn('sw: cache.add',i);
        }
      }
    }
    return ok;
  }));

  console.log('ServiceWorker installed');
});

// activate service worker event 
self.addEventListener("activate", event=>{
  // console.log("Service worker is activated!");
  event.waitUntil(
      async () => {
          
      caches.keys().then(keys => {
          return new Promise.all(
              keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => {
                  caches.delete(key);
              })
          );
      }).catch(e => console.log(e))
      }
  );
})
  
// fetch service worker event
self.addEventListener("fetch", event =>{
  console.log("fetch event", event );
  event.respondWith(
      caches.match(event.request)
      .then(res => res || fetch(event.request)
      .then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
              cache.put(event.request.url , fetchRes);
              limitCacheSize(dynamicCacheName, 15)
              return fetchRes;
          });
      }))
      .catch(() => {
          if (event.request.url.indexOf(".html") > -1) {
              return caches.match("/fallback.html");
          }
      })
  );
})

// cache zise limit function 
const limitCacheSize = (name, size) =>{
  caches.open(name).then(cache => {
      cache.keys().then(keys => {
          if (keys.length > size) {
              cache.delete(keys[0]).then(limitCacheSize(name, size));
          }
      }).catch(e => console.log(e))
  })
}