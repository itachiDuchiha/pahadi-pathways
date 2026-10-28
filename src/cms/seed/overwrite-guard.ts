export type OverwriteDecision = { run: boolean; message: string; exitCode: 0 | 1 };

/** Printed before `cms:seed -- --overwrite` asks for confirmation. */
export const OVERWRITE_WARNING: readonly string[] = [
  "--overwrite resets every seeded item to the bundled content.",
  "It reverts editor changes to seeded items.",
  "It keeps analytics IDs, notification choices and the data contact email.",
];

/**
 * Decides whether the seed may run. Only `--overwrite` needs confirmation:
 * `--yes`, or typing "overwrite" at a terminal. Without a terminal to ask,
 * the overwrite is refused unless `--yes` is given.
 */
export function overwriteDecision(input: {
  overwrite: boolean;
  yes: boolean;
  isTTY: boolean;
  answer?: string;
}): OverwriteDecision {
  if (!input.overwrite) return { run: true, message: "", exitCode: 0 };
  if (input.yes) return { run: true, message: "overwrite confirmed with --yes", exitCode: 0 };
  if (!input.isTTY) {
    return {
      run: false,
      message: "refusing: add --yes to overwrite without a terminal to confirm",
      exitCode: 1,
    };
  }
  if (input.answer === "overwrite") return { run: true, message: "overwrite confirmed", exitCode: 0 };
  return { run: false, message: "cancelled", exitCode: 1 };
}
