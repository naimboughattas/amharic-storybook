import { Pressable, Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { languageLabels, uiText } from "@/features/i18n/translations";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  language: InterfaceLanguage;
  onChange: (language: InterfaceLanguage) => void;
  palette: AppPalette;
};

const options: InterfaceLanguage[] = ["fr", "en"];

export function LanguageToggle({ language, onChange, palette }: Props) {
  return (
    <View
      accessibilityLabel={uiText[language].language}
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.xs,
      }}
    >
      {options.map((option) => {
        const selected = option === language;

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
              opacity: pressed ? 0.76 : 1,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,
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
              {languageLabels[option]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
