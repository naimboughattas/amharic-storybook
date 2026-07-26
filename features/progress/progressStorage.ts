import "expo-sqlite/localStorage/install";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { ThemeMode } from "@/theme/colors";

const STORAGE_KEY = "storybook-amharique.progress.v1";

export type ReaderScale = "small" | "regular" | "large";

export type ReadingProgressState = {
  readStoryIds: string[];
  favoriteStoryIds: string[];
  lastPages: Record<string, number>;
  language: InterfaceLanguage;
  theme: ThemeMode;
  readerScale: ReaderScale;
  showIllustrations: boolean;
};

const defaultProgress: ReadingProgressState = {
  readStoryIds: [],
  favoriteStoryIds: [],
  lastPages: {},
  language: "fr",
  readerScale: "regular",
  showIllustrations: true,
  theme: "light",
};

const listeners = new Set<() => void>();
let cachedProgress: ReadingProgressState | null = null;

const languages: InterfaceLanguage[] = ["fr", "en"];
const themes: ThemeMode[] = ["light", "dark"];
const readerScales: ReaderScale[] = ["small", "regular", "large"];

function stringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function pageMap(value: unknown): Record<string, number> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [string, number] =>
      typeof entry[1] === "number" && Number.isInteger(entry[1]) && entry[1] >= 0,
  );

  return Object.fromEntries(entries);
}

function oneOf<T extends string>(value: unknown, allowed: T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

// Stored state comes from a device the app does not control: a partial write, a
// hand-edited value, or an older schema must degrade to defaults field by field
// instead of poisoning the whole store.
function normalize(value: unknown): ReadingProgressState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return defaultProgress;
  }

  const stored = value as Partial<Record<keyof ReadingProgressState, unknown>>;

  return {
    readStoryIds: stringArray(stored.readStoryIds) ?? defaultProgress.readStoryIds,
    favoriteStoryIds: stringArray(stored.favoriteStoryIds) ?? defaultProgress.favoriteStoryIds,
    lastPages: pageMap(stored.lastPages) ?? defaultProgress.lastPages,
    language: oneOf(stored.language, languages) ?? defaultProgress.language,
    theme: oneOf(stored.theme, themes) ?? defaultProgress.theme,
    readerScale: oneOf(stored.readerScale, readerScales) ?? defaultProgress.readerScale,
    showIllustrations:
      typeof stored.showIllustrations === "boolean"
        ? stored.showIllustrations
        : defaultProgress.showIllustrations,
  };
}

function safeParse(value: string | null): ReadingProgressState {
  if (!value) {
    return defaultProgress;
  }

  try {
    return normalize(JSON.parse(value));
  } catch {
    return defaultProgress;
  }
}

export function getProgressState(): ReadingProgressState {
  if (!cachedProgress) {
    try {
      cachedProgress = safeParse(globalThis.localStorage.getItem(STORAGE_KEY));
    } catch {
      cachedProgress = defaultProgress;
    }
  }

  return cachedProgress;
}

export function setProgressState(
  updater: ReadingProgressState | ((current: ReadingProgressState) => ReadingProgressState),
) {
  const nextState =
    typeof updater === "function" ? updater(getProgressState()) : updater;

  cachedProgress = nextState;

  try {
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // A full or unavailable store must not break the reading session; the
    // in-memory cache keeps the ritual going until the app is closed.
  }

  listeners.forEach((listener) => listener());
}

export function subscribeToProgress(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
