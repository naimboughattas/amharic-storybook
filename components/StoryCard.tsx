import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ProgressBadge } from "@/components/ProgressBadge";
import { ValidationStatusBadge } from "@/components/ValidationStatusBadge";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import {
  bedtimeFitLabels,
  durationBucketLabels,
  storyLevelLabels,
  uiText,
} from "@/features/i18n/translations";
import { getStoryMood, getStoryTitle } from "@/features/i18n/storyText";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  isRead: boolean;
  isFavorite: boolean;
  lastPage?: number;
  palette: AppPalette;
  language: InterfaceLanguage;
};

export function StoryCard({ story, isRead, isFavorite, lastPage, palette, language }: Props) {
  const isBedtimeStory = story.bedtimeFit !== "not_bedtime";
  const localizedTitle = getStoryTitle(story, language);

  return (
    <Link href={`/story/${story.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => ({
          backgroundColor: isBedtimeStory ? palette.bedtimeSurface : palette.surface,
          borderColor: isBedtimeStory ? palette.bedtimeBorder : palette.border,
          borderRadius: radius.md,
          borderWidth: 1,
          gap: spacing.md,
          opacity: pressed ? 0.8 : 1,
          padding: spacing.lg,
        })}
      >
        <View style={{ flexDirection: "row", gap: spacing.md, justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: spacing.xs }}>
            <Text selectable style={[typography.title, { color: palette.text }]}>
              {story.titleAm}
            </Text>
            {localizedTitle === story.titleAm ? null : (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {localizedTitle}
              </Text>
            )}
          </View>
          {/* Rendered only when set: an empty labelled node was announced by
              screen readers as "not a favorite" on every single card. */}
          {isFavorite ? (
            <Text
              accessibilityLabel={uiText[language].favoriteStory}
              style={[typography.title, { color: palette.accent }]}
            >
              {uiText[language].favorite}
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <ProgressBadge
            isRead={isRead}
            lastPage={lastPage}
            language={language}
            palette={palette}
            totalPages={story.pages.length}
          />
          <ValidationStatusBadge
            language={language}
            palette={palette}
            status={story.validationStatus}
          />
        </View>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {storyLevelLabels[language][story.level]} · {story.ageRange}{" "}
          {uiText[language].years} · {story.estimatedMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {durationBucketLabels[language][story.durationBucket]} ·{" "}
          {getStoryMood(story, language)} · {bedtimeFitLabels[language][story.bedtimeFit]}
        </Text>
      </Pressable>
    </Link>
  );
}
