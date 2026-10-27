import { describe, expect, it } from "vitest";

import { validateRecipients } from "./NotificationSettings";

const rows = (...emails: string[]) => emails.map((email) => ({ email }));

describe("validateRecipients", () => {
  it("accepts an empty or missing list", () => {
    expect(validateRecipients([])).toBe(true);
    expect(validateRecipients(undefined)).toBe(true);
    expect(validateRecipients(null)).toBe(true);
  });

  it("accepts up to ten distinct valid addresses", () => {
    expect(validateRecipients(rows(...Array.from({ length: 10 }, (_, i) => `r${i}@example.com`)))).toBe(true);
  });

  it("rejects an invalid address", () => {
    expect(validateRecipients(rows("ok@example.com", "not-an-address"))).toMatch(/not-an-address/);
    expect(validateRecipients(rows("a@b"))).toMatch(/valid email/i);
  });

  it("rejects a duplicate regardless of case", () => {
    expect(validateRecipients(rows("Owner@Example.com", "owner@example.com"))).toMatch(/more than once/);
  });

  it("rejects eleven addresses", () => {
    expect(validateRecipients(rows(...Array.from({ length: 11 }, (_, i) => `r${i}@example.com`)))).toMatch(/10/);
  });
});
