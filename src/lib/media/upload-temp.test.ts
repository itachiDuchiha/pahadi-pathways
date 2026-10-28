import { mkdir, mkdtemp, readdir, rm, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  protectedUploadDirs,
  scheduleUploadTempSweep,
  sweepUploadTemp,
  uploadTempConflict,
  uploadTempDir,
} from "./upload-temp";

const dirs: string[] = [];

async function tempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "thc-sweep-"));
  dirs.push(dir);
  return dir;
}

afterEach(async () => {
  vi.useRealTimers();
  await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

const HOUR = 60 * 60 * 1000;

describe("uploadTempDir", () => {
  it("defaults to thc-uploads under the OS temp directory and honours UPLOAD_TEMP_DIR", () => {
    expect(uploadTempDir({})).toBe(path.join(tmpdir(), "thc-uploads"));
    expect(uploadTempDir({ UPLOAD_TEMP_DIR: " /srv/tmp " })).toBe("/srv/tmp");
  });
});

describe("sweepUploadTemp", () => {
  it("removes files older than the age limit and keeps newer ones", async () => {
    const dir = await tempDir();
    const now = Date.now();
    await writeFile(path.join(dir, "tmp-1-100"), "x");
    await writeFile(path.join(dir, "tmp-2-200"), "x");
    const old = new Date(now - 7 * HOUR);
    await utimes(path.join(dir, "tmp-1-100"), old, old);

    expect(await sweepUploadTemp(dir, { maxAgeMs: 6 * HOUR, now })).toBe(1);
    expect(await readdir(dir)).toEqual(["tmp-2-200"]);
  });

  it("removes only Payload's temp file names", async () => {
    const dir = await tempDir();
    const now = Date.now();
    const names = ["tmp-3-1761600000000", "photo.webp", "tmp-3", "tmp-a-1", "tmp-1-2.jpg"];
    const old = new Date(now - 7 * HOUR);
    for (const name of names) {
      await writeFile(path.join(dir, name), "x");
      await utimes(path.join(dir, name), old, old);
    }

    expect(await sweepUploadTemp(dir, { maxAgeMs: 6 * HOUR, now })).toBe(1);
    expect((await readdir(dir)).sort()).toEqual(["photo.webp", "tmp-1-2.jpg", "tmp-3", "tmp-a-1"]);
  });

  it("creates a missing directory and leaves subdirectories alone", async () => {
    const dir = path.join(await tempDir(), "missing");
    expect(await sweepUploadTemp(dir, { maxAgeMs: 0 })).toBe(0);

    await mkdir(path.join(dir, "sub"));
    expect(await sweepUploadTemp(dir, { maxAgeMs: 0, now: Date.now() + HOUR })).toBe(0);
    expect(await readdir(dir)).toEqual(["sub"]);
  });
});

describe("uploadTempConflict", () => {
  it("names a protected directory equal to, inside or containing the temp directory", () => {
    const media = path.resolve("/srv/site/media");
    const pub = path.resolve("/srv/site/public");
    const guarded = [media, pub];

    expect(uploadTempConflict("/srv/site/media", guarded)).toBe(media);
    expect(uploadTempConflict("/srv/site/media/../media/", guarded)).toBe(media);
    expect(uploadTempConflict("/srv/site/public/tmp", guarded)).toBe(pub);
    expect(uploadTempConflict("/srv/site", guarded)).toBe(media);
    expect(uploadTempConflict("/srv/site/media-tmp", guarded)).toBeNull();
    expect(uploadTempConflict(path.join(tmpdir(), "thc-uploads"), guarded)).toBeNull();
  });

  it("guards MEDIA_DIR (default media) and public, resolved from the working directory", () => {
    expect(protectedUploadDirs({}, "/srv/site")).toEqual([
      path.resolve("/srv/site/media"),
      path.resolve("/srv/site/public"),
    ]);
    expect(protectedUploadDirs({ MEDIA_DIR: "/data/media" }, "/srv/site")).toEqual([
      path.resolve("/data/media"),
      path.resolve("/srv/site/public"),
    ]);
  });
});

describe("scheduleUploadTempSweep", () => {
  it("sweeps nothing and warns once when the temp directory is the media directory", async () => {
    const dir = await tempDir();
    const file = path.join(dir, "tmp-1-100");
    await writeFile(file, "x");
    const old = new Date(Date.now() - 7 * HOUR);
    await utimes(file, old, old);
    const warn = vi.fn();
    const sweep = vi.fn(sweepUploadTemp);
    vi.useFakeTimers();

    const stop = scheduleUploadTempSweep(dir, { warn }, sweep, [dir]);
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);

    expect(sweep).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain(dir);
    vi.useRealTimers();
    expect(await readdir(dir)).toEqual(["tmp-1-100"]);
    stop();
  });


  it("sweeps at once and again on each interval until stopped", async () => {
    const dir = await tempDir();
    const sweep = vi.fn().mockResolvedValue(0);
    vi.useFakeTimers();

    const stop = scheduleUploadTempSweep(dir, { warn: vi.fn() }, sweep, []);
    expect(sweep).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(30 * 60 * 1000);
    expect(sweep).toHaveBeenCalledTimes(2);

    stop();
    await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
    expect(sweep).toHaveBeenCalledTimes(2);
  });

  it("logs a failed sweep instead of throwing", async () => {
    const warn = vi.fn();
    const stop = scheduleUploadTempSweep("/nowhere", { warn }, vi.fn().mockRejectedValue(new Error("EACCES")));
    await vi.waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
    expect(String(warn.mock.calls[0]?.[0])).toContain("EACCES");
    stop();
  });
});
