import { Pressable, Text } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  label: string;
  palette: AppPalette;
  disabled?: boolean;
  onPress: () => void;
};

export function PrimaryButton({ label, palette, disabled, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: pressed ? palette.accent : palette.primary,
        borderColor: palette.primary,
        borderRadius: radius.md,
        borderWidth: 1,
        justifyContent: "center",
        minHeight: 56,
        opacity: disabled ? 0.42 : 1,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
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
        {label}
      </Text>
    </Pressable>
  );
}
