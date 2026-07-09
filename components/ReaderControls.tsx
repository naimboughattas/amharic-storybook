import { Pressable, Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  palette: AppPalette;
};

export function ReaderControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  palette,
}: Props) {
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <View style={{ gap: spacing.md }}>
      <Text
        selectable
        style={[
          typography.small,
          {
            color: palette.mutedText,
            fontVariant: ["tabular-nums"],
            textAlign: "center",
          },
        ]}
      >
        Page {currentPage + 1} / {totalPages}
      </Text>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Pressable
          accessibilityRole="button"
          disabled={isFirst}
          onPress={onPrevious}
          style={({ pressed }) => ({
            alignItems: "center",
            backgroundColor: palette.surface,
            borderColor: palette.border,
            borderRadius: radius.md,
            borderWidth: 1,
            flex: 1,
            opacity: isFirst ? 0.42 : pressed ? 0.72 : 1,
            paddingVertical: spacing.lg,
          })}
        >
          <Text selectable style={[typography.subtitle, { color: palette.text }]}>
            Precedent
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={isLast}
          onPress={onNext}
          style={({ pressed }) => ({
            alignItems: "center",
            backgroundColor: palette.primary,
            borderRadius: radius.md,
            flex: 1,
            opacity: isLast ? 0.42 : pressed ? 0.72 : 1,
            paddingVertical: spacing.lg,
          })}
        >
          <Text selectable style={[typography.subtitle, { color: palette.primaryText }]}>
            Suivant
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
