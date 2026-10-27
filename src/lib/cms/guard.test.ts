import { describe, expect, it } from "vitest";

import { assertContentPresent } from "./guard";

describe("assertContentPresent", () => {
  it("throws the seeding hint when nothing is published", () => {
    expect(() => assertContentPresent(0, "packages")).toThrow(
      new Error("No published packages found. Run `npm run cms:seed` before building.")
    );
  });

  it("passes when at least one document is published", () => {
    expect(() => assertContentPresent(1, "destinations")).not.toThrow();
  });
});
