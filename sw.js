const cacheVersion = 3;

const activeCaches = {
  weather: `weather-v${cacheVersion}`,
};

self.addEventListener("install", (event) => {
  console.log("The service worker installed successfully!");
  self.skipWaiting();

  event.waitUntil(
    caches.open(activeCaches["weather"]).then((cache) => {
      cache.addAll(["/", "./styles.css", "./js/app.js"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("The service worker activated successfully!");

  const activeCacheNames = Object.values(activeCaches);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!activeCacheNames.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else return fetch(event.request);
    })
  );
});
