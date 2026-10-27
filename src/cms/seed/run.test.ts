import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { CollectionSlug } from "payload";
import sharp from "sharp";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { withTempPayload } from "../test/withTempPayload";
import { allDestinations } from "./destinations";
import { experiences } from "./experiences";
import { galleryItems } from "./gallery";
import { mediaManifest } from "./media-manifest";
import { packages } from "./packages";
import { assertSeedEnv, isMissingSchemaError, mediaFilename, pruneEnquiries, seed } from "./run";
import { testimonials } from "./testimonials";
import { site } from "@/config/site";

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

/** Fixture counts per target, as the first seed into an empty database creates them. */
const FIXTURE_COUNTS = {
  media: Object.keys(mediaManifest).length,
  packages: packages.length,
  destinations: allDestinations.length,
  testimonials: testimonials.length,
  "gallery-items": galleryItems.length,
  experiences: experiences.length,
} as const;

const quiet = { skipRevalidate: true } as const;

describe("seed", () => {
  // Tiny stand-ins for every manifest image keep uploads fast; the manifest
  // test above checks the real files.
  let publicDir = "";
  beforeAll(async () => {
    publicDir = path.join(temp.dir, "public");
    const pixel = await sharp({
      create: { width: 4, height: 4, channels: 3, background: "#336699" },
    })
      .webp()
      .toBuffer();
    for (const publicPath of Object.keys(mediaManifest)) {
      const file = path.join(publicDir, publicPath);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, pixel);
    }
  });

  const run = (overwrite = false) =>
    seed(temp.payload, { skipRevalidate: true, env: {}, publicDir, overwrite });

  async function count(collection: CollectionSlug): Promise<number> {
    return (await temp.payload.count({ collection, overrideAccess: true })).totalDocs;
  }

  async function packageBySlug(slug: string) {
    const { docs } = await temp.payload.find({
      collection: "packages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const doc = docs[0];
    if (!doc) throw new Error(`package ${slug} not found`);
    return doc;
  }

  it(
    "fills an empty database with every fixture, published",
    async () => {
      const { payload } = temp;
      const warn = vi.spyOn(payload.logger, "warn");

      const first = await run();

      expect(first.created).toEqual({ ...FIXTURE_COUNTS, "pricing-settings": 0, "site-settings": 0, "legal-settings": 0 });
      expect(first.updated["pricing-settings"]).toBe(1);
      expect(first.updated["site-settings"]).toBe(1);
      expect(first.updated["legal-settings"]).toBe(1);
      expect(Object.values(first.skipped).every((n) => n === 0)).toBe(true);
      expect(first.media).toBe(FIXTURE_COUNTS.media);
      expect(first.admin).toBe("skipped");

      expect(packages.length).toBe(5);
      expect(allDestinations.length).toBe(12);
      for (const [collection, expected] of Object.entries(FIXTURE_COUNTS)) {
        expect(await count(collection as CollectionSlug)).toBe(expected);
      }

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
      expect(spiti?.pricing?.basePricePerAdult).toBe(32249);
      expect(spiti?.pricing?.vehicleRates).toMatchObject({ sedan: null, ertiga: 38749, crysta: 54999 });
      // Per-night overrides reproduce the old flat deltas over the package's
      // nights. SQLite returns 15 significant digits, enough for exact rupees.
      const flat: [label: string, delta: number][] = [
        ["Deluxe", 0],
        ["Premium", 2500],
        ["Luxury", 5000],
        ["Breakfast + Dinner (MAP)", 0],
        ["Breakfast Only (CP)", -2500],
      ];
      const nights: Record<string, number> = {
        "shimla-kinnaur-spiti-chandratal": 9,
        "shimla-manali-getaway": 6,
        "himachal-grand-circuit": 9,
        "shimla-manali-jibhi": 7,
        "shimla-kinnaur-spiti-kalpa": 8,
      };
      for (const doc of publicPackages.docs) {
        const n = nights[doc.slug];
        const rows = [...(doc.pricing.stayOptions ?? []), ...(doc.pricing.mealOptions ?? [])];
        expect(rows.map((row) => row.label)).toEqual(flat.map(([label]) => label));
        rows.forEach((row, index) => {
          const delta = flat[index][1];
          expect(row.deltaPerNight).toBeCloseTo(delta / n, 9);
          expect(Math.round(row.deltaPerNight * n)).toBe(delta);
        });
      }
      expect(spiti?.pricing.stayOptions?.[1]?.deltaPerNight).toBeCloseTo(2500 / 9, 9);

      const publicDestinations = await payload.find({
        collection: "destinations",
        overrideAccess: false,
        draft: false,
        limit: 0,
      });
      expect(publicDestinations.totalDocs).toBe(allDestinations.length);
      const layouts = Object.fromEntries(publicDestinations.docs.map((doc) => [doc.slug, doc.layout]));
      expect(layouts).toMatchObject({
        manali: "dedicated",
        shimla: "dedicated",
        "spiti-valley": "dedicated",
        kufri: "shared",
      });
      const kufri = publicDestinations.docs.find((doc) => doc.slug === "kufri");
      expect(kufri?.gallery).toHaveLength(4);

      const pricing = await payload.findGlobal({ slug: "pricing-settings" });
      expect(pricing).toMatchObject({ gstPercent: 5, childFreeUnderAge: 5, childPercentOfAdult: 25 });
      expect(pricing.stayOptions?.map((o) => [o.label, o.deltaPerNight])).toEqual([
        ["Deluxe", 0],
        ["Premium", 300],
        ["Luxury", 600],
      ]);
      expect(pricing.mealOptions?.map((o) => [o.label, o.deltaPerNight])).toEqual([
        ["Breakfast + Dinner (MAP)", 0],
        ["Breakfast Only (CP)", -300],
      ]);
      expect(pricing.vehicleOptions?.map((v) => [v.key, v.perDayUpgrade, v.perDayUpgradeSpiti])).toEqual([
        ["sedan", 0, 0],
        ["ertiga", 1000, 1000],
        ["crysta", 2500, 3500],
      ]);

      const siteSettings = await payload.findGlobal({ slug: "site-settings" });
      expect(siteSettings).toMatchObject({ phoneE164: "+917559697919", whatsapp: "917559697919" });

      const legal = await payload.findGlobal({ slug: "legal-settings" });
      expect(legal).toMatchObject({ dataContactEmail: site.email, deletionWindowMonths: 6 });
      expect(legal.effectiveDate).toMatch(/^2026-10-27/);

      const revalidationWarnings = warn.mock.calls.filter(([message]) => String(message).includes("Revalidation"));
      expect(revalidationWarnings).toEqual([]);
      warn.mockRestore();
    },
    120_000
  );

  it(
    "keeps editor changes when it runs again",
    async () => {
      const { payload } = temp;
      await run();

      const pkg = await packageBySlug("shimla-manali-getaway");
      await payload.update({
        collection: "packages",
        id: pkg.id,
        data: { title: "Edited title", pricing: { basePricePerAdult: 12345 } },
        draft: false,
        overrideAccess: true,
        context: quiet,
      });
      await payload.updateGlobal({ slug: "pricing-settings", data: { gstPercent: 12 }, context: quiet });
      await payload.updateGlobal({ slug: "site-settings", data: { tagline: "Edited tagline" }, context: quiet });
      const media = (await payload.find({ collection: "media", where: { filename: { equals: "packages-spiti.webp" } } }))
        .docs[0];
      if (!media) throw new Error("media not found");
      await payload.update({ collection: "media", id: media.id, data: { alt: "Edited alt" }, context: quiet });

      const second = await run();

      expect(Object.values(second.created).every((n) => n === 0)).toBe(true);
      expect(Object.values(second.updated).every((n) => n === 0)).toBe(true);
      expect(second.skipped).toEqual({ ...FIXTURE_COUNTS, "pricing-settings": 1, "site-settings": 1, "legal-settings": 1 });

      const after = await packageBySlug("shimla-manali-getaway");
      expect(after.title).toBe("Edited title");
      expect(after.pricing?.basePricePerAdult).toBe(12345);
      expect((await payload.findGlobal({ slug: "pricing-settings" })).gstPercent).toBe(12);
      expect((await payload.findGlobal({ slug: "site-settings" })).tagline).toBe("Edited tagline");
      expect((await payload.findByID({ collection: "media", id: media.id })).alt).toBe("Edited alt");
    },
    120_000
  );

  it(
    "does not bring back a deleted testimonial",
    async () => {
      const { payload } = temp;
      await run();
      const victim = (await payload.find({ collection: "testimonials", limit: 1 })).docs[0];
      if (!victim) throw new Error("testimonial not found");
      await payload.delete({ collection: "testimonials", id: victim.id, context: quiet });

      const second = await run();

      expect(second.created.testimonials).toBe(0);
      expect(second.skipped.testimonials).toBe(testimonials.length);
      expect(await count("testimonials")).toBe(testimonials.length - 1);
      const names = (await payload.find({ collection: "testimonials", limit: 0 })).docs.map((d) => d.name);
      expect(names).not.toContain(victim.name);
    },
    120_000
  );

  it(
    "restores fixture values and recreates deleted documents with overwrite",
    async () => {
      const { payload } = temp;
      await run();

      const pkg = await packageBySlug("shimla-manali-getaway");
      await payload.update({
        collection: "packages",
        id: pkg.id,
        data: { title: "Edited title", pricing: { basePricePerAdult: 12345 } },
        draft: false,
        overrideAccess: true,
        context: quiet,
      });
      await payload.updateGlobal({ slug: "pricing-settings", data: { gstPercent: 12 }, context: quiet });
      await payload.updateGlobal({ slug: "site-settings", data: { tagline: "Edited tagline" }, context: quiet });
      const media = (await payload.find({ collection: "media", where: { filename: { equals: "packages-spiti.webp" } } }))
        .docs[0];
      if (!media) throw new Error("media not found");
      await payload.update({ collection: "media", id: media.id, data: { alt: "Edited alt" }, context: quiet });
      const victim = (await payload.find({ collection: "testimonials", limit: 1 })).docs[0];
      if (!victim) throw new Error("testimonial not found");
      await payload.delete({ collection: "testimonials", id: victim.id, context: quiet });

      const result = await run(true);

      expect(result.created).toMatchObject({ media: 0, packages: 0, testimonials: 1 });
      expect(result.updated).toMatchObject({
        media: 1,
        packages: packages.length,
        testimonials: testimonials.length - 1,
        "pricing-settings": 1,
        "site-settings": 1,
        "legal-settings": 1,
      });

      const after = await packageBySlug("shimla-manali-getaway");
      expect(after.title).toBe("Shimla & Manali Getaway");
      expect(after.pricing?.basePricePerAdult).toBe(18999);
      expect((await payload.findGlobal({ slug: "pricing-settings" })).gstPercent).toBe(5);
      expect((await payload.findGlobal({ slug: "site-settings" })).tagline).toBe("Handcrafted Himalayan Journeys");
      expect((await payload.findByID({ collection: "media", id: media.id })).alt).toBe(
        "Kinnaur & Spiti: The Himalayan Circuit"
      );
      expect(await count("testimonials")).toBe(testimonials.length);
      expect(await count("media")).toBe(FIXTURE_COUNTS.media);
    },
    120_000
  );

  it(
    "fills an emptied collection from the existing media without uploading",
    async () => {
      const { payload } = temp;
      await run();
      const mediaIds = new Set(
        (await payload.find({ collection: "media", limit: 0, depth: 0 })).docs.map((doc) => doc.id)
      );
      await payload.delete({ collection: "experiences", where: {}, context: quiet });
      expect(await count("experiences")).toBe(0);

      const second = await run();

      expect(second.created).toMatchObject({ media: 0, experiences: experiences.length, packages: 0 });
      expect(second.skipped.media).toBe(FIXTURE_COUNTS.media);
      expect(await count("media")).toBe(FIXTURE_COUNTS.media);
      const recreated = (await payload.find({ collection: "experiences", limit: 0, depth: 0 })).docs;
      expect(recreated).toHaveLength(experiences.length);
      for (const doc of recreated) expect(mediaIds.has(Number(doc.image))).toBe(true);
    },
    120_000
  );

  it(
    "names the missing media file when an emptied collection needs it",
    async () => {
      const { payload } = temp;
      await run();
      await payload.delete({ collection: "experiences", where: {}, context: quiet });
      await payload.delete({
        collection: "media",
        where: { filename: { equals: "packages-keylong.webp" } },
        context: quiet,
      });

      await expect(run()).rejects.toThrow(/packages-keylong\.webp/);
    },
    120_000
  );
});

describe("isMissingSchemaError", () => {
  it("recognises a missing table, also when wrapped", () => {
    expect(isMissingSchemaError(new Error("SQLITE_ERROR: no such table: users"))).toBe(true);
    expect(
      isMissingSchemaError(new Error("Failed query", { cause: new Error("no such table: media") }))
    ).toBe(true);
    expect(isMissingSchemaError(new Error('relation "users" does not exist'))).toBe(true);
    expect(isMissingSchemaError(new Error("UNIQUE constraint failed"))).toBe(false);
  });
});

describe("pruneEnquiries", () => {
  it("deletes enquiries older than the retention window and keeps recent ones", async () => {
    const context = { internal: true, skipRevalidate: true };
    const create = (name: string) =>
      temp.payload.create({
        collection: "enquiries",
        data: { source: "contact", name, phone: "9876543210" },
        overrideAccess: true,
        context,
      });

    const old = await create("Old lead");
    const recent = await create("Recent lead");

    const backdated = new Date();
    backdated.setMonth(backdated.getMonth() - 25);
    // createdAt is managed by Payload, so backdate it at the database layer.
    await temp.payload.db.updateOne({
      collection: "enquiries",
      id: old.id,
      data: { createdAt: backdated.toISOString() },
    });

    await expect(pruneEnquiries(temp.payload, 24)).resolves.toBe(1);

    const left = await temp.payload.find({ collection: "enquiries", overrideAccess: true });
    expect(left.docs.map((doc) => doc.id)).toEqual([recent.id]);
  });

  it("rejects a retention window that is not a positive whole number", async () => {
    await expect(pruneEnquiries(temp.payload, 0)).rejects.toThrow(/positive/);
  });
});
