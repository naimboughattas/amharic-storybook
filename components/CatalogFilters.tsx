import { Pressable, Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { durationBucketLabels, scopeLabels, uiText } from "@/features/i18n/translations";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { DurationBucket } from "@/types/story";

export type CatalogScope = "all" | "bedtime" | "library";
export type DurationFilterValue = "all" | DurationBucket;

type Props = {
  scope: CatalogScope;
  duration: DurationFilterValue;
  onScopeChange: (scope: CatalogScope) => void;
  onDurationChange: (duration: DurationFilterValue) => void;
  palette: AppPalette;
  language: InterfaceLanguage;
};

const scopeOptions: CatalogScope[] = ["all", "bedtime", "library"];

const durationOptions: DurationFilterValue[] = ["all", "10_min", "15_min", "20_min"];

function FilterChip({
  label,
  selected,
  onPress,
  palette,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  palette: AppPalette;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: selected ? palette.primary : palette.surface,
        borderColor: selected ? palette.primary : palette.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        opacity: pressed ? 0.78 : 1,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
      })}
    >
      <Text
        selectable
        style={[
          typography.small,
          { color: selected ? palette.primaryText : palette.text, fontWeight: "800" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function CatalogFilters({
  scope,
  duration,
  onScopeChange,
  onDurationChange,
  palette,
  language,
}: Props) {
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ gap: spacing.sm }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          {uiText[language].readingMoment}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {scopeOptions.map((option) => (
            <FilterChip
              key={option}
              label={scopeLabels[language][option]}
              onPress={() => onScopeChange(option)}
              palette={palette}
              selected={scope === option}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          {uiText[language].durationTarget}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {durationOptions.map((option) => (
            <FilterChip
              key={option}
              label={option === "all" ? uiText[language].all : durationBucketLabels[language][option]}
              onPress={() => onDurationChange(option)}
              palette={palette}
              selected={duration === option}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
