import { runCli } from "../src/cms/seed/cli";
import { seed } from "../src/cms/seed/run";

await runCli("cms:seed", async (payload) => {
  const result = await seed(payload, { skipRevalidate: true });
  const targets = Object.keys(result.created) as (keyof typeof result.created)[];

  return [
    ...targets.map(
      (target) => `${target}: ${result.created[target]} created, ${result.updated[target]} updated`
    ),
    `media in manifest: ${result.media}`,
    `admin: ${result.admin}`,
  ];
});
