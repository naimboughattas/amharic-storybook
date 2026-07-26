(function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  // The worker serves same-origin GETs cache-first, which on a dev server means
  // every code change stays masked by the previously cached Metro bundle. Any
  // worker left over from an earlier session is removed as well.
  var isLocalhost =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "[::1]";

  if (isLocalhost) {
    navigator.serviceWorker.getRegistrations().then(function unregisterAll(registrations) {
      registrations.forEach(function unregisterOne(registration) {
        registration.unregister();
      });
    });
    return;
  }

  window.addEventListener("load", function onWindowLoad() {
    navigator.serviceWorker.register("/sw.js").catch(function ignoreRegistrationError() {
      // Service worker support is an enhancement; the reader still works online.
    });
  });
})();
