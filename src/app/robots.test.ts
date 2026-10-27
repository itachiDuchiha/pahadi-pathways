import { describe, expect, it } from "vitest";

import robots from "./robots";

describe("robots", () => {
  const output = robots();
  const rules = Array.isArray(output.rules) ? output.rules : [output.rules];

  it("disallows /api/ in every group", () => {
    expect(rules.length).toBeGreaterThan(1);
    for (const rule of rules) {
      const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
      expect(disallow).toContain("/api/");
    }
  });

  it("allows public CMS media in every group", () => {
    for (const rule of rules) {
      const allow = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
      expect(allow).toEqual(expect.arrayContaining(["/", "/api/media/file/"]));
    }
  });

  it("never names the admin path", () => {
    expect(JSON.stringify(output)).not.toContain("ramram");
  });
});
