import type { Payload } from "payload";

import { MIN_ADMIN_PASSWORD_LENGTH } from "./ensureAdmin";

/** Reads `--email <addr>` (or `--email=<addr>`) from the script arguments. */
export function parseEmailArg(argv: readonly string[]): string | undefined {
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--email") return argv[index + 1]?.trim() || undefined;
    if (arg.startsWith("--email=")) return arg.slice("--email=".length).trim() || undefined;
  }
  return undefined;
}

/**
 * Sets a user's password through the Local API, bypassing access control,
 * for recovering an account (for example the only admin) from the server.
 * Also clears a lockout from failed logins. Returns the line to print;
 * never includes the password.
 */
export async function setUserPassword(
  payload: Pick<Payload, "find" | "unlock" | "update">,
  email: string | undefined,
  password: string | undefined
): Promise<string> {
  if (!email) throw new Error("Pass the account with --email <addr>.");
  if (!password || password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    throw new Error(`Set NEW_PASSWORD to at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`);
  }

  const { docs } = await payload.find({
    collection: "users",
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const user = docs[0];
  if (!user) throw new Error(`No user with the email ${email}.`);

  await payload.update({
    collection: "users",
    id: user.id,
    data: { password },
    overrideAccess: true,
    context: { internal: true },
  });
  // The generated unlock type asks for a password; the operation ignores it.
  await payload.unlock({ collection: "users", data: { email: user.email, password }, overrideAccess: true });

  return `Password updated for ${email}`;
}
