import { describe, expect, it } from "vitest";

import { OVERWRITE_WARNING, overwriteDecision } from "./overwrite-guard";

describe("overwriteDecision", () => {
  it("runs without asking when --overwrite is not given", () => {
    const decision = overwriteDecision({ overwrite: false, yes: false, isTTY: false });
    expect(decision.run).toBe(true);
    expect(decision.exitCode).toBe(0);
  });

  it("runs when --yes confirms the overwrite", () => {
    expect(overwriteDecision({ overwrite: true, yes: true, isTTY: false })).toEqual({
      run: true,
      message: "overwrite confirmed with --yes",
      exitCode: 0,
    });
  });

  it("refuses without a terminal to ask and without --yes", () => {
    const decision = overwriteDecision({ overwrite: true, yes: false, isTTY: false });
    expect(decision.run).toBe(false);
    expect(decision.exitCode).toBe(1);
    expect(decision.message.startsWith("refusing: add --yes")).toBe(true);
  });

  it("runs when the terminal answer is exactly \"overwrite\"", () => {
    const decision = overwriteDecision({
      overwrite: true,
      yes: false,
      isTTY: true,
      answer: "overwrite",
    });
    expect(decision.run).toBe(true);
    expect(decision.exitCode).toBe(0);
  });

  it.each([undefined, "", "y", "yes", "Overwrite"])(
    "cancels on any other terminal answer (%s)",
    (answer) => {
      expect(overwriteDecision({ overwrite: true, yes: false, isTTY: true, answer })).toEqual({
        run: false,
        message: "cancelled",
        exitCode: 1,
      });
    }
  );
});

describe("OVERWRITE_WARNING", () => {
  it("says what is reverted and what is kept", () => {
    const text = OVERWRITE_WARNING.join("\n");
    expect(text).toMatch(/reverts editor changes/);
    expect(text).toMatch(/analytics IDs/);
    expect(text).toMatch(/notification choices/);
    expect(text).toMatch(/data contact email/);
  });
});
