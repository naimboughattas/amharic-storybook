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
  fr?: string[];
  en?: string[];
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

export const storyLevelLabels: Record<StoryLevel, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export const durationBucketLabels: Record<DurationBucket, string> = {
  "10_min": "10 min",
  "15_min": "15 min+",
  "20_min": "20 min+",
};

export const bedtimeFitLabels: Record<BedtimeFit, string> = {
  ideal: "Idéal coucher",
  good: "Doux",
  not_bedtime: "Bibliothèque",
};

export const validationStatusLabels: Record<ValidationStatus, string> = {
  draft: "Brouillon",
  translated: "Traduit",
  native_reviewed: "Revu natif",
  child_tested: "Testé enfant",
  licensed: "Licence OK",
  published: "Publié",
};
