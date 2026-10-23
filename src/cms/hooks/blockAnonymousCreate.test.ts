import { Forbidden } from "payload";
import { describe, expect, it } from "vitest";

import { blockAnonymousCreate } from "./blockAnonymousCreate";

type HookArgs = Parameters<typeof blockAnonymousCreate>[0];

function run(
  operation: string,
  user: { role: string } | null,
  context: Record<string, unknown> = {}
) {
  const args = {
    operation,
    req: { user, context, t: () => "Forbidden" },
  } as unknown as HookArgs;

  return () => blockAnonymousCreate(args);
}

describe("blockAnonymousCreate", () => {
  it("refuses an anonymous create such as Payload's first-register", () => {
    expect(run("create", null)).toThrow(Forbidden);
  });

  it("allows a create from the server bootstrap", () => {
    expect(run("create", null, { internal: true })).not.toThrow();
  });

  it("allows a create by a signed-in user (access control decides)", () => {
    expect(run("create", { role: "admin" })).not.toThrow();
  });

  it("ignores other operations", () => {
    expect(run("read", null)).not.toThrow();
  });
});
