# Bilingual and Translation Plan

## Goal

The app must work in French and English for every text that is not Amharic.
Amharic remains the primary reading source.

## Current State

- The `fr` / `en` language choice is persisted locally.
- The home screen, filters, reader, buttons, statuses, quality controls, and main
  metadata can switch between FR/EN.
- Stories keep their Amharic title, with FR/EN titles, summaries, moods, and
  reading tips.
- The reader displays a translation slot under the Amharic text.
- The data model already supports page-level translations with
  `pageTranslations.fr[index]` and `pageTranslations.en[index]`.
- `long-sharing-family-rainbow` contains three candidate FR/EN translation
  batches for section titles and pages from `Share Fairly`, `Simbegwire`, and
  `Rainbow Tale`.
- The reader also supports sentence-level alignment through
  `pageTranslations.aligned[index]`. Section titles and pages from
  `Share Fairly`, `Simbegwire`, and `Rainbow Tale` are aligned phrase by phrase.

## Feasibility of Translations Under Amharic

### Option 1 - Sentence-Level Translation

Feasibility: medium, but recommended for the bedtime product.

Principle: each Amharic phrase is followed by its active-language translation in
small text.

Current contract:

```ts
pageTranslations: {
  aligned: [
    [
      {
        am: "Amharic phrase",
        fr: "French translation",
        en: "English translation"
      }
    ]
  ]
}
```

Advantages:

- immediate comprehension without leaving the original phrase;
- better support for a mother reading in Amharic and explaining in FR/EN;
- softer rendering than a large translation block at the end of a page.

Limits:

- Amharic text must be segmented cleanly;
- every alignment must be reviewed;
- long pages may require more scrolling in the ritual.

### Option 2 - Page-Level Translation

Feasibility: easy.

Principle: each Amharic page has a small FR and/or EN translation underneath.

Current contract:

```ts
pageTranslations: {
  fr: ["French translation for page 1"],
  en: ["English translation for page 1"]
}
```

Advantages:

- quick to add in `pageTranslations`;
- minimal UI refactor;
- enough to help a mother who partially understands Amharic.

Limits:

- less educational than sentence-level translation;
- if the page is long, the translation can take a lot of space.

## MVP Recommendation

Use `pageTranslations.aligned` for new translations intended for the bedtime
ritual. Keep `pageTranslations.fr/en` as a temporary fallback for pages already
translated as blocks, then progressively migrate bedtime readings to the
segmented mode.

Do not publish invented FR/EN translations without editorial review.
Translations must stay marked as candidate until they are proofread.

## Required Review

The first translated batches are used to test the bilingual reader ergonomics.
They must be reviewed before public use:

- verify that the FR/EN translation follows the Amharic text;
- correct accents, spelling, conjugation, grammar, and syntax;
- correct proper names if the family prefers another transliteration;
- confirm that the language level remains natural for bedtime reading;
- decide whether text under Amharic should be shown by default or behind a
  toggle.

A translated story cannot move to publication until
`qualityChecks.translationProofread` is valid.

## UI Rule

Translations must stay small under Amharic, in a secondary color, so they do not
replace the main reading. Amharic must remain visually dominant.
