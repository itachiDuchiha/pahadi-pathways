import { runCli } from "../src/cms/seed/cli";
import { seed } from "../src/cms/seed/run";

const overwrite = process.argv.slice(2).includes("--overwrite");

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
      "A collection left partly seeded is completed with `npm run cms:seed -- --overwrite`.",
    ],
  }
);
