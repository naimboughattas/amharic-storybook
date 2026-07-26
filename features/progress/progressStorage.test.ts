jest.mock("expo-sqlite/localStorage/install", () => ({}), { virtual: true });

const STORAGE_KEY = "storybook-amharique.progress.v1";

type StorageModule = typeof import("@/features/progress/progressStorage");

/**
 * The module caches the parsed state in a closure, so every case starts from a
 * fresh copy with the wanted payload already in storage.
 */
function loadWith(rawValue: string | null): StorageModule {
  globalThis.localStorage.clear();

  if (rawValue !== null) {
    globalThis.localStorage.setItem(STORAGE_KEY, rawValue);
  }

  let storage: StorageModule | undefined;
  jest.isolateModules(() => {
    storage = require("@/features/progress/progressStorage");
  });

  return storage as StorageModule;
}

const defaults = {
  readStoryIds: [],
  favoriteStoryIds: [],
  lastPages: {},
  language: "fr",
  readerScale: "regular",
  theme: "light",
};

describe("getProgressState", () => {
  it("returns defaults when nothing is stored", () => {
    expect(loadWith(null).getProgressState()).toEqual(defaults);
  });

  it("returns defaults when the stored value is not valid JSON", () => {
    expect(loadWith("{ not json").getProgressState()).toEqual(defaults);
  });

  it("returns defaults when the stored value is not an object", () => {
    expect(loadWith("[1, 2, 3]").getProgressState()).toEqual(defaults);
    expect(loadWith("42").getProgressState()).toEqual(defaults);
    expect(loadWith("null").getProgressState()).toEqual(defaults);
  });

  it("reads back a state it wrote itself", () => {
    const storage = loadWith(null);
    const state = {
      ...defaults,
      readStoryIds: ["a"],
      favoriteStoryIds: ["b"],
      lastPages: { a: 3 },
      language: "en" as const,
      readerScale: "large" as const,
      theme: "dark" as const,
    };

    storage.setProgressState(state);

    expect(loadWith(globalThis.localStorage.getItem(STORAGE_KEY)).getProgressState()).toEqual(state);
  });

  describe("rejects values that would break consumers", () => {
    it("falls back when the id lists are not arrays", () => {
      const state = loadWith(
        JSON.stringify({ readStoryIds: "nope", favoriteStoryIds: { a: 1 } }),
      ).getProgressState();

      // `useReadingProgress` calls `.includes()` on both of these.
      expect(state.readStoryIds).toEqual([]);
      expect(state.favoriteStoryIds).toEqual([]);
    });

    it("drops non-string entries inside the id lists", () => {
      const state = loadWith(
        JSON.stringify({ favoriteStoryIds: [1, "keep-me", null, { id: "x" }] }),
      ).getProgressState();

      expect(state.favoriteStoryIds).toEqual(["keep-me"]);
    });

    it("drops page entries that are not positive integers", () => {
      const state = loadWith(
        JSON.stringify({
          lastPages: { good: 4, zero: 0, text: "3", negative: -1, fractional: 2.5 },
        }),
      ).getProgressState();

      expect(state.lastPages).toEqual({ good: 4, zero: 0 });
    });

    it("falls back when lastPages is not an object", () => {
      expect(loadWith(JSON.stringify({ lastPages: ["a"] })).getProgressState().lastPages).toEqual(
        {},
      );
    });

    it("falls back on unknown enum values", () => {
      const state = loadWith(
        JSON.stringify({ language: "de", theme: "neon", readerScale: "huge" }),
      ).getProgressState();

      expect(state.language).toBe("fr");
      expect(state.theme).toBe("light");
      expect(state.readerScale).toBe("regular");
    });

    it("keeps valid fields when a sibling field is corrupt", () => {
      const state = loadWith(
        JSON.stringify({ readStoryIds: "nope", theme: "dark", language: "en" }),
      ).getProgressState();

      expect(state.readStoryIds).toEqual([]);
      expect(state.theme).toBe("dark");
      expect(state.language).toBe("en");
    });
  });
});

describe("setProgressState", () => {
  it("accepts an updater function and persists the result", () => {
    const storage = loadWith(null);

    storage.setProgressState((current) => ({ ...current, theme: "dark" }));

    expect(storage.getProgressState().theme).toBe("dark");
    expect(JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY) as string).theme).toBe("dark");
  });

  it("notifies subscribers and stops after unsubscribing", () => {
    const storage = loadWith(null);
    const listener = jest.fn();

    const unsubscribe = storage.subscribeToProgress(listener);
    storage.setProgressState((current) => ({ ...current, theme: "dark" }));
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    storage.setProgressState((current) => ({ ...current, theme: "light" }));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("keeps the new state in memory when writing to storage throws", () => {
    const storage = loadWith(null);
    const setItem = jest.spyOn(globalThis.localStorage, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    expect(() => storage.setProgressState((current) => ({ ...current, theme: "dark" }))).not.toThrow();
    expect(storage.getProgressState().theme).toBe("dark");

    setItem.mockRestore();
  });
});
