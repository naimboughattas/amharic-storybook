import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";

import { LanguageToggle } from "@/components/LanguageToggle";
import { QualityChecklist } from "@/components/QualityChecklist";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ValidationStatusBadge } from "@/components/ValidationStatusBadge";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { ReaderScale } from "@/features/progress/progressStorage";
import {
  bedtimeFitLabels,
  durationBucketLabels,
  storyLevelLabels,
  uiText,
} from "@/features/i18n/translations";
import {
  getStoryMood,
  getStoryPageTranslation,
  getStoryPageTranslationSegments,
  getStoryReadingTips,
  getStoryTitle,
} from "@/features/i18n/storyText";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  currentPage: number;
  isFavorite: boolean;
  isRead: boolean;
  theme: ThemeMode;
  language: InterfaceLanguage;
  palette: AppPalette;
  readerScale: ReaderScale;
  onBackPress: () => void;
  onLanguageChange: (language: InterfaceLanguage) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onFavoritePress: () => void;
  onMarkRead: () => void;
  onPageChange: (page: number) => void;
  onReaderScaleChange: (scale: ReaderScale) => void;
};

type RitualButtonProps = {
  label: string;
  tone?: "primary" | "quiet";
  disabled?: boolean;
  palette: AppPalette;
  onPress: () => void;
};

const readerScales: ReaderScale[] = ["small", "regular", "large"];

const readerScaleMultipliers: Record<ReaderScale, number> = {
  small: 0.92,
  regular: 1,
  large: 1.14,
};

