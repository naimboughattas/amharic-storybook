import { Pressable, Text, View } from "react-native";

import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import { formatText, uiText } from "@/features/i18n/translations";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  currentPage: number;
  totalPages: number;
  remainingMinutes: number;
  isBedtimeMode: boolean;
  isFinished: boolean;
  isCompact: boolean;
  language: InterfaceLanguage;
  palette: AppPalette;
  readerText: string;
  theme: ThemeMode;
  onBackPress: () => void;
  onLanguageChange: (language: InterfaceLanguage) => void;
  onThemeChange: (theme: ThemeMode) => void;
};

export function ReaderHeader({
  currentPage,
  totalPages,
  remainingMinutes,
  isBedtimeMode,
  isFinished,
  isCompact,
  language,
  palette,
  readerText,
  theme,
  onBackPress,
  onLanguageChange,
  onThemeChange,
}: Props) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flexWrap: isCompact ? "wrap" : "nowrap",
        gap: isCompact ? spacing.sm : spacing.md,
        justifyContent: "space-between",
        paddingHorizontal: isCompact ? spacing.md : spacing.lg,
        paddingTop: spacing.md,
      }}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onBackPress}
        style={({ pressed }) => ({
          backgroundColor: palette.surface,
          borderColor: palette.border,
          borderRadius: radius.pill,
          borderWidth: 1,
          flexShrink: 0,
          opacity: pressed ? 0.7 : 1,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        })}
      >
        <Text style={[typography.small, { color: palette.text, fontWeight: "800" }]}>
          {uiText[language].return}
        </Text>
      </Pressable>

      <View style={{ alignItems: "center", flex: 1, flexShrink: 1, gap: spacing.xs, minWidth: 0 }}>
        <Text
          numberOfLines={isCompact ? 2 : 1}
          style={[typography.small, { color: readerText, fontWeight: "800", textAlign: "center" }]}
        >
          {isBedtimeMode ? uiText[language].bedtimeMode : uiText[language].readingMode}
        </Text>
        {/* A countdown is meaningless once the reading is closed. */}
        {isFinished ? null : (
          <Text
            numberOfLines={isCompact ? 2 : 1}
            style={[typography.small, { color: readerText, opacity: 0.78, textAlign: "center" }]}
          >
            {formatText(uiText[language].pageCounter, {
              current: currentPage + 1,
              total: totalPages,
            })}{" "}
            · {formatText(uiText[language].minutesLeft, { minutes: remainingMinutes })}
          </Text>
        )}
      </View>

      <View style={{ alignItems: "flex-end", flexShrink: 0, gap: spacing.xs }}>
        <LanguageToggle language={language} onChange={onLanguageChange} palette={palette} />
        <ThemeToggle
          language={language}
          onChange={onThemeChange}
          palette={palette}
          theme={theme}
        />
      </View>
    </View>
  );
}
