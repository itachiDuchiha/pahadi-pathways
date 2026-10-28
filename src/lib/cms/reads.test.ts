import sharp from "sharp";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";
import { pricingSettings } from "@/cms/seed/pricing";
import { site } from "@/config/site";

const temp = withTempPayload();

// The read layer resolves its client lazily, so it can use the temp instance.
vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { getPackageBySlug, getPackages } = await import("./packages");
const { getDestinationBySlug, getDestinations } = await import("./destinations");
const { getTestimonials } = await import("./testimonials");
const { getGalleryItems } = await import("./gallery");
const { getExperiences } = await import("./experiences");
const { getSiteSettings } = await import("./site");
const { getPricingTables } = await import("./pricing-tables");

const context = { internal: true, skipRevalidate: true };
let imageId = 0;

beforeEach(async () => {
  const data = await sharp({
    create: { width: 40, height: 30, channels: 3, background: "#336699" },
  })
    .png()
    .toBuffer();
  const image = await temp.payload.create({
    collection: "media",
    data: { alt: "Test image" },
    file: { data, mimetype: "image/png", name: "test-image.png", size: data.length },
    overrideAccess: true,
    context,
  });
  imageId = image.id;
});

function packageData(slug: string, title: string, popular = false) {
  return {
    slug,
    title,
    image: imageId,
    duration: "2N / 3D",
    rating: 5,
    pickup: "Chandigarh",
    popular,
    pricing: { basePricePerAdult: 12000 },
    itinerary: [{ item: "2N Shimla" }],
    includes: [{ item: "Breakfast" }],
  };
}

async function createPackage(slug: string, title: string, status: "draft" | "published", popular = false) {
  return temp.payload.create({
    collection: "packages",
    data: { ...packageData(slug, title, popular), _status: status },
    draft: status === "draft",
    overrideAccess: true,
    context,
  });
}

async function createDestination(
  slug: string,
  category: "Featured Journeys" | "Along the Way" | "Hidden Himachal" | "Culture & Soul",
  status: "draft" | "published" = "published"
) {
  return temp.payload.create({
    collection: "destinations",
    data: {
      slug,
      name: slug,
      subtitle: "Subtitle",
      description: "Description",
      fullDescription: "Full description",
      image: imageId,
      category,
      layout: "shared",
      _status: status,
    },
    draft: status === "draft",
    overrideAccess: true,
    context,
  });
}

describe("getPackages", () => {
  it("returns published packages and never drafts", async () => {
    await createPackage("published-trip", "Published Trip", "published");
    await createPackage("draft-trip", "Draft Trip", "draft");

    const slugs = (await getPackages()).map((pkg) => pkg.slug);

    expect(slugs).toContain("published-trip");
    expect(slugs).not.toContain("draft-trip");
    expect(await getPackageBySlug("draft-trip")).toBeNull();
    expect(await getPackageBySlug("missing")).toBeNull();
  });

  it("serves the published version while a newer draft is pending", async () => {
    const doc = await createPackage("live-trip", "Live Title", "published");
    await temp.payload.update({
      collection: "packages",
      id: doc.id,
      data: { title: "Unpublished Title" },
      draft: true,
      overrideAccess: true,
      context,
    });

    expect((await getPackageBySlug("live-trip"))?.title).toBe("Live Title");
    expect((await getPackages()).map((pkg) => pkg.title)).toEqual(["Live Title"]);
  });

  it("maps media to local paths and the base price to the display price", async () => {
    await createPackage("priced-trip", "Priced Trip", "published");

    const pkg = await getPackageBySlug("priced-trip");

    expect(pkg?.price).toBe("₹12,000");
    expect(pkg?.pricing).toEqual({ basePricePerAdult: 12000 });
    expect(pkg?.image).toMatch(/^\/api\/media\/file\/test-image[^/]*\.webp$/);
  });

  it("lists popular packages first, then in creation order", async () => {
    await createPackage("b-trip", "B Trip", "published");
    await createPackage("a-trip", "A Trip", "published");
    await createPackage("c-trip", "C Trip", "published", true);

    expect((await getPackages()).map((pkg) => pkg.slug)).toEqual(["c-trip", "b-trip", "a-trip"]);
  });
});

describe("getDestinations", () => {
  it("orders by category, then creation order, and hides drafts", async () => {
    await createDestination("tabo", "Culture & Soul");
    await createDestination("shimla", "Featured Journeys");
    await createDestination("kufri", "Along the Way");
    await createDestination("manali", "Featured Journeys");
    await createDestination("secret", "Hidden Himachal", "draft");

    expect((await getDestinations()).map((destination) => destination.slug)).toEqual([
      "shimla",
      "manali",
      "kufri",
      "tabo",
    ]);
    expect(await getDestinationBySlug("secret")).toBeNull();
    expect((await getDestinationBySlug("tabo"))?.gallery).toBeUndefined();
  });
});

describe("ordered collections", () => {
  it("returns testimonials, gallery items and experiences in their editorial order", async () => {
    for (const [name, order] of [["Second", 1], ["First", 0]] as const) {
      await temp.payload.create({
        collection: "testimonials",
        data: { name, city: "Delhi", tour: "Spiti", review: "Great", rating: 5 },
        overrideAccess: true,
        context,
      });
      await temp.payload.create({
        collection: "gallery-items",
        data: { kind: "image", title: name, category: "Landscapes", location: "Spiti", size: "normal", image: imageId, order },
        overrideAccess: true,
        context,
      });
      await temp.payload.create({
        collection: "experiences",
        data: { title: name, description: "Text", image: imageId, icon: "Star", order },
        overrideAccess: true,
        context,
      });
    }

    expect((await getTestimonials()).map((item) => item.name)).toEqual(["Second", "First"]);
    expect((await getGalleryItems()).map((item) => item.title)).toEqual(["First", "Second"]);
    expect((await getExperiences()).map((item) => item.title)).toEqual(["First", "Second"]);
  });
});

describe("globals", () => {
  it("merges site settings over the code fallbacks", async () => {
    expect(await getSiteSettings()).toEqual(site);

    await temp.payload.updateGlobal({
      slug: "site-settings",
      data: { email: "desk@example.com" },
      overrideAccess: true,
      context,
    });

    expect(await getSiteSettings()).toEqual({ ...site, email: "desk@example.com" });
  });

  it("returns an edited phone display and keeps every other value", async () => {
    await temp.payload.updateGlobal({
      slug: "site-settings",
      data: { phoneDisplay: "+91 00000 00000" },
      overrideAccess: true,
      context,
    });

    const settings = await getSiteSettings();

    expect(settings.phone.display).toBe("+91 00000 00000");
    expect(settings).toEqual({ ...site, phone: { ...site.phone, display: "+91 00000 00000" } });
  });

  it("reads the pricing tables", async () => {
    await temp.payload.updateGlobal({
      slug: "pricing-settings",
      data: pricingSettings,
      overrideAccess: true,
      context,
    });

    const tables = await getPricingTables();

    expect(tables.stayOptions.map((option) => option.label)).toEqual(["Deluxe", "Premium", "Luxury"]);
    expect(tables.gstPercent).toBe(5);
  });
});
