# Bedtime Product Plan

## Vision

Turn the app into an evening ritual for mothers who want to read an Amharic
story to their children before sleep.

Promise:

> Tonight, start a gentle 15-minute story, read it calmly, and pass on Amharic
> with your own voice.

## Product Principles

- The mother stays at the center: the app helps her read, it does not replace
  her voice.
- The first screen must answer: "What should I read tonight?"
- The bedtime interface must be calm, warm, readable, and distraction-free.
- Bedtime content must soothe before it teaches.
- Announced duration must be reliable.
- Credits, licenses, and validation remain visible, but secondary in the reading
  ritual.
- All non-Amharic text must be available in French and English.
- Documentation, code comments, and commit messages must be written in English.

## Priority Persona

A tired mother at the end of the day who wants to:

- pass on Amharic without preparing a lesson;
- create a tender moment with her child;
- choose a story quickly;
- read without aggressive light;
- trust the linguistic quality and usage rights.

## Jobs To Be Done

- When it is bedtime, I want to start an appropriate story in under 10 seconds.
- When I read, I want highly readable text and simple thumb controls.
- When my child moves or asks a question, I want to pause without losing my
  place.
- When I am less comfortable in Amharic, I want subtle help to slow down,
  whisper, and interact.
- When I do not understand everything, I want a subtle FR/EN translation without
  Amharic losing its primary role.

## Attack Plan

### Phase 1 - MVP Repositioning

Goal: make the app feel built for bedtime stories.

- Rename the home experience around "Bedtime Story".
- Place a main "Tonight" recommendation before the library.
- Add product metadata to stories: `mood`, `bedtimeFit`, `durationBucket`,
  `readingTips`.
- Separate "long readings" from single stories.
- Hide content that is too school-like from the bedtime flow.

Definition of done:

- When opening the app, a mother understands what to launch tonight.
- A 15 min+ bedtime story is accessible in one tap.
- Cards show duration, age, and mood, not only level.

Current status: in progress. The home screen shows a "Tonight"
recommendation, stories carry the main bedtime metadata, and readings less
suited to bedtime remain in the full library.

### Phase 2 - Bedtime Reader

Goal: make reading comfortable in bed.

- Create a bedtime reader mode with warm background, soft contrast, and large
  text.
- Add an "X min left" estimate.
- Add a simple pause button.
- Add narration tips between selected pages: "read slowly", "pause", "whisper",
  "ask the child what they see".
- Add accidental-tap protection if needed.

Definition of done:

- Reading is usable one-handed.
- No secondary control distracts from the text.
- Tips help without breaking the rhythm.

Current status: in progress. The reader shows a bedtime guide for compatible
stories, with remaining time, narration tip, and a pause button that preserves
the current page. The bedtime reader now uses a full-screen Ritual Mode: internal
top bar, text as the main scene, thumb-friendly floating dock, and info sheet for
credits and quality controls.

### Phase 3 - Bedtime Catalogue

Goal: build a coherent bedtime reading offer.

- Audit existing stories against bedtime criteria.
- Build at least 6 readings:
  - 3 readings of 15 minutes;
  - 2 readings of 10 minutes;
  - 1 reading of 20 minutes.
- Prioritize themes: moon, soft rain, family, village, gratitude, calm animals,
  language transmission.
- Reject or downgrade texts that are too educational, anxious, or active.
- Keep every CC BY source with complete attribution.

Definition of done:

- The bedtime library contains only bedtime-compatible readings.
- Every reading has reliable duration and complete credits.
- Candidate readings for publication have a native-review checklist.

Current status: in progress. The home screen can now filter the catalogue by
reading moment and target duration. The current audit is in
`docs/catalog-audit.md`.

### Phase 4 - Linguistic Trust

Goal: reassure families about Amharic quality.

- Add a visible but discreet status: license OK, native review, child tested.
- Prepare a native-review workflow.
- Document source-text modifications.
- Add an editorial note for compilations.

Definition of done:

- A story cannot be marked `published` without native review and child testing.
- Credits remain complete even in a compilation.

Current status: in progress. The reader now shows a quality control panel based
on `qualityChecks` inside the info sheet: license, native review, FR/EN
proofreading, child test, publication, editorial note, and source modifications.
The MVP ASB readings are candidates: license verified, but native review, FR/EN
proofreading, and child testing still need to happen before publication.

### Phase 5 - Voice Help Without Replacing the Mother

Goal: help the mother read better, not automate the ritual.

- Later add a "pronunciation" or "practice" mode.
- Explore short recordings by phrase or page.
- Avoid making automatic audio the main experience.

Definition of done:

- Audio supports the mother.
- The ritual stays centered on parent-child reading.

## Suggested Technical Roadmap

1. Extend `Story` with bedtime fields.
2. Add a `getTonightStory()` selection helper.
3. Create a `TonightStoryCard` component.
4. Adapt `app/index.tsx` to prioritize the recommendation.
5. Create `BedtimeReader` or a bedtime mode inside `StoryReader`.
6. Add simple tests for bedtime-story selection.
7. Verify the interface on mobile web, then Expo Go.

## Mobile UI Direction

The UI direction is documented in `docs/mobile-ui-direction.md`.

The core principle: Amharic text is the main scene, controls float near the
thumb at the bottom, and trust information stays in a secondary sheet so it does
not interrupt the ritual.

## FR/EN Bilingual Support

The bilingual strategy is documented in `docs/i18n-translation-plan.md`.

Current status: in progress. The interface, controls, filters, statuses, and
product metadata can switch between French and English. The reader provides a
subtle slot under the Amharic text for FR/EN translations.

## Risks

- Confusing "long" with "bedtime-compatible": a long story may be too school-like
  or too stimulating.
- Overloading the interface with credits and controls.
- Importing open content without enough bedtime quality.
- Replacing the mother's voice with automatic audio too quickly.

## MVP Success Measures

- Time to launch a bedtime story: under 10 seconds.
- Reading completed or almost completed: at least 70% of bedtime sessions.
- Parent feedback: "I knew what to read" and "it felt calm".
- Child feedback: simple comprehension and desire to read again.
