import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";

import { StoryReader } from "@/components/StoryReader";
import { findStoryById } from "@/data/stories";
import { getStoryTitle } from "@/features/i18n/storyText";
import { uiText } from "@/features/i18n/translations";
import { useReadingProgress } from "@/features/progress/useReadingProgress";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function StoryScreen() {
  // Reading aloud leaves the screen untouched for minutes at a time; letting it
  // dim mid-page breaks the ritual.
  useKeepAwake();

  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const progress = useReadingProgress();
  const palette = colors[progress.theme];
  const language = progress.language;
  const story = useMemo(() => findStoryById(id), [id]);
  // Every page turn is written to the store, so the store is the current page:
  // mirroring it into local state would only add a copy to keep in sync.
  // Readings are composed from source albums and their page count changes
  // between releases, so a page saved against an older edition is clamped back
  // into range instead of pointing past the end.
  const currentPage = story
    ? Math.min(progress.lastPages[story.id] ?? 0, story.pages.length - 1)
    : 0;

  if (!story) {
    return (
      <>
        <Stack.Screen options={{ title: uiText[language].storyNotFound }} />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: palette.background,
            flexGrow: 1,
            justifyContent: "center",
            padding: spacing.xl,
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={{ backgroundColor: palette.background }}
        >
          <Text selectable style={[typography.title, { color: palette.text, textAlign: "center" }]}>
            {uiText[language].storyNotFound}
          </Text>
        </ScrollView>
      </>
    );
  }

  const storyId = story.id;

  return (
    <>
      <Stack.Screen options={{ title: getStoryTitle(story, language) }} />
      <StatusBar style={progress.theme === "dark" ? "light" : "dark"} />
      <SafeAreaView
        style={{
          backgroundColor:
            story.bedtimeFit === "not_bedtime" ? palette.background : palette.bedtimeSurface,
          flex: 1,
        }}
      >
        <StoryReader
          currentPage={currentPage}
          isFavorite={progress.favoriteIds.has(story.id)}
          isRead={progress.readIds.has(story.id)}
          // Remounting on story change resets the reader's own transient state
          // (pause, details sheet) without an effect that mirrors props.
          key={storyId}
          language={progress.language}
          onBackPress={() => router.back()}
          onFavoritePress={() => progress.toggleFavorite(story.id)}
          onLanguageChange={progress.setLanguage}
          onMarkRead={() => progress.markRead(story.id)}
          onPageChange={(page) => progress.setLastPage(storyId, page)}
          onReaderScaleChange={progress.setReaderScale}
          onThemeChange={progress.setTheme}
          palette={palette}
          readerScale={progress.readerScale}
          story={story}
          theme={progress.theme}
        />
      </SafeAreaView>
    </>
  );
}
