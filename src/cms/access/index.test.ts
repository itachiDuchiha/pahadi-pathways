import type { AccessArgs } from "payload";
import { describe, expect, it } from "vitest";

import { deny, isAdmin, isEditorOrAdmin, publishedOnly, serverOnly } from "./index";

function args(
  user: { role?: string } | null,
  context: Record<string, unknown> = {}
): AccessArgs {
  return { req: { user, context } } as unknown as AccessArgs;
}

describe("isAdmin", () => {
  it("allows only users with the admin role", () => {
    expect(isAdmin(args({ role: "admin" }))).toBe(true);
    expect(isAdmin(args({ role: "editor" }))).toBe(false);
    expect(isAdmin(args({}))).toBe(false);
    expect(isAdmin(args(null))).toBe(false);
  });
});

describe("isEditorOrAdmin", () => {
  it("allows editors and admins only", () => {
    expect(isEditorOrAdmin(args({ role: "admin" }))).toBe(true);
    expect(isEditorOrAdmin(args({ role: "editor" }))).toBe(true);
    expect(isEditorOrAdmin(args({ role: "guest" }))).toBe(false);
    expect(isEditorOrAdmin(args(null))).toBe(false);
  });
});

describe("publishedOnly", () => {
  it("returns a published-only where clause when there is no user", () => {
    expect(publishedOnly(args(null))).toEqual({
      _status: { equals: "published" },
    });
  });

  it("returns true for a signed-in user", () => {
    expect(publishedOnly(args({ role: "editor" }))).toBe(true);
  });
});

describe("deny", () => {
  it("always refuses", () => {
    expect(deny()).toBe(false);
  });
});

describe("serverOnly", () => {
  it("allows only requests marked internal in the context", () => {
    expect(serverOnly(args(null, { internal: true }))).toBe(true);
    expect(serverOnly(args(null, { internal: "true" }))).toBe(false);
    expect(serverOnly(args(null))).toBe(false);
    expect(serverOnly(args({ role: "admin" }))).toBe(false);
  });
});
