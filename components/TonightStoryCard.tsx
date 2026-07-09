import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";
import { bedtimeFitLabels, durationBucketLabels } from "@/types/story";

type Props = {
  story: Story;
  palette: AppPalette;
};

export function TonightStoryCard({ story, palette }: Props) {
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
          Ce soir
        </Text>
        <Text selectable style={[typography.title, { color: palette.text }]}>
          {story.titleAm}
        </Text>
        {story.titleFr ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            {story.titleFr}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        <Text selectable style={[typography.small, { color: palette.text, fontWeight: "800" }]}>
          {durationBucketLabels[story.durationBucket]}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.estimatedMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.ageRange} ans
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {bedtimeFitLabels[story.bedtimeFit]}
        </Text>
      </View>

      <Text selectable style={[typography.body, { color: palette.text }]}>
        {story.bedtimeSummary}
      </Text>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          Petit guide de lecture
        </Text>
        {story.readingTips.slice(0, 2).map((tip) => (
          <Text key={tip} selectable style={[typography.small, { color: palette.mutedText }]}>
            - {tip}
          </Text>
        ))}
      </View>

      <Link href={`/story/${story.id}`} asChild>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => ({
            alignItems: "center",
            backgroundColor: palette.primary,
            borderRadius: radius.md,
            opacity: pressed ? 0.78 : 1,
            paddingVertical: spacing.lg,
          })}
        >
          <Text selectable style={[typography.subtitle, { color: palette.primaryText }]}>
            Commencer le rituel
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
