import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ProgressBadge } from "@/components/ProgressBadge";
import { ValidationStatusBadge } from "@/components/ValidationStatusBadge";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";
import { bedtimeFitLabels, durationBucketLabels, storyLevelLabels } from "@/types/story";

type Props = {
  story: Story;
  isRead: boolean;
  isFavorite: boolean;
  lastPage?: number;
  palette: AppPalette;
};

export function StoryCard({ story, isRead, isFavorite, lastPage, palette }: Props) {
  const isBedtimeStory = story.bedtimeFit !== "not_bedtime";

  return (
    <Link href={`/story/${story.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => ({
          backgroundColor: isBedtimeStory ? palette.bedtimeSurface : palette.surface,
          borderColor: isBedtimeStory ? palette.bedtimeBorder : palette.border,
          borderRadius: radius.md,
          borderWidth: 1,
          gap: spacing.md,
          opacity: pressed ? 0.8 : 1,
          padding: spacing.lg,
        })}
      >
        <View style={{ flexDirection: "row", gap: spacing.md, justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: spacing.xs }}>
            <Text selectable style={[typography.title, { color: palette.text }]}>
              {story.titleAm}
            </Text>
            {story.titleFr ? (
              <Text selectable style={[typography.body, { color: palette.mutedText }]}>
                {story.titleFr}
              </Text>
            ) : null}
          </View>
          <Text
            accessibilityLabel={isFavorite ? "Histoire favorite" : "Histoire non favorite"}
            selectable
            style={[typography.title, { color: isFavorite ? palette.accent : palette.border }]}
          >
            {isFavorite ? "Favori" : ""}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <ProgressBadge
            isRead={isRead}
            lastPage={lastPage}
            palette={palette}
            totalPages={story.pages.length}
          />
          <ValidationStatusBadge palette={palette} status={story.validationStatus} />
        </View>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {storyLevelLabels[story.level]} · {story.ageRange} ans · {story.estimatedMinutes} min
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {durationBucketLabels[story.durationBucket]} · {story.mood} ·{" "}
          {bedtimeFitLabels[story.bedtimeFit]}
        </Text>
      </Pressable>
    </Link>
  );
}
