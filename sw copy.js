const staticCacheName = "app-static-v-1";
const dynamicCacheName = "app-dynamic-cashe-1";
const assets = [
    "/",
    "/index.html", 
    "/fallback.html",
    "/script.js", 
    "/style.css", 
    "/icons/volume.svg", 
    "/icons/volume-slash.svg", 
    "/audio/tick.mp3", 
    "/audio/strike-twelve.mp3"
];

// install service worker for pwa 
const assetsCache = async () => {
    const cache =  await caches.open(staticCacheName);
    await cache.addAll(assets);
}
self.addEventListener("install", evt =>{
    console.log("Service worker is installed!");
    evt.waitUntill(assetsCache())
})

// activate service worker event 
self.addEventListener("activate", evt=>{
    // console.log("Service worker is activated!");
    evt.waitUntill(
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
self.addEventListener("fetch", evt =>{
    // console.log("fetch event", evt );
    evt.respondWith(
        caches.match(evt.request)
        .then(res => res || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url , fetchRes);
                // limitCacheSize(dynamicCacheName, 15)
                return fetchRes;
            });
        }))
        .catch(() => {
            if (evt.request.url.indexOf(".html") > -1) {
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