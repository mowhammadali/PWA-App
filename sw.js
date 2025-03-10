self.addEventListener("install", (event) => {
  console.log("The service worker installed successfully!");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("The service worker activated successfully!");
});

self.addEventListener("fetch", (event) => {
  console.log(event);
});
