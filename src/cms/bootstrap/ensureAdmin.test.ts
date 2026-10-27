import { describe, expect, it, vi } from "vitest";

import { MISSING_SCHEMA_MESSAGE, bootstrapAdmin, ensureAdmin, type AdminBootstrapPayload } from "./ensureAdmin";

function stubPayload(totalDocs: number) {
  const create = vi.fn(async () => ({}));
  const info = vi.fn();
  const warn = vi.fn();
  const payload: AdminBootstrapPayload = {
    count: vi.fn(async () => ({ totalDocs })),
    create,
    logger: { info, warn },
  };

  return { payload, create, info, warn };
}

const email = "owner@example.com";
const password = "a-long-enough-password";

describe("ensureAdmin", () => {
  it("creates an admin when there are no users and the env is set", async () => {
    const { payload, create } = stubPayload(0);

    const result = await ensureAdmin(payload, {
      PAYLOAD_ADMIN_EMAIL: email,
      PAYLOAD_ADMIN_PASSWORD: password,
    });

    expect(result).toBe("created");
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      collection: "users",
      context: { internal: true },
      data: { email, password, role: "admin" },
      overrideAccess: true,
    });
  });

  it("does nothing when a user already exists", async () => {
    const { payload, create } = stubPayload(1);

    const result = await ensureAdmin(payload, {
      PAYLOAD_ADMIN_EMAIL: email,
      PAYLOAD_ADMIN_PASSWORD: password,
    });

    expect(result).toBe("exists");
    expect(create).not.toHaveBeenCalled();
  });

  it("skips when the admin env is missing", async () => {
    const { payload, create } = stubPayload(0);

    expect(await ensureAdmin(payload, {})).toBe("skipped");
    expect(create).not.toHaveBeenCalled();
  });

  it("skips when the password is shorter than 12 characters", async () => {
    const { payload, create } = stubPayload(0);

    const result = await ensureAdmin(payload, {
      PAYLOAD_ADMIN_EMAIL: email,
      PAYLOAD_ADMIN_PASSWORD: "12345678",
    });

    expect(result).toBe("skipped");
    expect(create).not.toHaveBeenCalled();
  });

  it("never logs the email or password", async () => {
    const { payload, info, warn } = stubPayload(0);

    await ensureAdmin(payload, {
      PAYLOAD_ADMIN_EMAIL: email,
      PAYLOAD_ADMIN_PASSWORD: password,
    });
    await ensureAdmin(payload, { PAYLOAD_ADMIN_EMAIL: email });

    const logged = JSON.stringify([...info.mock.calls, ...warn.mock.calls]);
    expect(logged).not.toContain(email);
    expect(logged).not.toContain(password);
  });
});

describe("bootstrapAdmin", () => {
  it("explains how to create a missing schema", async () => {
    const { payload } = stubPayload(0);
    payload.count = vi.fn(async () => {
      throw new Error("Failed query", { cause: new Error("SQLITE_ERROR: no such table: users") });
    });

    await expect(bootstrapAdmin(payload, {})).rejects.toThrow(MISSING_SCHEMA_MESSAGE);
    expect(MISSING_SCHEMA_MESSAGE).toBe(
      "Database schema is missing. Run `npm run payload migrate` then `npm run cms:seed`."
    );
  });

  it("rethrows any other error unchanged", async () => {
    const { payload } = stubPayload(0);
    const failure = new Error("connection refused");
    payload.count = vi.fn(async () => {
      throw failure;
    });

    await expect(bootstrapAdmin(payload, {})).rejects.toBe(failure);
  });

  it("creates the admin like ensureAdmin otherwise", async () => {
    const { payload } = stubPayload(0);

    expect(await bootstrapAdmin(payload, { PAYLOAD_ADMIN_EMAIL: email, PAYLOAD_ADMIN_PASSWORD: password })).toBe(
      "created"
    );
  });
});
