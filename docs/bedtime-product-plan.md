# Bedtime product plan

## Vision

Transformer l'app en rituel du soir pour les meres qui veulent raconter une
histoire en amharique a leurs enfants avant de dormir.

Promesse :

> Ce soir, lance une histoire douce de 15 minutes, lis-la tranquillement, et
> transmets l'amharique avec ta voix.

## Principes produit

- La mere reste au centre : l'app aide a lire, elle ne remplace pas sa voix.
- Le premier ecran doit repondre a "qu'est-ce que je lis ce soir ?".
- L'interface du soir doit etre calme, chaude, lisible et sans distraction.
- Les contenus bedtime doivent apaiser avant d'enseigner.
- La duree annoncee doit etre fiable.
- Les credits, licences et validations restent visibles, mais secondaires dans
  le rituel de lecture.
- Tous les textes hors amharique doivent etre disponibles en francais et en
  anglais.

## Persona prioritaire

Mere fatiguee en fin de journee, qui veut :

- transmettre l'amharique sans preparer une lecon ;
- creer un moment tendre avec son enfant ;
- choisir une histoire rapidement ;
- lire sans lumiere agressive ;
- garder confiance dans la qualite linguistique et les droits d'usage.

## Jobs to be done

- Quand il est l'heure de dormir, je veux lancer une histoire appropriee en
  moins de 10 secondes.
- Quand je lis, je veux un texte tres lisible et des controles simples au pouce.
- Quand mon enfant bouge ou pose une question, je veux pouvoir faire une pause
  sans perdre ma place.
- Quand je suis moins a l'aise en amharique, je veux des aides discretes pour
  ralentir, chuchoter et interagir.
- Quand je ne comprends pas tout, je veux voir une traduction FR/EN discrete
  sans que l'amharique perde sa place principale.

## Plan d'attaque

### Phase 1 - Repositionnement MVP

Objectif : faire sentir que l'app est faite pour l'histoire du soir.

- Renommer l'accueil autour de "Histoire du soir".
- Mettre une recommandation principale "Ce soir" avant la bibliotheque.
- Ajouter des metadonnees produit aux histoires : `mood`, `bedtimeFit`,
  `durationBucket`, `readingTips`.
- Distinguer les "lectures longues" des histoires unitaires.
- Cacher les contenus trop scolaires du flux bedtime.

Definition of done :

- En ouvrant l'app, une mere comprend quoi lancer ce soir.
- Une histoire bedtime 15 min+ est accessible en un tap.
- Les cartes affichent duree, age et ambiance, pas seulement niveau.

Statut actuel : en cours. L'accueil affiche une recommandation "Ce soir", les
histoires portent les metadonnees bedtime principales, et les lectures moins
adaptees au coucher restent dans la bibliotheque complete.

### Phase 2 - Lecteur du soir

Objectif : rendre la lecture confortable au lit.

- Creer un mode lecteur bedtime avec fond chaud, contraste doux et texte large.
- Ajouter une estimation "encore X min".
- Ajouter un bouton pause simple.
- Ajouter des tips de narration entre certaines pages : "lire lentement",
  "faire une pause", "chuchoter", "demander a l'enfant ce qu'il voit".
- Ajouter une protection contre les taps accidentels si necessaire.

Definition of done :

- Lecture utilisable a une main.
- Aucun controle secondaire ne distrait du texte.
- Les tips aident sans casser le rythme.

Statut actuel : en cours. Le lecteur affiche un guide bedtime pour les histoires
compatibles coucher, avec temps restant, conseil de narration et bouton
"Pause calin" qui conserve la page en cours. Le lecteur bedtime utilise
maintenant un Mode Rituel plein ecran : top bar interne, texte comme scene
principale, dock flottant au pouce et fiche infos pour les credits et controles
qualite.

### Phase 3 - Catalogue bedtime

Objectif : construire une offre coherente de lectures du soir.

