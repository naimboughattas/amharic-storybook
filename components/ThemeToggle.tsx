import { Switch, Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { uiText } from "@/features/i18n/translations";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
  palette: AppPalette;
  language: InterfaceLanguage;
};

export function ThemeToggle({ theme, onChange, palette, language }: Props) {
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
        {isDark ? uiText[language].dark : uiText[language].light}
      </Text>
      <Switch
        accessibilityLabel={uiText[language].themeToggleLabel}
        onValueChange={(enabled) => onChange(enabled ? "dark" : "light")}
        thumbColor={isDark ? palette.primary : palette.surface}
        trackColor={{ false: palette.border, true: palette.primary }}
        value={isDark}
      />
    </View>
  );
}
