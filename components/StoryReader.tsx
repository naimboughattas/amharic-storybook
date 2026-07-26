import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import { ReaderDetailsSheet } from "@/components/reader/ReaderDetailsSheet";
import { ReaderDock } from "@/components/reader/ReaderDock";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderPage } from "@/components/reader/ReaderPage";
import { ValidationStatusBadge } from "@/components/ValidationStatusBadge";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { ReaderScale } from "@/features/progress/progressStorage";
import {
  getStoryPageTranslation,
  getStoryPageTranslationSegments,
  getStoryReadingTips,
  getStoryTitle,
} from "@/features/i18n/storyText";
import { getRemainingMinutes } from "@/features/reading/readingTime";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { StoryIllustration } from "@/data/asbLongReadingImages";
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
  showIllustrations: boolean;
  onBackPress: () => void;
  onLanguageChange: (language: InterfaceLanguage) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onFavoritePress: () => void;
  onMarkRead: () => void;
  onPageChange: (page: number) => void;
  onReaderScaleChange: (scale: ReaderScale) => void;
  onToggleIllustrations: () => void;
};

const readerColumnMaxWidth = 720;

const readerScales: ReaderScale[] = ["small", "regular", "large"];

const readerScaleMultipliers: Record<ReaderScale, number> = {
  small: 0.92,
  regular: 1,
  large: 1.14,
};

function getNarrationTip(story: Story, readingTips: string[], currentPage: number) {
  if (readingTips.length === 0) {
    return story.bedtimeSummary;
  }

  return readingTips[currentPage % readingTips.length];
}

/**
 * Height the illustration gets on this screen.
 *
 * Derived rather than left to `aspectRatio`, which react-native-web ignores
 * here and renders the artwork stretched. The cap keeps the opening lines of
 * Amharic visible without scrolling, which is what the parent is reading from.
 */
