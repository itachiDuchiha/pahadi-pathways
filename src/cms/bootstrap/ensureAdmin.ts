import { isMissingSchemaError } from "./schema";

export type EnsureAdminResult = "created" | "exists" | "skipped";

export const MIN_ADMIN_PASSWORD_LENGTH = 12;

/** The slice of the Payload Local API that the bootstrap needs. */
export type AdminBootstrapPayload = {
  count(args: {
    collection: "users";
    overrideAccess: boolean;
  }): Promise<{ totalDocs: number }>;
  create(args: {
    collection: "users";
    context: { internal: true };
    data: { email: string; password: string; role: "admin" };
    overrideAccess: boolean;
  }): Promise<unknown>;
  logger: {
    info(message: string): void;
    warn(message: string): void;
  };
};

type Env = Readonly<Record<string, string | undefined>>;

/**
 * Creates the first admin user from the environment when the users
 * collection is empty. Never logs the email or the password.
 */
export async function ensureAdmin(
  payload: AdminBootstrapPayload,
  env: Env
): Promise<EnsureAdminResult> {
  const { totalDocs } = await payload.count({
    collection: "users",
    overrideAccess: true,
  });

  if (totalDocs > 0) return "exists";

  const email = env.PAYLOAD_ADMIN_EMAIL?.trim();
  const password = env.PAYLOAD_ADMIN_PASSWORD;

  if (!email || !password || password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    payload.logger.warn(
      "No users exist and PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD (at least 12 characters) are not set; the admin stays locked."
    );
    return "skipped";
  }

  await payload.create({
    collection: "users",
    context: { internal: true },
    data: { email, password, role: "admin" },
    overrideAccess: true,
  });
  payload.logger.info("Created the first admin user from the environment.");

  return "created";
}

export const MISSING_SCHEMA_MESSAGE =
  "Database schema is missing. Run `npm run payload migrate` then `npm run cms:seed`.";

/**
 * The server's `onInit`: creates the first admin, and turns a database
 * that was never migrated into an error that says what to run.
 */
export async function bootstrapAdmin(
  payload: AdminBootstrapPayload,
  env: Env
): Promise<EnsureAdminResult> {
  try {
    return await ensureAdmin(payload, env);
  } catch (error) {
    if (isMissingSchemaError(error)) throw new Error(MISSING_SCHEMA_MESSAGE, { cause: error });
    throw error;
  }
}
