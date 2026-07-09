import type { InterfaceLanguage } from "@/features/i18n/translations";
import type { Story } from "@/types/story";

export function getStoryTitle(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.titleEn ?? story.titleFr ?? story.titleAm;
  }

  return story.titleFr ?? story.titleAm;
}

export function getStoryMood(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.moodEn ?? story.mood;
  }

  return story.mood;
}

export function getStoryBedtimeSummary(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.bedtimeSummaryEn ?? story.bedtimeSummary;
  }

  return story.bedtimeSummary;
}

export function getStoryReadingTips(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.readingTipsEn ?? story.readingTips;
  }

  return story.readingTips;
}

export function getStoryPageTranslation(
  story: Story,
  language: InterfaceLanguage,
  pageIndex: number,
) {
  return story.pageTranslations?.[language]?.[pageIndex];
}

export function getQualityEditorialNote(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.qualityChecks.editorialNoteEn ?? story.qualityChecks.editorialNote;
  }

  return story.qualityChecks.editorialNote;
}

export function getQualitySourceModifications(story: Story, language: InterfaceLanguage) {
  if (language === "en") {
    return story.qualityChecks.sourceModificationsEn ?? story.qualityChecks.sourceModifications;
  }

  return story.qualityChecks.sourceModifications;
}
