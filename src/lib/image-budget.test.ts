import { describe, expect, it } from "vitest";

import { nextQuality } from "./image-budget";

describe("nextQuality", () => {
  it("steps down the ladder 80, 72, 65, 60", () => {
    expect(nextQuality(80, 60)).toBe(72);
    expect(nextQuality(72, 60)).toBe(65);
    expect(nextQuality(65, 60)).toBe(60);
  });

  it("returns null once the floor is reached", () => {
    expect(nextQuality(60, 60)).toBeNull();
  });

  it("never goes below a higher floor", () => {
    expect(nextQuality(80, 70)).toBe(72);
    expect(nextQuality(72, 70)).toBeNull();
    expect(nextQuality(65, 70)).toBeNull();
  });

  it("handles qualities that are off the ladder", () => {
    expect(nextQuality(90, 60)).toBe(80);
    expect(nextQuality(61, 60)).toBe(60);
  });
});
