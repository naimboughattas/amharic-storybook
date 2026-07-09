import { asbLongReadingPages } from "@/data/asbLongReadingPages";
import type { Story, StoryCredit, StorySource } from "@/types/story";

const africanStorybookSource: StorySource = {
  name: "African Storybook",
  url: "https://www.africanstorybook.org/",
  license: "Creative Commons Attribution 4.0 (CC BY 4.0)",
  attributionRequired: true,
};

function africanStorybookUrl(id: number) {
  return `https://www.africanstorybook.org/newviewer/index.php?id=${id}&bt=3&dual=false`;
}

function asbCredit(
  id: number,
  title: string,
  author: string,
  translator: string,
  illustrator: string,
): StoryCredit {
  return {
    title,
    author,
    translator,
    illustrator,
    source: {
      ...africanStorybookSource,
      url: africanStorybookUrl(id),
    },
  };
}

function section(title: string, pages: readonly string[]) {
  return [`ክፍል፦ ${title}`, ...pages];
}

function licensedCompilationQuality(albumCount: number) {
  return {
    licenseVerified: true,
    nativeReviewed: false,
    childTested: false,
    publicationReady: false,
    editorialNote: `Compilation de ${albumCount} albums African Storybook. Credits detailles conserves pour chaque album.`,
    editorialNoteEn: `Compilation of ${albumCount} African Storybook albums. Detailed credits are kept for each album.`,
    sourceModifications:
      "Assemblage en lecture longue avec titres de section; texte source conserve.",
    sourceModificationsEn:
      "Combined into a long reading with section titles; source text preserved.",
  };
}

const melokuhleDay = asbCredit(
  52152,
  "በሜሎኩህሌ ሕይወት ውስጥ አንድ ቀን",
  "Nolulamo Mnyaka-Mngeni, Sheila Drew",
  "Tesfamichael Hailu",
  "Rob Owen",
);

const blueBus = asbCredit(
  37859,
  "ትልቁ ሰማያዊ አውቶቡስ በዘገየ ጊዜ",
  "Mecelin Kakoro",
  "Mezemir Girma",
  "Mango Tree",
);

const pickItUp = asbCredit(
  52202,
  "አንሱት",
  "Fanie Viljoen",
  "Tesfamichael Hailu, Natnael Argaw",
  "Stephen Wallace",
);

const shareFairly = asbCredit(
  52203,
  "በፍትሐዊነት (በእኩልነት) ተካፈሉ!",
  "Penelope Smith",
  "Tesfamichael Hailu",
  "Magriet Brink",
);

const simbegwire = asbCredit(
  22403,
  "ሲምበግዊሬ",
  "Rukia Nantale",
  "Mezemir Girma",
  "Benjamin Mitchley",
);

const rainbowTale = asbCredit(
  33973,
  "የቀስተደመናው ተረት",
  "Mimi Werna",
  "Kebede Yimer",
  "Edwin Irabor, Jesse Breytenbach, Offei Tettey Eugene",
);

const mousePrince = asbCredit(
  17650,
  "የአይጦች ንጉሥ ልጅ",
  "Merga Debelo, Elizabeth Laird",
  "Mezemir Girma",
  "Salim Kasamba",
);

const birdKing = asbCredit(
  33982,
  "የአእዋፋቱ ንጉሥ",
  "South African Folktale",
  "Kebede Yimer",
  "Wiehan de Jager",
);

const crowdedHouse = asbCredit(
  51303,
  "ከባድ ችግር ያለበት ሰው",
  "Ursula Nafula",
  "Tesfamichael Hailu",
  "Abraham Muzee",
);

