import { Switch, Text, View } from "react-native";

import type { AppPalette, ThemeMode } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
  palette: AppPalette;
};

export function ThemeToggle({ theme, onChange, palette }: Props) {
  const isDark = theme === "dark";

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.sm,
      }}
    >
      <Text selectable style={[typography.small, { color: palette.mutedText }]}>
        {isDark ? "Sombre" : "Clair"}
      </Text>
      <Switch
        accessibilityLabel="Changer le theme clair ou sombre"
        onValueChange={(enabled) => onChange(enabled ? "dark" : "light")}
        thumbColor={isDark ? palette.primary : palette.surface}
        trackColor={{ false: palette.border, true: palette.primary }}
        value={isDark}
      />
    </View>
  );
}
