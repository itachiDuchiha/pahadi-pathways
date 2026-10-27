#!/usr/bin/env node
// Converts public/images/**/*.{png,jpg,jpeg} to WebP, resizing non-logo assets
// to a capped width, and deletes the original only after the WebP write
// succeeds. Idempotent: re-running skips any source whose .webp sibling
// already exists and whose original is already gone.
//
// Uses `sharp`, a declared dependency of this project (also used by the CMS
// to re-encode uploads).
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

const HERO_PATTERNS = [
  path.join(IMAGES_ROOT, "hero"),
  path.join(IMAGES_ROOT, "packages", "heroes"),
];
const HERO_FILES = [path.join(IMAGES_ROOT, "himachal-home.png")];
const LOGO_DIR = path.join(IMAGES_ROOT, "logo");

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

function isUnderDir(filePath, dir) {
  const rel = path.relative(dir, filePath);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function classify(filePath) {
  if (isUnderDir(filePath, LOGO_DIR)) return "logo";
  if (HERO_PATTERNS.some((dir) => isUnderDir(filePath, dir))) return "hero";
  if (HERO_FILES.includes(filePath)) return "hero";
  return "default";
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

// Normally a source file's WebP sibling is its path with the extension
// swapped for .webp. A directory can (rarely) hold two sources that share a
// stem but differ only by extension (e.g. hero.jpg and hero.png) — those
// would otherwise collide on the same output path, so disambiguate with the
// original extension in that case only.
function buildWebpPathMap(files) {
  const stemCounts = new Map();
  for (const filePath of files) {
    const ext = path.extname(filePath);
    const stem = filePath.slice(0, -ext.length);
    stemCounts.set(stem, (stemCounts.get(stem) ?? 0) + 1);
  }

  const map = new Map();
  for (const filePath of files) {
    const ext = path.extname(filePath);
    const stem = filePath.slice(0, -ext.length);
    const collides = (stemCounts.get(stem) ?? 0) > 1;
    map.set(
      filePath,
      collides ? `${stem}-${ext.slice(1).toLowerCase()}.webp` : `${stem}.webp`,
    );
  }
  return map;
}

async function processFile(filePath, webpPath) {
  const originalStillExists = await exists(filePath);
  const webpAlreadyExists = await exists(webpPath);

  if (webpAlreadyExists && !originalStillExists) {
    console.log(`skip (already converted): ${path.relative(process.cwd(), webpPath)}`);
    return;
  }

  const kind = classify(filePath);
  const beforeBytes = (await stat(filePath)).size;

  let pipeline = sharp(filePath);
  if (kind === "hero") {
    pipeline = pipeline.resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    });
  } else if (kind === "default") {
    pipeline = pipeline.resize({
      width: 1400,
      height: 1400,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  // logo: no resize

  await pipeline.webp({ quality: 80 }).toFile(webpPath);

  const afterBytes = (await stat(webpPath)).size;
  console.log(
    `${path.relative(process.cwd(), filePath)} ${beforeBytes}→${afterBytes} bytes`,
  );

  await unlink(filePath);
}

async function main() {
  const files = await walk(IMAGES_ROOT);
  const webpPaths = buildWebpPathMap(files);
  let failed = false;
  for (const filePath of files) {
    try {
      await processFile(filePath, webpPaths.get(filePath));
    } catch (err) {
      failed = true;
      console.error(`failed: ${path.relative(process.cwd(), filePath)}: ${err.message}`);
    }
  }
  if (failed) {
    process.exitCode = 1;
  }
}

main();
