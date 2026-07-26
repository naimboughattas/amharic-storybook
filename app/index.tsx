import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  CatalogFilters,
  type CatalogScope,
  type DurationFilterValue,
} from "@/components/CatalogFilters";
import { HomeMenu, type HomeSection } from "@/components/HomeMenu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LevelFilter, type LevelFilterValue } from "@/components/LevelFilter";
import { StoryCard } from "@/components/StoryCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TonightStoryCard } from "@/components/TonightStoryCard";
import { getTonightStory, stories } from "@/data/stories";
import { formatText, uiText } from "@/features/i18n/translations";
import { useReadingProgress } from "@/features/progress/useReadingProgress";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeSection, setActiveSection] = useState<HomeSection>("tonight");
  const [level, setLevel] = useState<LevelFilterValue>("all");
  const [scope, setScope] = useState<CatalogScope>("all");
  const [duration, setDuration] = useState<DurationFilterValue>("all");
  const progress = useReadingProgress();
  const palette = colors[progress.theme];
  const language = progress.language;
  const isCompact = width < 430;
  // Recomputed when progress changes so a reading finished tonight stops being
  // the one suggested; the date is read once per mount, not per render.
  const tonightStory = useMemo(
    () => getTonightStory({ readIds: progress.readIds, favoriteIds: progress.favoriteIds }),
    [progress.favoriteIds, progress.readIds],
  );
  const bedtimeCount = useMemo(
    () => stories.filter((story) => story.bedtimeFit !== "not_bedtime").length,
    [],
  );
  const catalogSubtitle = formatText(
    bedtimeCount > 1
      ? uiText[language].catalogSubtitleOther
      : uiText[language].catalogSubtitleOne,
    { count: bedtimeCount, total: stories.length },
  );

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
  const progressStories = useMemo(
    () =>
      stories.filter((story) => {
        const lastPage = progress.lastPages[story.id] ?? 0;
        return lastPage > 0 || progress.readIds.has(story.id) || progress.favoriteIds.has(story.id);
      }),
    [progress.favoriteIds, progress.lastPages, progress.readIds],
  );

  return (
    <>
      {/* Header colors come from the root layout; only the title is per-screen. */}
      <Stack.Screen options={{ title: uiText[language].homeHeaderTitle }} />
      <StatusBar style={progress.theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: palette.background,
          gap: isCompact ? spacing.lg : spacing.xl,
          padding: isCompact ? spacing.md : spacing.lg,
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
              flexWrap: isCompact ? "wrap" : "nowrap",
              gap: isCompact ? spacing.sm : spacing.md,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, gap: spacing.xs, minWidth: 0 }}>
              <Text
                selectable
                style={[
                  typography.appTitle,
                  {
                    color: palette.text,
                    fontSize: isCompact ? 28 : typography.appTitle.fontSize,
                    lineHeight: isCompact ? 34 : typography.appTitle.lineHeight,
                  },
                ]}
              >
                {uiText[language].appTitle}
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {uiText[language].bedtimeTagline}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", flexShrink: 0, gap: spacing.sm }}>
              <LanguageToggle
                language={language}
                onChange={progress.setLanguage}
                palette={palette}
              />
              <ThemeToggle
                language={language}
                onChange={progress.setTheme}
                palette={palette}
                theme={progress.theme}
              />
            </View>
          </View>
        </View>

        <HomeMenu
          activeSection={activeSection}
          language={language}
          onChange={setActiveSection}
          palette={palette}
        />

        {activeSection === "tonight" ? (
          <TonightStoryCard
            compact={isCompact}
            language={language}
            palette={palette}
            story={tonightStory}
          />
        ) : null}

        {activeSection === "library" ? (
          <View style={{ gap: spacing.md }}>
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={[typography.title, { color: palette.text }]}>
                {uiText[language].catalogTitle}
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {catalogSubtitle}
              </Text>
            </View>
            <CatalogFilters
              duration={duration}
              language={language}
              onDurationChange={setDuration}
              onScopeChange={setScope}
              palette={palette}
              scope={scope}
            />
            <LevelFilter
              language={language}
              onChange={setLevel}
              palette={palette}
              value={level}
            />
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <StoryCard
                  isFavorite={progress.favoriteIds.has(story.id)}
                  isRead={progress.readIds.has(story.id)}
                  key={story.id}
                  language={language}
                  lastPage={progress.lastPages[story.id]}
                  palette={palette}
                  story={story}
                />
              ))
            ) : (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {uiText[language].emptyFilter}
              </Text>
            )}
          </View>
        ) : null}

        {activeSection === "progress" ? (
          <View style={{ gap: spacing.md }}>
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={[typography.title, { color: palette.text }]}>
                {uiText[language].progressTitle}
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {uiText[language].progressIntro}
              </Text>
            </View>
            {progressStories.length > 0 ? (
              progressStories.map((story) => (
                <StoryCard
                  isFavorite={progress.favoriteIds.has(story.id)}
                  isRead={progress.readIds.has(story.id)}
                  key={story.id}
                  language={language}
                  lastPage={progress.lastPages[story.id]}
                  palette={palette}
                  story={story}
                />
              ))
            ) : (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {uiText[language].progressEmpty}
              </Text>
            )}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}
