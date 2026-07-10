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
    detailsTitle: "Détails de la lecture",
    durationTarget: "Durée cible",
    emptyFilter: "Aucune autre lecture pour ce filtre.",
    favorite: "Favori",
    favoriteRemove: "Retirer favori",
    info: "Infos",
    language: "Langue",
    light: "Clair",
    markRead: "Marquer lu",
    menuLibrary: "Bibliothèque",
    menuProgress: "Progrès",
    menuTonight: "Ce soir",
    next: "Suite",
    pause: "Pause",
    pauseBody: "Respire avec ton enfant. La page reste gardée.",
    pauseTitle: "Lecture en pause",
    previous: "Avant",
    qualityTitle: "Contrôle qualité",
    read: "Déjà lu",
    readingMoment: "Moment de lecture",
    readingMode: "Mode lecture",
    readerTextSize: "Taille du texte",
    remaining: "Encore",
    resume: "Reprendre",
    progressEmpty: "Aucune lecture commencée pour le moment.",
    progressTitle: "Reprendre",
    return: "Retour",
    source: "Source",
    sourcesTitle: "Sources et crédits",
    startRitual: "Commencer le rituel",
    themeToggleLabel: "Changer le thème clair ou sombre",
    tonight: "Ce soir",
    translationUnavailable:
      "Traduction FR/EN à ajouter après validation éditoriale.",
    translations: "Traductions",
    translationCandidate: "Traduction candidate",
    validatedSteps: "étapes validées",
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
    menuLibrary: "Library",
    menuProgress: "Progress",
    menuTonight: "Tonight",
    next: "Next",
    pause: "Pause",
    pauseBody: "Breathe with your child. This page is saved.",
    pauseTitle: "Reading paused",
    previous: "Prev",
    qualityTitle: "Quality check",
    read: "Already read",
    readingMoment: "Reading moment",
    readingMode: "Reading mode",
    readerTextSize: "Text size",
    remaining: "left",
    resume: "Resume",
    progressEmpty: "No reading started yet.",
    progressTitle: "Resume",
    return: "Back",
    source: "Source",
    sourcesTitle: "Sources and credits",
    startRitual: "Start ritual",
    themeToggleLabel: "Switch light or dark theme",
    tonight: "Tonight",
    translationUnavailable:
      "FR/EN translation to add after editorial validation.",
    translations: "Translations",
    translationCandidate: "Candidate translation",
    validatedSteps: "steps validated",
  },
} satisfies Record<InterfaceLanguage, Record<string, string>>;

export const storyLevelLabels: Record<InterfaceLanguage, Record<StoryLevel, string>> = {
  fr: {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
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
    ideal: "Idéal coucher",
    good: "Doux",
    not_bedtime: "Bibliothèque",
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
    child_tested: "Testé enfant",
    licensed: "Licence OK",
    published: "Publié",
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
    library: "Bibliothèque",
  },
  en: {
    all: "All",
    bedtime: "Bedtime",
    library: "Library",
  },
} satisfies Record<InterfaceLanguage, Record<string, string>>;
