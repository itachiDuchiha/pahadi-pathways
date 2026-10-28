#!/usr/bin/env node
// Converts public/images/**/*.{png,jpg,jpeg} to WebP, resizing non-logo assets
// to a capped width, and deletes the original only after the WebP write
// succeeds. Idempotent: re-running skips any source whose .webp sibling
// already exists and whose original is already gone.
//
// Size-budget mode: `--max-kb <n> [--quality-floor <n>] [--heroes-only]`
// re-encodes existing .webp files in place, stepping quality down
// (see nextQuality in src/lib/image-budget.ts) until each file fits. Files are
// never enlarged and dimensions never change. `--heroes-only` limits the run to
// hero images (packages/heroes and destinations/*-featured.webp); without it
// hero images are skipped, so run once per budget.
//
// Uses `sharp`, a declared dependency of this project (also used by the CMS
// to re-encode uploads). Run through tsx (`npm run images:optimize`).
import { readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { nextQuality } from "../src/lib/image-budget";

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

const HERO_PATTERNS = [
  path.join(IMAGES_ROOT, "hero"),
  path.join(IMAGES_ROOT, "packages", "heroes"),
];
const HERO_FILES = [path.join(IMAGES_ROOT, "himachal-home.png")];
const LOGO_DIR = path.join(IMAGES_ROOT, "logo");

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

function isUnderDir(filePath: string, dir: string) {
  const rel = path.relative(dir, filePath);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function classify(filePath: string) {
  if (isUnderDir(filePath, LOGO_DIR)) return "logo";
  if (HERO_PATTERNS.some((dir) => isUnderDir(filePath, dir))) return "hero";
  if (HERO_FILES.includes(filePath)) return "hero";
  return "default";
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
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

async function exists(filePath: string) {
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
function buildWebpPathMap(files: string[]) {
  const stemCounts = new Map<string, number>();
  for (const filePath of files) {
    const ext = path.extname(filePath);
    const stem = filePath.slice(0, -ext.length);
    stemCounts.set(stem, (stemCounts.get(stem) ?? 0) + 1);
  }

  const map = new Map<string, string>();
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

async function processFile(filePath: string, webpPath: string) {
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

function isHeroBudgetTarget(filePath: string) {
  return (
    isUnderDir(filePath, path.join(IMAGES_ROOT, "packages", "heroes")) ||
    (isUnderDir(filePath, path.join(IMAGES_ROOT, "destinations")) &&
      filePath.endsWith("-featured.webp"))
  );
}

async function walkWebp(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walkWebp(fullPath)));
    else if (path.extname(entry.name).toLowerCase() === ".webp") files.push(fullPath);
  }
  return files;
}

// Re-encode one WebP in place until it fits `maxBytes`. Keeps the smallest
// result; never writes a file larger than the original.
async function budgetFile(filePath: string, maxBytes: number, floor: number) {
  const rel = path.relative(process.cwd(), filePath);
  const before = (await stat(filePath)).size;
  if (before <= maxBytes) return;

  const input = await sharp(filePath).toBuffer();
  let best: Buffer = input;
  let bestQuality: number | null = null;
  let quality: number | null = 80;
  while (quality !== null) {
    const out = await sharp(input).webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
    if (out.length < best.length) {
      best = out;
      bestQuality = quality;
    }
    if (best.length <= maxBytes) break;
    quality = nextQuality(quality, floor);
  }

  if (bestQuality === null) {
    console.log(`${rel} ${before}→${before} bytes (unchanged, no smaller encode)`);
    return;
  }
  await writeFile(filePath, best);
  const over = best.length > maxBytes ? " OVER BUDGET" : "";
  console.log(`${rel} ${before}→${best.length} bytes (q${bestQuality})${over}`);
}

function flagValue(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

async function runBudget(maxKb: number) {
  const floor = Number(flagValue("--quality-floor") ?? 60);
  const heroesOnly = process.argv.includes("--heroes-only");
  const files = (await walkWebp(IMAGES_ROOT)).filter(
    (f) =>
      classify(f) !== "logo" &&
      (heroesOnly ? isHeroBudgetTarget(f) : !isHeroBudgetTarget(f)),
  );
  for (const filePath of files) {
    try {
      await budgetFile(filePath, maxKb * 1024, floor);
    } catch (err) {
      process.exitCode = 1;
      console.error(`failed: ${path.relative(process.cwd(), filePath)}: ${(err as Error).message}`);
    }
  }
}

async function main() {
  const maxKb = flagValue("--max-kb");
  if (maxKb !== undefined) {
    await runBudget(Number(maxKb));
    return;
  }
  const files = await walk(IMAGES_ROOT);
  const webpPaths = buildWebpPathMap(files);
  let failed = false;
  for (const filePath of files) {
    try {
      await processFile(filePath, webpPaths.get(filePath) ?? filePath.replace(/\.[^.]+$/, ".webp"));
    } catch (err) {
      failed = true;
      console.error(`failed: ${path.relative(process.cwd(), filePath)}: ${(err as Error).message}`);
    }
  }
  if (failed) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
