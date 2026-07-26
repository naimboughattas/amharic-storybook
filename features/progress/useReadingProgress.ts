import { useCallback, useMemo, useSyncExternalStore } from "react";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { ThemeMode } from "@/theme/colors";
import {
  type ReaderScale,
  getProgressState,
  setProgressState,
  subscribeToProgress,
} from "@/features/progress/progressStorage";

export function useReadingProgress() {
  const progress = useSyncExternalStore(
    subscribeToProgress,
    getProgressState,
    getProgressState,
  );

  const favoriteIds = useMemo(
    () => new Set(progress.favoriteStoryIds),
    [progress.favoriteStoryIds],
  );
  const readIds = useMemo(() => new Set(progress.readStoryIds), [progress.readStoryIds]);

  const toggleFavorite = useCallback((storyId: string) => {
    setProgressState((current) => {
      const isFavorite = current.favoriteStoryIds.includes(storyId);
      return {
        ...current,
        favoriteStoryIds: isFavorite
          ? current.favoriteStoryIds.filter((id) => id !== storyId)
          : [...current.favoriteStoryIds, storyId],
      };
    });
  }, []);

  const markRead = useCallback((storyId: string) => {
    setProgressState((current) => {
      if (current.readStoryIds.includes(storyId)) {
        return current;
      }

      return {
        ...current,
        readStoryIds: [...current.readStoryIds, storyId],
      };
    });
  }, []);

  const setLastPage = useCallback((storyId: string, pageIndex: number) => {
    setProgressState((current) => ({
      ...current,
      lastPages: {
        ...current.lastPages,
        [storyId]: pageIndex,
      },
    }));
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setProgressState((current) => ({ ...current, theme }));
  }, []);

  const setLanguage = useCallback((language: InterfaceLanguage) => {
    setProgressState((current) => ({ ...current, language }));
  }, []);

  const setReaderScale = useCallback((readerScale: ReaderScale) => {
    setProgressState((current) => ({ ...current, readerScale }));
  }, []);

  const toggleIllustrations = useCallback(() => {
    setProgressState((current) => ({
      ...current,
      showIllustrations: !current.showIllustrations,
    }));
  }, []);

  return {
    ...progress,
    favoriteIds,
    readIds,
    toggleFavorite,
    markRead,
    setLastPage,
    setLanguage,
    setReaderScale,
    setTheme,
    toggleIllustrations,
  };
}
