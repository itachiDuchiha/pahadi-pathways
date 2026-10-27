import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Payload, RequiredDataFromCollectionSlug } from "payload";

import { ensureAdmin, type EnsureAdminResult } from "../bootstrap/ensureAdmin";
import { isMissingSchemaError } from "../bootstrap/schema";
import { DESTINATION_CATEGORIES } from "../collections/Destinations";
import { MIN_SECRET_LENGTH } from "../config/security";
import type { Destination as DestinationDoc } from "../payload-types";
import { allDestinations, type Destination } from "./destinations";
import { experiences } from "./experiences";
import { galleryItems } from "./gallery";
import { mediaManifest } from "./media-manifest";
import { packages, type PackageContent } from "./packages";
import { packageOptionOverrides, packageVehicleRates, pricingSettings } from "./pricing";
import { legalFill, legalSettings } from "./legal";
import { notificationFill, notificationSettings } from "./notifications";
import { siteSettings } from "./site";
import { testimonials } from "./testimonials";
import { parsePackagePrice } from "@/lib/pricing";

export { isMissingSchemaError };

type Env = Readonly<Record<string, string | undefined>>;

export type SeedCollection =
  | "media"
  | "packages"
  | "destinations"
  | "testimonials"
  | "gallery-items"
  | "experiences";
export type SeedGlobal = "pricing-settings" | "site-settings" | "legal-settings" | "notification-settings";
export type SeedTarget = SeedCollection | SeedGlobal;

export type SeedOptions = {
  /** Skip the Next cache revalidation hooks (always true outside a Next request). */
  skipRevalidate?: boolean;
  /** Read for `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`; defaults to `process.env`. */
  env?: Env;
  /** Directory the manifest's public paths resolve against; defaults to `./public`. */
  publicDir?: string;
  /**
   * Upsert every fixture by its key, restoring fixture values (alt text and
   * globals included) and recreating deleted documents. Off by default.
   */
  overwrite?: boolean;
};

export type SeedResult = {
  created: Record<SeedTarget, number>;
  updated: Record<SeedTarget, number>;
  /** Fixture items left alone because the target already holds content. */
  skipped: Record<SeedTarget, number>;
  /** Media documents that back the manifest after the run. */
  media: number;
  admin: EnsureAdminResult;
};

/** Slugs whose page is hand-built in code rather than the shared template. */
const DEDICATED_DESTINATIONS = new Set(["manali", "shimla", "spiti-valley"]);

const MIME_TYPES: Readonly<Record<string, string>> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
};

/** Refuses to seed without the variables the Payload config requires. */
export function assertSeedEnv(env: Env): void {
  if ((env.PAYLOAD_SECRET ?? "").length < MIN_SECRET_LENGTH) {
    throw new Error(
      `PAYLOAD_SECRET is required and must be at least ${MIN_SECRET_LENGTH} characters`
    );
  }
  if (!env.DATABASE_URL?.trim()) throw new Error("DATABASE_URL is required");
}

/**
 * The Media filename for a public path. Several images share a basename
 * (`packages/manali.webp`, `packages/heroes/manali.webp`), so the folder
 * becomes part of the name: `/images/packages/heroes/manali.webp` →
 * `packages-heroes-manali.webp`.
 */