export const stories: Story[] = [
  {
    id: "long-family-journey-choice",
    titleAm: "ረጅም ንባብ፦ ቤተሰብ፣ ጉዞ እና ትክክለኛ ምርጫ",
    titleFr: "Lecture longue : famille, voyage et bon choix",
    titleEn: "Long reading: family, travel and good choices",
    level: "advanced",
    ageRange: "8-11",
    estimatedMinutes: 24,
    durationBucket: "20_min",
    mood: "Curieux et actif",
    moodEn: "Curious and active",
    bedtimeFit: "not_bedtime",
    bedtimeSummary:
      "Lecture longue utile pour la bibliotheque, mais moins adaptee au coucher car elle contient voyage, choix moral et passages de calcul.",
    bedtimeSummaryEn:
      "A useful long library reading, but less suited to bedtime because it includes travel, moral choices and counting passages.",
    readingTips: [
      "Garder pour un apres-midi ou un moment d'apprentissage.",
      "Faire des pauses sur les questions de calcul.",
    ],
    readingTipsEn: [
      "Keep this for an afternoon or a learning moment.",
      "Pause on the counting questions.",
    ],
    pages: [
      ...section(melokuhleDay.title, asbLongReadingPages.melokuhleDay),
      ...section(blueBus.title, asbLongReadingPages.blueBus),
      ...section(pickItUp.title, asbLongReadingPages.pickItUp),
    ],
    source: africanStorybookSource,
    sourceCredits: [melokuhleDay, blueBus, pickItUp],
    qualityChecks: licensedCompilationQuality(3),
    author: "Auteurs multiples African Storybook",
    translator: "Traducteurs multiples, voir credits",
    validationStatus: "licensed",
    culturalOrigin: "Compilation de trois albums African Storybook en amharique",
    tags: ["longue lecture", "famille", "voyage", "choix", "cc-by"],
  },
  {
    id: "long-sharing-family-rainbow",
    titleAm: "ረጅም ንባብ፦ መካፈል፣ ቤተሰብ እና ቀስተደመና",
    titleFr: "Lecture longue : partage, famille et arc-en-ciel",
    titleEn: "Long reading: sharing, family and rainbow",
    level: "intermediate",
    ageRange: "7-10",
    estimatedMinutes: 18,
    durationBucket: "15_min",
    mood: "Doux et familial",
    moodEn: "Gentle and family-centered",
    bedtimeFit: "good",
    bedtimeSummary:
      "Lecture du soir autour du partage, de la famille et d'un conte calme sur les couleurs.",
    bedtimeSummaryEn:
      "A bedtime reading about sharing, family and a calm tale about colors.",
    readingTips: [
      "Lire lentement et laisser l'enfant regarder les images dans sa tete.",
      "Faire une pause apres chaque section pour respirer.",
      "Chuchoter la derniere page pour terminer le rituel.",
    ],
    readingTipsEn: [
      "Read slowly and let the child picture the scenes in their mind.",
      "Pause after each section to breathe.",
      "Whisper the final page to close the ritual.",
    ],
    pages: [
      ...section(shareFairly.title, asbLongReadingPages.shareFairly),
      ...section(simbegwire.title, asbLongReadingPages.simbegwire),
      ...section(rainbowTale.title, asbLongReadingPages.rainbowTale),
    ],
    source: africanStorybookSource,
    sourceCredits: [shareFairly, simbegwire, rainbowTale],
    qualityChecks: licensedCompilationQuality(3),
    author: "Auteurs multiples African Storybook",
    translator: "Traducteurs multiples, voir credits",
    validationStatus: "licensed",
    culturalOrigin: "Compilation de trois albums African Storybook en amharique",
    tags: ["longue lecture", "partage", "famille", "conte", "cc-by"],
  },
  {
    id: "bedtime-home-birds-mouse",
    titleAm: "የሌሊት ንባብ፦ ቤት፣ ወፎች እና ትንሹ አይጥ",
    titleFr: "Lecture du soir : maison, oiseaux et petite souris",
    titleEn: "Bedtime reading: home, birds and little mouse",
    level: "intermediate",
    ageRange: "6-9",
    estimatedMinutes: 13,
    durationBucket: "10_min",
    mood: "Conte calme",
    moodEn: "Calm tale",
    bedtimeFit: "good",
    bedtimeSummary:
      "Trois petits contes pour une lecture du soir plus courte, avec une fin douce et une ambiance de conte.",
    bedtimeSummaryEn:
      "Three short tales for a shorter bedtime reading, with a gentle ending and a storybook mood.",
    readingTips: [
      "Lire chaque section comme un petit conte separe.",
      "Ralentir avant la fin de chaque histoire.",
      "Laisser l'enfant choisir son animal prefere avant de dormir.",
    ],
    readingTipsEn: [
      "Read each section like a separate little tale.",
      "Slow down before the end of each story.",
      "Let the child choose their favorite animal before sleep.",
    ],
    pages: [
      ...section(crowdedHouse.title, asbLongReadingPages.crowdedHouse),
      ...section(birdKing.title, asbLongReadingPages.birdKing),
      ...section(mousePrince.title, asbLongReadingPages.mousePrince),
    ],
    source: africanStorybookSource,
    sourceCredits: [crowdedHouse, birdKing, mousePrince],
    qualityChecks: licensedCompilationQuality(3),
    author: "Auteurs multiples African Storybook",
    translator: "Traducteurs multiples, voir credits",
    validationStatus: "licensed",
    culturalOrigin: "Compilation de trois contes African Storybook en amharique",
    tags: ["lecture du soir", "animaux", "maison", "conte", "cc-by"],
  },
];

export function findStoryById(id: string) {
  return stories.find((story) => story.id === id);
}

export function getTonightStory() {
  return (
    stories.find((story) => story.bedtimeFit === "ideal") ??
    stories.find((story) => story.bedtimeFit === "good") ??
    stories[0]
  );
}
