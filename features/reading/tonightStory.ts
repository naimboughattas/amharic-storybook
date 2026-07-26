import type { Story } from "@/types/story";

export type TonightContext = {
  date?: Date;
  readIds?: ReadonlySet<string>;
  favoriteIds?: ReadonlySet<string>;
};

/** Local calendar day, so the pick changes at midnight rather than at UTC. */
function dayIndex(date: Date) {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
}

/**
 * Picks the reading to offer tonight.
 *
 * The first version always returned the same story, so a parent opening the app
 * every evening was met with the reading they had just finished. Preference
 * order: unread favorites, then anything unread, then favorites, then the whole
 * bedtime shelf. Within the chosen pool the pick rotates by calendar day, so it
 * is stable through an evening but different the next.
 */
export function pickTonightStory(
  stories: readonly Story[],
  { date = new Date(), readIds, favoriteIds }: TonightContext = {},
): Story | undefined {
  if (stories.length === 0) {
    return undefined;
  }

  const bedtime = stories.filter((story) => story.bedtimeFit !== "not_bedtime");
  const shelf = bedtime.length > 0 ? bedtime : stories;

  const isUnread = (story: Story) => !readIds?.has(story.id);
  const isFavorite = (story: Story) => favoriteIds?.has(story.id) ?? false;

  const preferences = [
    (story: Story) => isUnread(story) && isFavorite(story),
    isUnread,
    isFavorite,
  ];

  const pool =
    preferences.map((matches) => shelf.filter(matches)).find((group) => group.length > 0) ??
    shelf;

  // "ideal" readings come before merely "good" ones, so a rotation that starts
  // at day 0 still opens on the strongest candidate.
  const ordered = [...pool].sort((a, b) => {
    if (a.bedtimeFit === b.bedtimeFit) {
      return 0;
    }

    return a.bedtimeFit === "ideal" ? -1 : 1;
  });

  return ordered[dayIndex(date) % ordered.length];
}
