/** WebP quality ladder used when squeezing an image under its size budget. */
const QUALITY_LADDER = [80, 72, 65, 60] as const;

/**
 * Next (lower) quality to try after `current`, or null when the ladder is
 * exhausted or the next step would fall below `floor`.
 */
export function nextQuality(current: number, floor: number): number | null {
  const next = QUALITY_LADDER.find((q) => q < current);
  if (next === undefined || next < floor) return null;
  return next;
}

export type BudgetFlags = {
  maxKb: number;
  qualityFloor: number;
  heroesOnly: boolean;
};

function positiveInt(raw: string | undefined): number | null {
  if (raw === undefined || !/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return n > 0 ? n : null;
}

/**
 * Parses the size-budget flags of the image script. Returns null when no
 * budget flag is present (normal PNG/JPEG conversion), the parsed flags, or
 * an error message to print before exiting without touching any file.
 */
export function parseBudgetFlags(
  argv: string[],
): BudgetFlags | { error: string } | null {
  const hasMax = argv.includes("--max-kb");
  const hasFloor = argv.includes("--quality-floor");
  const heroesOnly = argv.includes("--heroes-only");
  if (!hasMax) {
    if (heroesOnly) return { error: "--heroes-only requires --max-kb" };
    if (hasFloor) return { error: "--quality-floor requires --max-kb" };
    return null;
  }
  const valueOf = (flag: string) => argv[argv.indexOf(flag) + 1];
  const maxKb = positiveInt(valueOf("--max-kb"));
  if (maxKb === null) {
    return { error: "--max-kb needs a positive integer (kilobytes)" };
  }
  let qualityFloor = 60;
  if (hasFloor) {
    const parsed = positiveInt(valueOf("--quality-floor"));
    if (parsed === null || parsed > 100) {
      return { error: "--quality-floor needs an integer from 1 to 100" };
    }
    qualityFloor = parsed;
  }
  return { maxKb, qualityFloor, heroesOnly };
}