function getIllustrationHeight(
  illustration: StoryIllustration,
  windowWidth: number,
  windowHeight: number,
  isCompact: boolean,
) {
  const outerPadding = isCompact ? spacing.md : spacing.lg;
  const cardPadding = isCompact ? spacing.md : spacing.xl;
  const columnWidth =
    Math.min(readerColumnMaxWidth, windowWidth - outerPadding * 2) - cardPadding * 2;

  return Math.round(
    Math.min(columnWidth / illustration.aspectRatio, windowHeight * 0.34),
  );
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
  showIllustrations,
  onBackPress,
  onLanguageChange,
  onThemeChange,
  onFavoritePress,
  onMarkRead,
  onPageChange,
  onReaderScaleChange,
  onToggleIllustrations,
}: Props) {
  const { height, width } = useWindowDimensions();
  const [isPaused, setIsPaused] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const pageScrollRef = useRef<ScrollView>(null);

  const totalPages = story.pages.length;
  const isBedtimeMode = story.bedtimeFit !== "not_bedtime";
  const isCompact = width < 430;
  const remainingMinutes = getRemainingMinutes(story.pages, currentPage, story.estimatedMinutes);
  const readingTips = getStoryReadingTips(story, language);
  const narrationTip = getNarrationTip(story, readingTips, currentPage);
  const pageTranslation = getStoryPageTranslation(story, language, currentPage);
  const pageTranslationSegments = getStoryPageTranslationSegments(story, language, currentPage);
  // Falls back to the Amharic title when no localized one exists; showing it
  // twice in a row helps nobody.
  const localizedTitle = getStoryTitle(story, language);
  const illustration = showIllustrations
    ? story.pageIllustrations?.[currentPage]
    : undefined;
  const hasIllustrations = story.pageIllustrations?.some(Boolean) ?? false;
  const illustrationHeight = illustration
    ? getIllustrationHeight(illustration, width, height, isCompact)
    : 0;

  const scaleIndex = readerScales.indexOf(readerScale);
  const scaleMultiplier = readerScaleMultipliers[readerScale];
  const baseAmharicSize = isCompact ? 26 : typography.amharicReader.fontSize;
  const baseAmharicLineHeight = isCompact ? 42 : typography.amharicReader.lineHeight;
  const translationScale = Math.max(1, scaleMultiplier * 0.96);
  const sizes = {
    amharicFontSize: Math.round(baseAmharicSize * scaleMultiplier),
    amharicLineHeight: Math.round(baseAmharicLineHeight * scaleMultiplier),
    translationFontSize: Math.round(typography.small.fontSize * translationScale),
    translationLineHeight: Math.round(20 * translationScale),
  };

  const readerBackground = isBedtimeMode ? palette.bedtimeSurface : palette.background;
  const readerText = isBedtimeMode ? palette.bedtimeText : palette.text;

  // "Suite" is pressed from the dock at the bottom of a long page, so without
  // this the next page opens already scrolled past its first lines. Pause and
  // details state resets on story change through the caller's `key` instead.
  useEffect(() => {
    pageScrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentPage]);

  function changeReaderScale(direction: -1 | 1) {
    const nextIndex = Math.min(Math.max(scaleIndex + direction, 0), readerScales.length - 1);
    onReaderScaleChange(readerScales[nextIndex]);
  }

  return (
    <View
      style={{
        backgroundColor: readerBackground,
        flex: 1,
        minHeight: "100%",
        position: "relative",
      }}
    >
      <ReaderHeader
        currentPage={currentPage}
        isBedtimeMode={isBedtimeMode}
        isCompact={isCompact}
        language={language}
        onBackPress={onBackPress}
        onLanguageChange={onLanguageChange}
        onThemeChange={onThemeChange}
        palette={palette}
        readerText={readerText}
        remainingMinutes={remainingMinutes}
        theme={theme}
        totalPages={totalPages}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: isCompact ? spacing.md : spacing.lg,
          paddingBottom: isCompact ? 154 : 146,
        }}
        ref={pageScrollRef}
        style={{ flex: 1 }}
      >
        <View
          style={{
            alignSelf: "center",
            gap: spacing.lg,
            maxWidth: readerColumnMaxWidth,
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center", gap: spacing.sm }}>
            <ValidationStatusBadge
              language={language}
              palette={palette}
              status={story.validationStatus}
            />
            <Text
              numberOfLines={2}
              selectable
              style={[
                typography.subtitle,
                { color: readerText, flexShrink: 1, textAlign: "center", width: "100%" },
              ]}
            >
              {story.titleAm}
            </Text>
            {localizedTitle === story.titleAm ? null : (
              <Text
                numberOfLines={2}
                selectable
                style={[
                  typography.small,
                  {
                    color: readerText,
                    flexShrink: 1,
                    opacity: 0.72,
                    textAlign: "center",
                    width: "100%",
                  },
                ]}
              >
                {localizedTitle}
              </Text>
            )}
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
              <Text
                selectable
                style={[typography.small, { color: palette.bedtimeText, textAlign: "center" }]}
              >
                {narrationTip}
              </Text>
            </View>
          ) : null}

          <ReaderPage
            amharicText={story.pages[currentPage]}
            currentPage={currentPage}
            illustration={illustration}
            illustrationHeight={illustrationHeight}
            isBedtimeMode={isBedtimeMode}
            isCompact={isCompact}
            isPaused={isPaused}
            language={language}
            pageTranslation={pageTranslation}
            palette={palette}
            readerText={readerText}
            segments={pageTranslationSegments}
            sizes={sizes}
            theme={theme}
          />
        </View>
      </ScrollView>

      {isDetailsOpen ? (
        <ReaderDetailsSheet
          isCompact={isCompact}
          isFavorite={isFavorite}
          isRead={isRead}
          language={language}
          onFavoritePress={onFavoritePress}
          onMarkRead={onMarkRead}
          palette={palette}
          story={story}
          theme={theme}
        />
      ) : null}

      <ReaderDock
        canGrowText={scaleIndex < readerScales.length - 1}
        canShrinkText={scaleIndex > 0}
        canToggleIllustrations={hasIllustrations}
        isDetailsOpen={isDetailsOpen}
        isFirstPage={currentPage === 0}
        isLastPage={currentPage === totalPages - 1}
        isPaused={isPaused}
        language={language}
        onGrowText={() => changeReaderScale(1)}
        onNextPage={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        onPreviousPage={() => onPageChange(Math.max(currentPage - 1, 0))}
        onShrinkText={() => changeReaderScale(-1)}
        onToggleDetails={() => setIsDetailsOpen((open) => !open)}
        onToggleIllustrations={onToggleIllustrations}
        onTogglePause={() => setIsPaused((paused) => !paused)}
        palette={palette}
        showIllustrations={showIllustrations}
        theme={theme}
      />
    </View>
  );
}
