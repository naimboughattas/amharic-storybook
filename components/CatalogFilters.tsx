import { Pressable, Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { DurationBucket } from "@/types/story";
import { durationBucketLabels } from "@/types/story";

export type CatalogScope = "all" | "bedtime" | "library";
export type DurationFilterValue = "all" | DurationBucket;

type Props = {
  scope: CatalogScope;
  duration: DurationFilterValue;
  onScopeChange: (scope: CatalogScope) => void;
  onDurationChange: (duration: DurationFilterValue) => void;
  palette: AppPalette;
};

const scopeOptions: Array<{ label: string; value: CatalogScope }> = [
  { label: "Tous", value: "all" },
  { label: "Soir", value: "bedtime" },
  { label: "Bibliotheque", value: "library" },
];

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
}: Props) {
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ gap: spacing.sm }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          Moment de lecture
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {scopeOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              onPress={() => onScopeChange(option.value)}
              palette={palette}
              selected={scope === option.value}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          Duree cible
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {durationOptions.map((option) => (
            <FilterChip
              key={option}
              label={option === "all" ? "Toutes" : durationBucketLabels[option]}
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
