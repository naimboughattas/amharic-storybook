import type { BedtimeFit, DurationBucket, StoryLevel, ValidationStatus } from "@/types/story";

export type InterfaceLanguage = "fr" | "en";

export const languageLabels: Record<InterfaceLanguage, string> = {
  fr: "FR",
  en: "EN",
};

/**
 * Fills `{name}` placeholders in a localized template.
 *
 * Sentences must be stored as whole templates rather than assembled from
 * fragments: French and English do not agree on word order, so concatenating
 * `${minutes} min` with a translated "left" produces "18 min Encore".
 */
export function formatText(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const frText = {
    all: "Tous",
    appTitle: "የሌሊት ታሪክ",
    attributionRequired: "Attribution requise",
    author: "Auteur",
    badgeNew: "Nouveau",
    badgeRead: "Lu",
    bedtimeMode: "Mode rituel du soir",
    bedtimeTagline:
      "Choisis vite une lecture douce en amharique pour le rituel du coucher.",
    catalogSubtitleOne:
      "1 lecture du soir disponible sur {total}. Les autres restent utiles hors rituel.",
    catalogSubtitleOther:
      "{count} lectures du soir disponibles sur {total}. Les autres restent utiles hors rituel.",
    catalogTitle: "Explorer le catalogue",
    childTest: "Test enfant",
    close: "Fermer",
    dark: "Sombre",
    detailsTitle: "Détails de la lecture",
    durationTarget: "Durée cible",
    editorialNote: "Note éditoriale",
    emptyFilter: "Aucune autre lecture pour ce filtre.",
    endBody: "L'histoire est finie. Reste encore un instant, puis souhaite bonne nuit.",
    endTitle: "Bonne nuit",
    favorite: "Favori",
    favoriteRemove: "Retirer favori",
    favoriteStory: "Histoire favorite",
    homeHeaderTitle: "Histoire du soir",
    hideIllustrations: "Masquer les illustrations",
    homeMenuLabel: "Menu d'accueil",
    illustrationsOff: "Images",
    illustrationsOn: "Images",
    illustration: "Illustration",
    info: "Infos",
    language: "Langue",
    levelFilterLabel: "Filtrer les histoires par niveau",
    license: "Licence",
    light: "Clair",
    markRead: "Marquer lu",
    menuLibrary: "Bibliothèque",
    menuProgress: "Progrès",
    menuTonight: "Ce soir",
    minutesLeft: "Encore {minutes} min",
    modifications: "Modifications",
    finishRitual: "Terminer",
    next: "Suite",
    no: "non",
    pageCounter: "Page {current} / {total}",
    pause: "Pause",
    pauseBody: "Respire avec ton enfant. La page reste gardée.",
    pauseTitle: "Lecture en pause",
    previous: "Avant",
    publishedStatusWarning:
      "Attention : le statut publié demande toutes les étapes qualité validées.",
    qualitySummaryChildTested:
      "Lecture testée avec un enfant. Les droits et la revue finale restent à confirmer.",
    qualitySummaryDraft: "Brouillon éditorial : garder hors publication.",
    qualitySummaryLicensed:
      "Lecture candidate : droits vérifiés ; revue native, relecture FR/EN et test enfant restent nécessaires avant publication.",
    qualitySummaryNativeReviewed:
      "Lecture relue par une personne native. La relecture FR/EN, le test enfant et les droits restent à confirmer.",
    qualitySummaryPublicationReady:
      "Lecture prête pour publication : licence, revue native, relecture FR/EN et test enfant sont validés.",
    qualitySummaryTranslated:
      "Texte traduit ou rédigé, mais pas encore prêt pour le rituel public.",
    qualityTitle: "Contrôle qualité",
    read: "Déjà lu",
    readingGuideTitle: "Petit guide de lecture",
    readingMoment: "Moment de lecture",
    readingMode: "Mode lecture",
    readerTextLarger: "Agrandir le texte",
    readerTextSize: "Taille du texte",
    readerTextSmaller: "Réduire le texte",
    resume: "Reprendre",
    progressEmpty: "Aucune lecture commencée pour le moment.",
    progressIntro:
      "Retrouve les favoris, les lectures terminées et les histoires déjà commencées.",
    progressTitle: "Reprendre",
    reread: "Relire",
    return: "Retour",
    source: "Source",
    showIllustrations: "Afficher les illustrations",
    sourcesTitle: "Sources et crédits",
    startRitual: "Commencer le rituel",
    storyNotFound: "Histoire introuvable",
    themeToggleLabel: "Changer le thème clair ou sombre",
    todo: "À faire",
    tonight: "Ce soir",
    translation: "Traduction",
    translationUnavailable:
      "Traduction FR/EN à ajouter après validation éditoriale.",
    translations: "Traductions",
    translationCandidate: "Traduction candidate",
    validatedSteps: "étapes validées",
    years: "ans",
    yes: "oui",
};

/**
 * Typing the dictionary against the French one makes an untranslated key a
 * compile error rather than a French string leaking into the English UI.
 */
export const uiText: Record<InterfaceLanguage, typeof frText> = {
  fr: frText,
  en: {
    all: "All",
    appTitle: "የሌሊት ታሪክ",
    attributionRequired: "Attribution required",
    author: "Author",
    badgeNew: "New",
    badgeRead: "Read",
    bedtimeMode: "Bedtime ritual mode",
    bedtimeTagline: "Quickly choose a gentle Amharic reading for bedtime.",
    catalogSubtitleOne:
      "1 bedtime reading available out of {total}. The others remain useful outside the ritual.",
    catalogSubtitleOther:
      "{count} bedtime readings available out of {total}. The others remain useful outside the ritual.",
    catalogTitle: "Explore the catalog",
    childTest: "Child test",
    close: "Close",
    dark: "Dark",
    detailsTitle: "Reading details",
    durationTarget: "Target duration",
    editorialNote: "Editorial note",
    emptyFilter: "No other reading for this filter.",
    endBody: "The story is over. Stay a moment longer, then say good night.",
    endTitle: "Good night",
    favorite: "Favorite",
    favoriteRemove: "Remove favorite",
    favoriteStory: "Favorite story",
    homeHeaderTitle: "Bedtime story",
    hideIllustrations: "Hide illustrations",
    homeMenuLabel: "Home menu",
    illustrationsOff: "Art",
    illustrationsOn: "Art",
    illustration: "Illustration",
    info: "Info",
    language: "Language",
    levelFilterLabel: "Filter stories by level",
    license: "License",
    light: "Light",
    markRead: "Mark read",
    menuLibrary: "Library",
    menuProgress: "Progress",
    menuTonight: "Tonight",
    minutesLeft: "{minutes} min left",
    modifications: "Modifications",
    finishRitual: "Finish",
    next: "Next",
    no: "no",
    pageCounter: "Page {current} / {total}",
    pause: "Pause",
    pauseBody: "Breathe with your child. This page is saved.",
    pauseTitle: "Reading paused",
    previous: "Prev",
    publishedStatusWarning:
      "Warning: published status requires every quality step to be validated.",
    qualitySummaryChildTested:
      "Reading tested with a child. Rights and final review still need confirmation.",
    qualitySummaryDraft: "Editorial draft: keep out of publication.",
    qualitySummaryLicensed:
      "Candidate reading: rights checked; native review, FR/EN proofreading and child test still needed before publication.",
    qualitySummaryNativeReviewed:
      "Reading reviewed by a native speaker. FR/EN proofreading, child test and rights still need confirmation.",
    qualitySummaryPublicationReady:
      "Ready for publication: license, native review, FR/EN proofreading and child test are validated.",
    qualitySummaryTranslated:
      "Text translated or written, but not ready for the public ritual yet.",
    qualityTitle: "Quality check",
    read: "Already read",
    readingGuideTitle: "Small reading guide",
    readingMoment: "Reading moment",
    readingMode: "Reading mode",
    readerTextLarger: "Increase text size",
    readerTextSize: "Text size",
    readerTextSmaller: "Decrease text size",
    resume: "Resume",
    progressEmpty: "No reading started yet.",
    progressIntro: "Find favorites, completed readings, and stories already started.",
    progressTitle: "Resume",
    reread: "Read again",
    return: "Back",
    source: "Source",
    showIllustrations: "Show illustrations",
    sourcesTitle: "Sources and credits",
    startRitual: "Start ritual",
    storyNotFound: "Story not found",
    themeToggleLabel: "Switch light or dark theme",
    todo: "To do",
    tonight: "Tonight",
    translation: "Translation",
    translationUnavailable:
      "FR/EN translation to add after editorial validation.",
    translations: "Translations",
    translationCandidate: "Candidate translation",
    validatedSteps: "steps validated",
    years: "years",
    yes: "yes",
  },
};

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
