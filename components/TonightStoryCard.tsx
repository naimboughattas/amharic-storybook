import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { PrimaryButton } from "@/components/PrimaryButton";
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
  compact?: boolean;
};

export function TonightStoryCard({ story, palette, language, compact }: Props) {
  const router = useRouter();
  const readingTips = getStoryReadingTips(story, language);
  const visibleTips = compact ? readingTips.slice(0, 1) : readingTips.slice(0, 2);
  const localizedTitle = getStoryTitle(story, language);

  return (
    <View
      style={{
        backgroundColor: palette.surfaceStrong,
        borderColor: palette.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: compact ? spacing.md : spacing.lg,
        padding: compact ? spacing.md : spacing.lg,
      }}
    >
      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.small, { color: palette.warning, fontWeight: "800" }]}>
          {uiText[language].tonight}
        </Text>
        <Text selectable style={[typography.title, { color: palette.text, flexShrink: 1, width: "100%" }]}>
          {story.titleAm}
        </Text>
        {localizedTitle === story.titleAm ? null : (
          <Text
            selectable
            style={[typography.body, { color: palette.mutedText, flexShrink: 1, width: "100%" }]}
          >
            {localizedTitle}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        <Text selectable style={[typography.small, { color: palette.text, fontWeight: "800" }]}>
          {durationBucketLabels[language][story.durationBucket]}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.estimatedMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.ageRange} {uiText[language].years}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {bedtimeFitLabels[language][story.bedtimeFit]}
        </Text>
      </View>

      <Text selectable style={[typography.body, { color: palette.text, flexShrink: 1, width: "100%" }]}>
        {getStoryBedtimeSummary(story, language)}
      </Text>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          {uiText[language].readingGuideTitle}
        </Text>
        {visibleTips.map((tip) => (
          <Text key={tip} selectable style={[typography.small, { color: palette.mutedText }]}>
            - {tip}
          </Text>
        ))}
      </View>

      <PrimaryButton
        label={uiText[language].startRitual}
        onPress={() => router.push(`/story/${story.id}`)}
        palette={palette}
      />
    </View>
  );
}
