// Template. `scripts/build-web.mjs` fills the two placeholders below when it
// writes dist/sw.js. The copy in public/ is never served as-is: register-sw.js
// does not register a worker on localhost.
const CACHE_NAME = "amharic-storybook-__BUILD_ID__";

/**
 * Everything needed to boot the reader with no network.
 *
 * Illustrations are deliberately absent. They weigh about 5 MB against 1.7 MB
 * for the rest, and the worker installs on a first visit rather than when
 * someone chooses to install the app, so precaching them would push a 7 MB
 * download onto every visitor. They are cached as they are read instead.
 */
const APP_SHELL = __PRECACHE__;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        // The cache name carries the build id, so this drops the previous
        // deployment's entries instead of letting them pile up forever.
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    // Network first: a deploy changes the hashed bundle index.html points at,
    // so a stale document would boot code that no longer exists.
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only a real document may replace the offline fallback. Caching any
          // response would let one transient 404 or 502 stand in for the home
          // screen until the next deployment.
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("/", copy));
          }

          return response;
        })
        .catch(() => caches.match("/").then((cached) => cached || caches.match("/offline.html"))),
    );
    return;
  }

  // Everything else is content-hashed, so a cached copy can never be stale.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }

        return response;
      });
    }),
  );
});
