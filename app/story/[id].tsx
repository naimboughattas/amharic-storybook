import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { StoryReader } from "@/components/StoryReader";
import { findStoryById } from "@/data/stories";
import { useReadingProgress } from "@/features/progress/useReadingProgress";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const progress = useReadingProgress();
  const palette = colors[progress.theme];
  const story = useMemo(() => findStoryById(id), [id]);
  const savedPage = story ? progress.lastPages[story.id] ?? 0 : 0;
  const [currentPage, setCurrentPage] = useState(savedPage);

  useEffect(() => {
    setCurrentPage(savedPage);
  }, [savedPage, story?.id]);

  if (!story) {
    return (
      <>
        <Stack.Screen options={{ title: "Histoire introuvable" }} />
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
            Histoire introuvable.
          </Text>
        </ScrollView>
      </>
    );
  }

  const storyId = story.id;

  function handlePageChange(page: number) {
    setCurrentPage(page);
    progress.setLastPage(storyId, page);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: story.titleFr ?? story.titleAm,
        }}
      />
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
          language={progress.language}
          onBackPress={() => router.back()}
          onFavoritePress={() => progress.toggleFavorite(story.id)}
          onLanguageChange={progress.setLanguage}
          onMarkRead={() => progress.markRead(story.id)}
          onPageChange={handlePageChange}
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
