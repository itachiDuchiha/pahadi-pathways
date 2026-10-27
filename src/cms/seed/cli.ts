import { existsSync } from "node:fs";

import { getPayload, type Payload } from "payload";

import { assertSeedEnv } from "./run";

/** Loads `.env.local` and `.env` like the Payload CLI; the shell environment wins. */
function loadLocalEnv(): void {
  for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file);
  }
}

/**
 * Boots Payload for a one-off script, runs `task`, prints its summary and
 * exits. Never prints environment values.
 */
export async function runCli(name: string, task: (payload: Payload) => Promise<string[]>): Promise<never> {
  let payload: Payload | undefined;
  let code = 0;

  try {
    loadLocalEnv();
    assertSeedEnv(process.env);
    // Scripts run against a migrated schema. Outside development mode the
    // adapter never pushes schema changes, which would otherwise mark the
    // database as dev-pushed and make the next `payload migrate` prompt.
    if (!process.env.NODE_ENV) Object.assign(process.env, { NODE_ENV: "production" });

    // The config reads the environment at import time.
    const { default: config } = await import("@payload-config");
    // The seed runs the admin bootstrap itself and reports the outcome.
    payload = await getPayload({ config, disableOnInit: true });

    const started = performance.now();
    const lines = await task(payload);
    const seconds = ((performance.now() - started) / 1000).toFixed(1);

    for (const line of lines) console.log(line);
    console.log(`${name} finished in ${seconds}s`);
  } catch (error) {
    console.error(`${name} failed: ${error instanceof Error ? error.message : String(error)}`);
    code = 1;
  } finally {
    await payload?.destroy();
  }

  process.exit(code);
}
