import path from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

const { sqliteAdapter, postgresAdapter } = vi.hoisted(() => ({
  sqliteAdapter: vi.fn((args: unknown) => ({ kind: "sqlite", args })),
  postgresAdapter: vi.fn((args: unknown) => ({ kind: "postgres", args })),
}));

vi.mock("@payloadcms/db-sqlite", () => ({ sqliteAdapter }));
vi.mock("@payloadcms/db-postgres", () => ({ postgresAdapter }));

import { buildDbAdapter } from "./db";

const url = "file:./data/test.db";

describe("buildDbAdapter", () => {
  beforeEach(() => {
    sqliteAdapter.mockClear();
    postgresAdapter.mockClear();
  });

  it("throws when DATABASE_URL is missing", () => {
    expect(() => buildDbAdapter({ NODE_ENV: "test" })).toThrow(
      "DATABASE_URL is required"
    );
  });

  it("throws on an unknown DATABASE_ADAPTER", () => {
    expect(() =>
      buildDbAdapter({ NODE_ENV: "test", DATABASE_ADAPTER: "mysql", DATABASE_URL: url })
    ).toThrow(/DATABASE_ADAPTER/);
  });

  it("builds the sqlite adapter by default with push outside production", () => {
    buildDbAdapter({ NODE_ENV: "development", DATABASE_URL: url });

    expect(postgresAdapter).not.toHaveBeenCalled();
    expect(sqliteAdapter).toHaveBeenCalledWith({
      client: { url },
      push: true,
      migrationDir: path.resolve(process.cwd(), "src/cms/migrations/sqlite"),
    });
  });

  it("turns sqlite push off in production", () => {
    buildDbAdapter({ NODE_ENV: "production", DATABASE_ADAPTER: "sqlite", DATABASE_URL: url });

    expect(sqliteAdapter).toHaveBeenCalledWith(
      expect.objectContaining({ push: false })
    );
  });

  it("builds the postgres adapter with push off", () => {
    const pgUrl = "postgres://user:pass@localhost:5432/cms";
    buildDbAdapter({ NODE_ENV: "development", DATABASE_ADAPTER: "postgres", DATABASE_URL: pgUrl });

    expect(sqliteAdapter).not.toHaveBeenCalled();
    expect(postgresAdapter).toHaveBeenCalledWith({
      pool: { connectionString: pgUrl },
      push: false,
      migrationDir: path.resolve(process.cwd(), "src/cms/migrations/postgres"),
    });
  });
});
