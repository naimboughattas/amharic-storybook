import "expo-sqlite/localStorage/install";

import type { ThemeMode } from "@/theme/colors";

const STORAGE_KEY = "storybook-amharique.progress.v1";

export type ReadingProgressState = {
  readStoryIds: string[];
  favoriteStoryIds: string[];
  lastPages: Record<string, number>;
  theme: ThemeMode;
};

const defaultProgress: ReadingProgressState = {
  readStoryIds: [],
  favoriteStoryIds: [],
  lastPages: {},
  theme: "light",
};

const listeners = new Set<() => void>();
let cachedProgress: ReadingProgressState | null = null;

function safeParse(value: string | null): ReadingProgressState {
  if (!value) {
    return defaultProgress;
  }

  try {
    return { ...defaultProgress, ...JSON.parse(value) };
  } catch {
    return defaultProgress;
  }
}

export function getProgressState(): ReadingProgressState {
  if (!cachedProgress) {
    cachedProgress = safeParse(globalThis.localStorage.getItem(STORAGE_KEY));
  }

  return cachedProgress;
}

export function setProgressState(
  updater: ReadingProgressState | ((current: ReadingProgressState) => ReadingProgressState),
) {
  const nextState =
    typeof updater === "function" ? updater(getProgressState()) : updater;

  cachedProgress = nextState;
  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  listeners.forEach((listener) => listener());
}

export function subscribeToProgress(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
