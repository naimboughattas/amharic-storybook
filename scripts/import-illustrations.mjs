/**
 * Imports African Storybook page illustrations for the albums used in
 * `data/asbLongReadingPages.ts`.
 *
 * ASB grants reuse of the illustrations under CC BY 4.0, provided the album,
 * author, translator and illustrator stay credited. Those credits already live
 * in `data/stories.ts` and are shown in the reader's info sheet.
 *
 * The script refuses to write anything unless the Amharic text on the album
 * page still matches the text stored in this repo, page for page. That check is
 * the only thing guaranteeing an illustration belongs to the page it is shown
 * on: without it a silently re-paginated album would shift every picture.
 *
 *   node scripts/import-illustrations.mjs [--check]
 *
 * `--check` verifies alignment and reports what would change, downloading
 * nothing. Already-downloaded images are never re-fetched.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(rootDir, "assets", "illustrations");
const pagesModule = path.join(rootDir, "data", "asbLongReadingPages.ts");
const generatedModule = path.join(rootDir, "data", "asbLongReadingImages.ts");

const checkOnly = process.argv.includes("--check");

/** Album key in `asbLongReadingPages` -> African Storybook album id. */
const albums = {
  melokuhleDay: 52152,
  blueBus: 37859,
  pickItUp: 52202,
  shareFairly: 52203,
  simbegwire: 22403,
  rainbowTale: 33973,
  mousePrince: 17650,
  birdKing: 33982,
  crowdedHouse: 51303,
};

const viewerUrl = (id) =>
  `https://www.africanstorybook.org/newviewer/index.php?id=${id}&bt=3&dual=false`;
const illustrationUrl = (id) =>
  `https://www.africanstorybook.org/illustrations/pages/${id}.png`;

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

