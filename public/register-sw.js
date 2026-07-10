(function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", function onWindowLoad() {
    navigator.serviceWorker.register("/sw.js").catch(function ignoreRegistrationError() {
      // Service worker support is an enhancement; the reader still works online.
    });
  });
})();
