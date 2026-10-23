import { beforeEach, describe, expect, it, vi } from "vitest";

const nextCache = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/cache", () => nextCache);

import { pathsFor, revalidateHooks, tagFor, type RevalidateKind } from "./revalidate";

const COMMON = ["/", "/sitemap.xml", "/llms.txt", "/llms-full.txt"];

function paths(kind: RevalidateKind, doc?: unknown, previousDoc?: unknown) {
  return pathsFor(kind, doc, previousDoc).map((target) => target.path);
}

describe("pathsFor", () => {
  it("revalidates both the new and old package paths on a slug change", () => {
    const result = paths("package", { slug: "x" }, { slug: "y" });

    expect(result).toEqual(
      expect.arrayContaining(["/packages/x", "/packages/y", "/packages", ...COMMON])
    );
  });

  it("lists a package path once when the slug is unchanged", () => {
    const result = paths("package", { slug: "x" }, { slug: "x" });

    expect(result.filter((path) => path === "/packages/x")).toHaveLength(1);
  });

  it("handles a create (no previous doc) and a delete (no slug)", () => {
    expect(paths("package", { slug: "x" })).toContain("/packages/x");
    expect(paths("package", {}, undefined)).toEqual(
      expect.arrayContaining(["/packages", ...COMMON])
    );
  });

  it("ignores a slug that is not a valid path segment", () => {
    const result = paths("destination", { slug: "../etc" }, { slug: "spiti" });

    expect(result).not.toContain("/destinations/../etc");
    expect(result).toContain("/destinations/spiti");
  });

  it("revalidates destination pages and listing", () => {
    expect(paths("destination", { slug: "manali" }, { slug: "old" })).toEqual(
      expect.arrayContaining(["/destinations/manali", "/destinations/old", "/destinations", ...COMMON])
    );
  });

  it.each([
    ["testimonial", "/reviews"],
    ["gallery", "/gallery"],
    ["experience", "/experiences"],
  ] as const)("revalidates the %s listing", (kind, listing) => {
    expect(paths(kind, {})).toEqual(expect.arrayContaining([listing, ...COMMON]));
  });

  it("revalidates every package page for pricing changes", () => {
    const targets = pathsFor("pricing", {}, {});

    expect(targets).toContainEqual({ path: "/packages/[slug]", type: "page" });
    expect(targets.map((target) => target.path)).toEqual(
      expect.arrayContaining(["/packages", ...COMMON])
    );
  });

  it("revalidates the root and the whole layout for site settings", () => {
    const targets = pathsFor("site", {}, {});

    expect(targets.map((target) => target.path)).toContain("/");
    expect(targets).toContainEqual({ path: "/", type: "layout" });
  });
});

describe("tagFor", () => {
  it("maps each kind to a collection tag", () => {
    expect(tagFor("package")).toBe("packages");
    expect(tagFor("destination")).toBe("destinations");
    expect(tagFor("testimonial")).toBe("testimonials");
    expect(tagFor("gallery")).toBe("gallery-items");
    expect(tagFor("experience")).toBe("experiences");
    expect(tagFor("pricing")).toBe("pricing-settings");
    expect(tagFor("site")).toBe("site-settings");
  });
});

describe("revalidateHooks", () => {
  const logger = { warn: vi.fn() };

  beforeEach(() => {
    nextCache.revalidatePath.mockReset();
    nextCache.revalidateTag.mockReset();
    logger.warn.mockReset();
  });

  function req(context: Record<string, unknown> = {}) {
    return { context, payload: { logger } };
  }

  it("skips everything when the context asks it to", async () => {
    const { afterChange, afterDelete } = revalidateHooks("package");
    const context = { skipRevalidate: true };

    await afterChange({ doc: { slug: "x" }, previousDoc: {}, req: req(context), context });
    await afterDelete({ doc: { slug: "x" }, req: req(context), context });

    expect(nextCache.revalidatePath).not.toHaveBeenCalled();
    expect(nextCache.revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates paths and the collection tag, returning the doc", async () => {
    const { afterChange } = revalidateHooks("package");
    const doc = { slug: "x" };

    const result = await afterChange({ doc, previousDoc: { slug: "y" }, req: req(), context: {} });

    expect(result).toBe(doc);
    expect(nextCache.revalidatePath).toHaveBeenCalledWith("/packages/x", undefined);
    expect(nextCache.revalidatePath).toHaveBeenCalledWith("/packages/y", undefined);
    expect(nextCache.revalidateTag).toHaveBeenCalledWith("packages", { expire: 0 });
  });

  it("logs instead of failing the write when Next has no cache store", async () => {
    nextCache.revalidatePath.mockImplementation(() => {
      throw new Error("Invariant: static generation store missing");
    });
    const { afterDelete } = revalidateHooks("destination");
    const doc = { slug: "x" };

    await expect(afterDelete({ doc, req: req(), context: {} })).resolves.toBe(doc);
    expect(logger.warn).toHaveBeenCalled();
  });
});
