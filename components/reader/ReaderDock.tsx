import { Pressable, Text, View } from "react-native";

import { RitualButton } from "@/components/reader/RitualButton";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import { uiText } from "@/features/i18n/translations";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  isFirstPage: boolean;
  isLastPage: boolean;
  isPaused: boolean;
  isDetailsOpen: boolean;
  canShrinkText: boolean;
  canGrowText: boolean;
  language: InterfaceLanguage;
  palette: AppPalette;
  theme: ThemeMode;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onTogglePause: () => void;
  onToggleDetails: () => void;
  onShrinkText: () => void;
  onGrowText: () => void;
};

function ScaleButton({
  label,
  accessibilityLabel,
  disabled,
  palette,
  onPress,
}: {
  label: string;
  accessibilityLabel: string;
  disabled: boolean;
  palette: AppPalette;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: palette.surface,
        borderColor: palette.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        minHeight: 38,
        minWidth: 54,
        justifyContent: "center",
        opacity: disabled ? 0.38 : pressed ? 0.72 : 1,
        paddingHorizontal: spacing.md,
      })}
    >
      <Text
        style={[typography.small, { color: palette.text, fontWeight: "900", textAlign: "center" }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ReaderDock({
  isFirstPage,
  isLastPage,
  isPaused,
  isDetailsOpen,
  canShrinkText,
  canGrowText,
  language,
  palette,
  theme,
  onPreviousPage,
  onNextPage,
  onTogglePause,
  onToggleDetails,
  onShrinkText,
  onGrowText,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: palette.surface,
        borderColor: palette.border,
        borderRadius: radius.md,
        borderWidth: 1,
        bottom: spacing.lg,
        gap: spacing.sm,
        left: spacing.lg,
        padding: spacing.sm,
        position: "absolute",
        right: spacing.lg,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: theme === "dark" ? 0.32 : 0.1,
        shadowRadius: 22,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: spacing.sm,
          justifyContent: "space-between",
        }}
      >
        <Text style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}>
          {uiText[language].readerTextSize}
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <ScaleButton
            accessibilityLabel={uiText[language].readerTextSmaller}
            disabled={!canShrinkText}
            label="A-"
            onPress={onShrinkText}
            palette={palette}
          />
          <ScaleButton
            accessibilityLabel={uiText[language].readerTextLarger}
            disabled={!canGrowText}
            label="A+"
            onPress={onGrowText}
            palette={palette}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <RitualButton
          disabled={isFirstPage}
          label={uiText[language].previous}
          onPress={onPreviousPage}
          palette={palette}
        />
        <RitualButton
          label={isPaused ? uiText[language].resume : uiText[language].pause}
          onPress={onTogglePause}
          palette={palette}
        />
        <RitualButton
          disabled={isLastPage}
          label={uiText[language].next}
          onPress={onNextPage}
          palette={palette}
          tone="primary"
        />
        <RitualButton
          label={isDetailsOpen ? uiText[language].close : uiText[language].info}
          onPress={onToggleDetails}
          palette={palette}
        />
      </View>
    </View>
  );
}