export function mediaFilename(publicPath: string): string {
  return publicPath.replace(/^\/images\//, "").split("/").join("-");
}

function emptyCounts(): Record<SeedTarget, number> {
  return {
    media: 0,
    packages: 0,
    destinations: 0,
    testimonials: 0,
    "gallery-items": 0,
    experiences: 0,
    "pricing-settings": 0,
    "site-settings": 0,
    "legal-settings": 0,
    "notification-settings": 0,
  };
}

function rows(list: readonly string[] | undefined): { item: string }[] | undefined {
  return list?.map((item) => ({ item }));
}

function isDestinationCategory(value: string): value is DestinationDoc["category"] {
  return (DESTINATION_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Seeds the fixtures under `src/cms/seed` as published content, uploading
 * the images under `public/images` into Media first, and creates the first
 * admin only when no user exists.
 *
 * Default mode (what deploys run) never touches editor content: a content
 * collection is seeded only while it is empty, media are uploaded only
 * while the Media collection is empty, `pricing-settings` is written only
 * while it has no stay options, `site-settings` only while it has no
 * phone number; `legal-settings` only gets its still-empty fields filled,
 * and `notification-settings` only a never-set email switch (turned on).
 * Everything else is reported under `skipped`. A deleted or renamed
 * document is therefore never brought back.
 *
 * `overwrite: true` upserts every fixture by its key (slug, name + tour,
 * title, filename), restoring fixture values including alt text and every
 * global, and recreating deleted documents.
 */
export async function seed(payload: Payload, options: SeedOptions = {}): Promise<SeedResult> {
  try {
    return await runSeed(payload, options);
  } catch (error) {
    if (isMissingSchemaError(error)) {
      throw new Error("Database schema is missing. Run `npm run payload migrate` first.", {
        cause: error,
      });
    }
    throw error;
  }
}

async function runSeed(payload: Payload, options: SeedOptions): Promise<SeedResult> {
  const env = options.env ?? process.env;
  const publicDir = options.publicDir ?? path.resolve(process.cwd(), "public");
  const overwrite = options.overwrite ?? false;
  const context = { internal: true, skipRevalidate: options.skipRevalidate ?? true };
  const created = emptyCounts();
  const updated = emptyCounts();
  const skipped = emptyCounts();

  const admin = await ensureAdmin(payload, env);

  // ---- Media ---------------------------------------------------------
  const existingMedia = await payload.find({
    collection: "media",
    limit: 0,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  });
  const mediaByFilename = new Map(existingMedia.docs.map((doc) => [doc.filename, doc]));
  const manifest = Object.entries(mediaManifest);

  if (!overwrite && existingMedia.docs.length > 0) {
    skipped.media = manifest.length;
  } else {
    for (const [publicPath, alt] of manifest) {
      const filename = mediaFilename(publicPath);
      const existing = mediaByFilename.get(filename);

      if (existing) {
        if (existing.alt !== alt) {
          await payload.update({
            collection: "media",
            id: existing.id,
            data: { alt },
            overrideAccess: true,
            context,
          });
          updated.media++;
        } else {
          skipped.media++;
        }
        continue;
      }

      const mimetype = MIME_TYPES[path.extname(publicPath).toLowerCase()];
      if (!mimetype) throw new Error(`Unsupported image type: ${publicPath}`);
      const data = await readFile(path.join(publicDir, publicPath));
      const doc = await payload.create({
        collection: "media",
        data: { alt },
        file: { data, mimetype, name: filename, size: data.length },
        overwriteExistingFiles: true,
        overrideAccess: true,
        context,
      });
      mediaByFilename.set(filename, doc);
      created.media++;
    }
  }

  /** Resolved only when a collection is actually written. */
  function mediaId(publicPath: string): number {
    const filename = mediaFilename(publicPath);
    const doc = mediaByFilename.get(filename);
    if (!doc) {
      throw new Error(
        `Media "${filename}" (for ${publicPath}) is missing from the media collection. ` +
          "Upload it or run `npm run cms:seed -- --overwrite`."
      );
    }
    return doc.id;
  }

  // ---- Collections ---------------------------------------------------
  const read = { limit: 0, depth: 0, pagination: false, overrideAccess: true } as const;
  const write = { draft: false, overrideAccess: true, context } as const;

  async function upsert<T>(
    target: Exclude<SeedCollection, "media">,
    fixtureCount: number,
    build: () => readonly T[],
    keyOf: (item: T) => string,
    ops: {
      existing: readonly { id: number; key: string }[];
      create(data: T): Promise<unknown>;
      update(id: number, data: T): Promise<unknown>;
    }
  ): Promise<void> {
    if (!overwrite && ops.existing.length > 0) {
      skipped[target] = fixtureCount;
      return;
    }

    const idsByKey = new Map(ops.existing.map(({ id, key }) => [key, id]));

    for (const item of build()) {
      const id = idsByKey.get(keyOf(item));
      if (id === undefined) {
        await ops.create(item);
        created[target]++;
      } else {
        await ops.update(id, item);
        updated[target]++;
      }
    }
  }

  await upsert(
    "packages",
    packages.length,
    () => packages.map((pkg) => packageData(pkg, mediaId)),
    (item) => item.slug,
    {
      existing: (await payload.find({ collection: "packages", ...read })).docs.map((doc) => ({
        id: doc.id,
        key: doc.slug,
      })),
      create: (data) => payload.create({ collection: "packages", data, ...write }),
      update: (id, data) => payload.update({ collection: "packages", id, data, ...write }),
    }
  );

  await upsert(
    "destinations",
    allDestinations.length,
    () => allDestinations.map((destination) => destinationData(destination, mediaId)),
    (item) => item.slug,
    {
      existing: (await payload.find({ collection: "destinations", ...read })).docs.map((doc) => ({
        id: doc.id,
        key: doc.slug,
      })),
      create: (data) => payload.create({ collection: "destinations", data, ...write }),
      update: (id, data) => payload.update({ collection: "destinations", id, data, ...write }),
    }
  );

  const testimonialKey = (item: { name: string; tour: string }) => `${item.name}\u0000${item.tour}`;
  await upsert(
    "testimonials",
    testimonials.length,
    () => testimonials.map(({ name, city, tour, review, rating }) => ({ name, city, tour, review, rating })),
    testimonialKey,
    {
      existing: (await payload.find({ collection: "testimonials", ...read })).docs.map((doc) => ({
        id: doc.id,
        key: testimonialKey(doc),
      })),
      create: (data) => payload.create({ collection: "testimonials", data, ...write }),
      update: (id, data) => payload.update({ collection: "testimonials", id, data, ...write }),
    }
  );

  await upsert(
    "gallery-items",
    galleryItems.length,
    () =>
      galleryItems.map(({ title, category, location, size, image }, order) => ({
        title,
        category,
        location,
        size,
        image: mediaId(image),
        order,
      })),
    (item) => item.title,
    {
      existing: (await payload.find({ collection: "gallery-items", ...read })).docs.map((doc) => ({
        id: doc.id,
        key: doc.title,
      })),
      create: (data) => payload.create({ collection: "gallery-items", data, ...write }),
      update: (id, data) => payload.update({ collection: "gallery-items", id, data, ...write }),
    }
  );

  await upsert(
    "experiences",
    experiences.length,
    () =>
      experiences.map(({ title, description, icon, image }, order) => ({
        title,
        description,
        icon,
        image: mediaId(image),
        order,
      })),
    (item) => item.title,
    {
      existing: (await payload.find({ collection: "experiences", ...read })).docs.map((doc) => ({
        id: doc.id,
        key: doc.title,
      })),
      create: (data) => payload.create({ collection: "experiences", data, ...write }),
      update: (id, data) => payload.update({ collection: "experiences", id, data, ...write }),
    }
  );

  // ---- Globals -------------------------------------------------------
  const pricing = await payload.findGlobal({ slug: "pricing-settings", depth: 0, overrideAccess: true });
  if (overwrite || !pricing.stayOptions?.length) {
    await payload.updateGlobal({
      slug: "pricing-settings",
      data: pricingSettings,
      overrideAccess: true,
      context,
    });
    updated["pricing-settings"]++;
  } else {
    skipped["pricing-settings"]++;
  }

  const siteDoc = await payload.findGlobal({ slug: "site-settings", depth: 0, overrideAccess: true });
  if (overwrite || !siteDoc.phoneE164) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: siteSettings,
      overrideAccess: true,
      context,
    });
    updated["site-settings"]++;
  } else {
    skipped["site-settings"]++;
  }

  const legalDoc = await payload.findGlobal({ slug: "legal-settings", depth: 0, overrideAccess: true });
  const legalData = overwrite ? legalSettings : legalFill(legalDoc);
  if (legalData) {
    await payload.updateGlobal({
      slug: "legal-settings",
      data: legalData,
      overrideAccess: true,
      context,
    });
    updated["legal-settings"]++;
  } else {
    skipped["legal-settings"]++;
  }

  const notificationDoc = await payload.findGlobal({ slug: "notification-settings", depth: 0, overrideAccess: true });
  const notificationData = overwrite ? notificationSettings : notificationFill(notificationDoc);
  if (notificationData) {
    await payload.updateGlobal({
      slug: "notification-settings",
      data: notificationData,
      overrideAccess: true,
      context,
    });
    updated["notification-settings"]++;
  } else {
    skipped["notification-settings"]++;
  }

  const media = manifest.filter(([publicPath]) => mediaByFilename.has(mediaFilename(publicPath))).length;

  return { created, updated, skipped, media, admin };
}

