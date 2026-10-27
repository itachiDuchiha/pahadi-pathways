import { NotFound } from "payload";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { isEditorOrAdmin } from "../access";
import { validateUniqueVehicleKeys } from "../globals/PricingSettings";
import { withTempPayload } from "../test/withTempPayload";

import { Destinations } from "./Destinations";
import { Packages } from "./Packages";

const temp = withTempPayload();

/** Writes made by the tests never touch Next's cache. */
const context = { skipRevalidate: true };

type Role = "admin" | "editor";

async function makeUser(role: Role) {
  return temp.payload.create({
    collection: "users",
    data: { email: `${role}-${Date.now()}@example.test`, password: "a-long-test-password", role },
    overrideAccess: true,
    context: { ...context, internal: true },
  });
}

async function makeImage() {
  const data = await sharp({
    create: { width: 4, height: 4, channels: 3, background: "#336699" },
  })
    .png()
    .toBuffer();

  return temp.payload.create({
    collection: "media",
    data: { alt: "Test image" },
    file: { data, mimetype: "image/png", name: "test.png", size: data.length },
    overrideAccess: true,
    context,
  });
}

async function makePackage(slug: string, status: "draft" | "published") {
  const image = await makeImage();

  return temp.payload.create({
    collection: "packages",
    data: {
      slug,
      title: `Package ${slug}`,
      image: image.id,
      duration: "5 Nights / 6 Days",
      rating: 4.8,
      pickup: "Chandigarh",
      pricing: { basePricePerAdult: 18999 },
      itinerary: [{ item: "Shimla" }],
      includes: [{ item: "Hotels" }],
      _status: status,
    },
    draft: status === "draft",
    overrideAccess: true,
    context,
  });
}

describe("content access (Local API, overrideAccess: false)", () => {
  it("hides a draft package from anonymous reads", async () => {
    await makePackage("draft-only", "draft");

    const result = await temp.payload.find({
      collection: "packages",
      overrideAccess: false,
    });

    expect(result.totalDocs).toBe(0);
  });

  it("shows a published package to anonymous reads", async () => {
    await makePackage("live-one", "published");
    await makePackage("hidden-one", "draft");

    const result = await temp.payload.find({
      collection: "packages",
      overrideAccess: false,
    });

    expect(result.docs.map((doc) => doc.slug)).toEqual(["live-one"]);
  });

  it("hides a draft-only package from anonymous reads that ask for drafts", async () => {
    await makePackage("draft-only", "draft");

    const result = await temp.payload.find({
      collection: "packages",
      draft: true,
      overrideAccess: false,
    });

    expect(result.totalDocs).toBe(0);
  });

  it("never shows a newer draft of a published package to anonymous reads", async () => {
    const published = await makePackage("live-one", "published");
    await temp.payload.update({
      collection: "packages",
      id: published.id,
      data: { title: "SECRET DRAFT" },
      draft: true,
      overrideAccess: true,
      context,
    });

    const found = await temp.payload.find({
      collection: "packages",
      draft: true,
      overrideAccess: false,
    });
    expect(found.docs.map((doc) => doc.title)).not.toContain("SECRET DRAFT");

    const byId = await temp.payload
      .findByID({ collection: "packages", id: published.id, draft: true, overrideAccess: false })
      .then(
        (doc) => doc.title,
        (error: unknown) => (error instanceof NotFound ? "not-found" : Promise.reject(error))
      );
    expect(["Package live-one", "not-found"]).toContain(byId);
  });

  it("keeps package versions unreadable without a user", async () => {
    await makePackage("live-one", "published");

    await expect(
      temp.payload.findVersions({ collection: "packages", overrideAccess: false })
    ).rejects.toThrow(/not allowed/i);
  });

  it("limits version reads to editors and admins on drafted collections", () => {
    expect(Packages.access?.readVersions).toBe(isEditorOrAdmin);
    expect(Destinations.access?.readVersions).toBe(isEditorOrAdmin);
  });

  it("shows a draft package to a signed-in editor reading drafts", async () => {
    await makePackage("draft-only", "draft");
    const editor = await makeUser("editor");

    const result = await temp.payload.find({
      collection: "packages",
      draft: true,
      overrideAccess: false,
      user: editor,
    });

    expect(result.docs.map((doc) => doc.slug)).toEqual(["draft-only"]);
  });

  it("rejects an invalid slug on create", async () => {
    await expect(makePackage("Not A Slug", "published")).rejects.toThrow(/slug/i);
  });

  it("rejects an invalid slug on a draft save too", async () => {
    await expect(makePackage("Not A Slug", "draft")).rejects.toThrow(/slug/i);
  });

  it("forbids anonymous writes to packages and testimonials", async () => {
    await expect(
      temp.payload.create({
        collection: "testimonials",
        data: { name: "A", city: "B", tour: "C", review: "D", rating: 5 },
        overrideAccess: false,
        context,
      })
    ).rejects.toThrow(/not allowed/i);

    await expect(
      temp.payload.create({
        collection: "packages",
        data: { slug: "x", title: "x", _status: "draft" },
        draft: true,
        overrideAccess: false,
        context,
      })
    ).rejects.toThrow(/not allowed/i);
  });

  it("lets an editor create a testimonial that anyone can read", async () => {
    const editor = await makeUser("editor");

    await temp.payload.create({
      collection: "testimonials",
      data: { name: "Asha", city: "Pune", tour: "Spiti", review: "Lovely", rating: 5 },
      overrideAccess: false,
      user: editor,
      context,
    });

    const result = await temp.payload.find({
      collection: "testimonials",
      overrideAccess: false,
    });

    expect(result.totalDocs).toBe(1);
  });

  it("accepts a gallery item without a caption", async () => {
    const image = await makeImage();

    const item = await temp.payload.create({
      collection: "gallery-items",
      data: {
        title: "Spiti Valley",
        category: "Landscapes",
        location: "Spiti",
        size: "large",
        order: 1,
        image: image.id,
      },
      overrideAccess: true,
      context,
    });

    expect(item.caption ?? null).toBeNull();
  });

  it("defaults a destination layout to shared", async () => {
    const image = await makeImage();

    const destination = await temp.payload.create({
      collection: "destinations",
      data: {
        slug: "kasol",
        name: "Kasol",
        subtitle: "Parvati Valley",
        description: "Short",
        fullDescription: "Long",
        image: image.id,
        category: "Hidden Himachal",
        _status: "published",
      },
      overrideAccess: true,
      context,
    });

    expect(destination.layout).toBe("shared");
  });

  it("keeps users unreadable without a user", async () => {
    await expect(
      temp.payload.find({ collection: "users", overrideAccess: false })
    ).rejects.toThrow(/not allowed/i);
  });
});

