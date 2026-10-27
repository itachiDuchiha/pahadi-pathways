import type { AccessArgs } from "payload";
import { describe, expect, it } from "vitest";

import { isAdmin, isAdminField, isAdminOrSelf, isEditorOrAdmin } from "../access";
import { blockAnonymousCreate } from "../hooks/blockAnonymousCreate";

import { Users } from "./Users";

function args(user: { role: string } | null): AccessArgs {
  return { req: { user, context: {} } } as unknown as AccessArgs;
}

describe("Users collection", () => {
  it("keeps the role and email admin-only on update", () => {
    for (const name of ["role", "email"]) {
      const field = Users.fields.find((item) => "name" in item && item.name === name);
      expect(field && "access" in field ? field.access?.update : undefined).toBe(isAdminField);
    }
  });

  it("limits a non-admin's updates to their own account", () => {
    const self = { req: { user: { id: 7, role: "editor" }, context: {} } } as unknown as AccessArgs;

    expect(isAdminOrSelf(self)).toEqual({ id: { equals: 7 } });
    expect(isAdminOrSelf(args({ role: "admin" }))).toBe(true);
    expect(isAdminOrSelf(args(null))).toBe(false);
  });

  it("blocks anonymous creates before every operation", () => {
    expect(Users.hooks?.beforeOperation).toContain(blockAnonymousCreate);
  });

  it("locks an account for 15 minutes after 5 failed logins", () => {
    const auth = typeof Users.auth === "object" ? Users.auth : undefined;

    expect(auth?.maxLoginAttempts).toBe(5);
    expect(auth?.lockTime).toBe(15 * 60 * 1000);
  });

  it("lets only admins create, delete and unlock users, and anyone update themselves", () => {
    expect(Users.access?.create).toBe(isAdmin);
    expect(Users.access?.update).toBe(isAdminOrSelf);
    expect(Users.access?.delete).toBe(isAdmin);
    expect(Users.access?.unlock).toBe(isAdmin);
    expect(Users.access?.read).toBe(isEditorOrAdmin);
  });

  it("denies unlock to an editor and allows it for an admin", () => {
    const unlock = Users.access?.unlock;

    expect(unlock?.(args({ role: "editor" }))).toBe(false);
    expect(unlock?.(args(null))).toBe(false);
    expect(unlock?.(args({ role: "admin" }))).toBe(true);
  });
});
