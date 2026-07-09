import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = {
  isRead: boolean;
  lastPage?: number;
  totalPages: number;
  palette: AppPalette;
  language: InterfaceLanguage;
};

export function ProgressBadge({ isRead, lastPage, totalPages, palette, language }: Props) {
  const label = isRead
    ? language === "en"
      ? "Read"
      : "Lu"
    : lastPage !== undefined
      ? `Page ${lastPage + 1}/${totalPages}`
      : language === "en"
        ? "New"
        : "Nouveau";

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: isRead ? palette.surfaceStrong : palette.surface,
        borderColor: palette.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
      }}
    >
      <Text
        selectable
        style={[
          typography.small,
          { color: isRead ? palette.success : palette.mutedText, fontWeight: "700" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
