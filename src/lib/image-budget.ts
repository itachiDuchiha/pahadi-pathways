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
