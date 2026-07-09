import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { validationStatusLabels } from "@/features/i18n/translations";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { ValidationStatus } from "@/types/story";

type Props = {
  status: ValidationStatus;
  palette: AppPalette;
  language: InterfaceLanguage;
};

const statusTone: Record<ValidationStatus, keyof AppPalette> = {
  draft: "mutedText",
  translated: "warning",
  native_reviewed: "primary",
  child_tested: "accent",
  licensed: "success",
  published: "success",
};

export function ValidationStatusBadge({ status, palette, language }: Props) {
  const tone = palette[statusTone[status]];

  return (
    <View
      style={{
        alignSelf: "flex-start",
        borderColor: tone,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
      }}
    >
      <Text selectable style={[typography.small, { color: tone, fontWeight: "700" }]}>
        {validationStatusLabels[language][status]}
      </Text>
    </View>
  );
}
