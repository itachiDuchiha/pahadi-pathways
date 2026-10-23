/*
 * Fixed-window rate limiter held in process memory.
 *
 * On multi-instance or serverless hosting each instance keeps its own Map,
 * so the effective limit is per instance, not global. That is an accepted
 * trade-off: it blunts casual abuse without adding a shared store.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

/** Last time expired windows were swept; the sweep only bounds memory. */
let lastSweepAt = Number.NEGATIVE_INFINITY;

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

const DEFAULTS: RateLimitOptions = { limit: 5, windowMs: 600_000 };

/**
 * Drops expired windows at most once per windowMs / 10, so a busy route
 * does not scan the whole Map on every request. Correctness does not depend
 * on it: `rateLimit` treats an expired window as absent on its own.
 */
function sweepExpired(now: number, windowMs: number): void {
  if (now - lastSweepAt < windowMs / 10) return;

  lastSweepAt = now;

  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export function rateLimit(
  key: string,
  opts: RateLimitOptions = DEFAULTS
): { allowed: boolean; retryAfterSeconds: number } {
  const now = (opts.now ?? Date.now)();

  sweepExpired(now, opts.windowMs);

  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count < opts.limit) {
    current.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
