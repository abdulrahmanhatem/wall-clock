const staticCacheName = "app-static";
const assets = [
    "/",
    "/index.html", 
    "/script.js", 
    "/style.css", 
    "/icons/volume.svg", 
    "/icons/volume-slash.svg", 
    "/audio/tick.mp3", 
    "/audio/strike-twelve.mp3"
]
// install service worker for pwa 
self.addEventListener("install", (e)=>{
    e.waitUntill(
        caches.open(staticCacheName).then(cache=>{
            console.log("caching shell assets");
            cache.addAll(assets)
        });
    )
    
})