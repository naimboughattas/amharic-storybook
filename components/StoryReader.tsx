import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { BedtimeReadingGuide } from "@/components/BedtimeReadingGuide";
import { QualityChecklist } from "@/components/QualityChecklist";
import { ReaderControls } from "@/components/ReaderControls";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ValidationStatusBadge } from "@/components/ValidationStatusBadge";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";
import { bedtimeFitLabels, durationBucketLabels, storyLevelLabels } from "@/types/story";

type Props = {
  story: Story;
  currentPage: number;
  isFavorite: boolean;
  isRead: boolean;
  theme: ThemeMode;
  palette: AppPalette;
  onThemeChange: (theme: ThemeMode) => void;
  onFavoritePress: () => void;
  onMarkRead: () => void;
  onPageChange: (page: number) => void;
};

export function StoryReader({
  story,
  currentPage,
  isFavorite,
  isRead,
  theme,
  palette,
  onThemeChange,
  onFavoritePress,
  onMarkRead,
  onPageChange,
}: Props) {
  const totalPages = story.pages.length;
  const isBedtimeMode = story.bedtimeFit !== "not_bedtime";
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(false);
  }, [story.id]);

  return (
    <View style={{ gap: spacing.xl }}>
      <View style={{ gap: spacing.md }}>
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            gap: spacing.md,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, gap: spacing.xs }}>
            <Text selectable style={[typography.appTitle, { color: palette.text }]}>
              {story.titleAm}
            </Text>
            {story.titleFr ? (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {story.titleFr}
              </Text>
            ) : null}
          </View>
          <ThemeToggle onChange={onThemeChange} palette={palette} theme={theme} />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <ValidationStatusBadge palette={palette} status={story.validationStatus} />
          <Text selectable style={[typography.small, { color: palette.mutedText }]}>
            {storyLevelLabels[story.level]} · {story.estimatedMinutes} min · {story.ageRange} ans
          </Text>
          <Text selectable style={[typography.small, { color: palette.mutedText }]}>
            {durationBucketLabels[story.durationBucket]} · {story.mood} ·{" "}
            {bedtimeFitLabels[story.bedtimeFit]}
          </Text>
        </View>
        {story.bedtimeFit !== "not_bedtime" ? (
          <View
            style={{
              backgroundColor: palette.surfaceStrong,
              borderColor: palette.border,
              borderRadius: radius.md,
              borderWidth: 1,
              gap: spacing.xs,
              padding: spacing.md,
            }}
          >
            <Text selectable style={[typography.subtitle, { color: palette.text }]}>
              Pour le rituel du soir
            </Text>
            <Text selectable style={[typography.body, { color: palette.mutedText }]}>
              {story.bedtimeSummary}
            </Text>
            {story.readingTips.slice(0, 2).map((tip) => (
              <Text key={tip} selectable style={[typography.small, { color: palette.mutedText }]}>
                - {tip}
              </Text>
            ))}
          </View>
        ) : null}
      </View>

      {isBedtimeMode ? (
        <BedtimeReadingGuide
          currentPage={currentPage}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((paused) => !paused)}
          palette={palette}
          story={story}
          totalPages={totalPages}
        />
      ) : null}

      <QualityChecklist palette={palette} story={story} />

      <View
        style={{
          backgroundColor: isBedtimeMode ? palette.bedtimeSurface : palette.surface,
          borderColor: isBedtimeMode ? palette.bedtimeBorder : palette.border,
          borderRadius: radius.md,
          borderWidth: 1,
          padding: spacing.xl,
        }}
      >
        {isPaused ? (
          <View style={{ gap: spacing.md }}>
            <Text selectable style={[typography.title, { color: palette.bedtimeText }]}>
              Lecture en pause
            </Text>
            <Text selectable style={[typography.body, { color: palette.bedtimeText }]}>
              La page est gardee. Respire, laisse l'enfant se poser, puis reprends quand le
              moment est calme.
            </Text>
          </View>
        ) : (
          <Text
            selectable
            style={[
              typography.amharicReader,
              {
                color: isBedtimeMode ? palette.bedtimeText : palette.text,
                textAlign: "left",
                writingDirection: "ltr",
              },
            ]}
          >
            {story.pages[currentPage]}
          </Text>
        )}
      </View>

      {isPaused ? null : (
        <ReaderControls
          currentPage={currentPage}
          onNext={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
          onPrevious={() => onPageChange(Math.max(currentPage - 1, 0))}
          palette={palette}
          totalPages={totalPages}
        />
      )}

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Pressable
          accessibilityRole="button"
          onPress={onFavoritePress}
          style={({ pressed }) => ({
            alignItems: "center",
            backgroundColor: isFavorite ? palette.accent : palette.surface,
            borderColor: isFavorite ? palette.accent : palette.border,
            borderRadius: radius.md,
            borderWidth: 1,
            flex: 1,
            opacity: pressed ? 0.75 : 1,
            paddingVertical: spacing.lg,
          })}
        >
          <Text
            selectable
            style={[
              typography.subtitle,
              { color: isFavorite ? palette.primaryText : palette.text },
            ]}
          >
            {isFavorite ? "Retirer favori" : "Ajouter favori"}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onMarkRead}
          style={({ pressed }) => ({
            alignItems: "center",
            backgroundColor: isRead ? palette.surfaceStrong : palette.primary,
            borderRadius: radius.md,
            flex: 1,
            opacity: pressed ? 0.75 : 1,
            paddingVertical: spacing.lg,
          })}
        >
          <Text
            selectable
            style={[
              typography.subtitle,
              { color: isRead ? palette.success : palette.primaryText },
            ]}
          >
            {isRead ? "Deja lu" : "Marquer comme lu"}
          </Text>
        </Pressable>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          Sources et credits
        </Text>
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          Source : {story.source.name}
        </Text>
        {story.source.url ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            URL : {story.source.url}
          </Text>
        ) : null}
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          Licence : {story.source.license}
        </Text>
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          Attribution requise : {story.source.attributionRequired ? "oui" : "non"}
        </Text>
        {story.author ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            Auteur : {story.author}
          </Text>
        ) : null}
        {story.translator ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            Traducteur : {story.translator}
          </Text>
        ) : null}
        {story.reviewer ? (
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            Relecture : {story.reviewer}
          </Text>
        ) : null}
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
              Auteur : {credit.author}
            </Text>
            {credit.translator ? (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                Traduction : {credit.translator}
              </Text>
            ) : null}
            {credit.illustrator ? (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                Illustration : {credit.illustrator}
              </Text>
            ) : null}
            <Text selectable style={[typography.body, { color: palette.mutedText }]}>
              Licence : {credit.source.license}
            </Text>
            {credit.source.url ? (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                URL : {credit.source.url}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
