/**
 * Builds the web app and finalises its service worker.
 *
 * `expo export` copies `public/` into `dist/` verbatim, so the worker shipped
 * there is a template. Two things can only be known once the build exists:
 *
 *   - the precache list, because the JS bundle carries a content hash;
 *   - the cache name, which must change whenever that list changes, otherwise
 *     the previous deployment's entries stay in the cache forever.
 *
 *   node scripts/build-web.mjs
 */

import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");

/**
 * Files under `dist` that the reader needs before it can render anything.
 * Illustrations are excluded on purpose; see the comment in public/sw.js.
 */
function isAppShell(relativePath) {
  if (relativePath.startsWith("assets/assets/illustrations/")) {
    return false;
  }

  return (
    relativePath.startsWith("_expo/") ||
    relativePath.startsWith("assets/") ||
    ["index.html", "manifest.json", "offline.html", "register-sw.js", "favicon.ico"].includes(
      relativePath,
    ) ||
    /^icon-\d+\.png$/.test(relativePath)
  );
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

console.log("Exporting web build…");
execFileSync("npx", ["expo", "export", "-p", "web"], { cwd: rootDir, stdio: "inherit" });

const files = walk(distDir).map((absolute) =>
  path.relative(distDir, absolute).split(path.sep).join("/"),
);

const shell = files.filter(isAppShell).sort();
const illustrations = files.filter((file) =>
  file.startsWith("assets/assets/illustrations/"),
).length;

// "/" rather than "/index.html": that is the URL a navigation falls back to.
const precache = ["/", ...shell.filter((file) => file !== "index.html").map((file) => `/${file}`)];

const workerPath = path.join(distDir, "sw.js");
const template = fs.readFileSync(workerPath, "utf8");

// The id covers the worker's own source as well as the file list: a change to
// the caching rules should start from a clean cache, not inherit entries the
// previous rules put there.
const buildId = crypto
  .createHash("sha256")
  .update(precache.join("\n"))
  .update(template)
  .digest("hex")
  .slice(0, 12);

for (const placeholder of ["__BUILD_ID__", "__PRECACHE__"]) {
  if (!template.includes(placeholder)) {
    console.error(
      `dist/sw.js is missing ${placeholder}. public/sw.js must stay a template ` +
        `so the cache name and precache list can be filled in at build time.`,
    );
    process.exit(1);
  }
}

fs.writeFileSync(
  workerPath,
  template
    .replace("__BUILD_ID__", buildId)
    .replace("__PRECACHE__", JSON.stringify(precache, null, 2)),
  "utf8",
);

const bytes = (list) =>
  list.reduce((total, file) => total + fs.statSync(path.join(distDir, file)).size, 0);
const mb = (value) => `${(value / 1_048_576).toFixed(1)} MB`;

console.log(
  `\nService worker ready (build ${buildId})\n` +
    `  precached : ${precache.length} files, ${mb(bytes(shell))}\n` +
    `  on demand : ${illustrations} illustrations, ` +
    `${mb(bytes(files.filter((f) => f.startsWith("assets/assets/illustrations/"))))}`,
);
