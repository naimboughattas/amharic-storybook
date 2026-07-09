# Storybook Amharique MVP

Application mobile Expo pour aider les meres a raconter une histoire du soir en
amharique a leurs enfants, sans compte, backend, publicite, analytics ni
stockage distant.

## Commandes

```sh
npm install
npm run start
npm run web
npm run typecheck
```

Le projet a ete genere avec Expo SDK 57. React Native 0.86 emet un avertissement
si Node n'est pas dans une plage supportee (`^20.19.4`, `^22.13.0`, `^24.3.0`
ou `>=25.0.0`).

## Structure

```txt
app/
  _layout.tsx
  index.tsx
  story/[id].tsx
components/
data/
features/progress/
theme/
types/
docs/content-guidelines.md
docs/bedtime-product-plan.md
docs/catalog-audit.md
docs/mobile-ui-direction.md
docs/i18n-translation-plan.md
```

## Fonctionnalites MVP

- Accueil oriente rituel du soir avec recommandation "Ce soir".
- Interface bilingue francais / anglais pour les textes hors amharique.
- Bibliotheque filtrable par niveau.
- Lecteur Mode Rituel plein ecran, avec texte amharique comme scene principale.
- Dock flottant au pouce : precedent, pause/reprendre, suivant et infos.
- Guide de lecture du soir : temps restant, conseil de narration et pause calin.
- Progression locale : histoires lues, favoris, derniere page, theme et langue.
- Mode clair / sombre.
- Fiche infos secondaire pour sources, credits, licence et statut de validation.
- Controle qualite par histoire : licence, relecture native, test enfant,
  publication, note editoriale et modifications source.
- Lectures longues de 15 minutes minimum composees d'albums CC BY 4.0 credits.
- Metadonnees bedtime : ambiance, compatibilite coucher, duree cible et conseils
  de narration.
- Emplacement pret pour traductions FR/EN sous le texte amharique.

## Positionnement produit

Le produit n'est pas seulement une bibliotheque de textes. La promesse cible est :

> Des histoires amhariques du soir pour transmettre la langue, calmer l'enfant
> et creer un rituel tendre entre mere et enfant.

Les decisions produit doivent donc favoriser :

- un demarrage rapide le soir ;
- des histoires calmes, rassurantes et lisibles a voix haute ;
- une interface sans distraction ;
- des controles proches du pouce dans le lecteur ;
- des aides discretes pour lire lentement, faire des pauses et impliquer
  l'enfant ;
- la voix de la mere comme experience centrale.

## Ajouter une histoire ou une lecture longue

Ajouter une entree dans `data/stories.ts` en respectant le type `Story` defini
dans `types/story.ts`.

Champs importants :

- `pages` contient uniquement du texte original ou verifie/licencie.
- `source.license` doit etre explicite.
- `sourceCredits` doit lister chaque album si la lecture longue est une
  compilation.
- `qualityChecks` doit declarer les droits, la relecture native, la relecture
  FR/EN, le test enfant, la publication, la note editoriale et les modifications
  source.
- `bedtimeFit`, `mood`, `durationBucket`, `bedtimeSummary` et `readingTips`
  pilotent la recommandation du soir.
- `titleEn`, `moodEn`, `bedtimeSummaryEn` et `readingTipsEn` alimentent la
  version anglaise de l'interface.
- `pageTranslations.aligned` contient les traductions FR/EN phrase par phrase
  sous l'amharique. `pageTranslations.fr/en` reste un fallback par page pendant
  la migration.
- `validationStatus` suit le workflow editorial.
- `tags` facilite les futurs filtres.

## Regles de licence et contenu

Les lectures actuelles viennent d'African Storybook et sont marquees `licensed`.
Elles doivent encore passer par une revue native et un test enfant avant
`published`.

Pour du contenu CC BY, conserver l'auteur, l'URL source, la licence exacte,
l'attribution requise et les modifications effectuees. Voir
`docs/content-guidelines.md`.

## Plan produit

Le plan d'attaque du pivot "rituel du soir" est documente dans
`docs/bedtime-product-plan.md`.

L'audit du catalogue bedtime et les manques de contenu sont suivis dans
`docs/catalog-audit.md`.

La direction UI mobile du Mode Rituel est documentee dans
`docs/mobile-ui-direction.md`.

La strategie bilingue et la faisabilite des traductions sous l'amharique sont
documentees dans `docs/i18n-translation-plan.md`.

## Workflow linguistique

1. Brouillon.
2. Traduction/redaction amharique.
3. Relecture native.
4. Test enfant.
5. Verification licence.
6. Traductions FR/EN relues si elles sont affichees dans le lecteur.
7. Publication.

## Prochaines etapes recommandees

- Ajouter une police amharique testee sur iOS et Android si la police systeme ne
  suffit pas.
- Ajouter un import controle de contenus CC BY.
- Ajouter des tests de composants pour le stockage local.
- Faire une verification visuelle sur petits ecrans reels.
