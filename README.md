# Storybook Amharique MVP

Expo mobile app that helps mothers read bedtime stories in Amharic to their
children, with no account, backend, ads, analytics, or remote storage.

## Commands

```sh
npm install
npm run start
npm run web
npm run build
npm run typecheck
npm run lint
npm test
npm run content:check
```

`typecheck`, `lint`, `test`, and `content:check` are the four gates run by CI on
every push and pull request (`.github/workflows/ci.yml`).

The project was generated with Expo SDK 57. React Native 0.86 emits a warning
when Node is outside the supported ranges (`^20.19.4`, `^22.13.0`, `^24.3.0`,
or `>=25.0.0`).

## Repository Language

Documentation, code comments, and commit messages must be written in English.
Product copy may still be localized in French and English when it is user-facing
or part of the bilingual story experience.

## Vercel Web Deployment

Vercel should run `npm run build` and serve the generated `dist` directory. The
`vercel.json` rewrite sends deep links such as `/story/:id` back to
`/index.html`, which lets Expo Router restore the screen on refresh or shared
links.

## Structure

```txt
app/
  _layout.tsx
  index.tsx
  story/[id].tsx
components/
  reader/          # reader header, page, dock, details sheet
data/
features/progress/
public/
theme/
types/
docs/content-guidelines.md
docs/bedtime-product-plan.md
docs/catalog-audit.md
docs/mobile-ui-direction.md
docs/i18n-translation-plan.md
```

## MVP Features

- Bedtime-oriented home screen with a "Tonight" recommendation.
- Home menu split between Tonight, Library, and Progress.
- French / English interface for every non-Amharic user-facing text.
- Library filterable by level.
- Full-screen Ritual Mode reader, with Amharic as the main reading scene.
- Thumb-friendly floating dock: previous, pause/resume, next, and info.
- Bedtime reading guide: time left, narration tip, and pause ritual.
- Local progress: completed stories, favorites, last page, theme, and language.
- Persistent reader text-size controls for bedtime comfort.
- Screen kept awake while a reading is open, so reading aloud is not interrupted.
- Light / dark mode.
- Secondary info sheet for sources, credits, license, and validation status.
- Per-story quality checklist: license, native review, child test,
  publication, editorial note, and source modifications.
- Long readings of at least 15 minutes built from credited CC BY 4.0 albums.
- Bedtime metadata: mood, bedtime compatibility, target duration, and narration
  tips.
- Sentence-level FR/EN translation slot under the Amharic text.
- PWA metadata, install icons, and a small offline fallback for mobile web.

## Product Positioning

The product is not only a text library. The target promise is:

> Amharic bedtime stories that transmit the language, calm the child, and create
> a tender ritual between mother and child.

Product decisions should favor:

- fast evening launch;
- calm, reassuring stories that read well aloud;
- a distraction-free interface;
- thumb-reachable reader controls;
- subtle reading aids for slowing down, pausing, and involving the child;
- the mother's voice as the central experience.

## Adding a Story or Long Reading

Add an entry in `data/stories.ts` that follows the `Story` type defined in
`types/story.ts`.

Important fields:

- `pages` contains only original or verified/licensed text.
- `source.license` must be explicit.
- `sourceCredits` must list every album when a long reading is a compilation.
- `qualityChecks` must declare rights, native review, FR/EN proofreading, child
  test, publication readiness, editorial note, and source modifications.
- `bedtimeFit`, `mood`, `durationBucket`, `bedtimeSummary`, and `readingTips`
  drive the bedtime recommendation.
- `titleEn`, `moodEn`, `bedtimeSummaryEn`, and `readingTipsEn` power the English
  interface.
- `pageTranslations.aligned` contains sentence-level FR/EN translations under
  the Amharic text. `pageTranslations.fr/en` remains a page-level fallback during
  migration.
- `npm run content:check` validates aligned translations and obvious French
  proofreading issues before commit.
- `validationStatus` tracks the editorial workflow.
- `tags` support future filters.

## License and Content Rules

Current readings come from African Storybook and are marked `licensed`. They
still need native review and child testing before `published`.

For CC BY content, keep the author, source URL, exact license, required
attribution, and source modifications. See `docs/content-guidelines.md`.

## Product Plan

The bedtime ritual pivot plan is documented in `docs/bedtime-product-plan.md`.

The bedtime catalogue audit and content gaps are tracked in
`docs/catalog-audit.md`.

The Ritual Mode mobile UI direction is documented in
`docs/mobile-ui-direction.md`.

The bilingual strategy and feasibility of translations under Amharic are
documented in `docs/i18n-translation-plan.md`.

## Mobile Web PWA

Expo copies `public/` into `dist` during `npm run build`. The current PWA layer
contains:

- `public/manifest.json` for install metadata;
- `public/icon-192.png` and `public/icon-512.png` for mobile install surfaces;
- `public/register-sw.js` and `public/sw.js` for app-shell caching;
- `public/offline.html` as a fallback when a fresh navigation is unavailable.

The worker serves same-origin GETs cache-first, so `register-sw.js` skips
registration on localhost (and unregisters any leftover worker): otherwise a dev
server keeps replaying the previously cached Metro bundle instead of the code
being edited.

All non-Amharic strings live in `features/i18n/translations.ts`. `uiText` is
typed against its French dictionary, so an untranslated key fails `npm run
typecheck` rather than leaking French into the English interface. Sentences with
values use `formatText()` templates instead of concatenated fragments, because
French and English do not share word order.

Global web metadata lives in `public/index.html`, the Expo SPA template used by
`npm run build`.

## Linguistic Workflow

1. Draft.
2. Amharic translation or writing.
3. Native review.
4. Child test.
5. License check.
6. Proofread FR/EN translations if they appear in the reader.
7. Publication.

## Recommended Next Steps

- Add a tested Amharic font for iOS and Android if the system font is not enough.
- Add a controlled import workflow for CC BY content.
- Add illustrations from the credited CC BY albums.
- Version `CACHE_NAME` in `public/sw.js` per deployment so old bundles are
  evicted instead of accumulating.
- Run visual QA on real small screens.
