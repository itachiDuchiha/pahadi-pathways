import { ValidationError } from "payload";
import { describe, expect, it } from "vitest";

import { SLUG_PATTERN, slugField, validateSlug } from "./slug";

describe("validateSlug", () => {
  it.each(["shimla-manali-getaway", "spiti", "day-2", "a1-b2-c3"])(
    "accepts %s",
    (value) => {
      expect(validateSlug(value)).toBe(true);
    }
  );

  it.each(["Shimla", "a--b", "-a", "a-", "", "with space", "under_score", "ü"])(
    "rejects %j",
    (value) => {
      expect(validateSlug(value)).toEqual(expect.any(String));
    }
  );

  it.each([undefined, null, 42])("rejects a non-string %j", (value) => {
    expect(validateSlug(value)).toEqual(expect.any(String));
  });
});

describe("slugField", () => {
  it("is a required, unique, indexed sidebar text field named slug", () => {
    const field = slugField();

    expect(field).toMatchObject({
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    });
    expect(SLUG_PATTERN.source).toBe("^[a-z0-9]+(?:-[a-z0-9]+)*$");
  });

  it("validates through validateSlug", () => {
    const field = slugField();
    const validate = field.validate as unknown as (value: unknown) => unknown;

    expect(validate("ok-slug")).toBe(true);
    expect(validate("Not Ok")).toEqual(expect.any(String));
  });
});

describe("slugField draft guard", () => {
  // Payload skips `validate` on draft saves, so the field also checks the
  // format in a beforeChange hook that runs for drafts too.
  const hook = slugField().hooks?.beforeChange?.[0] as unknown as (args: {
    value: unknown;
    data?: Record<string, unknown>;
    collection?: { slug: string } | null;
    req: object;
  }) => unknown;

  it("throws a ValidationError for a malformed slug", () => {
    expect(() => hook({ value: "Bad Slug", collection: { slug: "packages" }, req: {} })).toThrow(
      ValidationError
    );
  });

  it("passes a valid or absent slug through", () => {
    expect(hook({ value: "good-slug", req: {} })).toBe("good-slug");
    expect(hook({ value: undefined, req: {} })).toBeUndefined();
  });

  it("leaves a publish to validate so all field errors are reported together", () => {
    expect(hook({ value: "Bad Slug", data: { _status: "published" }, req: {} })).toBe("Bad Slug");
  });
});
