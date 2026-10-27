import { describe, expect, it } from "vitest";

import { withTempPayload } from "../test/withTempPayload";

import { parseEmailArg, setUserPassword } from "./setPassword";

const temp = withTempPayload();
const email = "owner@example.test";
const oldPassword = "the-original-password";
const newPassword = "a-brand-new-password";

async function makeAdmin() {
  return temp.payload.create({
    collection: "users",
    data: { email, password: oldPassword, role: "admin" },
    overrideAccess: true,
    context: { internal: true },
  });
}

describe("parseEmailArg", () => {
  it("reads --email in both forms", () => {
    expect(parseEmailArg(["--email", "a@b.test"])).toBe("a@b.test");
    expect(parseEmailArg(["--email=a@b.test"])).toBe("a@b.test");
    expect(parseEmailArg([])).toBeUndefined();
    expect(parseEmailArg(["--email"])).toBeUndefined();
  });
});

describe("setUserPassword", () => {
  it("changes the password and reports only the email", async () => {
    await makeAdmin();

    const line = await setUserPassword(temp.payload, email, newPassword);

    expect(line).toBe(`Password updated for ${email}`);
    expect(line).not.toContain(newPassword);
    const login = await temp.payload.login({ collection: "users", data: { email, password: newPassword } });
    expect(login.user?.email).toBe(email);
    await expect(
      temp.payload.login({ collection: "users", data: { email, password: oldPassword } })
    ).rejects.toThrow();
  });

  it("clears a lockout from failed logins", async () => {
    await makeAdmin();
    for (let attempt = 0; attempt < 5; attempt++) {
      await temp.payload.login({ collection: "users", data: { email, password: "wrong-password" } }).catch(() => null);
    }
    await expect(
      temp.payload.login({ collection: "users", data: { email, password: oldPassword } })
    ).rejects.toThrow(/locked/i);

    await setUserPassword(temp.payload, email, newPassword);

    const login = await temp.payload.login({ collection: "users", data: { email, password: newPassword } });
    expect(login.user?.email).toBe(email);
  });

  it("refuses a password shorter than 12 characters", async () => {
    await makeAdmin();

    await expect(setUserPassword(temp.payload, email, "short-pass1")).rejects.toThrow(/at least 12/);
    await expect(setUserPassword(temp.payload, email, undefined)).rejects.toThrow(/NEW_PASSWORD/);
    const login = await temp.payload.login({ collection: "users", data: { email, password: oldPassword } });
    expect(login.user?.email).toBe(email);
  });

  it("refuses a missing email or an unknown account", async () => {
    await expect(setUserPassword(temp.payload, undefined, newPassword)).rejects.toThrow(/--email/);
    await expect(setUserPassword(temp.payload, "nobody@example.test", newPassword)).rejects.toThrow(
      /No user/
    );
  });
});
