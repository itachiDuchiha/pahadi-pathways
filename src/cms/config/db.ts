import path from "node:path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

type DbAdapterName = "sqlite" | "postgres";

function adapterName(value: string | undefined): DbAdapterName {
  const name = value?.trim() || "sqlite";

  if (name !== "sqlite" && name !== "postgres") {
    throw new Error('DATABASE_ADAPTER must be "sqlite" or "postgres"');
  }

  return name;
}

function migrationDir(adapter: DbAdapterName): string {
  return path.resolve(process.cwd(), "src/cms/migrations", adapter);
}

export function buildDbAdapter(env: NodeJS.ProcessEnv) {
  const adapter = adapterName(env.DATABASE_ADAPTER);
  const url = env.DATABASE_URL?.trim();

  if (!url) throw new Error("DATABASE_URL is required");

  if (adapter === "postgres") {
    return postgresAdapter({
      pool: { connectionString: url },
      push: false,
      migrationDir: migrationDir(adapter),
    });
  }

  return sqliteAdapter({
    client: { url },
    push: env.NODE_ENV !== "production",
    migrationDir: migrationDir(adapter),
  });
}
