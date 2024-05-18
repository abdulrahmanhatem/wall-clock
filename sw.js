const staticCacheName = "app-static-v-1";
const dynamicCacheName = "app-dynamic-cashe-1";
const assets = [
    "https://abdulrahmanhatem.github.io/wall-clock/",
    "https://abdulrahmanhatem.github.io/wall-clock/index.html", 
    "https://abdulrahmanhatem.github.io/wall-clock/fallback.html",
    "https://abdulrahmanhatem.github.io/wall-clock/script.js", 
    "https://abdulrahmanhatem.github.io/wall-clock/style.css", 
    "https://abdulrahmanhatem.github.io/wall-clock/icons/volume.svg", 
    "https://abdulrahmanhatem.github.io/wall-clock/icons/volume-slash.svg", 
    "https://abdulrahmanhatem.github.io/wall-clock/audio/tick.mp3", 
    "https://abdulrahmanhatem.github.io/wall-clock/audio/strike-twelve.mp3"
];
// install service worker for pwa 
self.addEventListener("install", evt =>{
    // console.log("Service worker is installed!");
    evt.waitUntill(
        caches.open(staticCacheName).then(cache=>{
            cache.addAll(assets);
        })
    )
})

// activate service worker event 
self.addEventListener("activate", evt=>{
    // console.log("Service worker is activated!");
    evt.waitUntill(
        caches.keys().then(keys => {
            return new Promise.all(
                keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => {
                    caches.delete(key);
                })
            );
        })
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
                limitCacheSize(dynamicCacheName, 15)
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
        })
    })
}