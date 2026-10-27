import { randomBytes } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  getPayload,
  type CollectionSlug,
  type Config,
  type Field,
  type GlobalSlug,
  type Payload,
  type SanitizedConfig,
} from "payload";
import { afterAll, beforeAll, beforeEach } from "vitest";

const ENV_KEYS = [
  "DATABASE_ADAPTER",
  "DATABASE_URL",
  "PAYLOAD_SECRET",
  "PAYLOAD_ADMIN_EMAIL",
  "PAYLOAD_ADMIN_PASSWORD",
  "MEDIA_DIR",
] as const;

export type TempPayload = {
  /** The booted instance; only valid inside tests (after `beforeAll`). */
  readonly payload: Payload;
  /** Absolute path of the throwaway directory holding the db and media. */
  readonly dir: string;
};

/** Each named field's default, or empty value; a group resets field by field. */
function resetValues(fields: readonly Field[]): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const field of fields) {
    if (!("name" in field) || field.name === "createdAt" || field.name === "updatedAt") continue;
    data[field.name] =
      field.type === "group"
        ? resetValues(field.fields)
        : "defaultValue" in field && field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === "array"
            ? []
            : null;
  }
  return data;
}

/**
 * Boots one Payload instance per test file against a throwaway SQLite
 * file (schema created by `push`) and removes it afterwards. Every
 * collection is emptied and every global reset before each test, so
 * tests stay independent without paying for a re-boot.
 *
 * Call it at the top level of a test file, never inside a test.
 */
export function withTempPayload(): TempPayload {
  let payload: Payload | undefined;
  let dir = "";
  const savedEnv = new Map<string, string | undefined>();

  beforeAll(async () => {
    dir = await mkdtemp(path.join(tmpdir(), "thc-payload-"));

    for (const key of ENV_KEYS) savedEnv.set(key, process.env[key]);
    process.env.DATABASE_ADAPTER = "sqlite";
    process.env.DATABASE_URL = `file:${path.join(dir, "test.db")}`;
    process.env.PAYLOAD_SECRET = randomBytes(32).toString("hex");
    process.env.MEDIA_DIR = path.join(dir, "media");
    delete process.env.PAYLOAD_ADMIN_EMAIL;
    delete process.env.PAYLOAD_ADMIN_PASSWORD;

    // The config reads the environment at import time, so import it
    // only after the environment points at the temp directory.
    const { default: configPromise } = await import("@payload-config");
    const logger: Config["logger"] = { options: { level: "silent" } };
    // Payload accepts the unsanitised logger shape at runtime.
    const config = { ...(await configPromise), logger } as SanitizedConfig;

    // A unique key keeps this instance out of Payload's per-process cache
    // entry used by any other caller. The schema push prints a terminal
    // spinner straight to stdout, so mute stdout for the boot only.
    const write = process.stdout.write;
    process.stdout.write = () => true;
    try {
      payload = await getPayload({ config, key: `test-${path.basename(dir)}` });
    } finally {
      process.stdout.write = write;
    }
  }, 60_000);

  beforeEach(async () => {
    if (!payload) return;

    for (const slug of Object.keys(payload.collections) as CollectionSlug[]) {
      if (slug === "payload-migrations") continue;
      await payload.db.deleteMany({ collection: slug, where: {} });
      if (payload.collections[slug].config.versions) {
        await payload.db.deleteVersions({ collection: slug, where: {} });
      }
    }

    // Globals are single rows, so put every field back to its default (or
    // empty) value instead of deleting.
    for (const global of payload.globals.config) {
      await payload.updateGlobal({
        slug: global.slug as GlobalSlug,
        data: resetValues(global.fields),
        overrideAccess: true,
        context: { skipRevalidate: true },
      });
    }
  });

  afterAll(async () => {
    await payload?.destroy();
    payload = undefined;

    for (const [key, value] of savedEnv) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }

    if (dir) await rm(dir, { recursive: true, force: true });
  });

  return {
    get payload() {
      if (!payload) throw new Error("withTempPayload: Payload is not booted yet");
      return payload;
    },
    get dir() {
      return dir;
    },
  };
}
