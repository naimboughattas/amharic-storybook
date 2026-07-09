import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  CatalogFilters,
  type CatalogScope,
  type DurationFilterValue,
} from "@/components/CatalogFilters";
import { LevelFilter, type LevelFilterValue } from "@/components/LevelFilter";
import { StoryCard } from "@/components/StoryCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TonightStoryCard } from "@/components/TonightStoryCard";
import { getTonightStory, stories } from "@/data/stories";
import { useReadingProgress } from "@/features/progress/useReadingProgress";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function HomeScreen() {
  const [level, setLevel] = useState<LevelFilterValue>("all");
  const [scope, setScope] = useState<CatalogScope>("all");
  const [duration, setDuration] = useState<DurationFilterValue>("all");
  const progress = useReadingProgress();
  const palette = colors[progress.theme];
  const tonightStory = useMemo(() => getTonightStory(), []);
  const bedtimeCount = useMemo(
    () => stories.filter((story) => story.bedtimeFit !== "not_bedtime").length,
    [],
  );
  const bedtimeCountLabel =
    bedtimeCount > 1 ? `${bedtimeCount} lectures du soir disponibles` : "1 lecture du soir disponible";

  const filteredStories = useMemo(
    () =>
      stories.filter((story) => {
        const levelMatches = level === "all" || story.level === level;
        const durationMatches = duration === "all" || story.durationBucket === duration;
        const scopeMatches =
          scope === "all" ||
          (scope === "bedtime" && story.bedtimeFit !== "not_bedtime") ||
          (scope === "library" && story.bedtimeFit === "not_bedtime");

        return levelMatches && durationMatches && scopeMatches;
      }),
    [duration, level, scope],
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: palette.background },
          headerTintColor: palette.text,
          title: "Histoire du soir",
        }}
      />
      <StatusBar style={progress.theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: palette.background,
          gap: spacing.xl,
          padding: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: palette.background }}
      >
        <View style={{ gap: spacing.md }}>
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "row",
              gap: spacing.md,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, gap: spacing.xs }}>
              <Text selectable style={[typography.appTitle, { color: palette.text }]}>
                የሌሊት ታሪክ
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                Choisis vite une lecture douce en amharique pour le rituel du coucher.
              </Text>
            </View>
            <ThemeToggle onChange={progress.setTheme} palette={palette} theme={progress.theme} />
          </View>
        </View>

        <TonightStoryCard palette={palette} story={tonightStory} />

        <View style={{ gap: spacing.md }}>
          <View style={{ gap: spacing.xs }}>
            <Text selectable style={[typography.title, { color: palette.text }]}>
              Explorer le catalogue
            </Text>
            <Text selectable style={[typography.body, { color: palette.mutedText }]}>
              {bedtimeCountLabel} sur {stories.length}. Les autres restent utiles hors rituel.
            </Text>
          </View>
          <CatalogFilters
            duration={duration}
            onDurationChange={setDuration}
            onScopeChange={setScope}
            palette={palette}
            scope={scope}
          />
          <LevelFilter onChange={setLevel} palette={palette} value={level} />
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <StoryCard
                isFavorite={progress.favoriteIds.has(story.id)}
                isRead={progress.readIds.has(story.id)}
                key={story.id}
                lastPage={progress.lastPages[story.id]}
                palette={palette}
                story={story}
              />
            ))
          ) : (
            <Text selectable style={[typography.body, { color: palette.mutedText }]}>
              Aucune autre lecture pour ce filtre.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}
