import { describe, expect, it } from "vitest";

import { todayIso } from "./useTodayIso";

describe("todayIso", () => {
  it("formats a UTC date as YYYY-MM-DD", () => {
    expect(todayIso(new Date(Date.UTC(2026, 9, 23)))).toBe("2026-10-23");
  });
});
