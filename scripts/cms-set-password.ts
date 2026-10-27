import { parseEmailArg, setUserPassword } from "../src/cms/bootstrap/setPassword";
import { runCli } from "../src/cms/seed/cli";

// The password comes from the environment so it never shows up in the
// process list or the shell history as an argument.
const email = parseEmailArg(process.argv.slice(2));

await runCli(
  "cms:set-password",
  async (payload) => [await setUserPassword(payload, email, process.env.NEW_PASSWORD)],
  { timing: false }
);