- Auditer les histoires existantes avec les criteres bedtime.
- Constituer au moins 6 lectures :
  - 3 de 15 minutes ;
  - 2 de 10 minutes ;
  - 1 de 20 minutes.
- Prioriser les themes : lune, pluie douce, famille, village, gratitude,
  animaux calmes, transmission de la langue.
- Rejeter ou declasser les textes trop pedagogiques, anxieux ou agites.
- Garder chaque source CC BY avec attribution complete.

Definition of done :

- La bibliotheque bedtime ne contient que des lectures compatibles coucher.
- Chaque lecture a une duree fiable et des credits complets.
- Les lectures candidates a publication ont une checklist de revue native.

Statut actuel : en cours. L'accueil permet maintenant de filtrer le catalogue
par moment de lecture et duree cible. L'audit courant est dans
`docs/catalog-audit.md`.

### Phase 4 - Confiance linguistique

Objectif : rassurer les familles sur la qualite de l'amharique.

- Ajouter un statut visible mais discret : licence OK, revue native, teste
  enfant.
- Preparer un workflow de relecture native.
- Documenter les modifications faites sur les textes source.
- Ajouter une note editoriale pour les compilations.

Definition of done :

- Une histoire ne peut pas etre marquee `published` sans revue native et test
  enfant.
- Les credits restent complets meme dans une compilation.

Statut actuel : en cours. Le lecteur affiche maintenant un controle qualite
base sur `qualityChecks` dans la fiche infos du lecteur : licence, relecture
native, test enfant, publication, note editoriale et modifications faites au
texte source. Les lectures ASB du MVP sont candidates : licence verifiee, mais
revue native et test enfant encore a faire avant publication.

### Phase 5 - Aide a la voix, sans remplacer la mere

Objectif : aider la mere a lire mieux, pas automatiser le rituel.

- Ajouter plus tard un mode "prononciation" ou "entrainement".
- Explorer des enregistrements courts par phrase ou par page.
- Eviter de faire de l'audio automatique l'experience principale.

Definition of done :

- L'audio sert de support a la mere.
- Le rituel reste centre sur la lecture parent-enfant.

## Roadmap technique suggeree

1. Etendre `Story` avec les champs bedtime.
2. Ajouter un helper de selection `getTonightStory()`.
3. Creer un composant `TonightStoryCard`.
4. Adapter `app/index.tsx` pour prioriser la recommandation.
5. Creer `BedtimeReader` ou un mode bedtime dans `StoryReader`.
6. Ajouter des tests simples sur la selection de l'histoire du soir.
7. Verifier l'interface sur mobile web puis sur Expo Go.

## Direction UI mobile

La direction UI est documentee dans `docs/mobile-ui-direction.md`.

Le principe central : le texte amharique est la scene principale, les controles
flottent en bas pres du pouce, et les informations de confiance restent dans une
fiche secondaire pour ne pas casser le rituel.

## Bilingue FR/EN

La strategie bilingue est documentee dans `docs/i18n-translation-plan.md`.

Statut actuel : en cours. L'interface, les controles, les filtres, les statuts
et les metadonnees produit peuvent basculer francais / anglais. Le lecteur
prevoit un emplacement discret sous le texte amharique pour les futures
traductions FR/EN.

## Risques

- Confondre "long" et "adapte au coucher" : une histoire longue peut etre trop
  scolaire ou trop stimulante.
- Trop charger l'interface avec des credits et controles.
- Importer des contenus libres sans qualite bedtime suffisante.
- Remplacer trop vite la voix de la mere par de l'audio automatique.

## Mesures de succes MVP

- Temps pour lancer une histoire du soir : moins de 10 secondes.
- Lecture terminee ou presque terminee : au moins 70 % des sessions bedtime.
- Retour parent : "j'ai su quoi lire" et "c'etait calme".
- Retour enfant : comprehension simple et envie de recommencer.
