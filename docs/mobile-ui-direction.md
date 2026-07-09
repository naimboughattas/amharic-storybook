# Mobile UI Direction

## Intent

The app should feel like a bedtime reading ritual, not a technical library. The
interface must put the text and the mother's voice at the center, with
thumb-accessible controls and trust proof available without interrupting the
reading.

## 2025/2026 Inspirations

- Apple / Liquid Glass: controls and navigation as a floating layer above the
  content, while preserving readability and hierarchy.
- Material 3 / Material 3 Expressive: more expressive surfaces, context-aware
  colors, clear tactile feedback, easy-to-touch actions.
- Airbnb mobile: contextual recommendation, guided path, reduced noise when the
  user wants to complete a simple action.

## Principles for the MVP

- Amharic text is the main scene.
- Reading controls live in a bottom dock near the thumb.
- Trust, licenses, and credits remain visible, but inside a secondary sheet.
- Bedtime mode uses a warm background, soft contrast, and few borders.
- Critical buttons must stay large, readable, and well spaced.
- Technical content must not appear before the text in the reading ritual.
- Pause mode should calm the screen, not feel like an error state.
- FR/EN translations must be smaller and secondary under Amharic.

## Ritual Mode

The bedtime reader follows this structure:

1. Internal top bar: back, mode name, current page, remaining time, theme.
2. Main area: short title, narration tip, Amharic text.
3. Optional FR/EN translation: small, secondary, under Amharic.
4. Floating dock: previous, pause/resume, next, info.
5. Info sheet: metadata, quality control, favorite, read, sources, and credits.

This structure replaces the older vertical reader that showed too much metadata
before the story.

## Design Rules

- Avoid nested cards in the main flow.
- Use strong surfaces for trust or modals, not for every text block.
- Keep dock labels short: `Avant`, `Pause`, `Suite`, `Infos`.
- Do not multiply action colors: one primary action per group.
- On mobile, verify that the dock does not hide the last text line.
- Long credits must remain scrollable inside the info sheet.

## Next UI Improvements

- Add a gentle animation when opening the info sheet.
- Add a "very low light" mode for reading in the dark.
- Add a text-size setting in the dock or info sheet.
- Test a dedicated Amharic font on iOS and Android.
