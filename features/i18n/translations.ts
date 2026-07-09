import type { BedtimeFit, DurationBucket, StoryLevel, ValidationStatus } from "@/types/story";

export type InterfaceLanguage = "fr" | "en";

export const languageLabels: Record<InterfaceLanguage, string> = {
  fr: "FR",
  en: "EN",
};

export const uiText = {
  fr: {
    all: "Tous",
    appTitle: "የሌሊት ታሪክ",
    bedtimeAvailable: "lecture du soir disponible",
    bedtimeAvailablePlural: "lectures du soir disponibles",
    bedtimeMode: "Mode rituel du soir",
    bedtimeTagline:
      "Choisis vite une lecture douce en amharique pour le rituel du coucher.",
    catalogTitle: "Explorer le catalogue",
    childTest: "Test enfant",
    close: "Fermer",
    dark: "Sombre",
    detailsTitle: "Details de la lecture",
    durationTarget: "Duree cible",
    emptyFilter: "Aucune autre lecture pour ce filtre.",
    favorite: "Favori",
    favoriteRemove: "Retirer favori",
    info: "Infos",
    language: "Langue",
    light: "Clair",
    markRead: "Marquer lu",
    next: "Suite",
    pause: "Pause",
    pauseBody: "Respire avec ton enfant. La page reste gardee.",
    pauseTitle: "Lecture en pause",
    previous: "Avant",
    qualityTitle: "Controle qualite",
    read: "Deja lu",
    readingMoment: "Moment de lecture",
    readingMode: "Mode lecture",
    remaining: "Encore",
    resume: "Reprendre",
    return: "Retour",
    source: "Source",
    sourcesTitle: "Sources et credits",
    startRitual: "Commencer le rituel",
    themeToggleLabel: "Changer le theme clair ou sombre",
    tonight: "Ce soir",
    translationUnavailable:
      "Traduction FR/EN a ajouter apres validation editoriale.",
    translations: "Traductions",
    validatedSteps: "etapes validees",
  },
  en: {
    all: "All",
    appTitle: "የሌሊት ታሪክ",
    bedtimeAvailable: "bedtime reading available",
    bedtimeAvailablePlural: "bedtime readings available",
    bedtimeMode: "Bedtime ritual mode",
    bedtimeTagline: "Quickly choose a gentle Amharic reading for bedtime.",
    catalogTitle: "Explore the catalog",
    childTest: "Child test",
    close: "Close",
    dark: "Dark",
    detailsTitle: "Reading details",
    durationTarget: "Target duration",
    emptyFilter: "No other reading for this filter.",
    favorite: "Favorite",
    favoriteRemove: "Remove favorite",
    info: "Info",
    language: "Language",
    light: "Light",
    markRead: "Mark read",
    next: "Next",
    pause: "Pause",
    pauseBody: "Breathe with your child. This page is saved.",
    pauseTitle: "Reading paused",
    previous: "Back",
    qualityTitle: "Quality check",
    read: "Already read",
    readingMoment: "Reading moment",
    readingMode: "Reading mode",
    remaining: "left",
    resume: "Resume",
    return: "Back",
    source: "Source",
    sourcesTitle: "Sources and credits",
    startRitual: "Start ritual",
    themeToggleLabel: "Switch light or dark theme",
    tonight: "Tonight",
    translationUnavailable:
      "FR/EN translation to add after editorial validation.",
    translations: "Translations",
    validatedSteps: "steps validated",
  },
} satisfies Record<InterfaceLanguage, Record<string, string>>;

export const storyLevelLabels: Record<InterfaceLanguage, Record<StoryLevel, string>> = {
  fr: {
    beginner: "Debutant",
    intermediate: "Intermediaire",
    advanced: "Avance",
  },
  en: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
};

export const durationBucketLabels: Record<InterfaceLanguage, Record<DurationBucket, string>> = {
  fr: {
    "10_min": "10 min",
    "15_min": "15 min+",
    "20_min": "20 min+",
  },
  en: {
    "10_min": "10 min",
    "15_min": "15 min+",
    "20_min": "20 min+",
  },
};

export const bedtimeFitLabels: Record<InterfaceLanguage, Record<BedtimeFit, string>> = {
  fr: {
    ideal: "Ideal coucher",
    good: "Doux",
    not_bedtime: "Bibliotheque",
  },
  en: {
    ideal: "Ideal bedtime",
    good: "Gentle",
    not_bedtime: "Library",
  },
};

export const validationStatusLabels: Record<
  InterfaceLanguage,
  Record<ValidationStatus, string>
> = {
  fr: {
    draft: "Brouillon",
    translated: "Traduit",
    native_reviewed: "Revu natif",
    child_tested: "Teste enfant",
    licensed: "Licence OK",
    published: "Publie",
  },
  en: {
    draft: "Draft",
    translated: "Translated",
    native_reviewed: "Native reviewed",
    child_tested: "Child tested",
    licensed: "License OK",
    published: "Published",
  },
};

export const scopeLabels = {
  fr: {
    all: "Tous",
    bedtime: "Soir",
    library: "Bibliotheque",
  },
  en: {
    all: "All",
    bedtime: "Bedtime",
    library: "Library",
  },
} satisfies Record<InterfaceLanguage, Record<string, string>>;
