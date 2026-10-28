import { describe, expect, it } from "vitest";

import { nextQuality, parseBudgetFlags } from "./image-budget";

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

describe("parseBudgetFlags", () => {
  it("returns null when no budget flag is present", () => {
    expect(parseBudgetFlags([])).toBeNull();
  });

  it("parses valid flags with a default floor of 60", () => {
    expect(parseBudgetFlags(["--max-kb", "260", "--heroes-only"])).toEqual({
      maxKb: 260,
      qualityFloor: 60,
      heroesOnly: true,
    });
    expect(parseBudgetFlags(["--max-kb", "200", "--quality-floor", "70"])).toEqual({
      maxKb: 200,
      qualityFloor: 70,
      heroesOnly: false,
    });
  });

  it("rejects non-numeric and non-positive values", () => {
    expect(parseBudgetFlags(["--max-kb", "abc"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "0"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "1.5"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "200", "--quality-floor", "x"])).toHaveProperty("error");
  });

  it("rejects a missing value instead of reading the next flag", () => {
    expect(parseBudgetFlags(["--max-kb"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "--heroes-only"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "200", "--quality-floor"])).toHaveProperty("error");
  });

  it("rejects a floor outside 1..100", () => {
    expect(parseBudgetFlags(["--max-kb", "200", "--quality-floor", "0"])).toHaveProperty("error");
    expect(parseBudgetFlags(["--max-kb", "200", "--quality-floor", "101"])).toHaveProperty("error");
  });

  it("requires --max-kb for the other budget flags", () => {
    expect(parseBudgetFlags(["--heroes-only"])).toEqual({
      error: "--heroes-only requires --max-kb",
    });
    expect(parseBudgetFlags(["--quality-floor", "60"])).toEqual({
      error: "--quality-floor requires --max-kb",
    });
  });
});
