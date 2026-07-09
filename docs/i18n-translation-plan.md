# Bilingual and translation plan

## Objectif

L'app doit fonctionner en francais et en anglais pour tous les textes qui ne sont
pas en amharique. Le texte amharique reste la source principale de lecture.

## Etat actuel

- Le choix de langue `fr` / `en` est persiste localement.
- L'accueil, les filtres, le lecteur, les boutons, les statuts, les controles
  qualite et les metadonnees principales peuvent basculer FR/EN.
- Les histoires conservent leur titre amharique, avec titres, resumes, ambiances
  et conseils FR/EN.
- Le lecteur affiche un emplacement de traduction sous le texte amharique.
- Le modele de donnees supporte deja une traduction par page avec
  `pageTranslations.fr[index]` et `pageTranslations.en[index]`.
- La lecture `long-sharing-family-rainbow` contient une premiere tranche de
  traductions candidates FR/EN pour le titre de section et les 16 pages de
  l'album `Share Fairly`.

## Faisabilite des traductions sous l'amharique

### Option 1 - Traduction par page

Faisabilite : facile.

Principe : chaque page amharique a une traduction FR et/ou EN affichee en petit
en dessous.

Contrat actuel :

```ts
pageTranslations: {
  fr: ["traduction francaise de la page 1"],
  en: ["English translation for page 1"]
}
```

Avantages :

- rapide a ajouter dans `pageTranslations`;
- peu de refactor UI;
- suffisant pour aider une mere qui comprend partiellement l'amharique.

Limites :

- moins pedagogique qu'une traduction phrase par phrase;
- si la page est longue, la traduction peut prendre beaucoup de place.

### Option 2 - Traduction phrase par phrase

Faisabilite : moyenne.

Principe : transformer chaque page en segments :

```ts
[
  {
    am: "phrase amharique",
    fr: "traduction francaise",
    en: "english translation"
  }
]
```

Cette option demandera un nouveau champ, par exemple `pageSegments`, car le
champ actuel `pages` est une liste de pages completes. Elle est donc prevue,
mais pas encore implementee.

Avantages :

- meilleure comprehension;
- utile pour apprendre et prononcer;
- permet un mode bilingue discret sous chaque phrase.

Limites :

- il faut segmenter les textes amhariques proprement;
- les traductions doivent etre relues;
- l'UI doit gerer des pages plus longues sans casser le rituel du soir.

## Recommandation MVP

Commencer par une traduction par page pour 1 ou 2 lectures bedtime, puis tester
avec des meres. Si elles veulent apprendre phrase par phrase, passer ensuite au
mode segmente.

Ne pas publier de traductions FR/EN inventees sans revue editoriale. Les
traductions doivent etre marquees comme candidates tant qu'elles ne sont pas
relues.

## Revue necessaire

La premiere tranche traduite sert a tester l'ergonomie du lecteur bilingue. Elle
doit etre relue avant usage public :

- verifier que la traduction FR/EN suit bien le texte amharique ;
- corriger les noms propres si la famille prefere une autre translitteration ;
- confirmer que le niveau de langue reste naturel pour une lecture du soir ;
- decider si le texte sous l'amharique doit etre affiche par defaut ou via un
  interrupteur.

## Regle UI

Les traductions doivent rester en petit sous l'amharique, dans une couleur
secondaire, pour ne pas remplacer la lecture principale. L'amharique doit rester
visuellement dominant.
