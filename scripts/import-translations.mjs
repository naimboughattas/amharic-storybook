/**
 * Imports the original English text of the African Storybook albums used in
 * `data/asbLongReadingPages.ts`.
 *
 * The Amharic readings in this repository are translations of English ASB
 * albums, which are published separately under CC BY 4.0. Importing that
 * English rather than translating the Amharic back means the reader shows text
 * an author actually wrote, credited to the same people already listed in
 * `data/stories.ts`.
 *
 *   node scripts/import-translations.mjs [--check]
 *
 * Two conditions must hold before anything is written, because a translation
 * attached to the wrong page is worse than none:
 *
 *   1. the Amharic album still matches the text stored here, page for page;
 *   2. the English album has exactly as many pages as the Amharic one.
 *
 * French is not imported: ASB's French catalogue holds only a few hundred
 * titles and covers almost none of these albums. It lives in
 * `data/asbLongReadingFrench.ts`, written by hand, and is deliberately kept out
 * of this generated file so a re-run cannot erase it.
 *
 * Only the albums of the two readings that still lack translations are listed.
 * `long-sharing-family-rainbow` already carries sentence-level translations in
 * `data/stories.ts` and is left alone.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesModule = path.join(rootDir, "data", "asbLongReadingPages.ts");
const generatedModule = path.join(rootDir, "data", "asbLongReadingTranslations.ts");

const checkOnly = process.argv.includes("--check");

/**
 * Album key -> Amharic edition id and the English original it was translated
 * from. English ids were found by matching author and illustrator across the
 * ASB catalogue, then confirmed by title and page count.
 */
const albums = {
  melokuhleDay: { am: 52152, en: 36448, englishTitle: "A day in the life of Melokuhle" },
  blueBus: { am: 37859, en: 20309, englishTitle: "When the big blue bus was late" },
  pickItUp: { am: 52202, en: 19263, englishTitle: "Pick it up" },
  crowdedHouse: { am: 51303, en: 19599, englishTitle: "Man with a serious problem" },
  birdKing: { am: 33982, en: 920, englishTitle: "King of the birds" },
  mousePrince: { am: 17650, en: 17648, englishTitle: "Rat king's son" },
};

const viewerUrl = (id) =>
  `https://www.africanstorybook.org/newviewer/index.php?id=${id}&bt=3&dual=false`;

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalize(value) {
  return decodeEntities(value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
    .replace(/​/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readStoredPages() {
  const source = fs.readFileSync(pagesModule, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("exports", "module", transpiled)(module.exports, module);
  return module.exports.asbLongReadingPages;
}

function parseAlbumPages(document) {
  return document
    .split('<div class="page">')
    .slice(1)
    .flatMap((block) => {
      const number = block.match(/<div class="page-number">(\d+)<\/div>/);
      if (!number) {
        return [];
      }

      const body = block.match(/<p class="single-text[^"]*"[^>]*>([\s\S]*?)<\/p>/);
      return [body ? normalize(body[1]) : ""];
    });
}

async function fetchAlbum(id) {
  const response = await fetch(viewerUrl(id), {
    headers: { "user-agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    throw new Error(`GET album ${id} -> ${response.status}`);
  }

  return parseAlbumPages(await response.text());
}

const storedPages = readStoredPages();
const issues = [];
const translations = {};

for (const [album, { am, en, englishTitle }] of Object.entries(albums)) {
  const stored = storedPages[album];

  if (!stored) {
    issues.push(`${album}: missing from data/asbLongReadingPages.ts`);
    continue;
  }

  const amharic = await fetchAlbum(am);
  const english = await fetchAlbum(en);

  const misaligned = stored.findIndex(
    (text, index) => normalize(text) !== amharic[index],
  );

  if (misaligned !== -1) {
    issues.push(
      `${album}: Amharic page ${misaligned + 1} no longer matches africanstorybook.org. ` +
        `Re-check the source before importing translations.`,
    );
    continue;
  }

  if (english.length < stored.length) {
    issues.push(
      `${album}: the English edition "${englishTitle}" has ${english.length} pages ` +
        `but the reading stores ${stored.length}. Translations would slip out of step.`,
    );
    continue;
  }

  // The stored reading may cover only the opening of a longer album.
  translations[album] = english.slice(0, stored.length);
  console.log(
    `  ${album.padEnd(14)} ${stored.length} pages  <-  ${englishTitle}`,
  );

  await new Promise((resolve) => setTimeout(resolve, 400));
}

if (issues.length > 0) {
  console.error("\nAlignment check failed:\n");
  issues.forEach((issue) => console.error(`  - ${issue}`));
  process.exit(1);
}

console.log(`\nAligned ${Object.keys(translations).length} albums.`);

if (checkOnly) {
  process.exit(0);
}

const body = Object.entries(translations)
  .map(([album, pages]) => {
    const entries = pages
      .map((text) => `    ${JSON.stringify(text)},`)
      .join("\n");
    return `  ${album}: [\n${entries}\n  ],`;
  })
  .join("\n");

fs.writeFileSync(
  generatedModule,
  `// Generated by scripts/import-translations.mjs. Do not edit by hand.
//
// The original English text of the African Storybook albums these readings were
// translated from, reused under CC BY 4.0. Per-album author, translator and
// illustrator credits live in data/stories.ts and are shown in the reader's
// info sheet.
//
// Each array is aligned with the matching album in data/asbLongReadingPages.ts:
// index N is the English of page N.
//
// French is not here. ASB's French catalogue covers almost none of these
// albums, so it is written by hand in data/asbLongReadingFrench.ts and kept
// separate so re-running the import cannot erase it.
export const asbLongReadingTranslations: Record<string, readonly string[]> = {
${body}
};
`,
  "utf8",
);

console.log(`Wrote ${path.relative(rootDir, generatedModule)}.`);
