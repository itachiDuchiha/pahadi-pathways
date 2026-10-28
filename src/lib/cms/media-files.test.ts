import { describe, expect, it } from "vitest";

import { mediaFileExists } from "./media-files";

describe("mediaFileExists", () => {
  it("asks the file system for the file inside MEDIA_DIR", () => {
    const seen: string[] = [];
    const exists = (path: string) => (seen.push(path), true);
    expect(mediaFileExists("a.webp", exists)).toBe(true);
    expect(seen[0]).toMatch(/media[\\/]a\.webp$/);
  });

  it("is false when the file is not there", () => {
    expect(mediaFileExists("a.webp", () => false)).toBe(false);
  });
});
