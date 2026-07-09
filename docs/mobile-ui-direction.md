# Mobile UI direction

## Intention

L'app doit ressembler a un rituel de lecture du soir, pas a une bibliotheque
technique. L'interface doit donc mettre le texte et la voix de la mere au centre,
avec les controles disponibles au pouce et les preuves de confiance accessibles
sans interrompre la lecture.

## Inspirations 2025/2026

- Apple / Liquid Glass : controles et navigation comme couche flottante au-dessus
  du contenu, en gardant la lisibilite et la hierarchie.
- Material 3 / Material 3 Expressive : surfaces plus expressives, couleurs
  adaptees au contexte, feedback tactile clair, actions faciles a toucher.
- Airbnb mobile : recommandation contextuelle, parcours guide, reduction du
  bruit quand l'utilisateur veut accomplir une action simple.

## Principes applicables au MVP

- Le texte amharique est la scene principale.
- Les controles de lecture vivent dans un dock bas, proche du pouce.
- La confiance, les licences et les credits restent visibles, mais dans une
  fiche secondaire.
- Le mode bedtime utilise un fond chaud, un contraste doux et peu de bordures.
- Les boutons critiques doivent rester grands, lisibles et espacés.
- Les contenus techniques ne doivent pas apparaitre avant le texte dans le
  rituel de lecture.
- Le mode pause doit calmer l'ecran, pas donner l'impression d'une erreur.
- Les traductions FR/EN doivent etre plus petites et secondaires sous
  l'amharique.

## Mode Rituel

Le lecteur bedtime suit cette structure :

1. Top bar interne : retour, nom du mode, page courante, temps restant, theme.
2. Zone principale : titre court, conseil de narration, texte amharique.
3. Traduction FR/EN optionnelle : petite, secondaire, sous l'amharique.
4. Dock flottant : precedent, pause/reprendre, suivant, infos.
5. Fiche infos : metadonnees, controle qualite, favori, lu, sources et credits.

Cette structure remplace l'ancien lecteur vertical qui affichait trop de
metadonnees avant l'histoire.

## Regles de design

- Eviter les cartes imbriquees dans le flux principal.
- Utiliser les surfaces fortes pour la confiance ou les modales, pas pour chaque
  bloc de texte.
- Garder les libelles courts dans le dock : `Avant`, `Pause`, `Suite`, `Infos`.
- Ne pas multiplier les couleurs d'action : une action primaire par groupe.
- Sur mobile, verifier que le dock ne masque pas la derniere ligne du texte.
- Les credits longs doivent rester scrollables dans la fiche infos.

## Prochaines ameliorations UI

- Ajouter une animation douce a l'ouverture de la fiche infos.
- Ajouter un mode "lumiere tres basse" pour lecture dans le noir.
- Ajouter un reglage de taille du texte dans le dock ou la fiche infos.
- Tester une police amharique dediee sur iOS et Android.
