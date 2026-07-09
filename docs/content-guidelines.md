# Content Guidelines

## Editorial Goal

The MVP validates the Amharic reading experience; it is not a final public
catalogue. Every added reading must be readable by a child, reach the target
duration announced in the app, and include source metadata.

The priority product audience is a mother who wants to read a story to her child
before bedtime. Content must support a calm, tender ritual that is easy to start
in the evening.

The interface is bilingual in French and English for non-Amharic text. Amharic
remains the main source text; FR/EN translations are a subtle reading aid.

## Repository Language

Documentation, code comments, and commit messages must be written in English.
Localized product copy may stay in French and English when it is part of the app
experience.

## Content Rules

- Do not copy protected text without explicit authorization.
- Do not automatically scrape complete stories.
- Use original texts, placeholders, or licensed content with complete
  attribution.
- Clearly mark demo content as not publishable.
- Verify Amharic with a native speaker before publication.
- Test comprehension with children in the target age range before `published`.
- Do not add a published FR/EN translation without editorial review.
- For the "15 min minimum" promise, target at least 1,500 Amharic words or build
  a long reading from several separately credited albums.

## Bedtime Criteria

A reading marked as bedtime-compatible must meet these criteria:

- Gentle, reassuring, non-noisy tone.
- Slow rhythm, with natural repetition and sentences that read well aloud.
- Sleep-compatible themes: family, protection, calm nature, moon, soft rain,
  gratitude, language transmission.
- Calming ending, with no strong suspense or renewed action.
- Clear target duration: 10, 15, or 20 minutes.
- Room for narration notes: pause, whisper, breathe, ask the child a small
  question.

Avoid in the bedtime flow:

- school exercises, calculations, or quizzes;
- intense conflict, fear, punishment, or unresolved abandonment;
- scenes that are too stimulating before sleep;
- long morals that break the reading rhythm.

## Current Long Source

The MVP catalogue uses African Storybook albums in Amharic under the Creative
Commons Attribution 4.0 license. Long readings may assemble several albums to
reach 15 minutes, but each album must keep its URL, author, translator,
illustrator, and license in `sourceCredits`.

## Minimum Attribution

Each story must provide:

- `source.name`
- `source.url` when available
- `source.license`
- `source.attributionRequired`
- `author`, `translator`, and `reviewer` when those roles exist
- `qualityChecks.licenseVerified`
- `qualityChecks.nativeReviewed`
- `qualityChecks.translationProofread`
- `qualityChecks.childTested`
- `qualityChecks.publicationReady`
- `qualityChecks.editorialNote`
- `qualityChecks.sourceModifications`
- `titleEn`, `moodEn`, `bedtimeSummaryEn`, and `readingTipsEn`
- `pageTranslations` when a reading translation exists

## Translations Under Amharic

FR/EN translations under Amharic pages are allowed, but they must stay visually
secondary. For the bedtime ritual, prefer sentence-level alignment in
`pageTranslations.aligned`:

- `am` contains the original Amharic phrase;
- `fr` contains the candidate French translation;
- `en` contains the candidate English translation.

`pageTranslations.fr` and `pageTranslations.en` remain accepted as temporary
page-level fallbacks for pages already translated as blocks. Every segmentation
must be reviewed before publication.

## Mandatory FR/EN Proofreading

Every French or English translation added to a story must be proofread before it
leaves candidate status.

Minimum checklist:

- French accents and apostrophes;
- spelling;
- grammar;
- conjugation and tense agreement;
- natural bedtime-reading syntax;
- punctuation and quotation marks;
- consistent proper names and transliterations;
- alignment with the meaning of the original Amharic phrase.

Until this verification is done, keep `qualityChecks.translationProofread` set to
`false` and display the translation as candidate.

## Validation Workflow

1. `draft`: idea or raw text.
2. `translated`: Amharic translation or writing complete.
3. `native_reviewed`: native linguistic review complete.
4. `child_tested`: tested with the target audience.
5. `licensed`: rights, license, and attribution verified.
6. `published`: content ready for a public version.

The global status is not enough for publication. A candidate reading must also
have `qualityChecks.licenseVerified`, `qualityChecks.nativeReviewed`,
`qualityChecks.translationProofread`, `qualityChecks.childTested`, and
`qualityChecks.publicationReady` set to `true`.

Before committing, run:

```bash
npm run content:check
```

This check validates `pageTranslations.aligned` segments, empty FR/EN
translations, and obvious French proofreading misses.

## Adding a CC BY Story

Before adding a story, preserve the source URL, author name, exact license,
source modifications, and expected attribution wording. If any information is
missing, keep the story out of publication.
