import { mkdir, mkdtemp, readdir, rm, utimes, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { scheduleUploadTempSweep, sweepUploadTemp, uploadTempDir } from "./upload-temp";

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
    await writeFile(path.join(dir, "old"), "x");
    await writeFile(path.join(dir, "new"), "x");
    const old = new Date(now - 7 * HOUR);
    await utimes(path.join(dir, "old"), old, old);

    expect(await sweepUploadTemp(dir, { maxAgeMs: 6 * HOUR, now })).toBe(1);
    expect(await readdir(dir)).toEqual(["new"]);
  });

  it("creates a missing directory and leaves subdirectories alone", async () => {
    const dir = path.join(await tempDir(), "missing");
    expect(await sweepUploadTemp(dir, { maxAgeMs: 0 })).toBe(0);

    await mkdir(path.join(dir, "sub"));
    expect(await sweepUploadTemp(dir, { maxAgeMs: 0, now: Date.now() + HOUR })).toBe(0);
    expect(await readdir(dir)).toEqual(["sub"]);
  });
});

describe("scheduleUploadTempSweep", () => {
  it("sweeps at once and again on each interval until stopped", async () => {
    const dir = await tempDir();
    const sweep = vi.fn().mockResolvedValue(0);
    vi.useFakeTimers();

    const stop = scheduleUploadTempSweep(dir, { warn: vi.fn() }, sweep);
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
