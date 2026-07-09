# Content guidelines

## Objectif editorial

Le MVP sert a valider l'experience de lecture en amharique, pas a publier un
catalogue final. Toute lecture ajoutee doit etre lisible par un enfant,
atteindre la duree cible annoncee dans l'app, et etre accompagnee de ses
metadonnees de source.

La cible produit prioritaire est la mere qui veut raconter une histoire a son
enfant avant de dormir. Le contenu doit donc soutenir un rituel calme, tendre et
facile a lancer le soir.

L'interface est bilingue francais / anglais pour les textes hors amharique. Les
textes amhariques restent la source principale; les traductions FR/EN servent
d'aide discrete.

## Regles de contenu

- Ne pas copier de texte protege sans autorisation explicite.
- Ne pas scraper automatiquement des histoires completes.
- Utiliser des textes originaux, des placeholders, ou des contenus sous licence
  compatible avec attribution complete.
- Marquer clairement les contenus de demonstration comme non publiables.
- Verifier l'amharique avec une personne native avant publication.
- Tester la comprehension avec des enfants du niveau cible avant `published`.
- Ne pas ajouter de traduction FR/EN publiee sans revue editoriale.
- Pour la promesse "15 min minimum", viser au moins 1 500 mots amhariques ou
  composer une lecture longue a partir de plusieurs albums credits separement.

## Criteres bedtime

Une lecture marquee comme adaptee au coucher doit respecter ces criteres :

- Ton doux, rassurant, non bruyant.
- Rythme lent, avec des repetitions naturelles et des phrases lisibles a voix
  haute.
- Themes compatibles avec le sommeil : famille, protection, nature calme, lune,
  pluie douce, gratitude, transmission de la langue.
- Fin apaisante, sans suspense fort ni relance d'action.
- Duree cible claire : 10, 15 ou 20 minutes.
- Possibilite d'ajouter des notes de narration : pause, chuchoter, respirer,
  poser une petite question a l'enfant.

Eviter dans le flux bedtime :

- exercices scolaires, calculs ou quiz ;
- conflit intense, peur, punition, abandon non resolu ;
- scenes trop stimulantes avant le sommeil ;
- morales longues qui cassent le rythme de lecture.

## Source longue actuelle

Le catalogue MVP utilise des albums African Storybook en amharique sous licence
Creative Commons Attribution 4.0. Les lectures longues peuvent assembler
plusieurs albums pour atteindre 15 minutes, mais chaque album doit conserver son
URL, son auteur, son traducteur, son illustrateur et sa licence dans
`sourceCredits`.

## Attribution minimale

Chaque histoire doit renseigner :

- `source.name`
- `source.url` si disponible
- `source.license`
- `source.attributionRequired`
- `author`, `translator` et `reviewer` quand ces roles existent
- `qualityChecks.licenseVerified`
- `qualityChecks.nativeReviewed`
- `qualityChecks.translationProofread`
- `qualityChecks.childTested`
- `qualityChecks.publicationReady`
- `qualityChecks.editorialNote`
- `qualityChecks.sourceModifications`
- `titleEn`, `moodEn`, `bedtimeSummaryEn` et `readingTipsEn`
- `pageTranslations` quand une traduction FR/EN de lecture existe

## Traductions sous l'amharique

Les traductions FR/EN sous les pages amhariques sont possibles, mais elles
doivent rester secondaires visuellement. Pour le rituel du soir, privilegier le
format phrase par phrase dans `pageTranslations.aligned` :

- `am` contient la phrase amharique originale ;
- `fr` contient la traduction francaise candidate ;
- `en` contient la traduction anglaise candidate.

`pageTranslations.fr` et `pageTranslations.en` restent acceptes comme fallback
temporaire pour les pages deja traduites en bloc. Toute segmentation doit etre
relue avant publication.

## Relecture FR/EN obligatoire

Toute traduction francaise ou anglaise ajoutee a une histoire doit etre relue
avant de quitter le statut candidat.

Checklist minimale :

- accents et apostrophes francaises ;
- orthographe ;
- grammaire ;
- conjugaison et concordance des temps ;
- syntaxe naturelle pour une lecture du soir ;
- ponctuation et guillemets ;
- coherence des noms propres et translitterations ;
- alignement avec le sens de la phrase amharique originale.

Tant que cette verification n'est pas faite, garder
`qualityChecks.translationProofread` a `false` et afficher la traduction comme
candidate.

## Workflow de validation

1. `draft` : idee ou texte brut.
2. `translated` : traduction ou redaction amharique terminee.
3. `native_reviewed` : revue linguistique native terminee.
4. `child_tested` : lecture testee avec le public cible.
5. `licensed` : droits, licence et attribution verifies.
6. `published` : contenu pret pour une version publique.

Le statut global ne suffit pas pour publier. Une lecture candidate doit aussi
avoir `qualityChecks.licenseVerified`, `qualityChecks.nativeReviewed`,
`qualityChecks.translationProofread`, `qualityChecks.childTested` et
`qualityChecks.publicationReady` a `true`.

Avant commit, lancer :

```bash
npm run content:check
```

Ce controle verifie les segments `pageTranslations.aligned`, les traductions
FR/EN vides, et les formes francaises manifestement non relues.

## Ajout d'une histoire CC BY

Avant ajout, conserver l'URL source, le nom de l'auteur, la licence exacte, les
modifications effectuees, et la formulation d'attribution attendue. Si une
information manque, garder l'histoire hors publication.
