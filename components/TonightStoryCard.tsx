import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { bedtimeFitLabels, durationBucketLabels, uiText } from "@/features/i18n/translations";
import {
  getStoryBedtimeSummary,
  getStoryReadingTips,
  getStoryTitle,
} from "@/features/i18n/storyText";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  palette: AppPalette;
  language: InterfaceLanguage;
};

export function TonightStoryCard({ story, palette, language }: Props) {
  const readingTips = getStoryReadingTips(story, language);

  return (
    <View
      style={{
        backgroundColor: palette.surfaceStrong,
        borderColor: palette.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.lg,
        padding: spacing.lg,
      }}
    >
      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.small, { color: palette.warning, fontWeight: "800" }]}>
          {uiText[language].tonight}
        </Text>
        <Text selectable style={[typography.title, { color: palette.text }]}>
          {story.titleAm}
        </Text>
        {story.titleFr ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            {getStoryTitle(story, language)}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        <Text selectable style={[typography.small, { color: palette.text, fontWeight: "800" }]}>
          {durationBucketLabels[language][story.durationBucket]}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.estimatedMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.ageRange} {language === "en" ? "years" : "ans"}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {bedtimeFitLabels[language][story.bedtimeFit]}
        </Text>
      </View>

      <Text selectable style={[typography.body, { color: palette.text }]}>
        {getStoryBedtimeSummary(story, language)}
      </Text>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          {language === "en" ? "Small reading guide" : "Petit guide de lecture"}
        </Text>
        {readingTips.slice(0, 2).map((tip) => (
          <Text key={tip} selectable style={[typography.small, { color: palette.mutedText }]}>
            - {tip}
          </Text>
        ))}
      </View>

      <View
        style={{
          backgroundColor: palette.primary,
          borderColor: palette.primary,
          borderRadius: radius.md,
          borderWidth: 1,
          minHeight: 58,
          overflow: "hidden",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.14,
          shadowRadius: 14,
        }}
      >
        <Link href={`/story/${story.id}`} asChild>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => ({
              alignItems: "center",
              backgroundColor: pressed ? palette.accent : palette.primary,
              flex: 1,
              justifyContent: "center",
              minHeight: 58,
              opacity: pressed ? 0.92 : 1,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
            })}
          >
            <Text
              selectable
              style={[
                typography.subtitle,
                {
                  color: palette.primaryText,
                  fontWeight: "900",
                  textAlign: "center",
                },
              ]}
            >
              {uiText[language].startRitual}
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
