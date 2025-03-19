const cacheVersion = 3;

const activeCaches = {
  static: `static-v${cacheVersion}`,
  dynamic: `dynamic-v${cacheVersion}`,
};

self.addEventListener("install", (event) => {
  console.log("The service worker installed successfully!");
  self.skipWaiting();

  event.waitUntil(
    caches.open(activeCaches["static"]).then((cache) => {
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

  // types of strategies
  // 1. first cache second network
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     if (response) {
  //       return response;
  //     } else
  //       return fetch(event.request).then((serverResponse) => {
  //         caches.open(activeCaches["dynamic"]).then((cach) => {
  //           cach.put(event.request, serverResponse.clone());
  //           return serverResponse;
  //         });
  //       });
  //   })
  // );

  // 2. network only
  // event.respondWith(fetch(event.request));

  // 3. cache only
  // event.respondWith(caches.match(event.request));

  // 4. first network second cache
  return event.respondWith(
    fetch(event.request).then((serverResponse) => {
      return caches
        .open(activeCaches["dynamic"])
        .then((cach) => {
          cach.put(event.request, serverResponse.clone());
          return serverResponse;
        })
        .catch(() => {
          caches.match(event.request);
        });
    })
  );
});
