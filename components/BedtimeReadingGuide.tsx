import { Pressable, Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  currentPage: number;
  totalPages: number;
  isPaused: boolean;
  onTogglePause: () => void;
  palette: AppPalette;
};

export function BedtimeReadingGuide({
  story,
  currentPage,
  totalPages,
  isPaused,
  onTogglePause,
  palette,
}: Props) {
  const remainingMinutes = Math.max(
    1,
    Math.ceil(((totalPages - currentPage) / totalPages) * story.estimatedMinutes),
  );
  const tip =
    story.readingTips.length > 0
      ? story.readingTips[currentPage % story.readingTips.length]
      : story.bedtimeSummary;

  return (
    <View
      style={{
        backgroundColor: palette.bedtimeSurface,
        borderColor: palette.bedtimeBorder,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.lg,
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        <Text selectable style={[typography.small, { color: palette.bedtimeText, fontWeight: "800" }]}>
          Encore {remainingMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.bedtimeText }]}>
          Page {currentPage + 1} / {totalPages}
        </Text>
      </View>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.subtitle, { color: palette.bedtimeText }]}>
          Conseil de narration
        </Text>
        <Text selectable style={[typography.body, { color: palette.bedtimeText }]}>
          {tip}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onTogglePause}
        style={({ pressed }) => ({
          alignItems: "center",
          backgroundColor: isPaused ? palette.primary : palette.surface,
          borderColor: isPaused ? palette.primary : palette.bedtimeBorder,
          borderRadius: radius.md,
          borderWidth: 1,
          opacity: pressed ? 0.76 : 1,
          paddingVertical: spacing.md,
        })}
      >
        <Text
          selectable
          style={[
            typography.subtitle,
            { color: isPaused ? palette.primaryText : palette.bedtimeText },
          ]}
        >
          {isPaused ? "Reprendre l'histoire" : "Pause calin"}
        </Text>
      </Pressable>
    </View>
  );
}
