/*
 * Fixed-window rate limiter held in process memory.
 *
 * On multi-instance or serverless hosting each instance keeps its own Map,
 * so the effective limit is per instance, not global. That is an accepted
 * trade-off: it blunts casual abuse without adding a shared store.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

const DEFAULTS: RateLimitOptions = { limit: 5, windowMs: 600_000 };

function evictExpired(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export function rateLimit(
  key: string,
  opts: RateLimitOptions = DEFAULTS
): { allowed: boolean; retryAfterSeconds: number } {
  const now = (opts.now ?? Date.now)();

  evictExpired(now);

  const current = windows.get(key);

  if (!current) {
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
