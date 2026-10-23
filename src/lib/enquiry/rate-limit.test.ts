import { describe, expect, it } from "vitest";

import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows five calls, blocks the sixth, then allows again after the window", () => {
    let clock = 1_000_000;
    const opts = { limit: 5, windowMs: 600_000, now: () => clock };
    const key = "test:203.0.113.1";

    for (let i = 0; i < 5; i += 1) {
      expect(rateLimit(key, opts).allowed).toBe(true);
    }

    const blocked = rateLimit(key, opts);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);

    clock += 600_000;
    expect(rateLimit(key, opts).allowed).toBe(true);
  });

  it("tracks keys independently", () => {
    const opts = { limit: 1, windowMs: 1000, now: () => 5 };
    expect(rateLimit("test:a", opts).allowed).toBe(true);
    expect(rateLimit("test:b", opts).allowed).toBe(true);
    expect(rateLimit("test:a", opts).allowed).toBe(false);
  });
});
