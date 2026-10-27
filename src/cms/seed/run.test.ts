import { readdir } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import { withTempPayload } from "../test/withTempPayload";
import { allDestinations } from "./destinations";
import { experiences } from "./experiences";
import { galleryItems } from "./gallery";
import { mediaManifest } from "./media-manifest";
import { packages } from "./packages";
import { assertSeedEnv, mediaFilename, pruneEnquiries, seed } from "./run";
import { testimonials } from "./testimonials";

const temp = withTempPayload();

async function listImages(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => `/${path.relative("public", path.join(entry.parentPath, entry.name)).split(path.sep).join("/")}`)
    .sort();
}

describe("media manifest", () => {
  it("lists every file under public/images with alt text", async () => {
    const files = await listImages(path.join("public", "images"));
    expect(Object.keys(mediaManifest).sort()).toEqual(files);
    for (const alt of Object.values(mediaManifest)) expect(alt.trim()).not.toBe("");
  });

  it("maps every public path to a distinct upload filename", () => {
    const names = Object.keys(mediaManifest).map(mediaFilename);
    expect(new Set(names).size).toBe(names.length);
    expect(mediaFilename("/images/packages/heroes/manali.webp")).toBe("packages-heroes-manali.webp");
  });

  it("covers every image the fixtures reference", () => {
    const referenced = [
      ...packages.flatMap((pkg) => [pkg.image, pkg.heroImage]),
      ...allDestinations.flatMap((d) => [d.image, ...(d.gallery ?? [])]),
      ...galleryItems.map((item) => item.image),
      ...experiences.map((item) => item.image),
    ].filter((value): value is string => typeof value === "string");
    for (const image of referenced) expect(mediaManifest).toHaveProperty([image]);
  });
});

describe("assertSeedEnv", () => {
  const secret = "x".repeat(32);

  it("refuses to run without a PAYLOAD_SECRET of at least 32 characters", () => {
    expect(() => assertSeedEnv({ DATABASE_URL: "file:./x.db" })).toThrow(/PAYLOAD_SECRET/);
    expect(() => assertSeedEnv({ DATABASE_URL: "file:./x.db", PAYLOAD_SECRET: "short" })).toThrow(
      /PAYLOAD_SECRET/
    );
  });

  it("refuses to run without a DATABASE_URL", () => {
    expect(() => assertSeedEnv({ PAYLOAD_SECRET: secret })).toThrow(/DATABASE_URL/);
    expect(() => assertSeedEnv({ PAYLOAD_SECRET: secret, DATABASE_URL: "  " })).toThrow(/DATABASE_URL/);
  });

  it("accepts a complete environment", () => {
    expect(() => assertSeedEnv({ PAYLOAD_SECRET: secret, DATABASE_URL: "file:./x.db" })).not.toThrow();
  });
});

describe("seed", () => {
  it(
    "creates every fixture once, publishes it and is idempotent",
    async () => {
      const { payload } = temp;
      const warn = vi.spyOn(payload.logger, "warn");

      const first = await seed(payload, { skipRevalidate: true, env: {} });

      const mediaCount = Object.keys(mediaManifest).length;
      expect(first.created).toEqual({
        media: mediaCount,
        packages: packages.length,
        destinations: allDestinations.length,
        testimonials: testimonials.length,
        "gallery-items": galleryItems.length,
        experiences: experiences.length,
        "pricing-settings": 0,
        "site-settings": 0,
      });
      expect(first.updated["pricing-settings"]).toBe(1);
      expect(first.updated["site-settings"]).toBe(1);
      expect(first.media).toBe(mediaCount);
      expect(first.admin).toBe("skipped");

      const second = await seed(payload, { skipRevalidate: true, env: {} });
      expect(Object.values(second.created).every((count) => count === 0)).toBe(true);
      expect(second.updated.packages).toBe(packages.length);
      expect(second.media).toBe(mediaCount);

      expect(packages.length).toBe(5);
      expect(allDestinations.length).toBe(12);
      const counts = {
        media: (await payload.count({ collection: "media" })).totalDocs,
        packages: (await payload.count({ collection: "packages" })).totalDocs,
        destinations: (await payload.count({ collection: "destinations" })).totalDocs,
        testimonials: (await payload.count({ collection: "testimonials" })).totalDocs,
        gallery: (await payload.count({ collection: "gallery-items" })).totalDocs,
        experiences: (await payload.count({ collection: "experiences" })).totalDocs,
      };
      expect(counts).toEqual({
        media: mediaCount,
        packages: packages.length,
        destinations: allDestinations.length,
        testimonials: testimonials.length,
        gallery: galleryItems.length,
        experiences: experiences.length,
      });

      // Anonymous published reads see every package and destination.
      const publicPackages = await payload.find({
        collection: "packages",
        overrideAccess: false,
        draft: false,
        limit: 0,
        depth: 1,
      });
      expect(publicPackages.totalDocs).toBe(packages.length);
      for (const doc of publicPackages.docs) expect(doc._status).toBe("published");

      const spiti = publicPackages.docs.find((doc) => doc.slug === "shimla-kinnaur-spiti-chandratal");
      expect(spiti?.price).toBe(32249);
      expect(spiti?.pricing?.basePricePerAdult).toBe(32249);
      expect(spiti?.pricing?.vehicleRates).toMatchObject({ sedan: 32249, ertiga: 38749, crysta: 54999 });
      expect(spiti?.itinerary[0]?.item).toBe("1N Shimla");
      expect(typeof spiti?.image === "object" && spiti.image.filename).toBe("packages-spiti.webp");

      const publicDestinations = await payload.find({
        collection: "destinations",
        overrideAccess: false,
        draft: false,
        limit: 0,
      });
      expect(publicDestinations.totalDocs).toBe(allDestinations.length);
      const layouts = Object.fromEntries(publicDestinations.docs.map((doc) => [doc.slug, doc.layout]));
      expect(layouts).toMatchObject({ manali: "dedicated", shimla: "dedicated", "spiti-valley": "dedicated", kufri: "shared" });
      const kufri = publicDestinations.docs.find((doc) => doc.slug === "kufri");
      expect(kufri?.gallery).toHaveLength(4);

      const pricing = await payload.findGlobal({ slug: "pricing-settings" });
      expect(pricing).toMatchObject({ gstPercent: 5, childFreeUnderAge: 5, childPercentOfAdult: 25 });
      expect(pricing.vehicleOptions?.map((v) => [v.key, v.perDayUpgrade, v.perDayUpgradeSpiti])).toEqual([
        ["sedan", 0, 0],
        ["ertiga", 1000, 1000],
        ["crysta", 2500, 3500],
      ]);

      const siteSettings = await payload.findGlobal({ slug: "site-settings" });
      expect(siteSettings).toMatchObject({ phoneE164: "+917559697919", whatsapp: "917559697919" });

      const revalidationWarnings = warn.mock.calls.filter(([message]) => String(message).includes("Revalidation"));
      expect(revalidationWarnings).toEqual([]);
      warn.mockRestore();
    },
    240_000
  );
});

describe("pruneEnquiries", () => {
  it("returns 0 while the enquiries collection is not registered", async () => {
    await expect(pruneEnquiries(temp.payload, 24)).resolves.toBe(0);
  });
});
