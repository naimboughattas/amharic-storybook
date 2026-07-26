import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { formatText, uiText } from "@/features/i18n/translations";
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
  // A page saved against an older edition of the reading can sit past the end of
  // the current one; the badge must not announce "Page 60/49".
  const resumePage = lastPage === undefined ? undefined : Math.min(lastPage, totalPages - 1);
  const label = isRead
    ? uiText[language].badgeRead
    : resumePage !== undefined
      ? formatText(uiText[language].pageCounter, {
          current: resumePage + 1,
          total: totalPages,
        })
      : uiText[language].badgeNew;

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