function packageData(
  pkg: PackageContent,
  mediaId: (publicPath: string) => number
): RequiredDataFromCollectionSlug<"packages"> {
  return {
    slug: pkg.slug,
    title: pkg.title,
    image: mediaId(pkg.image),
    heroImage: pkg.heroImage ? mediaId(pkg.heroImage) : null,
    duration: pkg.duration,
    rating: pkg.rating,
    pickup: pkg.pickup,
    popular: pkg.popular ?? false,
    pricing: {
      basePricePerAdult: parsePackagePrice(pkg.price),
      vehicleRates: packageVehicleRates[pkg.slug] ?? {},
      stayOptions: packageOptionOverrides[pkg.slug]?.stayOptions ?? [],
      mealOptions: packageOptionOverrides[pkg.slug]?.mealOptions ?? [],
    },
    summary: pkg.summary,
    overview: pkg.overview,
    itinerary: rows(pkg.itinerary) ?? [],
    hiddenItinerary: rows(pkg.hiddenItinerary),
    includes: rows(pkg.includes) ?? [],
    exclusions: rows(pkg.exclusions),
    stayPlan: rows(pkg.stayPlan),
    highlights: rows(pkg.highlights),
    idealFor: rows(pkg.idealFor),
    travelNote: pkg.travelNote,
    bestTime: pkg.bestTime,
    vehicle: pkg.vehicle,
    tourType: pkg.tourType,
    maxAltitude: pkg.maxAltitude,
    faqs: pkg.faqs?.map(({ question, answer }) => ({ question, answer })),
    itineraryDays: pkg.itineraryDays?.map((day) => ({
      day: day.day,
      title: day.title,
      start: day.start,
      end: day.end,
      stay: day.stay,
      description: day.description,
      places: rows(day.places),
      details: day.details?.map(({ title, description }) => ({ title, description })),
    })),
    _status: "published",
  };
}

