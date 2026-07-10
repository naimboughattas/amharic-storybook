import { Pressable, Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { uiText } from "@/features/i18n/translations";
import type { AppPalette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export type HomeSection = "tonight" | "library" | "progress";

const homeSections: HomeSection[] = ["tonight", "library", "progress"];

function getHomeSectionLabel(section: HomeSection, language: InterfaceLanguage) {
  if (section === "tonight") {
    return uiText[language].menuTonight;
  }

  if (section === "library") {
    return uiText[language].menuLibrary;
  }

  return uiText[language].menuProgress;
}

type Props = {
  activeSection: HomeSection;
  language: InterfaceLanguage;
  onChange: (section: HomeSection) => void;
  palette: AppPalette;
};

export function HomeMenu({ activeSection, language, onChange, palette }: Props) {
  return (
    <View
      accessibilityLabel={language === "en" ? "Home menu" : "Menu d'accueil"}
      style={{
        backgroundColor: palette.surface,
        borderColor: palette.border,
        borderRadius: 999,
        borderWidth: 1,
        flexDirection: "row",
        gap: spacing.xs,
        padding: spacing.xs,
      }}
    >
      {homeSections.map((section) => {
        const selected = section === activeSection;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={section}
            onPress={() => onChange(section)}
            style={({ pressed }) => ({
              alignItems: "center",
              backgroundColor: selected ? palette.primary : "transparent",
              borderRadius: 999,
              flex: 1,
              justifyContent: "center",
              minHeight: 42,
              opacity: pressed ? 0.76 : 1,
              paddingHorizontal: spacing.sm,
            })}
          >
            <Text
              selectable
              style={[
                typography.small,
                {
                  color: selected ? palette.primaryText : palette.text,
                  fontWeight: "900",
                  textAlign: "center",
                },
              ]}
            >
              {getHomeSectionLabel(section, language)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
