/**
 * Estimates how much of a reading is left.
 *
 * Splitting `estimatedMinutes` evenly across pages makes the countdown lie on
 * the long compilations: their pages range from a one-line section title to a
 * full paragraph, so on a 49-page reading the announced time barely moved for
 * the first dozen pages. Weighting by text length keeps the promise that the
 * announced duration is reliable.
 *
 * The current page counts as still to read, so an untouched reading always
 * reports its full duration.
 */
export function getRemainingMinutes(
  pages: readonly string[],
  currentPage: number,
  estimatedMinutes: number,
) {
  const floor = 1;

  if (pages.length === 0) {
    return Math.max(floor, Math.ceil(estimatedMinutes));
  }

  const page = Math.min(Math.max(currentPage, 0), pages.length - 1);
  const totalCharacters = pages.reduce((total, text) => total + text.length, 0);

  if (totalCharacters === 0) {
    // Nothing to weigh: fall back to an even split across pages.
    const remainingShare = (pages.length - page) / pages.length;
    return Math.max(floor, Math.ceil(remainingShare * estimatedMinutes));
  }

  const remainingCharacters = pages
    .slice(page)
    .reduce((total, text) => total + text.length, 0);

  return Math.max(
    floor,
    Math.ceil((remainingCharacters / totalCharacters) * estimatedMinutes),
  );
}
