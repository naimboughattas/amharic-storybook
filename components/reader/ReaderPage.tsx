import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { uiText } from "@/features/i18n/translations";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export type ReaderPageSegment = {
  am: string;
  translation?: string;
};

export type ReaderTextSizes = {
  amharicFontSize: number;
  amharicLineHeight: number;
  translationFontSize: number;
  translationLineHeight: number;
};

type Props = {
  amharicText: string;
  segments?: ReaderPageSegment[];
  pageTranslation?: string;
  currentPage: number;
  isPaused: boolean;
  isBedtimeMode: boolean;
  isCompact: boolean;
  language: InterfaceLanguage;
  palette: AppPalette;
  readerText: string;
  sizes: ReaderTextSizes;
  theme: ThemeMode;
};

export function ReaderPage({
  amharicText,
  segments,
  pageTranslation,
  currentPage,
  isPaused,
  isBedtimeMode,
  isCompact,
  language,
  palette,
  readerText,
  sizes,
  theme,
}: Props) {
  const hasSegmentTranslation = segments?.some((segment) => segment.translation);
  const amharicStyle = {
    color: isBedtimeMode ? palette.bedtimeText : palette.text,
    fontSize: sizes.amharicFontSize,
    lineHeight: sizes.amharicLineHeight,
    textAlign: "left" as const,
    writingDirection: "ltr" as const,
  };

  return (
    <View
      style={{
        backgroundColor: palette.surface,
        borderColor: isBedtimeMode ? palette.bedtimeBorder : palette.border,
        borderRadius: radius.md,
        borderWidth: 1,
        minHeight: 280,
        padding: isCompact ? spacing.md : spacing.xl,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: theme === "dark" ? 0.22 : 0.08,
        shadowRadius: 24,
      }}
    >
      {isPaused ? (
        <View style={{ gap: spacing.md, justifyContent: "center", minHeight: 220 }}>
          <Text selectable style={[typography.title, { color: readerText, textAlign: "center" }]}>
            {uiText[language].pauseTitle}
          </Text>
          <Text selectable style={[typography.body, { color: readerText, textAlign: "center" }]}>
            {uiText[language].pauseBody}
          </Text>
        </View>
      ) : (
        <View style={{ gap: segments ? spacing.lg : 0 }}>
          {segments ? (
            <>
              {hasSegmentTranslation ? (
                <Text style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}>
                  {uiText[language].translationCandidate}
                </Text>
              ) : null}
              {segments.map((segment, index) => (
                <View
                  key={`${currentPage}-${index}-${segment.am.slice(0, 12)}`}
                  style={{ gap: spacing.xs }}
                >
                  <Text selectable style={[typography.amharicReader, amharicStyle]}>
                    {segment.am}
                  </Text>
                  {segment.translation ? (
                    <Text
                      selectable
                      style={[
                        typography.small,
                        {
                          color: palette.mutedText,
                          fontSize: sizes.translationFontSize,
                          lineHeight: sizes.translationLineHeight,
                        },
                      ]}
                    >
                      {segment.translation}
                    </Text>
                  ) : null}
                </View>
              ))}
            </>
          ) : (
            <Text selectable style={[typography.amharicReader, amharicStyle]}>
              {amharicText}
            </Text>
          )}
        </View>
      )}

      {!isPaused && !segments ? (
        <View
          style={{
            borderColor: palette.border,
            borderTopWidth: 1,
            gap: spacing.xs,
            marginTop: spacing.lg,
            paddingTop: spacing.md,
          }}
        >
          <Text style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}>
            {pageTranslation
              ? uiText[language].translationCandidate
              : uiText[language].translations}
          </Text>
          <Text selectable style={[typography.small, { color: palette.mutedText }]}>
            {pageTranslation ?? uiText[language].translationUnavailable}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