describe("global access", () => {
  it("lets anyone read both globals", async () => {
    const pricing = await temp.payload.findGlobal({
      slug: "pricing-settings",
      overrideAccess: false,
    });
    const siteSettings = await temp.payload.findGlobal({
      slug: "site-settings",
      overrideAccess: false,
    });

    expect(pricing.gstPercent).toBe(5);
    expect(pricing.childFreeUnderAge).toBe(5);
    expect(pricing.childPercentOfAdult).toBe(25);
    expect(siteSettings).toBeDefined();
  });

  it("forbids anonymous updates to either global", async () => {
    await expect(
      temp.payload.updateGlobal({
        slug: "pricing-settings",
        data: { gstPercent: 0 },
        overrideAccess: false,
        context,
      })
    ).rejects.toThrow(/not allowed/i);

    await expect(
      temp.payload.updateGlobal({
        slug: "site-settings",
        data: { tagline: "Hacked" },
        overrideAccess: false,
        context,
      })
    ).rejects.toThrow(/not allowed/i);
  });

  it("lets an editor update pricing but not site settings", async () => {
    const editor = await makeUser("editor");

    const pricing = await temp.payload.updateGlobal({
      slug: "pricing-settings",
      data: { gstPercent: 12 },
      overrideAccess: false,
      user: editor,
      context,
    });
    expect(pricing.gstPercent).toBe(12);

    await expect(
      temp.payload.updateGlobal({
        slug: "site-settings",
        data: { tagline: "Edited" },
        overrideAccess: false,
        user: editor,
        context,
      })
    ).rejects.toThrow(/not allowed/i);
  });

  it("starts every test from the default global values", async () => {
    const pricing = await temp.payload.findGlobal({ slug: "pricing-settings" });
    const siteSettings = await temp.payload.findGlobal({ slug: "site-settings" });

    expect(pricing.gstPercent).toBe(5);
    expect(pricing.vehicleOptions ?? []).toHaveLength(0);
    expect(siteSettings.tagline ?? null).toBeNull();
  });

  it("stores an optional Spiti per-day upgrade on a vehicle option", async () => {
    const pricing = await temp.payload.updateGlobal({
      slug: "pricing-settings",
      data: {
        vehicleOptions: [
          { label: "Sedan", key: "sedan", perDayUpgrade: 0, perDayUpgradeSpiti: 0 },
          { label: "Innova Crysta or similar", key: "crysta", perDayUpgrade: 2500, perDayUpgradeSpiti: 3500 },
          { label: "Ertiga / Rumion or similar", key: "ertiga", perDayUpgrade: 1000 },
        ],
      },
      overrideAccess: true,
      context,
    });

    expect(pricing.vehicleOptions?.map((option) => option.perDayUpgradeSpiti ?? null)).toEqual([
      0,
      3500,
      null,
    ]);
  });

  it("rejects pricing settings that repeat a vehicle key", async () => {
    await expect(
      temp.payload.updateGlobal({
        slug: "pricing-settings",
        data: {
          vehicleOptions: [
            { label: "Sedan", key: "sedan", perDayUpgrade: 0 },
            { label: "Another sedan", key: "sedan", perDayUpgrade: 0 },
          ],
        },
        overrideAccess: true,
        context,
      })
    ).rejects.toThrow(/vehicle/i);
  });

  it("lets an admin update site settings", async () => {
    const admin = await makeUser("admin");

    const siteSettings = await temp.payload.updateGlobal({
      slug: "site-settings",
      data: { tagline: "Handcrafted Himalayan Journeys" },
      overrideAccess: false,
      user: admin,
      context,
    });

    expect(siteSettings.tagline).toBe("Handcrafted Himalayan Journeys");
  });
});

describe("validateUniqueVehicleKeys", () => {
  it("accepts distinct keys and an empty list", () => {
    expect(validateUniqueVehicleKeys([{ key: "sedan" }, { key: "crysta" }])).toBe(true);
    expect(validateUniqueVehicleKeys(undefined)).toBe(true);
    expect(validateUniqueVehicleKeys([])).toBe(true);
  });

  it("names the repeated key", () => {
    expect(validateUniqueVehicleKeys([{ key: "ertiga" }, { key: "ertiga" }])).toMatch(/ertiga/);
  });
});
