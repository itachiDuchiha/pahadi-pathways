"use client";

import { useSyncExternalStore } from "react";

/**
 * Formats a date as a `YYYY-MM-DD` string (UTC calendar date), matching the
 * format HTML date inputs expect for their `min`/`max`/`value` attributes.
 */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().split("T")[0];
}

// The clock is an external mutable source: there is nothing React's render
// loop owns to re-derive this from, so it is read through
// useSyncExternalStore rather than a useEffect + setState pair. There is
// nothing to subscribe to (the current date doesn't change without a
// remount within this hook's lifetime), so `subscribe` is a no-op.
function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): string | undefined {
  return todayIso();
}

function getServerSnapshot(): string | undefined {
  return undefined;
}

/**
 * Returns today's date as a `YYYY-MM-DD` string on the client, and
 * `undefined` during server rendering (and the matching initial client
 * render), so server and client markup agree and no hydration mismatch is
 * possible.
 */
export function useTodayIso(): string | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
