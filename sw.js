const staticCacheName = "app-static-v-1";
const assets = [
    "/",
    "/index.html", 
    "/script.js", 
    "/style.css", 
    "/icons/volume.svg", 
    "/icons/volume-slash.svg", 
    "/audio/tick.mp3", 
    "/audio/strike-twelve.mp3"
];
// install service worker for pwa 
self.addEventListener("install", evt =>{
    // console.log("Service worker is installed!");
    evt.waitUntill(
        caches.open(staticCacheName).then(cache=>{
            console.log("caching shell assets");
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
                keys.filter(key => key !== staticCacheName).map(key => {
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
        .then(res => res || fetch(evt.request))
        .catch(e => console.log(e))
    );
})