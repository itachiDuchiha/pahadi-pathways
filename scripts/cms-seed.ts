import { createInterface } from "node:readline/promises";

import { runCli } from "../src/cms/seed/cli";
import { OVERWRITE_WARNING, overwriteDecision } from "../src/cms/seed/overwrite-guard";
import { seed } from "../src/cms/seed/run";

const args = process.argv.slice(2);
const overwrite = args.includes("--overwrite");
const yes = args.includes("--yes");
const isTTY = process.stdin.isTTY === true;

let answer: string | undefined;
if (overwrite) {
  for (const line of OVERWRITE_WARNING) console.warn(line);
  if (isTTY && !yes) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    answer = (await rl.question('Type "overwrite" to continue: ')).trim();
    rl.close();
  }
}

const decision = overwriteDecision({ overwrite, yes, isTTY, answer });
if (decision.message) {
  (decision.run ? console.log : console.error)(`cms:seed: ${decision.message}`);
}
if (!decision.run) process.exit(decision.exitCode);

await runCli(
  "cms:seed",
  async (payload) => {
    const result = await seed(payload, { skipRevalidate: true, overwrite });
    const targets = Object.keys(result.created) as (keyof typeof result.created)[];

    return [
      `mode: ${overwrite ? "overwrite" : "fill empty collections only"}`,
      ...targets.map(
        (target) =>
          `${target}: ${result.created[target]} created, ${result.updated[target]} updated, ${result.skipped[target]} skipped`
      ),
      `media in manifest: ${result.media}`,
      `admin: ${result.admin}`,
    ];
  },
  {
    failureHint: [
      "Re-running the seed is safe; completed items are skipped.",
      "A collection left partly seeded is completed with `npm run cms:seed -- --overwrite`",
      "(it asks first; add --yes when there is no terminal). It reverts editor changes.",
    ],
  }
);