function destinationData(
  destination: Destination,
  mediaId: (publicPath: string) => number
): RequiredDataFromCollectionSlug<"destinations"> {
  if (!isDestinationCategory(destination.category)) {
    throw new Error(`Unknown destination category: ${destination.category}`);
  }

  return {
    slug: destination.slug,
    name: destination.name,
    subtitle: destination.subtitle,
    description: destination.description,
    fullDescription: destination.fullDescription,
    image: mediaId(destination.image),
    gallery: destination.gallery?.map(mediaId) ?? [],
    category: destination.category,
    layout: DEDICATED_DESTINATIONS.has(destination.slug) ? "dedicated" : "shared",
    _status: "published",
  };
}

// ---- Enquiry retention -------------------------------------------------

/**
 * Deletes enquiries created more than `olderThanMonths` months ago and
 * returns how many were removed.
 */
export async function pruneEnquiries(
  payload: Payload,
  olderThanMonths = 24,
  now: Date = new Date()
): Promise<number> {
  if (!Number.isInteger(olderThanMonths) || olderThanMonths < 1) {
    throw new Error("olderThanMonths must be a positive whole number");
  }

  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - olderThanMonths);

  const result = await payload.delete({
    collection: "enquiries",
    where: { createdAt: { less_than: cutoff.toISOString() } },
    overrideAccess: true,
    context: { internal: true, skipRevalidate: true },
  });

  if (result.errors.length > 0) {
    throw new Error(`Failed to delete ${result.errors.length} enquiries`);
  }

  return result.docs.length;
}
