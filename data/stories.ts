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
      "Lire lentement et laisser l'enfant regarder les images dans sa tête.",
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