function RitualButton({
  label,
  tone = "quiet",
  disabled,
  palette,
  onPress,
}: RitualButtonProps) {
  const isPrimary = tone === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: isPrimary ? palette.primary : palette.surface,
        borderColor: isPrimary ? palette.primary : palette.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        flex: 1,
        minHeight: 50,
        justifyContent: "center",
        opacity: disabled ? 0.38 : pressed ? 0.74 : 1,
        paddingHorizontal: spacing.md,
      })}
    >
      <Text
        selectable
        style={[
          typography.small,
          {
            color: isPrimary ? palette.primaryText : palette.text,
            fontWeight: "800",
            textAlign: "center",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type ReaderScaleButtonProps = {
  label: string;
  disabled: boolean;
  palette: AppPalette;
  onPress: () => void;
};

function ReaderScaleButton({ label, disabled, palette, onPress }: ReaderScaleButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
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
        selectable
        style={[typography.small, { color: palette.text, fontWeight: "900", textAlign: "center" }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function getRemainingMinutes(story: Story, currentPage: number, totalPages: number) {
  return Math.max(1, Math.ceil(((totalPages - currentPage) / totalPages) * story.estimatedMinutes));
}

function getNarrationTip(story: Story, currentPage: number) {
  if (story.readingTips.length === 0) {
    return story.bedtimeSummary;
  }

  return story.readingTips[currentPage % story.readingTips.length];
}

export function StoryReader({
  story,
  currentPage,
  isFavorite,
  isRead,
  theme,
  language,
  palette,
  readerScale,
  onBackPress,
  onLanguageChange,
  onThemeChange,
  onFavoritePress,
  onMarkRead,
  onPageChange,
  onReaderScaleChange,
}: Props) {
  const { width } = useWindowDimensions();
  const totalPages = story.pages.length;
  const isBedtimeMode = story.bedtimeFit !== "not_bedtime";
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;
  const isCompact = width < 430;
  const remainingMinutes = getRemainingMinutes(story, currentPage, totalPages);
  const readingTips = getStoryReadingTips(story, language);
  const narrationTip = getNarrationTip({ ...story, readingTips }, currentPage);
  const pageTranslation = getStoryPageTranslation(story, language, currentPage);
  const pageTranslationSegments = getStoryPageTranslationSegments(story, language, currentPage);
  const hasSegmentTranslation = pageTranslationSegments?.some((segment) => segment.translation);
  const [isPaused, setIsPaused] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const normalizedReaderScale = readerScaleMultipliers[readerScale] ? readerScale : "regular";
  const scaleIndex = readerScales.indexOf(normalizedReaderScale);
  const scaleMultiplier = readerScaleMultipliers[normalizedReaderScale];
  const baseAmharicSize = isCompact ? 26 : typography.amharicReader.fontSize;
  const baseAmharicLineHeight = isCompact ? 42 : typography.amharicReader.lineHeight;
  const amharicFontSize = Math.round(baseAmharicSize * scaleMultiplier);
  const amharicLineHeight = Math.round(baseAmharicLineHeight * scaleMultiplier);
  const translationFontSize = Math.round(typography.small.fontSize * Math.max(1, scaleMultiplier * 0.96));
  const translationLineHeight = Math.round(20 * Math.max(1, scaleMultiplier * 0.96));

  useEffect(() => {
    setIsPaused(false);
    setIsDetailsOpen(false);
  }, [story.id]);

  function goToPreviousPage() {
    onPageChange(Math.max(currentPage - 1, 0));
  }

  function goToNextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages - 1));
  }

  function changeReaderScale(direction: -1 | 1) {
    const nextScale = readerScales[Math.min(Math.max(scaleIndex + direction, 0), readerScales.length - 1)];
    onReaderScaleChange(nextScale);
  }

  const readerBackground = isBedtimeMode ? palette.bedtimeSurface : palette.background;
  const readerText = isBedtimeMode ? palette.bedtimeText : palette.text;

  return (
    <View
      style={{
        backgroundColor: readerBackground,
        flex: 1,
        minHeight: "100%",
        position: "relative",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: isCompact ? "wrap" : "nowrap",
          gap: isCompact ? spacing.sm : spacing.md,
          justifyContent: "space-between",
          paddingHorizontal: isCompact ? spacing.md : spacing.lg,
          paddingTop: spacing.md,
        }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={onBackPress}
          style={({ pressed }) => ({
            backgroundColor: palette.surface,
            borderColor: palette.border,
            borderRadius: radius.pill,
            borderWidth: 1,
            flexShrink: 0,
            opacity: pressed ? 0.7 : 1,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
          })}
        >
          <Text selectable style={[typography.small, { color: palette.text, fontWeight: "800" }]}>
            {uiText[language].return}
          </Text>
        </Pressable>

        <View style={{ alignItems: "center", flex: 1, flexShrink: 1, gap: spacing.xs, minWidth: 0 }}>
          <Text
            numberOfLines={isCompact ? 2 : 1}
            selectable
            style={[typography.small, { color: readerText, fontWeight: "800", textAlign: "center" }]}
          >
            {isBedtimeMode ? uiText[language].bedtimeMode : uiText[language].readingMode}
          </Text>
          <Text
            numberOfLines={isCompact ? 2 : 1}
            selectable
            style={[typography.small, { color: readerText, opacity: 0.78, textAlign: "center" }]}
          >
            Page {currentPage + 1} / {totalPages} · {remainingMinutes} min{" "}
            {uiText[language].remaining}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end", flexShrink: 0, gap: spacing.xs }}>
          <LanguageToggle language={language} onChange={onLanguageChange} palette={palette} />
          <ThemeToggle
            language={language}
            onChange={onThemeChange}
            palette={palette}
            theme={theme}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: isCompact ? spacing.md : spacing.lg,
          paddingBottom: isCompact ? 154 : 146,
        }}
        style={{ flex: 1 }}
      >
        <View style={{ alignSelf: "center", gap: spacing.lg, maxWidth: 720, width: "100%" }}>
          <View style={{ alignItems: "center", gap: spacing.sm }}>
            <ValidationStatusBadge
              language={language}
              palette={palette}
              status={story.validationStatus}
            />
            <Text
              numberOfLines={2}
              selectable
              style={[typography.subtitle, { color: readerText, flexShrink: 1, textAlign: "center", width: "100%" }]}
            >
              {story.titleAm}
            </Text>
            {story.titleFr ? (
              <Text
                numberOfLines={2}
                selectable
                style={[
                  typography.small,
                  { color: readerText, flexShrink: 1, opacity: 0.72, textAlign: "center", width: "100%" },
                ]}
              >
                {getStoryTitle(story, language)}
              </Text>
            ) : null}
          </View>

          {isBedtimeMode ? (
            <View
              style={{
                alignSelf: "center",
                backgroundColor: palette.surface,
                borderColor: palette.bedtimeBorder,
                borderRadius: radius.pill,
                borderWidth: 1,
                maxWidth: 560,
                width: "100%",
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
              }}
            >
              <Text selectable style={[typography.small, { color: palette.bedtimeText, textAlign: "center" }]}>
                {narrationTip}
              </Text>
            </View>
          ) : null}

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
              <View style={{ gap: pageTranslationSegments ? spacing.lg : 0 }}>
                {pageTranslationSegments ? (
                  <>
                    {hasSegmentTranslation ? (
                      <Text
                        selectable
                        style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}
                      >
                        {uiText[language].translationCandidate}
                      </Text>
                    ) : null}
                    {pageTranslationSegments.map((segment, index) => (
                      <View
                        key={`${currentPage}-${index}-${segment.am.slice(0, 12)}`}
                        style={{ gap: spacing.xs }}
                      >
                        <Text
                          selectable
                          style={[
                            typography.amharicReader,
                            {
                              color: isBedtimeMode ? palette.bedtimeText : palette.text,
                              fontSize: amharicFontSize,
                              lineHeight: amharicLineHeight,
                              textAlign: "left",
                              writingDirection: "ltr",
                            },
                          ]}
                        >
                          {segment.am}
                        </Text>
                        {segment.translation ? (
                          <Text
                            selectable
                            style={[
                              typography.small,
                              {
                                color: palette.mutedText,
                                fontSize: translationFontSize,
                                lineHeight: translationLineHeight,
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
                  <Text
                    selectable
                    style={[
                      typography.amharicReader,
                      {
                        color: isBedtimeMode ? palette.bedtimeText : palette.text,
                        fontSize: amharicFontSize,
                        lineHeight: amharicLineHeight,
                        textAlign: "left",
                        writingDirection: "ltr",
                      },
                    ]}
                  >
                    {story.pages[currentPage]}
                  </Text>
                )}
              </View>
            )}
            {!isPaused && !pageTranslationSegments ? (
              <View
                style={{
                  borderColor: palette.border,
                  borderTopWidth: 1,
                  gap: spacing.xs,
                  marginTop: spacing.lg,
                  paddingTop: spacing.md,
                }}
              >
                <Text
                  selectable
                  style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}
                >
                  {pageTranslation ? uiText[language].translationCandidate : uiText[language].translations}
                </Text>
                <Text selectable style={[typography.small, { color: palette.mutedText }]}>
                  {pageTranslation ?? uiText[language].translationUnavailable}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {isDetailsOpen ? (
        <View
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
            borderRadius: radius.md,
            borderWidth: 1,
            bottom: isCompact ? 150 : 142,
            left: spacing.lg,
            maxHeight: "58%",
            padding: spacing.md,
            position: "absolute",
            right: spacing.lg,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: theme === "dark" ? 0.34 : 0.12,
            shadowRadius: 22,
          }}
        >
          <ScrollView contentContainerStyle={{ gap: spacing.md }}>
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={[typography.title, { color: palette.text }]}>
                {uiText[language].detailsTitle}
              </Text>
              <Text selectable style={[typography.small, { color: palette.mutedText }]}>
                {storyLevelLabels[language][story.level]} · {story.estimatedMinutes} min ·{" "}
                {story.ageRange} {language === "en" ? "years" : "ans"} ·{" "}
                {durationBucketLabels[language][story.durationBucket]} ·{" "}
                {getStoryMood(story, language)} · {bedtimeFitLabels[language][story.bedtimeFit]}
              </Text>
            </View>

            <QualityChecklist language={language} palette={palette} story={story} />

            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <RitualButton
                label={isFavorite ? uiText[language].favoriteRemove : uiText[language].favorite}
                onPress={onFavoritePress}
                palette={palette}
              />
              <RitualButton
                label={isRead ? uiText[language].read : uiText[language].markRead}
                onPress={onMarkRead}
                palette={palette}
                tone="primary"
              />
            </View>

            <View style={{ gap: spacing.sm }}>
              <Text selectable style={[typography.subtitle, { color: palette.text }]}>
                {uiText[language].sourcesTitle}
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {uiText[language].source} : {story.source.name}
              </Text>
              {story.source.url ? (
                <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                  URL : {story.source.url}
                </Text>
              ) : null}
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {language === "en" ? "License" : "Licence"} : {story.source.license}
              </Text>
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {language === "en" ? "Attribution required" : "Attribution requise"} :{" "}
                {story.source.attributionRequired
                  ? language === "en"
                    ? "yes"
                    : "oui"
                  : language === "en"
                    ? "no"
                    : "non"}
              </Text>
              {story.sourceCredits?.map((credit) => (
                <View
                  key={`${credit.source.url ?? credit.title}-${credit.title}`}
                  style={{
                    borderColor: palette.border,
                    borderLeftWidth: 3,
                    gap: spacing.xs,
                    paddingLeft: spacing.md,
                  }}
                >
                  <Text selectable style={[typography.subtitle, { color: palette.text }]}>
                    {credit.title}
                  </Text>
                  <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                    {language === "en" ? "Author" : "Auteur"} : {credit.author}
                  </Text>
                  {credit.translator ? (
                    <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                      {language === "en" ? "Translation" : "Traduction"} : {credit.translator}
                    </Text>
                  ) : null}
                  {credit.illustrator ? (
                    <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                      {language === "en" ? "Illustration" : "Illustration"} :{" "}
                      {credit.illustrator}
                    </Text>
                  ) : null}
                  <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                    {language === "en" ? "License" : "Licence"} : {credit.source.license}
                  </Text>
                  {credit.source.url ? (
                    <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                      URL : {credit.source.url}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : null}

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
          <Text
            selectable
            style={[typography.small, { color: palette.mutedText, fontWeight: "800" }]}
          >
            {uiText[language].readerTextSize}
          </Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <ReaderScaleButton
              disabled={scaleIndex === 0}
              label="A-"
              onPress={() => changeReaderScale(-1)}
              palette={palette}
            />
            <ReaderScaleButton
              disabled={scaleIndex === readerScales.length - 1}
              label="A+"
              onPress={() => changeReaderScale(1)}
              palette={palette}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <RitualButton
            disabled={isFirst}
            label={uiText[language].previous}
            onPress={goToPreviousPage}
            palette={palette}
          />
          <RitualButton
            label={isPaused ? uiText[language].resume : uiText[language].pause}
            onPress={() => setIsPaused((paused) => !paused)}
            palette={palette}
          />
          <RitualButton
            disabled={isLast}
            label={uiText[language].next}
            onPress={goToNextPage}
            palette={palette}
            tone="primary"
          />
          <RitualButton
            label={isDetailsOpen ? uiText[language].close : uiText[language].info}
            onPress={() => setIsDetailsOpen((open) => !open)}
            palette={palette}
          />
        </View>
      </View>
    </View>
  );
}
