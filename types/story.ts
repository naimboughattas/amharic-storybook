import type { StoryIllustration } from "@/data/asbLongReadingImages";

export type StoryLevel = "beginner" | "intermediate" | "advanced";

export type DurationBucket = "10_min" | "15_min" | "20_min";

export type BedtimeFit = "ideal" | "good" | "not_bedtime";

export type ValidationStatus =
  | "draft"
  | "translated"
  | "native_reviewed"
  | "child_tested"
  | "licensed"
  | "published";

export type StorySource = {
  name: string;
  url?: string;
  license: string;
  attributionRequired: boolean;
};

export type StoryCredit = {
  title: string;
  author: string;
  translator?: string;
  illustrator?: string;
  source: StorySource;
};

export type StoryQualityChecks = {
  licenseVerified: boolean;
  nativeReviewed: boolean;
  translationProofread: boolean;
  childTested: boolean;
  publicationReady: boolean;
  editorialNote: string;
  editorialNoteEn?: string;
  sourceModifications: string;
  sourceModificationsEn?: string;
};

export type StoryPageTranslationSegment = {
  am: string;
  fr?: string;
  en?: string;
};

export type StoryPageTranslations = {
  aligned?: Array<StoryPageTranslationSegment[] | undefined>;
  /**
   * Page-level translations, aligned with `pages`. Entries are optional because
   * a reading can mix translated albums with untranslated ones.
   */
  fr?: (string | undefined)[];
  en?: (string | undefined)[];
};

export type Story = {
  id: string;
  titleAm: string;
  titleFr?: string;
  titleEn?: string;
  level: StoryLevel;
  ageRange: string;
  estimatedMinutes: number;
  durationBucket: DurationBucket;
  mood: string;
  moodEn?: string;
  bedtimeFit: BedtimeFit;
  bedtimeSummary: string;
  bedtimeSummaryEn?: string;
  readingTips: string[];
  readingTipsEn?: string[];
  pages: string[];
  /**
   * Aligned with `pages`: index N illustrates page N, `undefined` where the
   * source album leaves a page unillustrated. Built by `compose()` in
   * data/stories.ts so it cannot fall out of step with `pages`.
   */
  pageIllustrations?: (StoryIllustration | undefined)[];
  pageTranslations?: StoryPageTranslations;
  source: StorySource;
  sourceCredits?: StoryCredit[];
  qualityChecks: StoryQualityChecks;
  author?: string;
  translator?: string;
  reviewer?: string;
  validationStatus: ValidationStatus;
  culturalOrigin?: string;
  tags: string[];
};
