import { runCli } from "../src/cms/seed/cli";
import { pruneEnquiries } from "../src/cms/seed/run";

const DEFAULT_MONTHS = 24;
const months = process.argv[2] === undefined ? DEFAULT_MONTHS : Number(process.argv[2]);

await runCli("cms:prune-enquiries", async (payload) => {
  const deleted = await pruneEnquiries(payload, months);
  return [`enquiries older than ${months} months deleted: ${deleted}`];
});
