import { Pressable, Text } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  label: string;
  tone?: "primary" | "quiet";
  disabled?: boolean;
  palette: AppPalette;
  onPress: () => void;
};

export function RitualButton({ label, tone = "quiet", disabled, palette, onPress }: Props) {
  const isPrimary = tone === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: isPrimary ? palette.primary : palette.surface,
        borderColor: isPrimary ? palette.primary : palette.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        flex: 1,
        minHeight: 50,
        justifyContent: "center",
        opacity: disabled ? 0.38 : pressed ? 0.74 : 1,
        paddingHorizontal: spacing.md,
      })}
    >
      <Text
        style={[
          typography.small,
          {
            color: isPrimary ? palette.primaryText : palette.text,
            fontWeight: "800",
            textAlign: "center",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
