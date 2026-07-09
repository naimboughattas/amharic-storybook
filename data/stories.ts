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
    pageTranslations: {
      fr: [
        "Section : Partagez equitablement !",
        "C'etait un samedi matin tres chaud et ensoleille a la ferme. Maya, Duksi et Dubi aidaient Mama K dans son potager. Les enfants avaient travaille dur toute la matinee. Ils avaient d'abord melange du compost a la terre, puis arrache les mauvaises herbes et arrose les legumes. Enfin, ils avaient recolte les cultures mures. Aujourd'hui, chacun des enfants rapporterait a la maison des fraises fraichement cueillies, des epinards et des carottes.",
        "Mama K donne toujours une douce recompense aux enfants qui l'aident. Parfois, c'est du gateau, du chocolat ou de longs bonbons en forme de serpent. D'autres fois, elle leur donne des pommes, des poires ou des oranges. Mais Mama K a une regle qui ne change jamais : \"Partagez egalement !\" Les enfants savent qu'ils doivent partager la recompense de facon juste, pour que chacun recoive la meme quantite.",
        "Aujourd'hui, Mama K a prepare un gateau rond, rose, fait avec des fraises cueillies dans son propre jardin. Les enfants sont assis dans l'herbe et attendent leur recompense. Mama K sourit et leur dit : \"Voila ! Mais n'oubliez pas la regle : chacun doit recevoir la meme part. Partagez equitablement ! Ne vous disputez pas !\"",
        "Maya fut la premiere a essayer de partager le gateau. Elle prit le couteau et commenca a tracer des lignes de coupe dans le glacage. Les autres enfants la regardaient attentivement. Elle n'avait pas encore coupe le gateau : d'abord, tout le monde devait etre d'accord que son partage etait juste. Maya leur montra son idee : \"Je pense couper ici deux fois. Comme ca, nous aurons trois parts egales pour nous trois !\"",
        "\"Pas du tout !\" dit Duksi. \"Le morceau du milieu est beaucoup trop grand !\" Dubi secoua aussi la tete : il n'etait pas d'accord. Maya rit, haussa les epaules, puis passa le tour a Duksi pour qu'elle essaie.",
        "\"Donne-le-moi ! Donne-moi le couteau, je vais le faire. C'est tres facile !\" dit Duksi d'une voix pleine d'assurance. D'abord, elle effaca avec son doigt les marques que Maya avait faites dans le glacage, puis elle lecha ses doigts.",
        "Ensuite, Duksi traca une ligne horizontale et une autre verticale. \"Regardez ! Ce sont mes trois morceaux !\" dit-elle. \"Ce n'est pas juste du tout !\" crierent Maya et Dubi ensemble.",
        "\"Partagez egalement ! Les morceaux doivent avoir la meme taille et la meme forme\", ajouta Dubi. Duksi sourit d'un air moqueur et dit : \"Alors pourquoi tu n'essaies pas, Dubi ? Je suis sure que toi non plus, tu ne sauras pas le faire !\"",
        "Dubi reflechit profondement. \"Si le gateau etait carre ou rectangulaire, ce serait beaucoup plus facile a partager !\" dit-il. Maya ajouta : \"Ou alors, si nous etions quatre a partager ce gateau rond, ce serait plus facile aussi.\"",
        "Tout a coup, une image apparut dans l'esprit de Dubi. Il pensa au grand camion rouge de son pere et au badge argente brillant sur le devant. Le dimanche, il aide son pere a laver le camion et il polit toujours ce badge qui brille. \"J'ai trouve ! J'ai trouve ! Je sais comment faire !\" cria Dubi avec joie.",
        "D'abord, Dubi effaca avec le couteau les lignes que Duksi avait tracees dans le glacage. Puis il traca trois lignes sur le gateau. Comme le badge du camion de son pere, le gateau semblait maintenant partage en trois parts egales.",
        "Duksi dit doucement : \"Dubi, tu nous surprends toujours avec tes idees !\" Maya demanda, etonnee : \"Comment as-tu su ?\" Dubi sourit pour lui-meme. Pour l'instant, il garda son secret. Plus tard, il le raconterait a son pere.",
        "A ce moment-la, Mama K sortit de la maison avec un plateau de verres remplis de jus de fraise. Maya lui dit : \"Mama K, regardez ! Dubi a trouve une maniere de partager le gateau egalement entre nous trois !\" Mama K repondit : \"Bravo, Dubi ! Trois parts egales ! Vous avez partage equitablement, et je suis fiere de vous tous. Maintenant, coupez le gateau, buvez le jus, et il sera temps de rentrer a la maison.\"",
        "Maya suivit les lignes de Dubi et coupa le gateau en trois parts egales. Pour s'amuser, les enfants poserent les morceaux les uns sur les autres afin de verifier qu'ils avaient vraiment la meme taille. Et oui : ils etaient bien egaux ! Puis ils emballerent le gateau dans un sac pour l'emporter chez eux.",
        "Le pere de Dubi arriva pour venir chercher les enfants. Dubi courut l'accueillir. Il avait tres envie de raconter a son pere comment le badge du camion l'avait aide a resoudre cette enigme de mathematiques si difficile.",
        "Des qu'il monta dans la voiture, Dubi raconta a son pere sa journee chez Mama K : le probleme qu'ils avaient rencontre, et comment il avait utilise le badge de leur camion pour le resoudre. Ils rentrerent a la maison en riant, et Dubi etait heureux d'avoir raconte sa victoire et ce qu'il avait appris sur le partage.",
      ],
      en: [
        "Section: Share fairly!",
        "It was a very hot and sunny Saturday morning on the farm. Maya, Duksi and Dubi were helping Mama K in her vegetable garden. The children had worked hard all morning. First they mixed compost into the soil, then they pulled out weeds and watered the vegetables. Finally, they gathered the ripe crops. Today, each child would take home freshly picked strawberries, spinach and carrots.",
        "Mama K always gives a sweet reward to the children who help her. Sometimes the reward is cake, chocolate, or long snake-shaped sweets. Other times, she gives them apples, pears or oranges. But Mama K has one rule that never changes: \"Share equally!\" The children know they must divide the reward fairly so that everyone gets the same amount.",
        "Today, Mama K baked a round pink cake made with strawberries from her own garden. The children are sitting on the grass, waiting for their reward. Mama K smiles and says, \"Here you are! But do not forget the rule: everyone must get the same amount. Share fairly! Do not fight!\"",
        "Maya was the first to try to divide the cake. She picked up the knife and began drawing cutting lines in the icing. The other children watched carefully. She had not cut the cake yet; first, everyone had to agree that her sharing plan was fair. Maya showed them her idea: \"I think I will cut it in two places like this. Then we will have three equal pieces for the three of us!\"",
        "\"No way!\" said Duksi. \"The piece in the middle is much too big!\" Dubi shook his head too; he did not agree. Maya laughed, shrugged, and gave Duksi a turn to try.",
        "\"Give it to me! Give me the knife, I will do it. It is very easy!\" Duksi said confidently. First, she wiped away the marks Maya had made in the icing with her finger, then she licked her fingers.",
        "Then Duksi drew one line across and another line down. \"Look! These are my three pieces!\" she said. \"That is not fair at all!\" Maya and Dubi shouted together.",
        "\"Share equally! The pieces must be the same size and the same shape,\" Dubi added. Duksi smiled teasingly and said, \"Then why don't you try, Dubi? I am sure you cannot do it either!\"",
        "Dubi thought deeply. \"If the cake were square or rectangular, it would be much easier to share!\" he said. Maya added, \"Or if four of us were sharing this round cake, that would be easier too.\"",
        "Suddenly, a picture came into Dubi's mind. He thought of his father's big red truck and the shiny silver badge on the front. On Sundays, he helps his father wash the truck and he always polishes that shining badge. \"I found it! I found it! I know how to do it!\" Dubi shouted with joy.",
        "First, Dubi used the knife to smooth away the lines Duksi had drawn in the icing. Then he drew three lines on the cake. Just like the badge on his father's truck, the cake now looked as if it had been divided into three equal parts.",
        "Duksi said softly, \"Dubi, you always surprise us with new ideas!\" Maya asked in wonder, \"How did you know?\" Dubi smiled to himself. For now, he kept the secret. Later, he would tell his father.",
        "At that moment, Mama K came out of the house carrying a tray of glasses filled with strawberry juice. Maya said, \"Mama K, look! Dubi found a way for the three of us to share the cake equally!\" Mama K replied, \"Well done, Dubi! Three equal pieces! You have shared fairly, and I am proud of all of you. Now cut the cake, drink the juice, and it is time to go home.\"",
        "Maya followed Dubi's lines and cut the cake into three equal pieces. For fun, the children stacked the pieces on top of one another to check whether they were really the same size. They were exactly equal! Then they packed the cake in a bag to take home.",
        "Dubi's father came to pick up the children. Dubi ran to greet him. He could not wait to tell his father how the badge on the truck had helped him solve that difficult maths puzzle.",
        "As soon as he got into the car, Dubi told his father about his day at Mama K's: the problem they had faced, and how he used the badge on their truck to solve it. They went home laughing, and Dubi felt happy to tell his father about his victory and what he had learned about sharing.",
      ],
    },
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
