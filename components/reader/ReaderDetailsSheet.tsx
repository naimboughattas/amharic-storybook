import { ScrollView, Text, View } from "react-native";

import { QualityChecklist } from "@/components/QualityChecklist";
import { RitualButton } from "@/components/reader/RitualButton";
import type { InterfaceLanguage } from "@/features/i18n/translations";
import {
  bedtimeFitLabels,
  durationBucketLabels,
  storyLevelLabels,
  uiText,
} from "@/features/i18n/translations";
import { getStoryMood } from "@/features/i18n/storyText";
import type { AppPalette, ThemeMode } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story, StoryCredit } from "@/types/story";

type Props = {
  story: Story;
  isFavorite: boolean;
  isRead: boolean;
  isCompact: boolean;
  language: InterfaceLanguage;
  palette: AppPalette;
  theme: ThemeMode;
  onFavoritePress: () => void;
  onMarkRead: () => void;
};

function CreditBlock({
  credit,
  language,
  palette,
}: {
  credit: StoryCredit;
  language: InterfaceLanguage;
  palette: AppPalette;
}) {
  return (
    <View
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
        {uiText[language].author} : {credit.author}
      </Text>
      {credit.translator ? (
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          {uiText[language].translation} : {credit.translator}
        </Text>
      ) : null}
      {credit.illustrator ? (
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          {uiText[language].illustration} : {credit.illustrator}
        </Text>
      ) : null}
      <Text selectable style={[typography.body, { color: palette.mutedText }]}>
        {uiText[language].license} : {credit.source.license}
      </Text>
      {credit.source.url ? (
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          URL : {credit.source.url}
        </Text>
      ) : null}
    </View>
  );
}

export function ReaderDetailsSheet({
  story,
  isFavorite,
  isRead,
  isCompact,
  language,
  palette,
  theme,
  onFavoritePress,
  onMarkRead,
}: Props) {
  return (
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
            {story.ageRange} {uiText[language].years} ·{" "}
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
            {uiText[language].license} : {story.source.license}
          </Text>
          <Text selectable style={[typography.body, { color: palette.mutedText }]}>
            {uiText[language].attributionRequired} :{" "}
            {story.source.attributionRequired ? uiText[language].yes : uiText[language].no}
          </Text>
          {story.sourceCredits?.map((credit) => (
            <CreditBlock
              credit={credit}
              key={`${credit.source.url ?? credit.title}-${credit.title}`}
              language={language}
              palette={palette}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
