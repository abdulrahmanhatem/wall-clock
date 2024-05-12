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
];
// install service worker for pwa 
addEventListener("install", evt =>{
    console.log("Service worker is installed!");
    // e.waitUntill(
    //     // caches.open(staticCacheName).then(cache=>{
    //     //     // console.log("caching shell assets");
    //     //     // cache.addAll(assets)
    //     // });
    // )
    
})

// activate service worker event 
self.addEventListener("activate", evt=>{
    console.log("Service worker is activated!");

})

// fetch service worker event
addEventListener("fetch", evt =>{
    // console.log("fetch event", evt );
})