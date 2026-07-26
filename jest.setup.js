// The app relies on the synchronous localStorage shim that expo-sqlite installs
// on native. Tests replace it with an in-memory store so the storage layer can
// be exercised without a database.
const store = new Map();

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  writable: true,
  value: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  },
});
