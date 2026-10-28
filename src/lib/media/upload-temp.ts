import { mkdir, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Uploads are streamed to this directory before Payload handles them, so
 * a large request body is never held in memory.
 */
export function uploadTempDir(env: Readonly<Record<string, string | undefined>>): string {
  return env.UPLOAD_TEMP_DIR?.trim() || path.join(tmpdir(), "thc-uploads");
}

/** Older than any upload still in progress (the largest is 100 MB). */
export const UPLOAD_TEMP_MAX_AGE_MS = 6 * 60 * 60 * 1000;
export const UPLOAD_TEMP_SWEEP_MS = 30 * 60 * 1000;

/** Payload's temp file names (`getTempFilename`: `tmp-<counter>-<Date.now()>`). */
const TEMP_FILENAME = /^tmp-\d+-\d+$/;

/** Directories the sweep must never touch: `MEDIA_DIR` (default `media`) and `public`. */
export function protectedUploadDirs(
  env: Readonly<Record<string, string | undefined>>,
  cwd: string = process.cwd()
): string[] {
  return [path.resolve(cwd, env.MEDIA_DIR ?? "media"), path.resolve(cwd, "public")];
}

function within(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

/** The protected directory that equals, contains or sits inside `dir`, or null. */
export function uploadTempConflict(dir: string, protectedDirs: readonly string[]): string | null {
  const resolved = path.resolve(dir);
  return protectedDirs.find((guarded) => within(guarded, resolved) || within(resolved, guarded)) ?? null;
}

/**
 * Removes Payload temp files older than `maxAgeMs` and returns how many;
 * any other file is left alone. Payload deletes an upload's temp file
 * after a media create or update; a body sent to any other endpoint is
 * parsed to a temp file and left behind.
 */
export async function sweepUploadTemp(
  dir: string,
  { maxAgeMs, now = Date.now() }: { maxAgeMs: number; now?: number }
): Promise<number> {
  await mkdir(dir, { recursive: true });
  let removed = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !TEMP_FILENAME.test(entry.name)) continue;
    const file = path.join(dir, entry.name);
    try {
      if (now - (await stat(file)).mtimeMs > maxAgeMs) {
        await rm(file, { force: true });
        removed += 1;
      }
    } catch {
      // Removed by its own request in the meantime.
    }
  }
  return removed;
}

/**
 * Sweeps now and then every half hour, without keeping the process alive;
 * returns a stop function. Refuses, with one warning, when `dir` overlaps
 * the media directory or `public`, so a misconfigured `UPLOAD_TEMP_DIR`
 * cannot delete site files.
 */
export function scheduleUploadTempSweep(
  dir: string,
  logger: { warn: (message: string) => void },
  sweep: typeof sweepUploadTemp = sweepUploadTemp,
  protectedDirs: readonly string[] = protectedUploadDirs(process.env)
): () => void {
  const conflict = uploadTempConflict(dir, protectedDirs);
  if (conflict) {
    logger.warn(`Upload temp sweep disabled: ${path.resolve(dir)} overlaps ${conflict}; set UPLOAD_TEMP_DIR to a directory of its own.`);
    return () => {};
  }

  const run = () => {
    sweep(dir, { maxAgeMs: UPLOAD_TEMP_MAX_AGE_MS }).catch((error: unknown) => {
      logger.warn(`Upload temp sweep failed for ${dir}: ${String(error)}`);
    });
  };
  run();
  const timer = setInterval(run, UPLOAD_TEMP_SWEEP_MS);
  timer.unref();
  return () => clearInterval(timer);
}
