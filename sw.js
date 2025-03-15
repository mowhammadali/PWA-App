self.addEventListener("install", (event) => {
  console.log("The service worker installed successfully!");
  self.skipWaiting();

  caches.open("pwa").then((cach) => {
    cach.addAll(["./styles.css", "./js/app.js"]);
  });
});

self.addEventListener("activate", (event) => {
  console.log("The service worker activated successfully!");
});

self.addEventListener("fetch", (event) => {
  console.log(event);

  event.respondWith(fetch(event.request));
});
