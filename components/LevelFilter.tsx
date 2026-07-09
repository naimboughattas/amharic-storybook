import { Pressable, Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { StoryLevel } from "@/types/story";
import { storyLevelLabels } from "@/types/story";

export type LevelFilterValue = "all" | StoryLevel;

type Props = {
  value: LevelFilterValue;
  onChange: (value: LevelFilterValue) => void;
  palette: AppPalette;
};

const options: LevelFilterValue[] = ["all", "beginner", "intermediate", "advanced"];

export function LevelFilter({ value, onChange, palette }: Props) {
  return (
    <View
      accessibilityLabel="Filtrer les histoires par niveau"
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
      }}
    >
      {options.map((option) => {
        const selected = option === value;
        const label = option === "all" ? "Tous" : storyLevelLabels[option];

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option}
            onPress={() => onChange(option)}
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
                {
                  color: selected ? palette.primaryText : palette.text,
                  fontWeight: "800",
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
