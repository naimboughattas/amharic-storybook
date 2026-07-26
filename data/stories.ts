import { asbLongReadingPages } from "@/data/asbLongReadingPages";
import type { StoryIllustration } from "@/data/asbLongReadingImages";
import { asbLongReadingImages } from "@/data/asbLongReadingImages";
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

type AlbumKey = keyof typeof asbLongReadingPages;

/**
 * Builds the pages and the illustrations of a compilation in one pass.
 *
 * Keeping them in two hand-written lists would let them drift, and a drifted
 * list is worse than no illustration at all: every picture after the gap would
 * belong to a different page of the story.
 */
function compose(sections: readonly { title: string; album: AlbumKey }[]) {
  const pages: string[] = [];
  const pageIllustrations: (StoryIllustration | undefined)[] = [];

  for (const { title, album } of sections) {
    // The section divider is a heading, not a page of the album.
    pages.push(`ክፍል፦ ${title}`);
    pageIllustrations.push(undefined);

    asbLongReadingPages[album].forEach((text, index) => {
      pages.push(text);
      pageIllustrations.push(asbLongReadingImages[album]?.[index]);
    });
  }

  return { pages, pageIllustrations };
}

function licensedCompilationQuality(albumCount: number) {
  return {
    licenseVerified: true,
    nativeReviewed: false,
    translationProofread: false,
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
      "Lecture longue utile pour la bibliothèque, mais moins adaptée au coucher car elle contient voyage, choix moral et passages de calcul.",
    bedtimeSummaryEn:
      "A useful long library reading, but less suited to bedtime because it includes travel, moral choices and counting passages.",
    readingTips: [
      "Garder pour un après-midi ou un moment d'apprentissage.",
      "Faire des pauses sur les questions de calcul.",
    ],
    readingTipsEn: [
      "Keep this for an afternoon or a learning moment.",
      "Pause on the counting questions.",
    ],
    ...compose([
      { title: melokuhleDay.title, album: "melokuhleDay" },
      { title: blueBus.title, album: "blueBus" },
      { title: pickItUp.title, album: "pickItUp" },
    ]),
    source: africanStorybookSource,
    sourceCredits: [melokuhleDay, blueBus, pickItUp],
    qualityChecks: licensedCompilationQuality(3),
    author: "Auteurs multiples African Storybook",
    translator: "Traducteurs multiples, voir crédits",
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
      "Lire lentement et laisser l'enfant regarder les images dans sa tête.",
      "Faire une pause après chaque section pour respirer.",
      "Chuchoter la dernière page pour terminer le rituel.",
    ],
    readingTipsEn: [
      "Read slowly and let the child picture the scenes in their mind.",
      "Pause after each section to breathe.",
      "Whisper the final page to close the ritual.",
    ],
    ...compose([
      { title: shareFairly.title, album: "shareFairly" },
      { title: simbegwire.title, album: "simbegwire" },
      { title: rainbowTale.title, album: "rainbowTale" },
    ]),
    pageTranslations: {
      aligned: [
        [
          {
            am: `ክፍል፦ ${shareFairly.title}`,
            fr: "Section : Partagez équitablement !",
            en: "Section: Share fairly!",
          },
        ],
        [
          {
            am: "በእርሻው ላይ በጣም ሞቃታማና ፀሐያማ የሆነ የቅዳሜ ጠዋት ነበር።",
            fr: "C'était un samedi matin très chaud et ensoleillé à la ferme.",
            en: "It was a very hot and sunny Saturday morning on the farm.",
          },
          {
            am: "ማያ፣ ዱክሲ እና ዱቢ እማማ ኬን በአትክልት ስፍራቸው ውስጥ እያገዟቸው ነው።",
            fr: "Maya, Duksi et Dubi aidaient Mama K dans son potager.",
            en: "Maya, Duksi and Dubi were helping Mama K in her vegetable garden.",
          },
          {
            am: "ልጆቹ ጠዋቱን ሙሉ በትጋት ሲሰሩ ዋሉ።",
            fr: "Les enfants avaient travaillé dur toute la matinée.",
            en: "The children had worked hard all morning.",
          },
          {
            am: "መጀመሪያ አፈር ውስጥ ማዳበሪያ ቀላቀሉ፤ ከዚያም አረሙን እየነቀሉ አትክልቶቹን ውሃ አጠጡ።",
            fr: "Ils avaient d'abord mélangé du compost à la terre, puis arraché les mauvaises herbes et arrosé les légumes.",
            en: "First they mixed compost into the soil, then they pulled out weeds and watered the vegetables.",
          },
          {
            am: "በመጨረሻም የደረሱትን ሰብሎች ሰበሰቡ።",
            fr: "Enfin, ils avaient récolté les cultures mûres.",
            en: "Finally, they gathered the ripe crops.",
          },
          {
            am: "ዛሬ እያንዳንዳቸው ልጆች አዲስ የተቀጠፈ እንጆሪ፣ ቆስጣ እና ካሮት ወደ ቤታቸው ይዘው ይሄዳሉ።",
            fr: "Aujourd'hui, chacun des enfants rapporterait à la maison des fraises fraîchement cueillies, des épinards et des carottes.",
            en: "Today, each child would take home freshly picked strawberries, spinach and carrots.",
          },
        ],
        [
          {
            am: "እማማ ኬ ለሚረዷቸው ልጆች ሁልጊዜም ጣፋጭ ሽልማት ይሰጣቸዋል።",
            fr: "Mama K donne toujours une douce récompense aux enfants qui l'aident.",
            en: "Mama K always gives a sweet reward to the children who help her.",
          },
          {
            am: "አንዳንድ ጊዜ ሽልማቱ ኬክ፣ ቸኮሌት፣ ወይም ደግሞ እባብ የሚመስሉ ረዣዥም ከረሜላዎች ሊሆኑ ይችላሉ።",
            fr: "Parfois, c'est du gâteau, du chocolat ou de longs bonbons en forme de serpent.",
            en: "Sometimes the reward is cake, chocolate, or long snake-shaped sweets.",
          },
          {
            am: "ሌላ ጊዜ ደግሞ ፖም፣ ፒር ወይም ብርቱካን ይሰጧቸዋል።",
            fr: "D'autres fois, elle leur donne des pommes, des poires ou des oranges.",
            en: "Other times, she gives them apples, pears or oranges.",
          },
          {
            am: "እማማ ኬ ግን አንዲት የማይለወጥ ሕግ አላቸው።",
            fr: "Mais Mama K a une règle qui ne change jamais.",
            en: "But Mama K has one rule that never changes.",
          },
          {
            am: "እሷም, \"እኩል አካፍሉ!\" የምትል ነች።",
            fr: "Cette règle, c'est : \"Partagez également !\"",
            en: "That rule is: \"Share equally!\"",
          },
          {
            am: "ልጆቹ ሽልማቱን እያንዳንዳቸው ተመሳሳይ መጠን እንዲደርሳቸው አድርገው በፍትሐዊነት መከፋፈል እንዳለባቸው ያውቃሉ።",
            fr: "Les enfants savent qu'ils doivent partager la récompense de façon juste, pour que chacun reçoive la même quantité.",
            en: "The children know they must divide the reward fairly so that everyone gets the same amount.",
          },
        ],
        [
          {
            am: "ዛሬ እማማ ኬ ከራሳቸው የአትክልት ስፍራ በተቀጠፈ እንጆሪ የተሰራና በሮዝ ቀለም ያሸበረቀ ክብ ኬክ ጋገሩ።",
            fr: "Aujourd'hui, Mama K a préparé un gâteau rond et rose, fait avec des fraises cueillies dans son propre jardin.",
            en: "Today, Mama K baked a round pink cake made with strawberries from her own garden.",
          },
          {
            am: "ልጆቹ ሽልማታቸውን ለመቀበል ሳሩ ላይ ተቀምጠው እየጠበቁ ነው።",
            fr: "Les enfants sont assis dans l'herbe et attendent leur récompense.",
            en: "The children are sitting on the grass, waiting for their reward.",
          },
          {
            am: "እማማ ኬ ፈገግ እያሉ, \"እንካችሁ!\" አሏቸው።",
            fr: "Mama K sourit et leur dit : \"Voilà !\"",
            en: "Mama K smiles and says, \"Here you are!\"",
          },
          {
            am: "\"ግን ሕጉን እንዳትረሱ፤ እያንዳንዱ ሰው እኩል ማግኘት አለበት። በፍትሐዊነት ተካፈሉ! እንዳትጣሉ!\" በማለት አሳሰቧቸው።",
            fr: "\"Mais n'oubliez pas la règle : chacun doit recevoir la même part. Partagez équitablement ! Ne vous disputez pas !\"",
            en: "\"But do not forget the rule: everyone must get the same amount. Share fairly! Do not fight!\"",
          },
        ],
        [
          {
            am: "ኬኩን የማከፋፈል የመጀመሪያው ተራ የማያ ሆነ።",
            fr: "Maya fut la première à essayer de partager le gâteau.",
            en: "Maya was the first to try to divide the cake.",
          },
          {
            am: "ማያ ቢላዋውን አንስታ በኬኩ የላይኛው ክፍል (አይሲንጉ) ላይ የመቁረሻ መስመሮችን ማሰመር ጀመረች።",
            fr: "Elle prit le couteau et commença à tracer des lignes de coupe dans le glaçage.",
            en: "She picked up the knife and began drawing cutting lines in the icing.",
          },
          {
            am: "ሌሎቹ ልጆች በትኩረት ይመለከቷታል።",
            fr: "Les autres enfants la regardaient attentivement.",
            en: "The other children watched carefully.",
          },
          {
            am: "ገና ኬኩን አልቆረሰችውም፤ በመጀመሪያ ሁሉም ልጆች አከፋፈሏ ፍትሐዊ መሆኑን መስማማት አለባቸው።",
            fr: "Elle n'avait pas encore coupé le gâteau : d'abord, tout le monde devait être d'accord pour dire que son partage était juste.",
            en: "She had not cut the cake yet; first, everyone had to agree that her sharing plan was fair.",
          },
          {
            am: "ማያም, \"እንደዚህ አድርጌ ሁለት ቦታ የምቆርሰው ይመስለኛል። አሁን ለሦስታችንም እኩል የሆነ ሦስት ቁራጭ ይኖረናል!\" እያለች አሳየቻቸው።",
            fr: "Maya leur montra son idée : \"Je pense couper ici deux fois. Comme ça, nous aurons trois parts égales pour nous trois !\"",
            en: "Maya showed them her idea: \"I think I will cut it in two places like this. Then we will have three equal pieces for the three of us!\"",
          },
        ],
        [
          {
            am: "\"በፍጹም አይሆንም!\" አለ ዱክሲ።",
            fr: "\"Pas du tout !\" dit Duksi.",
            en: "\"No way!\" said Duksi.",
          },
          {
            am: "\"መሃል ላይ ያለው ቁራጭ በጣም ትልቅ ነው!\" ዱቢም ጭንቅላቱን በመነቅነቅ አልተስማማም።",
            fr: "\"Le morceau du milieu est beaucoup trop grand !\" Dubi secoua aussi la tête : il n'était pas d'accord.",
            en: "\"The piece in the middle is much too big!\" Dubi shook his head too; he did not agree.",
          },
          {
            am: "ማያ እየሳቀች ትከሻዋን ሰበከችና (አልተሳካልኝም በሚል ስሜት)፣ አሁን ደግሞ ዱክሲ እንዲሞክር ተራውን ሰጠችው።",
            fr: "Maya rit, haussa les épaules, puis passa le tour à Duksi pour qu'elle essaie.",
            en: "Maya laughed, shrugged, and gave Duksi a turn to try.",
          },
        ],
        [
          {
            am: "\"አምጪው! ቢላዋውን ለእኔ ስጪኝ፣ እኔ አደርገዋለሁ። በጣም ቀላል ነው!\" እያለች ዱክሲ በራስ መተማመን በታየበት ድምፅ ተቀበለች።",
            fr: "\"Donne-le-moi ! Donne-moi le couteau, je vais le faire. C'est très facile !\" dit Duksi d'une voix pleine d'assurance.",
            en: "\"Give it to me! Give me the knife, I will do it. It is very easy!\" Duksi said confidently.",
          },
          {
            am: "መጀመሪያ፣ ማያ በአይሲንጉ ላይ ያሰመረችውን ምልክት በእጇ አጠፋችና ጣቶቿን ላሰች።",
            fr: "D'abord, elle effaça avec son doigt les marques que Maya avait faites dans le glaçage, puis elle lécha ses doigts.",
            en: "First, she wiped away the marks Maya had made in the icing with her finger, then she licked her fingers.",
          },
        ],
        [
          {
            am: "ከዚያም ዱክሲ አንዱን መስመር አግድም፣ ሌላኛውን ደግሞ ቁልቁል አሰመረች።",
            fr: "Ensuite, Duksi traça une ligne horizontale et une autre verticale.",
            en: "Then Duksi drew one line across and another line down.",
          },
          {
            am: "\"ተመልከቱ! እነዚህ የእኔ ሦስት ቁራጮች ናቸው!\" አለች።",
            fr: "\"Regardez ! Ce sont mes trois morceaux !\" dit-elle.",
            en: "\"Look! These are my three pieces!\" she said.",
          },
          {
            am: "\"ይህ በፍጹም ፍትሐዊ አይደለም!\" በማለት ማያ እና ዱቢ በአንድ ላይ ጮኹ።",
            fr: "\"Ce n'est pas juste du tout !\" crièrent Maya et Dubi ensemble.",
            en: "\"That is not fair at all!\" Maya and Dubi shouted together.",
          },
        ],
        [
          {
            am: "\"እኩል አካፍሉ! ቁራጮቹ መጠናቸውም ሆነ ቅርጻቸው ተመሳሳይ መሆን አለበት,\" ሲል ዱቢ አከለበት።",
            fr: "\"Partagez également ! Les morceaux doivent avoir la même taille et la même forme\", ajouta Dubi.",
            en: "\"Share equally! The pieces must be the same size and the same shape,\" Dubi added.",
          },
          {
            am: "ዱክሲም በፌዝ ፈገግ እያለች, \"ለምን አንተ አትሞክረውም ዱቢ? አንተም ልታደርገው እንደማትችል እርግጠኛ ነኝ!\" አለችው።",
            fr: "Duksi sourit d'un air moqueur et dit : \"Alors pourquoi tu n'essaies pas, Dubi ? Je suis sûre que toi non plus, tu ne sauras pas le faire !\"",
            en: "Duksi smiled teasingly and said, \"Then why don't you try, Dubi? I am sure you cannot do it either!\"",
          },
        ],
        [
          {
            am: "ዱቢ በጥልቀት እያሰበ, \"ኬኩ ካሬ ወይም አራት ማዕዘን ቢሆን ኖሮ፣ ለመከፋፈል በጣም ቀላል በሆነ ነበር!\" አለ።",
            fr: "Dubi réfléchit profondément. \"Si le gâteau était carré ou rectangulaire, ce serait beaucoup plus facile à partager !\" dit-il.",
            en: "Dubi thought deeply. \"If the cake were square or rectangular, it would be much easier to share!\" he said.",
          },
          {
            am: "ማያም በበኩሏ, \"ወይም ደግሞ፣ ይህንን ክብ ኬክ የምንካፈለው አራት ብንሆን ኖሮ እሱም ቀላል ይሆን ነበር\" ስትል አሳቧን ገለጸች።",
            fr: "Maya ajouta : \"Ou alors, si nous étions quatre à partager ce gâteau rond, ce serait plus facile aussi.\"",
            en: "Maya added, \"Or if four of us were sharing this round cake, that would be easier too.\"",
          },
        ],
        [
          {
            am: "ከዚያም ድንገት በዱቢ አእምሮ ውስጥ አንድ ምስል መጣ።",
            fr: "Tout à coup, une image apparut dans l'esprit de Dubi.",
            en: "Suddenly, a picture came into Dubi's mind.",
          },
          {
            am: "የአባቱን ትልቅ ቀይ መኪና (ትራክ) ፊት ለፊት ላይ ያለውን የሚያብረቀርቅ የብር ምልክት (ባጅ) በዓይነ ሕሊናው ተመለከተ።",
            fr: "Il pensa au grand camion rouge de son père et au badge argenté brillant sur le devant.",
            en: "He thought of his father's big red truck and the shiny silver badge on the front.",
          },
          {
            am: "እሁድ እሁድ አባቱን መኪናውን ሲያጥብ ይረዳዋል፤ ያንን የሚያብረቀርቅ ምልክትም ይወለውላል።",
            fr: "Le dimanche, il aide son père à laver le camion et il polit toujours ce badge qui brille.",
            en: "On Sundays, he helps his father wash the truck and he always polishes that shining badge.",
          },
          {
            am: "\"አገኘሁት! አገኘሁት! እንዴት መደረግ እንዳለበት አወቁ!\" እያለ ዱቢ በደስታ ጮኸ።",
            fr: "\"J'ai trouvé ! J'ai trouvé ! Je sais comment faire !\" cria Dubi avec joie.",
            en: "\"I found it! I found it! I know how to do it!\" Dubi shouted with joy.",
          },
        ],
        [
          {
            am: "መጀመሪያ፣ ዱክሲ በአይሲንጉ ላይ ያሰመረችውን መስመር በቢላዋው አስተካክሎ አጠፋው።",
            fr: "D'abord, Dubi effaça avec le couteau les lignes que Duksi avait tracées dans le glaçage.",
            en: "First, Dubi used the knife to smooth away the lines Duksi had drawn in the icing.",
          },
          {
            am: "ከዚያም በኬኩ ላይ ሦስት መስመሮችን አሰመረ።",
            fr: "Puis il traça trois lignes sur le gâteau.",
            en: "Then he drew three lines on the cake.",
          },
          {
            am: "ልክ እንደ አባቱ መኪና ምልክት፣ ኬኩ አሁን በሦስት እኩል ክፍሎች የተከፈለ ይመስላል።",
            fr: "Comme le badge du camion de son père, le gâteau semblait maintenant partagé en trois parts égales.",
            en: "Just like the badge on his father's truck, the cake now looked as if it had been divided into three equal parts.",
          },
        ],
        [
          {
            am: "ዱክሲ በለሰለሰ ድምፅ, \"ዱቢ፣ ሁልጊዜም በአዳዲስ ነገሮች ታስገርመናለህ!\" አለችው።",
            fr: "Duksi dit doucement : \"Dubi, tu nous surprends toujours avec tes idées !\"",
            en: "Duksi said softly, \"Dubi, you always surprise us with new ideas!\"",
          },
          {
            am: "ማያም በበኩሏ \"እንዴት ልታውቀው ቻልክ?\" ስትል በግርምት ጠየቀችው።",
            fr: "Maya demanda, étonnée : \"Comment as-tu su ?\"",
            en: "Maya asked in wonder, \"How did you know?\"",
          },
          {
            am: "ዱቢ ለራሱ ፈገግ አለ።",
            fr: "Dubi sourit pour lui-même.",
            en: "Dubi smiled to himself.",
          },
          {
            am: "ለጊዜው ምስጢሩን በሆዱ ያዘው።",
            fr: "Pour l'instant, il garda son secret.",
            en: "For now, he kept the secret.",
          },
          {
            am: "ቆየት ብሎ ግን ለአባቱ ይነግረዋል።",
            fr: "Plus tard, il le raconterait à son père.",
            en: "Later, he would tell his father.",
          },
        ],
        [
          {
            am: "ልክ በዚያ ቅጽበት እማማ ኬ ከቤታቸው ወጡ።",
            fr: "À ce moment-là, Mama K sortit de la maison.",
            en: "At that moment, Mama K came out of the house.",
          },
          {
            am: "በእጃቸውም በብርጭቆ የተሞላ የእንጆሪ ጭማቂ የያዘ ትሪ ይዘዋል።",
            fr: "Elle portait un plateau de verres remplis de jus de fraise.",
            en: "She was carrying a tray of glasses filled with strawberry juice.",
          },
          {
            am: "ማያም \"እማማ ኬ ተመልከቱ! ዱቢ ኬኩን ለሦስታችንም እኩል የምንከፍልበትን መንገድ አገኘ!\" በማለት ነገረቻቸው።",
            fr: "Maya lui dit : \"Mama K, regardez ! Dubi a trouvé une manière de partager le gâteau également entre nous trois !\"",
            en: "Maya said, \"Mama K, look! Dubi found a way for the three of us to share the cake equally!\"",
          },
          {
            am: "እማማ ኬም \"ጎበዝ ዱቢ! ሦስት እኩል ቁራጮች! በፍትሐዊነት ተካፍላችኋል፤ በሁላችሁም ኩራት ይሰማኛል። አሁን ኬኩን ቁረሱና ጭማቂውን ጠጡ። ወደ ቤት የምትሄዱበት ሰዓት ደርሷል\" አሏቸው።",
            fr: "Mama K répondit : \"Bravo, Dubi ! Trois parts égales ! Vous avez partagé équitablement, et je suis fière de vous tous. Maintenant, coupez le gâteau, buvez le jus, et il sera temps de rentrer à la maison.\"",
            en: "Mama K replied, \"Well done, Dubi! Three equal pieces! You have shared fairly, and I am proud of all of you. Now cut the cake, drink the juice, and it is time to go home.\"",
          },
        ],
        [
          {
            am: "ማያ የዱቢን መስመሮች በመከተል ኬኩን በሦስት እኩል ቁራጮች ቆረሰችው።",
            fr: "Maya suivit les lignes de Dubi et coupa le gâteau en trois parts égales.",
            en: "Maya followed Dubi's lines and cut the cake into three equal pieces.",
          },
          {
            am: "ልጆቹ ለጨዋታ ያህል፣ ቁራጮቹ በእርግጥ ተመሳሳይ መጠን መሆናቸውን ለማረጋገጥ አንዱን በሌላው ላይ ደራረቧቸው።",
            fr: "Pour s'amuser, les enfants posèrent les morceaux les uns sur les autres afin de vérifier qu'ils avaient vraiment la même taille.",
            en: "For fun, the children stacked the pieces on top of one another to check whether they were really the same size.",
          },
          {
            am: "በትክክልም እኩል ናቸው!",
            fr: "Et oui : ils étaient bien égaux !",
            en: "They were exactly equal!",
          },
          {
            am: "ከዚያም ኬኩን ወደ ቤታቸው ለመውሰድ በፓስታ አሸጉት።",
            fr: "Puis ils emballèrent le gâteau dans un sac pour l'emporter chez eux.",
            en: "Then they packed the cake in a bag to take home.",
          },
        ],
        [
          {
            am: "የዱቢ አባት ልጆቹን ለመውሰድ መጣ፤ ዱቢም እሱን ለመቀበል እየሮጠ ሄደ።",
            fr: "Le père de Dubi arriva pour venir chercher les enfants. Dubi courut l'accueillir.",
            en: "Dubi's father came to pick up the children. Dubi ran to greet him.",
          },
          {
            am: "በትራክ መኪናው ላይ ያለው ምልክት (ባጅ) ያንንም በጣም አስቸጋሪ የሆነ የሒሳብ እንቆቅልሽ ለመፍታት እንዴት እንደረዳው ለአባቱ ለመንገር በጣም ጓጉቷል!",
            fr: "Il avait très envie de raconter à son père comment le badge du camion l'avait aidé à résoudre cette énigme de mathématiques si difficile.",
            en: "He could not wait to tell his father how the badge on the truck had helped him solve that difficult maths puzzle.",
          },
        ],
        [
          {
            am: "ልክ መኪናዉ ዉስጥ አንደገባ ዱቢ የዛሬዉን ዉሎ ፡ ማማ ኬ ጋ የገጠመዉን ችግር ፡ አንዴት የ መኪናቸዉን ባጅ ተጠቅሞ አንደፈታዉ ለ አባቱ ነግሮት አየተሳሳቁ በድል ኣድራጊነት ስሜት ተሞልቶ ስለማካፈል ያደረገዉን ነገር ለአባቱ በመንገሩ ተደስቶ ወደቤታቸዉ ሄዱ።",
            fr: "Dès qu'il monta dans la voiture, Dubi raconta à son père sa journée chez Mama K : le problème qu'ils avaient rencontré, et comment il avait utilisé le badge de leur camion pour le résoudre. Ils rentrèrent à la maison en riant, et Dubi était heureux d'avoir raconté sa victoire et ce qu'il avait appris sur le partage.",
            en: "As soon as he got into the car, Dubi told his father about his day at Mama K's: the problem they had faced, and how he used the badge on their truck to solve it. They went home laughing, and Dubi felt happy to tell his father about his victory and what he had learned about sharing.",
          },
        ],
        [
          {
            am: `ክፍል፦ ${simbegwire.title}`,
            fr: "Section : Simbegwire",
            en: "Section: Simbegwire",
          },
        ],
        [
          {
            am: "ሲምበግዊሬ እናቷ ስትሞት ብስጭት ተሰማት።",
            fr: "Simbegwire se sentit très triste quand sa mère mourut.",
            en: "Simbegwire felt very sad when her mother died.",
          },
          {
            am: "የሲምበግዊሬ አባት ለልጁ እንክብካቤ ለማድረግ የተቻለውን አደረገ።",
            fr: "Le père de Simbegwire fit de son mieux pour prendre soin de sa fille.",
            en: "Simbegwire's father did his best to care for his daughter.",
          },
          {
            am: "ቀስ በቀስ የሲምበግዊሬ እናት በሌለችበት ደስተኝነትን መልሰው እንዴት እንደሚያገኙ አወቁበት።",
            fr: "Peu à peu, ils apprirent à retrouver le bonheur sans la mère de Simbegwire.",
            en: "Little by little, they learned how to find happiness again without Simbegwire's mother.",
          },
          {
            am: "በየዕለቱ ጠዋት ቁጭ ብለው ስለመጪው ቀን ይነጋራሉ።",
            fr: "Chaque matin, ils s'asseyaient ensemble pour parler de la journée à venir.",
            en: "Every morning, they sat together and talked about the day ahead.",
          },
          {
            am: "በየምሽቱም ራት አብረው ይሰራሉ።",
            fr: "Chaque soir, ils préparaient le dîner ensemble.",
            en: "Every evening, they cooked supper together.",
          },
          {
            am: "ሳህኖቹን ካጠቡ በኋላ የሲምበግዊሬ አባት የቤት ስራዋን በመስራት ያግዛታል።",
            fr: "Après avoir lavé les assiettes, le père de Simbegwire l'aidait à faire ses devoirs.",
            en: "After washing the dishes, Simbegwire's father helped her with her homework.",
          },
        ],
        [
          {
            am: "አንድ ቀን የሲምበግዊሬ አባት ከወትሮው ዘግይቶ ወደ ቤት ተመለሰ።",
            fr: "Un jour, le père de Simbegwire rentra plus tard que d'habitude.",
            en: "One day, Simbegwire's father came home later than usual.",
          },
          {
            am: "\"የት ነሽ ልጄ?\" ብሎ ጠራ።",
            fr: "\"Où es-tu, mon enfant ?\" appela-t-il.",
            en: "\"Where are you, my child?\" he called.",
          },
          {
            am: "ሲምበግዊሬ ወደ አባቷ ሮጠች።",
            fr: "Simbegwire courut vers son père.",
            en: "Simbegwire ran to her father.",
          },
          {
            am: "ከሴት ጋር እንደመጣ ስታይ በድንገት ቆመች።",
            fr: "Quand elle vit qu'il était arrivé avec une femme, elle s'arrêta net.",
            en: "When she saw that he had come with a woman, she stopped still.",
          },
          {
            am: "\"ልጄ አንዲት ልዩ ሴት እንድታገኚ እፈልጋለሁ። ይህች አኒታ ናት\" አለ ፈገግታ እያሳየ።",
            fr: "\"Mon enfant, je veux que tu rencontres une femme spéciale. Voici Anita\", dit-il avec un sourire.",
            en: "\"My child, I want you to meet a special woman. This is Anita,\" he said with a smile.",
          },
        ],
        [
          {
            am: "አኒታ \"እንዴት ነሽ ሲምበግዊሬ? አባትሽ ስለ አንቺ ብዙ ነግሮኛል\" አለች።",
            fr: "Anita dit : \"Comment vas-tu, Simbegwire ? Ton père m'a beaucoup parlé de toi.\"",
            en: "Anita said, \"How are you, Simbegwire? Your father has told me a lot about you.\"",
          },
          {
            am: "ነገር ግን አኒታ ፈገግ አላለችም፣ የሲምበግዊሬንም እጅ አልጨበጠችም።",
            fr: "Pourtant, Anita ne sourit pas et ne serra pas la main de Simbegwire.",
            en: "But Anita did not smile or shake Simbegwire's hand.",
          },
          {
            am: "የሲምበግዊሬ አባት ደስተኛ ነበር።",
            fr: "Le père de Simbegwire était heureux.",
            en: "Simbegwire's father felt happy.",
          },
          {
            am: "ሶስቱ እንዴት አብረው እንደሚኖሩ፣ እንዴትም ጥሩ ህይወት እንደሚኖራቸው ተናገረ።",
            fr: "Il parla de la façon dont ils vivraient tous les trois ensemble, et de la belle vie qu'ils pourraient avoir.",
            en: "He talked about how the three of them would live together, and how good their life could be.",
          },
          {
            am: "\"ልጄ፣ አኒታን እንደ እናት እንድታያት ተስፋ አደርጋለሁ\" አላት።",
            fr: "\"Mon enfant, j'espère que tu verras Anita comme une mère\", lui dit-il.",
            en: "\"My child, I hope you will see Anita as a mother,\" he told her.",
          },
        ],
        [
          {
            am: "የሲምበግዊሬ ህይወት ተለወጠ።",
            fr: "La vie de Simbegwire changea.",
            en: "Simbegwire's life changed.",
          },
          {
            am: "በጠዋት ከአባቷ ጋር ቁጭ ለማለት ጊዜ እያነሰ ሄደ።",
            fr: "Le matin, elle avait de moins en moins de temps pour s'asseoir avec son père.",
            en: "In the mornings, she had less and less time to sit with her father.",
          },
          {
            am: "አኒታ ብዙ የቤት ስራዎችን ትሰጣታለች፤ በምሽትም የቤት ስራዋን ለመስራት በጣም ደክሟት ይሆናል።",
            fr: "Anita lui donnait tellement de tâches à faire à la maison que, le soir, elle était trop fatiguée pour faire ses devoirs.",
            en: "Anita gave her so many household tasks that, at night, she was too tired to do her homework.",
          },
          {
            am: "ከራት በኋላ በቀጥታ ወደ አልጋዋ መሄድ ልማድ ሆነባት።",
            fr: "Après le dîner, elle prit l'habitude d'aller directement se coucher.",
            en: "After supper, she got used to going straight to bed.",
          },
          {
            am: "የሚያጽናናት ብቸኛው ነገር እናቷ የሰጠቻት ቀለማት ያሉት ብርድ ልብስ ነበር።",
            fr: "La seule chose qui la réconfortait était la couverture colorée que sa mère lui avait donnée.",
            en: "The only thing that comforted her was the colorful blanket her mother had given her.",
          },
          {
            am: "የሲምበግዊሬ አባት የልጁን ሀዘን የሚያይ አልመሰለም።",
            fr: "Le père de Simbegwire ne semblait pas remarquer la tristesse de sa fille.",
            en: "Simbegwire's father did not seem to notice his daughter's sadness.",
          },
        ],
        [
          {
            am: "ከጥቂት ወራት በኋላ የሲምበግዊሬ አባት ለተወሰነ ጊዜ መሄድ እንዳለበት ነገራቸው።",
            fr: "Quelques mois plus tard, le père de Simbegwire leur annonça qu'il devait partir pour quelque temps.",
            en: "A few months later, Simbegwire's father told them that he had to go away for a while.",
          },
          {
            am: "\"ለስራ መሄድ አለብኝ\" አላቸው።",
            fr: "\"Je dois partir pour le travail\", leur dit-il.",
            en: "\"I have to go away for work,\" he told them.",
          },
          {
            am: "\"ነገር ግን እርስ በርሳችሁ እንደምትደጋገፉ እተማመናለሁ።\"",
            fr: "\"Mais je suis sûr que vous vous soutiendrez l'une l'autre.\"",
            en: "\"But I trust that you will support one another.\"",
          },
          {
            am: "የሲምበግዊሬ ፊት ተለወጠ፣ አባቷ ግን አላስተዋለም።",
            fr: "Le visage de Simbegwire se crispa, mais son père ne le remarqua pas.",
            en: "Simbegwire's face fell, but her father did not notice.",
          },
          {
            am: "አኒታ ምንም አላለችም።",
            fr: "Anita ne dit pas un mot.",
            en: "Anita did not say a word.",
          },
          {
            am: "እሷም ደስተኛ አልነበረችም።",
            fr: "Elle non plus n'était pas heureuse.",
            en: "She was not happy either.",
          },
        ],
        [
          {
            am: "ለሲምበግዊሬ ሁሉም ነገር እየከፋ ሄደ።",
            fr: "Pour Simbegwire, tout devint de plus en plus difficile.",
            en: "For Simbegwire, everything became worse and worse.",
          },
          {
            am: "ስራዋን ካልጨረሰች ወይም ካጉረመረመች አኒታ ትመታታለች።",
            fr: "Si elle ne terminait pas ses tâches ou si elle se plaignait, Anita la frappait.",
            en: "If she did not finish her chores or if she complained, Anita beat her.",
          },
          {
            am: "በራት ጊዜ ሴቲቱ ብዙውን ምግብ ስለምትበላ ለሲምበግዊሬ ጥቂት ብቻ ይቀራታል።",
            fr: "Au dîner, comme la femme mangeait la plus grande part du repas, il ne restait presque rien pour Simbegwire.",
            en: "At supper time, because the woman ate most of the food, almost nothing was left for Simbegwire.",
          },
          {
            am: "በየምሽቱ ሲምበግዊሬ የእናቷን ብርድ ልብስ አጥብቃ ይዛ እያለቀሰች ትተኛለች።",
            fr: "Chaque soir, Simbegwire allait se coucher en pleurant, serrant contre elle la couverture de sa mère.",
            en: "Every night, Simbegwire went to sleep crying, holding her mother's blanket close.",
          },
        ],
        [
          {
            am: "አንድ ጠዋት ሲምበግዊሬ ከመጠን በላይ ተኛች።",
            fr: "Un matin, Simbegwire dormit trop longtemps.",
            en: "One morning, Simbegwire slept too late.",
          },
          {
            am: "\"ሰነፍ!\" ብላ አኒታ ጮኸችባት።",
            fr: "\"Paresseuse !\" lui cria Anita.",
            en: "\"Lazy girl!\" Anita shouted at her.",
          },
          {
            am: "አኒታ ሲምበግዊሬን ጎተተች።",
            fr: "Anita tira Simbegwire.",
            en: "Anita pulled Simbegwire.",
          },
          {
            am: "ውዱ ብርድ ልብስ በምስማር ተያዘና ሁለት ተቀደደ።",
            fr: "La précieuse couverture se prit dans un clou et se déchira en deux.",
            en: "The precious blanket caught on a nail and tore in two.",
          },
        ],
        [
          {
            am: "ሲምበግዊሬ በጣም ተናደደች።",
            fr: "Simbegwire fut très bouleversée.",
            en: "Simbegwire was very upset.",
          },
          {
            am: "ከቤት ለመሸሽ ወሰነች።",
            fr: "Elle décida de s'enfuir de la maison.",
            en: "She decided to run away from home.",
          },
          {
            am: "የእናቷን ብርድ ልብስ ቁርጥራጮች ወሰደች፣ ትንሽም ምግብ አዘጋጀች እና ቤቱን ለቀቀች።",
            fr: "Elle prit les morceaux de la couverture de sa mère, prépara un peu de nourriture et quitta la maison.",
            en: "She took the pieces of her mother's blanket, packed a little food and left the house.",
          },
          {
            am: "አባቷ የወሰደውን መንገድ ተከትላ ጉዞዋን ጀመረች።",
            fr: "Elle suivit la route que son père avait prise et commença son voyage.",
            en: "She followed the road her father had taken and began her journey.",
          },
        ],
        [
          {
            am: "ሌሊት ሲሆን ከምንጭ አጠገብ ባለ ትልቅ ዛፍ ላይ ወጥታ በቅርንጫፎቹ ላይ መኝታዋን አዘጋጀች።",
            fr: "Quand la nuit tomba, elle grimpa dans un grand arbre près d'une source et prépara son lit sur les branches.",
            en: "When night fell, she climbed into a big tree near a spring and made her bed among the branches.",
          },
          {
            am: "እየተኛችም ዘፈነች፦ \"እናቴ፣ እናቴ፣ እናቴ፣ ትተሽኝ ሄድሽ። ትተሽኝ ሄድሽና አልተመለስሽም። አባቴ አሁን አያስበኝም። እናቴ፣ መቼ ትመለሻለሽ? ትተሽኝ ሄድሽ።\"",
            fr: "En s'endormant, elle chanta : \"Maman, maman, maman, tu m'as quittée. Tu m'as quittée et tu n'es pas revenue. Papa ne pense plus à moi maintenant. Maman, quand reviendras-tu ? Tu m'as quittée.\"",
            en: "As she was falling asleep, she sang: \"Mother, mother, mother, you left me. You left me and you did not come back. Father does not think about me now. Mother, when will you come back? You left me.\"",
          },
        ],
        [
          {
            am: "በማግስቱ ጠዋት ሲምበግዊሬ ዘፈኑን እንደገና ዘፈነች።",
            fr: "Le lendemain matin, Simbegwire chanta encore la chanson.",
            en: "The next morning, Simbegwire sang the song again.",
          },
          {
            am: "ሴቶች ልብሳቸውን ለማጠብ ወደ ምንጩ መጡ፣ ከትልቁ ዛፍ የሚመጣውንም የሀዘን ዘፈን ሰሙ።",
            fr: "Des femmes vinrent à la source pour laver leurs vêtements et entendirent la chanson triste qui venait du grand arbre.",
            en: "Women came to the spring to wash their clothes and heard the sad song coming from the big tree.",
          },
          {
            am: "የቅጠሎች ውስጥ የሚነፍሰው ነፋስ ድምፅ መሰላቸው፣ ስራቸውንም ቀጠሉ።",
            fr: "Elles crurent que c'était le bruit du vent dans les feuilles et continuèrent leur travail.",
            en: "They thought it was the sound of the wind in the leaves and continued their work.",
          },
          {
            am: "ነገር ግን አንዷ ሴት ዘፈኑን በጥሞና አዳመጠች።",
            fr: "Mais l'une des femmes écouta la chanson avec beaucoup d'attention.",
            en: "But one of the women listened to the song very carefully.",
          },
        ],
        [
          {
            am: "ያቺ ሴት ወደ ዛፉ ቀና ብላ ተመለከተች።",
            fr: "Cette femme leva les yeux vers l'arbre.",
            en: "The woman looked up at the tree.",
          },
          {
            am: "ትንሿን ልጅ እና የብርድ ልብሱን ቁራጭ ስታይ \"ሲምበግዊሬ፣ የወንድሜ ልጅ!\" ብላ ጮኸች።",
            fr: "Quand elle vit la petite fille et le morceau de couverture, elle s'écria : \"Simbegwire, l'enfant de mon frère !\"",
            en: "When she saw the little girl and the piece of blanket, she cried, \"Simbegwire, my brother's child!\"",
          },
          {
            am: "ሌሎቹ ሴቶች ልብስ ማጠብ አቁመው ሲምበግዊሬን ከዛፉ እንድትወርድ ረዷት።",
            fr: "Les autres femmes arrêtèrent de laver le linge et aidèrent Simbegwire à descendre de l'arbre.",
            en: "The other women stopped washing and helped Simbegwire climb down from the tree.",
          },
          {
            am: "አክስቷ ትንሿን ልጅ በእቅፏ ይዛ ማጽናናት ጀመረች።",
            fr: "Sa tante prit la petite fille dans ses bras et commença à la consoler.",
            en: "Her aunt held the little girl in her arms and began to comfort her.",
          },
        ],
        [
          {
            am: "የሲምበግዊሬ አክስት ልጅቷን ወደ ቤቷ ወሰደቻት።",
            fr: "La tante de Simbegwire emmena l'enfant chez elle.",
            en: "Simbegwire's aunt took the child to her home.",
          },
          {
            am: "ሲምበግዊሬን ትኩስ ምግብ ሰጠቻት እና በእናቷ ብርድ ልብስ አጠቀለለቻት።",
            fr: "Elle donna à Simbegwire un repas chaud et l'enveloppa dans la couverture de sa mère.",
            en: "She gave Simbegwire a hot meal and wrapped her in her mother's blanket.",
          },
          {
            am: "በዚያ ምሽት ሲምበግዊሬ ወደ አልጋ ስትሄድ አለቀሰች።",
            fr: "Ce soir-là, en allant se coucher, Simbegwire pleura.",
            en: "That night, when she went to bed, Simbegwire cried.",
          },
          {
            am: "ነገር ግን እንባዋ የእፎይታ እንባ ነበር።",
            fr: "Mais ses larmes étaient des larmes de soulagement.",
            en: "But her tears were tears of relief.",
          },
          {
            am: "አክስቷ እንደምትንከባከባት አወቀች።",
            fr: "Elle savait que sa tante prendrait soin d'elle.",
            en: "She knew that her aunt would care for her.",
          },
        ],
        [
          {
            am: "የሲምበግዊሬ አባት ወደ ቤት ሲመለስ ቤቱን ባዶ አገኘው።",
            fr: "Quand le père de Simbegwire rentra chez lui, il trouva la maison vide.",
            en: "When Simbegwire's father returned home, he found the house empty.",
          },
          {
            am: "\"ምን ሆነ፣ አኒታ?\" ብሎ በከባድ ድምፅ ጠየቀ።",
            fr: "\"Que s'est-il passé, Anita ?\" demanda-t-il d'une voix lourde.",
            en: "\"What happened, Anita?\" he asked, his voice heavy.",
          },
          {
            am: "አኒታ ሲምበግዊሬ እንደጠፋች ነገረችው።",
            fr: "Anita lui dit que Simbegwire avait disparu.",
            en: "Anita told him that Simbegwire had disappeared.",
          },
          {
            am: "\"እንድታከብረኝ ፈልጌ ነበር\" አለች።",
            fr: "\"Je voulais qu'elle me respecte\", dit-elle.",
            en: "\"I wanted her to respect me,\" she said.",
          },
          {
            am: "\"ምናልባት በጣም ጨካኝ ሆኜባት ይሆናል።\"",
            fr: "\"Peut-être ai-je été trop dure avec elle.\"",
            en: "\"Perhaps I was too hard on her.\"",
          },
          {
            am: "የሲምበግዊሬ አባት ቤቱን ለቆ ወደ ምንጩ ሄደ።",
            fr: "Le père de Simbegwire quitta la maison et partit vers la source.",
            en: "Simbegwire's father left the house and went toward the spring.",
          },
          {
            am: "ማንም ሲምበግዊሬን አይቶ እንደሆነ ለመጠየቅ እስከ እህቱ መንደር ድረስ ቀጠለ።",
            fr: "Pour demander si quelqu'un avait vu Simbegwire, il continua jusqu'au village de sa sœur.",
            en: "To ask whether anyone had seen Simbegwire, he continued to his sister's village.",
          },
        ],
        [
          {
            am: "ሲምበግዊሬ ከአክስቷ ልጆች ጋር እየተጫወተች ነበር፤ አባቷንም በርቀት አየችው።",
            fr: "Simbegwire jouait avec les enfants de sa tante quand elle vit son père au loin.",
            en: "Simbegwire was playing with her aunt's children when she saw her father in the distance.",
          },
          {
            am: "በእሷ ላይ እንደሚቆጣ ፈራች።",
            fr: "Elle eut peur qu'il soit fâché contre elle.",
            en: "She was afraid he would be angry with her.",
          },
          {
            am: "ስለዚህ ለመደበቅ ወደ ቤት ሮጠች።",
            fr: "Alors elle courut vers la maison pour se cacher.",
            en: "So she ran toward the house to hide.",
          },
          {
            am: "አባቷ ግን ወደ እሷ ሮጦ \"ሲምበግዊሬ፣ ጥሩ እናት አግኝተሻል፤ የሚረዳሽና የሚወድሽ ሰው። በአንቺ እኮራለሁ፤ እወድሻለሁ\" አላት።",
            fr: "Mais son père courut vers elle et lui dit : \"Simbegwire, tu as trouvé une bonne mère, quelqu'un qui t'aide et qui t'aime. Je suis fier de toi ; je t'aime.\"",
            en: "But her father ran to her and said, \"Simbegwire, you have found a good mother, someone who helps you and loves you. I am proud of you; I love you.\"",
          },
          {
            am: "ሲምበግዊሬ እስከፈለገች ድረስ ከአክስቷ ጋር እንድትቆይ ተስማሙ።",
            fr: "Ils décidèrent que Simbegwire resterait avec sa tante aussi longtemps qu'elle le voudrait.",
            en: "They agreed that Simbegwire would stay with her aunt for as long as she wanted.",
          },
        ],
        [
          {
            am: "አባቷ በየቀኑ ሊጎበኛት ጀመረ።",
            fr: "Son père commença à lui rendre visite tous les jours.",
            en: "Her father began to visit her every day.",
          },
          {
            am: "አንድ ቀን ከአኒታ ጋር መጣ።",
            fr: "Un jour, il vint avec Anita.",
            en: "One day, he came with Anita.",
          },
          {
            am: "አኒታ ሲምበግዊሬን ለመሰላምታ እጇን ዘረጋች።",
            fr: "Anita tendit la main pour saluer Simbegwire.",
            en: "Anita held out her hand to greet Simbegwire.",
          },
          {
            am: "\"ልጄ፣ ይቅርታ፤ ተሳስቻለሁ\" ብላ እያለቀሰች አለች።",
            fr: "\"Mon enfant, je suis désolée ; j'ai eu tort\", dit-elle en pleurant.",
            en: "\"My child, I am sorry; I was wrong,\" she said, crying.",
          },
          {
            am: "\"ሌላ እድል ትሰጪኛለሽ?\"",
            fr: "\"Me donneras-tu une autre chance ?\"",
            en: "\"Will you give me another chance?\"",
          },
          {
            am: "ሲምበግዊሬ አባቷን እና የተጨነቀውን ፊቱን ተመለከተች።",
            fr: "Simbegwire regarda son père et son visage inquiet.",
            en: "Simbegwire looked at her father and his worried face.",
          },
          {
            am: "ከዚያም ቀስ ብላ ቀረበች እና አኒታን አቀፈች።",
            fr: "Puis elle avança doucement et serra Anita dans ses bras.",
            en: "Then she slowly stepped forward and hugged Anita.",
          },
        ],
        [
          {
            am: "በቀጣዩ ሳምንት አኒታ ሲምበግዊሬን፣ አክስቷን እና ልጆቿን በቤቷ ለምሳ ጋበዘች።",
            fr: "La semaine suivante, Anita invita Simbegwire, sa tante et ses enfants à déjeuner chez elle.",
            en: "The following week, Anita invited Simbegwire, her aunt and her children to lunch at her home.",
          },
          {
            am: "እንዴት ያለ ድንቅ ምግብ!",
            fr: "Quel magnifique repas !",
            en: "What a wonderful feast!",
          },
          {
            am: "አኒታ የሲምበግዊሬን ተወዳጅ ምግቦች ሁሉ አዘጋጅታ ነበር፣ ሁሉም እስኪጠግብ ድረስ በሉ።",
            fr: "Anita avait préparé tous les plats préférés de Simbegwire, et tout le monde mangea jusqu'à être rassasié.",
            en: "Anita had prepared all of Simbegwire's favorite foods, and everyone ate until they were full.",
          },
          {
            am: "ከዚያም አዋቂዎቹ ሲነጋገሩ ልጆቹ ተጫወቱ።",
            fr: "Ensuite, les adultes parlèrent pendant que les enfants jouaient.",
            en: "Then the adults talked while the children played.",
          },
          {
            am: "ሲምበግዊሬ ደስተኛና ደፋር ተሰማት።",
            fr: "Simbegwire se sentit heureuse et courageuse.",
            en: "Simbegwire felt happy and brave.",
          },
          {
            am: "በቅርቡ፣ በጣም በቅርቡ፣ ወደ ቤቷ ተመልሳ ከአባቷና ከእንጀራ እናቷ ጋር ለመኖር ወሰነች።",
            fr: "Bientôt, très bientôt, elle décida qu'elle retournerait chez elle pour vivre avec son père et sa belle-mère.",
            en: "Soon, very soon, she decided that she would return home to live with her father and her stepmother.",
          },
        ],
        [
          {
            am: `ክፍል፦ ${rainbowTale.title}`,
            fr: "Section : Le conte de l'arc-en-ciel",
            en: "Section: The Rainbow Tale",
          },
        ],
        [
          {
            am: "ኡዶ፣ እርዶ እና እሪም በእናታቸው ዙሪያ ተሰባስበዋል፡፡",
            fr: "Udo, Erdo et Erim s'étaient rassemblés autour de leur mère.",
            en: "Udo, Erdo and Erim had gathered around their mother.",
          },
          {
            am: "እናት ልቧ በፍቅር ተሞልቶ፣ ጡርንባውን በእጇ እንደያዘች፣ ጉርሮዋን አጽዳች እና ታሪኩን ጀመረች፡፡",
            fr: "Le cœur rempli d'amour, leur mère prit la trompette dans sa main, s'éclaircit la voix et commença l'histoire.",
            en: "With her heart full of love, their mother held the trumpet in her hand, cleared her throat and began the story.",
          },
          {
            am: "ያና የተባለች ልጅ ነበረች፡፡",
            fr: "Il était une fois une fille appelée Yana.",
            en: "There was once a girl called Yana.",
          },
          {
            am: "የያና አክስት በቀስተ ዳመናው መጨረሻ ላይ በማሰሮ ሙሉ ስላለው ወርቅ ነግራታለች፡፡",
            fr: "La tante de Yana lui avait parlé d'un pot rempli d'or au bout de l'arc-en-ciel.",
            en: "Yana's aunt had told her about a pot full of gold at the end of the rainbow.",
          },
          {
            am: "ያና ስለዚያ ማሰሮ የማወቅ ጉጉት አድሮባታል፡፡",
            fr: "Yana était très curieuse à propos de ce pot.",
            en: "Yana was very curious about that pot.",
          },
          {
            am: "ማሰሮው የያዘው የወርቅ ሳንቲሞችን ነው ወይስ በጥቁር ድንጋይ ላይ የተለጠፉ የወርቅ ቅንጣቶችን?",
            fr: "Contenait-il des pièces d'or ou des pépites d'or collées à des pierres noires ?",
            en: "Did it hold gold coins or pieces of gold stuck to black stones?",
          },
        ],
        [
          {
            am: "ያና ሰማዩን ትክ ብሎ ለረጅም ጌዜ በማየት አንዳች ምላሽ ይገኛል ብላ ታልማለች፡፡",
            fr: "Yana regardait longuement le ciel, en rêvant d'y trouver une réponse.",
            en: "Yana stared at the sky for a long time, dreaming that she might find an answer there.",
          },
          {
            am: "በሚበሩት ወፎች ፈገግ ትላለች፡፡",
            fr: "Elle souriait aux oiseaux qui volaient.",
            en: "She smiled at the birds flying by.",
          },
          {
            am: "ወርቁ እንዴት በማሰሮው ውስጥ እንደተቀመጠም ገርሟታል፡፡",
            fr: "Elle se demandait comment l'or avait été placé dans le pot.",
            en: "She wondered how the gold had been placed inside the pot.",
          },
          {
            am: "እናም ማሰሮው በቀስተ ዳመናው የትኛው ጫፍ ላይ ይሆን?",
            fr: "Et à quel bout de l'arc-en-ciel se trouvait ce pot ?",
            en: "And at which end of the rainbow was the pot?",
          },
          {
            am: "ያና ትክክለኛ ቦታውን ባወቅኩት ብላ ተመኘች፡፡",
            fr: "Yana souhaitait connaître l'endroit exact.",
            en: "Yana wished she knew the exact place.",
          },
        ],
        [
          {
            am: "ስለ ቀስተደመናው ጉዳይ ስታሰላስል፣ አንድ አረንጓዴ እንቁራሪት ወደ ቁጥቋጦው ዘሎ ሲገባ አየች፡፡",
            fr: "Pendant qu'elle pensait à l'arc-en-ciel, elle vit une grenouille verte sauter dans les buissons.",
            en: "As she thought about the rainbow, she saw a green frog jump into the bushes.",
          },
          {
            am: "እሷም አብራው ዘለለች፤ አልከለከለችውም፡፡",
            fr: "Elle sauta avec elle et ne l'empêcha pas d'avancer.",
            en: "She jumped along with it and did not stop it.",
          },
          {
            am: "ከዚያም ሰማዩን እያየች፣ እንቁራሪቱን ተሰናበተች፡፡",
            fr: "Puis, les yeux tournés vers le ciel, elle dit au revoir à la grenouille.",
            en: "Then, looking up at the sky, she said goodbye to the frog.",
          },
          {
            am: "ወርቁን ለማግኘትም ወደ ቀስተደመናው መጨረሻ ጉዞዋን ቀጠለች፡፡",
            fr: "Elle continua son voyage vers le bout de l'arc-en-ciel pour trouver l'or.",
            en: "She continued her journey toward the end of the rainbow to find the gold.",
          },
        ],
        [
          {
            am: "ስለ ቀስተደመናው ቀለማት ማሰላሰል ጀመረች፡፡",
            fr: "Elle commença à penser aux couleurs de l'arc-en-ciel.",
            en: "She began thinking about the colors of the rainbow.",
          },
          {
            am: "በቅጽበት፣ ቀይ ቀለም ወደ አእምሮዋ ቀድሞ መጣ፡፡",
            fr: "Aussitôt, la couleur rouge lui vint d'abord à l'esprit.",
            en: "At once, the color red came first to her mind.",
          },
          {
            am: "ሹፌሩ ቀይ መብራት ሲያይ ባለመቆሙ ሳቢያ በቤተሰቦቿ ላይ አደጋ የደረሰበትን ቀን አስታወሰች፡፡",
            fr: "Elle se souvint du jour où sa famille avait eu un accident parce qu'un conducteur ne s'était pas arrêté au feu rouge.",
            en: "She remembered the day her family had an accident because a driver did not stop at a red light.",
          },
          {
            am: "ያና እድለኛ ነበረች፡፡",
            fr: "Yana avait eu de la chance.",
            en: "Yana had been lucky.",
          },
          {
            am: "የቆሰሉ ቢሆንም ሁሉም ከባድ ጉዳት አልደረሰባቸውም፡፡",
            fr: "Même s'ils avaient été blessés, personne n'avait été gravement atteint.",
            en: "Even though they were hurt, no one had been seriously injured.",
          },
          {
            am: "ሁሉላቸውም በጣም ደንግጠዋል፡፡",
            fr: "Ils avaient tous eu très peur.",
            en: "They had all been very frightened.",
          },
        ],
        [
          {
            am: "ያና ከቀይ ቀጥሎ፣ ብርቱካናማ ቀለም አሰበች፡፡",
            fr: "Après le rouge, Yana pensa à la couleur orange.",
            en: "After red, Yana thought about the color orange.",
          },
          {
            am: "ጣፋጭ ብርቱካን ትወዳለች፡፡",
            fr: "Elle aimait les oranges sucrées.",
            en: "She liked sweet oranges.",
          },
          {
            am: "ብርቱካን ስትበላም ጣፋጭ፣ ኮምጣጣ እና መራራ ጣዕም አጋጥሟት ያውቃል፡፡",
            fr: "En mangeant des oranges, elle avait déjà goûté au sucré, à l'acide et à l'amer.",
            en: "When eating oranges, she had tasted sweetness, sourness and bitterness before.",
          },
          {
            am: "አፏን በመርጋጋ ጣዕም የሞላውን ኮምጣጣ ብርቱካን አስታወሰችው፡፡",
            fr: "Elle se souvint d'une orange acide qui lui avait rempli la bouche d'un goût étrange.",
            en: "She remembered a sour orange that had filled her mouth with a strange taste.",
          },
          {
            am: "ዩክ! ጣዕም ታውቃላችሁ?",
            fr: "Beurk ! Vous connaissez ce goût ?",
            en: "Yuck! Do you know that taste?",
          },
        ],
        [
          {
            am: "የያና ሐሳብ ከብርቱካን ጥቁር ባቄላ ወደ ያዘው ጎድጓዳ ሳህን ተሸጋገረ፤ ሆዷ ጮኸ፡፡",
            fr: "Les pensées de Yana passèrent de l'orange à un bol de haricots noirs, et son ventre se mit à gronder.",
            en: "Yana's thoughts moved from oranges to a bowl of black beans, and her stomach growled.",
          },
          {
            am: "የራባት መሆኑንም ተገነዘበች፡፡",
            fr: "Elle comprit qu'elle avait faim.",
            en: "She realized that she was hungry.",
          },
          {
            am: "የቀስተደመና ጥያቄዎ ለጊዜው ተቋርጧል፡፡",
            fr: "Sa quête de l'arc-en-ciel fut interrompue pour un moment.",
            en: "Her rainbow quest was interrupted for a while.",
          },
          {
            am: "ጊዜው የመመገቢያ ነበር፡፡",
            fr: "C'était l'heure de manger.",
            en: "It was time to eat.",
          },
        ],
        [
          {
            am: "ወደ አክስቷ ማዕድ ቤት ሮጠች፡፡",
            fr: "Elle courut vers la cuisine de sa tante.",
            en: "She ran to her aunt's kitchen.",
          },
          {
            am: "አየሩ በዶሮ ጥብስ እና በትኩስ ዳቦ ሽታ ተሞልቷል፡፡",
            fr: "L'air était rempli de l'odeur du poulet rôti et du pain chaud.",
            en: "The air was filled with the smell of roast chicken and warm bread.",
          },
          {
            am: "ያና እጇን ታጥባና እና ተጉመጥምጣ ወደ ምግቡ አመራች፡፡",
            fr: "Yana se lava les mains et se dirigea vers le repas en se léchant les lèvres.",
            en: "Yana washed her hands and went toward the food, licking her lips.",
          },
          {
            am: "በትልቅ የዳቦ ቁራሽ ትንሽ የዶሮ ሥጋ ተመግባ፣ ከዚያም ውሃ ጠጣች፡፡",
            fr: "Elle mangea un peu de poulet avec un grand morceau de pain, puis but de l'eau.",
            en: "She ate a little chicken with a big piece of bread, then drank some water.",
          },
          {
            am: "ቀሚሷን ተመለከተችው፡፡",
            fr: "Elle regarda sa robe.",
            en: "She looked at her dress.",
          },
          {
            am: "ተመሰቃቅሏል፡፡",
            fr: "Elle était toute salie.",
            en: "It was all messy.",
          },
          {
            am: "ውሃ ፈሶበታል፤ ወጥ ነክቶታል፡፡",
            fr: "De l'eau avait coulé dessus et de la sauce l'avait tachée.",
            en: "Water had spilled on it and stew had stained it.",
          },
          {
            am: "ሰለዚህ ሐመራዊ ቀለም ያለው ቀሚስ ቀየረች፡፡",
            fr: "Alors elle mit une robe violette.",
            en: "So she changed into a purple dress.",
          },
        ],
        [
          {
            am: "በኋላ፣ ያና እና አክስቷ ወደ ፓርኩ በአንድ ላይ ሄዱ፡፡",
            fr: "Plus tard, Yana et sa tante allèrent ensemble au parc.",
            en: "Later, Yana and her aunt went to the park together.",
          },
          {
            am: "መጽሐፍ ይዘው በሣሩ ላይ ተጋደሙ፡፡",
            fr: "Elles prirent un livre et s'allongèrent dans l'herbe.",
            en: "They took a book and lay down on the grass.",
          },
          {
            am: "ያና በማወቅ ጉጉት የመጽሐፉን ገጾች ገለጠች፤ በመጨረሻም ስለተደበቀው የወርቅ ማሰሮ ብዙ አወቀች፡፡",
            fr: "Yana tourna les pages avec curiosité et finit par en apprendre beaucoup sur le pot d'or caché.",
            en: "Yana turned the pages with curiosity and finally learned a lot about the hidden pot of gold.",
          },
          {
            am: "የአና አክስት በደስታ አቀፈቻት እና ሁለቱም በሣቅ ፈነዱ፡፡",
            fr: "La tante de Yana la serra joyeusement dans ses bras, et toutes les deux éclatèrent de rire.",
            en: "Yana's aunt hugged her happily, and they both burst out laughing.",
          },
          {
            am: "በአንድ ላይ መጽሐፉን ማንበብ ጀመሩ፡፡",
            fr: "Elles commencèrent à lire le livre ensemble.",
            en: "They began reading the book together.",
          },
        ],
        [
          {
            am: "የቀስተዳመና ቀለማት እና ምፎ የሚባል አንድ ትንሽ ልጅ ወደ ቶኖታ ምድር እንዴት እንደመጡ የሚናገር ተረት ነበር፡፡",
            fr: "C'était un conte qui expliquait comment les couleurs de l'arc-en-ciel et un petit garçon appelé Mpho arrivèrent au pays de Tonota.",
            en: "It was a tale about how the colors of the rainbow and a little boy called Mpho came to the land of Tonota.",
          },
          {
            am: "የቶኖታ ሕዝብ ለረጅም ጊዜያት የእፅዋትን አረንጓዴነት እና የአፈርን ቡናማነት ብቻ ነበር የሚያውቀው፡፡",
            fr: "Pendant longtemps, le peuple de Tonota ne connaissait que le vert des plantes et le brun de la terre.",
            en: "For a long time, the people of Tonota knew only the green of plants and the brown of the soil.",
          },
          {
            am: "ምፎ ግን ደመና የሚያማምሩ ቀለማት እንዳሉት ያልም ነበር፡፡",
            fr: "Mais Mpho rêvait que les nuages avaient de belles couleurs.",
            en: "But Mpho dreamed that clouds had beautiful colors.",
          },
          {
            am: "ስለህልሙ ለሽማግሌዎች ነገራቸው፡፡",
            fr: "Il raconta son rêve aux anciens.",
            en: "He told the elders about his dream.",
          },
          {
            am: "እነሱም \"ቀለማቱን በስም ከጠራሃቸው፣ እኛ ህልው አድርገን ልናመጣቸው እንችላለን\" አሉት፡፡",
            fr: "Ils lui dirent : \"Si tu appelles les couleurs par leur nom, nous pourrons les faire venir dans le monde.\"",
            en: "They told him, \"If you call the colors by name, we can bring them into the world.\"",
          },
        ],
        [
          {
            am: "ሽማግሌዎቹ የዝናብ አምጭውን እርዳታ ለመለመን ከእየ አካባቢው ተሰባሰቡ፡፡",
            fr: "Les anciens se rassemblèrent de chaque région pour demander l'aide des faiseurs de pluie.",
            en: "The elders gathered from every area to ask for help from the rainmakers.",
          },
          {
            am: "ምፎ በህልሙ ስለ ደመና ቀላማት ማሰላሰል ጀመረ፡፡",
            fr: "Mpho commença à réfléchir aux couleurs des nuages dans son rêve.",
            en: "Mpho began to think about the cloud colors in his dream.",
          },
          {
            am: "ከዚያም \"ቀይ፣ ሰማያዊ፣ ብርቱካናማ፣ ቢጫ፣ ሐመራዊ፣ አረንጓዴ እና ወይነጠጅ\" የሚሉት ቃላት ወደ አእምሮው መጡ፡፡",
            fr: "Alors les mots \"rouge, bleu, orange, jaune, violet, vert et indigo\" lui vinrent à l'esprit.",
            en: "Then the words \"red, blue, orange, yellow, purple, green and violet\" came into his mind.",
          },
          {
            am: "በቀላማት ያሸበረቀ ደመናም ሰማዩን ሞላው፡፡",
            fr: "Un nuage rempli de couleurs couvrit alors le ciel.",
            en: "A cloud filled with colors then covered the sky.",
          },
        ],
        [
          {
            am: "ደመናው በሰማዩ ላይ ተንጠለጠለ እና ዝናብ አምጭዎቹ እጅ ለእጅ በመያያዝ ክብ ሠሩ፡፡",
            fr: "Le nuage resta suspendu dans le ciel, et les faiseurs de pluie se donnèrent la main pour former un cercle.",
            en: "The cloud hung in the sky, and the rainmakers held hands to form a circle.",
          },
          {
            am: "ቀና ብለው ወደ ደመናው ተመለከቱ፤ ቀለሞቹም የሚያምር ደጋን ቅስት ሠሩ፡፡",
            fr: "Ils levèrent les yeux vers le nuage, et les couleurs formèrent un bel arc courbé.",
            en: "They looked up at the cloud, and the colors formed a beautiful curved arc.",
          },
          {
            am: "ይህ የቶኖታ ምድር የመጀመሪያው ቀስተደመና ነበር!",
            fr: "C'était le premier arc-en-ciel du pays de Tonota !",
            en: "It was the first rainbow in the land of Tonota!",
          },
          {
            am: "ሰዎች እልል አሉ፤ ተደሰቱ፡፡",
            fr: "Les gens poussèrent des cris de joie et se réjouirent.",
            en: "The people shouted with joy and celebrated.",
          },
          {
            am: "እናም በዚያን ጊዜ፣ ምፎ በቀስተደመናው መጨረሻ ላይ አንድ ማሰሮ አስተዋለ፡፡",
            fr: "À ce moment-là, Mpho aperçut un pot au bout de l'arc-en-ciel.",
            en: "At that moment, Mpho noticed a pot at the end of the rainbow.",
          },
          {
            am: "በወርቅ የተሞላ ማሰሮ!",
            fr: "Un pot rempli d'or !",
            en: "A pot full of gold!",
          },
        ],
        [
          {
            am: "ያና \"አስደናቂ የቀስተደመና ታሪክ! የወርቁን ማሰሮ የት እንደማገኘው አሁን አውቄያለሁ!\" በማለት ለአክስቷ በአድናቆት ተናገረች፡፡",
            fr: "Yana dit à sa tante avec admiration : \"Quelle merveilleuse histoire d'arc-en-ciel ! Maintenant je sais où trouver le pot d'or !\"",
            en: "Yana said to her aunt in wonder, \"What a wonderful rainbow story! Now I know where to find the pot of gold!\"",
          },
          {
            am: "አክስቷም ፈገግ አለች፤ ተረቱን ከእህቷ ልጅ ጋር በጋራቷ ተደስታለች፡፡",
            fr: "Sa tante sourit, heureuse d'avoir partagé le conte avec sa nièce.",
            en: "Her aunt smiled, happy to have shared the tale with her niece.",
          },
          {
            am: "\"ሆኖም ከእንግዲህ የቀስተደመና ጥያቄ አይኖርሽም! የወርቁ ማሰሮም ቢሆን ባጋጣሚ ሊገኝ ይችላል!\"",
            fr: "\"Mais désormais, tu n'auras plus de question sur l'arc-en-ciel ! Et peut-être trouveras-tu le pot d'or par hasard !\"",
            en: "\"But now you will have no more rainbow questions! And perhaps you may find the pot of gold by chance!\"",
          },
        ],
        [
          {
            am: "በእነዚያ ቃላት እናትዮዋ የቀስተደመና ተረቱን አጠናቀቀች፡፡",
            fr: "Sur ces mots, la mère termina le conte de l'arc-en-ciel.",
            en: "With those words, the mother finished the rainbow tale.",
          },
          {
            am: "ኡዶ፣ እርዶ እና እሪም ወደ ላይ ዘለሉ እና እሷም ቆመች፡፡",
            fr: "Udo, Erdo et Erim bondirent, et elle se leva aussi.",
            en: "Udo, Erdo and Erim jumped up, and she stood up too.",
          },
          {
            am: "ከዚያም የራሳቸውን ቀስተደመና የሚሠሩ በማስመሰል እንደ ዝናብ አምጭዎቹ እጆቻቸውን አያያዙ ፡፡",
            fr: "Puis ils se donnèrent la main comme les faiseurs de pluie, en faisant semblant de créer leur propre arc-en-ciel.",
            en: "Then they held hands like the rainmakers, pretending to create their own rainbow.",
          },
        ],
        [
          {
            am: "እርዶ \"እማዬ፣ እያንዳንዱ ሀገር የራሱ የሆነ የቀስተደመና ታሪክ አለው?\" አላት፡፡",
            fr: "Erdo demanda : \"Maman, chaque pays a-t-il sa propre histoire d'arc-en-ciel ?\"",
            en: "Erdo asked, \"Mother, does every country have its own rainbow story?\"",
          },
          {
            am: "\"አዎ የእኔ ፍቅር\" አለች፡፡",
            fr: "\"Oui, mon amour\", répondit-elle.",
            en: "\"Yes, my love,\" she replied.",
          },
          {
            am: "የቶኖታ ቀስተደመና የጀመረው በምፎ በቀለማት ባጌጠ ህልም ነው፡፡",
            fr: "L'arc-en-ciel de Tonota a commencé avec le rêve coloré de Mpho.",
            en: "Tonota's rainbow began with Mpho's colorful dream.",
          },
          {
            am: "እናም ቀስተደመና ወንዝ እና ቀስተደመና አይስክሪም የሚለውን አስማተኛ ተረት ታስታውሳላችሁ?",
            fr: "Et vous souvenez-vous du conte magique de la rivière arc-en-ciel et de la glace arc-en-ciel ?",
            en: "And do you remember the magical tale of the rainbow river and the rainbow ice cream?",
          },
          {
            am: "\"እምም፣ ቀስተደመና አይስክሪም የምወደው ተረት ነው\" አለች እሪም ወደ እናቷ እየተመለከተች ልጆች ተመልሰው በዙሪያዋ እንደሚሆኑ ተስፋ በማድረግ፡፡",
            fr: "\"Mmm, la glace arc-en-ciel est mon conte préféré\", dit Erim en regardant sa mère, espérant que les enfants se rassembleraient de nouveau autour d'elle.",
            en: "\"Mmm, rainbow ice cream is my favorite tale,\" said Erim, looking at her mother and hoping the children would gather around her again.",
          },
        ],
      ],
      fr: [
        "Section : Partagez équitablement !",
        "C'était un samedi matin très chaud et ensoleillé à la ferme. Maya, Duksi et Dubi aidaient Mama K dans son potager. Les enfants avaient travaillé dur toute la matinée. Ils avaient d'abord mélangé du compost à la terre, puis arraché les mauvaises herbes et arrosé les légumes. Enfin, ils avaient récolté les cultures mûres. Aujourd'hui, chacun des enfants rapporterait à la maison des fraises fraîchement cueillies, des épinards et des carottes.",
        "Mama K donne toujours une douce récompense aux enfants qui l'aident. Parfois, c'est du gâteau, du chocolat ou de longs bonbons en forme de serpent. D'autres fois, elle leur donne des pommes, des poires ou des oranges. Mais Mama K a une règle qui ne change jamais : \"Partagez également !\" Les enfants savent qu'ils doivent partager la récompense de façon juste, pour que chacun reçoive la même quantité.",
        "Aujourd'hui, Mama K a préparé un gâteau rond et rose, fait avec des fraises cueillies dans son propre jardin. Les enfants sont assis dans l'herbe et attendent leur récompense. Mama K sourit et leur dit : \"Voilà ! Mais n'oubliez pas la règle : chacun doit recevoir la même part. Partagez équitablement ! Ne vous disputez pas !\"",
        "Maya fut la première à essayer de partager le gâteau. Elle prit le couteau et commença à tracer des lignes de coupe dans le glaçage. Les autres enfants la regardaient attentivement. Elle n'avait pas encore coupé le gâteau : d'abord, tout le monde devait être d'accord pour dire que son partage était juste. Maya leur montra son idée : \"Je pense couper ici deux fois. Comme ça, nous aurons trois parts égales pour nous trois !\"",
        "\"Pas du tout !\" dit Duksi. \"Le morceau du milieu est beaucoup trop grand !\" Dubi secoua aussi la tête : il n'était pas d'accord. Maya rit, haussa les épaules, puis passa le tour à Duksi pour qu'elle essaie.",
        "\"Donne-le-moi ! Donne-moi le couteau, je vais le faire. C'est très facile !\" dit Duksi d'une voix pleine d'assurance. D'abord, elle effaça avec son doigt les marques que Maya avait faites dans le glaçage, puis elle lécha ses doigts.",
        "Ensuite, Duksi traça une ligne horizontale et une autre verticale. \"Regardez ! Ce sont mes trois morceaux !\" dit-elle. \"Ce n'est pas juste du tout !\" crièrent Maya et Dubi ensemble.",
        "\"Partagez également ! Les morceaux doivent avoir la même taille et la même forme\", ajouta Dubi. Duksi sourit d'un air moqueur et dit : \"Alors pourquoi tu n'essaies pas, Dubi ? Je suis sûre que toi non plus, tu ne sauras pas le faire !\"",
        "Dubi réfléchit profondément. \"Si le gâteau était carré ou rectangulaire, ce serait beaucoup plus facile à partager !\" dit-il. Maya ajouta : \"Ou alors, si nous étions quatre à partager ce gâteau rond, ce serait plus facile aussi.\"",
        "Tout à coup, une image apparut dans l'esprit de Dubi. Il pensa au grand camion rouge de son père et au badge argenté brillant sur le devant. Le dimanche, il aide son père à laver le camion et il polit toujours ce badge qui brille. \"J'ai trouvé ! J'ai trouvé ! Je sais comment faire !\" cria Dubi avec joie.",
        "D'abord, Dubi effaça avec le couteau les lignes que Duksi avait tracées dans le glaçage. Puis il traça trois lignes sur le gâteau. Comme le badge du camion de son père, le gâteau semblait maintenant partagé en trois parts égales.",
        "Duksi dit doucement : \"Dubi, tu nous surprends toujours avec tes idées !\" Maya demanda, étonnée : \"Comment as-tu su ?\" Dubi sourit pour lui-même. Pour l'instant, il garda son secret. Plus tard, il le raconterait à son père.",
        "À ce moment-là, Mama K sortit de la maison avec un plateau de verres remplis de jus de fraise. Maya lui dit : \"Mama K, regardez ! Dubi a trouvé une manière de partager le gâteau également entre nous trois !\" Mama K répondit : \"Bravo, Dubi ! Trois parts égales ! Vous avez partagé équitablement, et je suis fière de vous tous. Maintenant, coupez le gâteau, buvez le jus, et il sera temps de rentrer à la maison.\"",
        "Maya suivit les lignes de Dubi et coupa le gâteau en trois parts égales. Pour s'amuser, les enfants posèrent les morceaux les uns sur les autres afin de vérifier qu'ils avaient vraiment la même taille. Et oui : ils étaient bien égaux ! Puis ils emballèrent le gâteau dans un sac pour l'emporter chez eux.",
        "Le père de Dubi arriva pour venir chercher les enfants. Dubi courut l'accueillir. Il avait très envie de raconter à son père comment le badge du camion l'avait aidé à résoudre cette énigme de mathématiques si difficile.",
        "Dès qu'il monta dans la voiture, Dubi raconta à son père sa journée chez Mama K : le problème qu'ils avaient rencontré, et comment il avait utilisé le badge de leur camion pour le résoudre. Ils rentrèrent à la maison en riant, et Dubi était heureux d'avoir raconté sa victoire et ce qu'il avait appris sur le partage.",
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
    translator: "Traducteurs multiples, voir crédits",
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
      "Lire chaque section comme un petit conte séparé.",
      "Ralentir avant la fin de chaque histoire.",
      "Laisser l'enfant choisir son animal préféré avant de dormir.",
    ],
    readingTipsEn: [
      "Read each section like a separate little tale.",
      "Slow down before the end of each story.",
      "Let the child choose their favorite animal before sleep.",
    ],
    ...compose([
      { title: crowdedHouse.title, album: "crowdedHouse" },
      { title: birdKing.title, album: "birdKing" },
      { title: mousePrince.title, album: "mousePrince" },
    ]),
    source: africanStorybookSource,
    sourceCredits: [crowdedHouse, birdKing, mousePrince],
    qualityChecks: licensedCompilationQuality(3),
    author: "Auteurs multiples African Storybook",
    translator: "Traducteurs multiples, voir crédits",
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