/** Strips markup and collapses whitespace so both sides compare equal. */
function normalize(value) {
  return decodeEntities(value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
    .replace(/​/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Reads the Amharic pages out of the TypeScript module without a build step. */
function readStoredPages() {
  const source = fs.readFileSync(pagesModule, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("exports", "module", transpiled)(module.exports, module);
  return module.exports.asbLongReadingPages;
}

/** Returns the numbered pages of an album, in reading order. */
function parseAlbumPages(document) {
  return document
    .split('<div class="page">')
    .slice(1)
    .flatMap((block) => {
      const number = block.match(/<div class="page-number">(\d+)<\/div>/);
      if (!number) {
        return []; // cover and back matter carry no page number
      }

      const image = block.match(
        /<image[^>]+src="[^"]*illustrations\/pages\/(\d+)\.png"/,
      );
      const body = block.match(/<p class="single-text[^"]*"[^>]*>([\s\S]*?)<\/p>/);

      return [
        {
          number: Number(number[1]),
          imageId: image ? Number(image[1]) : undefined,
          text: body ? normalize(body[1]) : "",
        },
      ];
    });
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) {
    throw new Error(`GET ${url} -> ${response.status}`);
  }
  return response.text();
}

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * Identifies the image from its own bytes and reads its dimensions.
 *
 * The server labels every illustration `image/png`, but a good number of them
 * are actually JPEG, and they are not all square. Trusting the Content-Type
 * would bundle mislabelled files and trusting a single aspect ratio would
 * stretch them, so both come from the payload.
 */
function readImage(buffer) {
  if (buffer.length > 24 && buffer.subarray(0, 8).equals(pngSignature)) {
    return {
      extension: "png",
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    // Walk the JPEG segments looking for a start-of-frame, which carries the size.
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        return undefined;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

      if (isStartOfFrame) {
        return {
          extension: "jpg",
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return undefined;
}

/** Reads a WebP canvas size, so re-runs need not re-download to learn it. */
function readWebpSize(buffer) {
  if (
    buffer.length < 30 ||
    buffer.subarray(0, 4).toString("latin1") !== "RIFF" ||
    buffer.subarray(8, 12).toString("latin1") !== "WEBP"
  ) {
    return undefined;
  }

  const format = buffer.subarray(12, 16).toString("latin1");

  if (format === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  if (format === "VP8X") {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    };
  }

  return undefined;
}

function assetName(index) {
  return `page-${String(index + 1).padStart(2, "0")}.webp`;
}

/**
 * Re-encodes to WebP.
 *
 * The source files total roughly 20 MB, most of it poorly compressed PNG, and
 * they ship inside the app bundle and the offline cache rather than just the
 * repository. WebP at this quality is visually indistinguishable and cuts that
 * to about 5 MB.
 */
function toWebp(buffer, extension) {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "asb-illustration-"));
  const source = path.join(scratch, `source.${extension}`);
  const target = path.join(scratch, "out.webp");

  try {
    fs.writeFileSync(source, buffer);
    execFileSync(webpEncoder, ["-quiet", "-q", "82", source, "-o", target]);
    return fs.readFileSync(target);
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
}

function resolveWebpEncoder() {
  try {
    execFileSync("cwebp", ["-version"], { stdio: "ignore" });
    return "cwebp";
  } catch {
    console.error(
      "cwebp is required to re-encode the illustrations.\n" +
        "Install it with `brew install webp`, then run this script again.",
    );
    process.exit(1);
  }
}

const issues = [];
const plan = {};
let downloaded = 0;
let reused = 0;

const storedPages = readStoredPages();

for (const [album, albumId] of Object.entries(albums)) {
  const stored = storedPages[album];

  if (!stored) {
    issues.push(`${album}: missing from data/asbLongReadingPages.ts`);
    continue;
  }

  const sitePages = parseAlbumPages(await fetchText(viewerUrl(albumId)));

  // The stored reading may cover only the beginning of a longer album, but the
  // pages it does cover have to be identical and in the same order.
  const misaligned = stored.findIndex(
    (text, index) => normalize(text) !== sitePages[index]?.text,
  );

  if (misaligned !== -1) {
    issues.push(
      `${album}: page ${misaligned + 1} no longer matches the album on africanstorybook.org. ` +
        `Illustrations would be attached to the wrong text; re-check the source before importing.`,
    );
    continue;
  }

  plan[album] = stored.map((_, index) => sitePages[index].imageId);
}

if (issues.length > 0) {
  console.error("Alignment check failed:\n");
  issues.forEach((issue) => console.error(`  - ${issue}`));
  process.exit(1);
}

const totalImages = Object.values(plan).flat().filter(Boolean).length;
console.log(`Aligned ${Object.keys(plan).length} albums, ${totalImages} illustrations.`);

if (checkOnly) {
  for (const [album, ids] of Object.entries(plan)) {
    const albumDir = path.join(imagesDir, album);
    const present = ids.filter(
      (id, index) => id && fs.existsSync(path.join(albumDir, assetName(index))),
    ).length;
    const wanted = ids.filter(Boolean).length;
    console.log(`  ${album.padEnd(14)} ${present}/${wanted} present`);
  }
  process.exit(0);
}

const webpEncoder = resolveWebpEncoder();

/** album -> per-page `{ file, aspectRatio }`, aligned with the stored pages. */
const assets = {};

for (const [album, ids] of Object.entries(plan)) {
  const albumDir = path.join(imagesDir, album);
  fs.mkdirSync(albumDir, { recursive: true });
  assets[album] = [];

  for (const [index, imageId] of ids.entries()) {
    if (!imageId) {
      assets[album].push(undefined);
      continue;
    }

    const name = assetName(index);
    const target = path.join(albumDir, name);

    if (fs.existsSync(target)) {
      const size = readWebpSize(fs.readFileSync(target));

      if (!size) {
        console.error(`  ${album} page ${index + 1}: ${name} is not readable as WebP`);
        process.exit(1);
      }

      assets[album].push({ file: name, aspectRatio: size.width / size.height });
      reused += 1;
      continue;
    }

    const response = await fetch(illustrationUrl(imageId), {
      headers: { "user-agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      console.error(`  ${album} page ${index + 1}: HTTP ${response.status}`);
      process.exit(1);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    // The server labels everything image/png, so the real format decides both
    // how the size is read and how the file is handed to the encoder.
    const image = readImage(buffer);

    if (!image) {
      console.error(`  ${album} page ${index + 1}: response is not a PNG or JPEG`);
      process.exit(1);
    }

    fs.writeFileSync(target, toWebp(buffer, image.extension));
    assets[album].push({ file: name, aspectRatio: image.width / image.height });
    downloaded += 1;

    // Stay gentle on a non-profit's servers.
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  console.log(`  ${album.padEnd(14)} ${ids.filter(Boolean).length} illustrations`);
}

const body = Object.entries(assets)
  .map(([album, pages]) => {
    const entries = pages
      .map((asset) =>
        asset
          ? `    {\n      source: require("../assets/illustrations/${album}/${asset.file}"),\n` +
            `      aspectRatio: ${asset.aspectRatio.toFixed(4)},\n    },`
          : `    undefined,`,
      )
      .join("\n");
    return `  ${album}: [\n${entries}\n  ],`;
  })
  .join("\n");

fs.writeFileSync(
  generatedModule,
  `// Generated by scripts/import-illustrations.mjs. Do not edit by hand.
//
// Illustrations from African Storybook, reused under CC BY 4.0. Per-album
// author, translator and illustrator credits live in data/stories.ts and are
// shown in the reader's info sheet.
//
// Each array is aligned with the matching album in data/asbLongReadingPages.ts:
// index N is the illustration for page N, and \`undefined\` marks a page the
// album leaves unillustrated.
//
// Aspect ratios are read from the files themselves: the albums mix square and
// landscape artwork, so a single ratio would stretch part of the catalogue.
import type { ImageSourcePropType } from "react-native";

export type StoryIllustration = {
  source: ImageSourcePropType;
  aspectRatio: number;
};

export const asbLongReadingImages: Record<
  string,
  readonly (StoryIllustration | undefined)[]
> = {
${body}
};
`,
  "utf8",
);

console.log(
  `\n${downloaded} downloaded, ${reused} already present. Wrote ${path.relative(rootDir, generatedModule)}.`,
);
