import sharp from "sharp";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";

import type { PreviewCollection } from "./preview";

const temp = withTempPayload();

// The read layer resolves its client lazily, so it can use the temp instance.
vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { getPackageBySlug } = await import("./packages");
const { getDestinationBySlug } = await import("./destinations");
const { getPreviewDocument, isPreviewCollection } = await import("./preview");

const context = { internal: true, skipRevalidate: true };
const password = "a-long-test-password";
let imageId = 0;

beforeEach(async () => {
  const data = await sharp({ create: { width: 40, height: 30, channels: 3, background: "#336699" } })
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

async function createPackage(slug: string, title: string, status: "draft" | "published") {
  return temp.payload.create({
    collection: "packages",
    data: {
      slug,
      title,
      image: imageId,
      duration: "2N / 3D",
      rating: 5,
      pickup: "Chandigarh",
      pricing: { basePricePerAdult: 12000 },
      itinerary: [{ item: "2N Shimla" }],
      includes: [{ item: "Breakfast" }],
      _status: status,
    },
    draft: status === "draft",
    overrideAccess: true,
    context,
  });
}

async function createDestination(slug: string, name: string) {
  return temp.payload.create({
    collection: "destinations",
    data: {
      slug,
      name,
      subtitle: "Subtitle",
      description: "Description",
      fullDescription: "Full description",
      image: imageId,
      category: "Featured Journeys",
      layout: "shared",
      _status: "published",
    },
    overrideAccess: true,
    context,
  });
}

/**
 * Request headers carrying a signed-in editor's admin cookie, as a browser
 * sends them for a same-origin request (Payload checks Sec-Fetch-Site).
 */
async function editorHeaders(): Promise<Headers> {
  const email = "editor@example.test";
  await temp.payload.create({
    collection: "users",
    data: { email, password, role: "editor" },
    overrideAccess: true,
    context,
  });
  const { token } = await temp.payload.login({ collection: "users", data: { email, password } });
  if (!token) throw new Error("login returned no token");
  return new Headers({ Cookie: `thc-token=${token}`, "Sec-Fetch-Site": "same-origin" });
}

describe("getPreviewDocument", () => {
  it("shows a signed-in editor the latest draft while visitors keep the published version", async () => {
    const doc = await createPackage("live-trip", "Live Title", "published");
    await temp.payload.update({
      collection: "packages",
      id: doc.id,
      data: { title: "Draft Title" },
      draft: true,
      overrideAccess: true,
      context,
    });

    expect(await getPreviewDocument("packages", "live-trip", new Headers())).toBeNull();

    const preview = await getPreviewDocument("packages", "live-trip", await editorHeaders());
    expect(preview).toMatchObject({ slug: "live-trip", title: "Draft Title" });

    expect((await getPackageBySlug("live-trip"))?.title).toBe("Live Title");
  });

  it("shows a never-published draft only to a signed-in editor", async () => {
    await createPackage("new-trip", "New Trip", "draft");

    expect(await getPreviewDocument("packages", "new-trip", new Headers())).toBeNull();
    expect(await getPreviewDocument("packages", "new-trip", await editorHeaders())).toMatchObject({
      title: "New Trip",
    });
    expect(await getPackageBySlug("new-trip")).toBeNull();
  });

  it("previews destination drafts", async () => {
    const doc = await createDestination("valley", "Valley");
    await temp.payload.update({
      collection: "destinations",
      id: doc.id,
      data: { name: "Draft Valley" },
      draft: true,
      overrideAccess: true,
      context,
    });

    expect(await getPreviewDocument("destinations", "valley", new Headers())).toBeNull();
    expect(await getPreviewDocument("destinations", "valley", await editorHeaders())).toMatchObject({
      name: "Draft Valley",
    });
    expect((await getDestinationBySlug("valley"))?.name).toBe("Valley");
  });

  it("returns null for an unknown slug, a forged cookie or a cross-site request", async () => {
    await createPackage("live-trip", "Live Title", "published");
    const headers = await editorHeaders();

    expect(await getPreviewDocument("packages", "missing", headers)).toBeNull();

    headers.set("Sec-Fetch-Site", "cross-site");
    expect(await getPreviewDocument("packages", "live-trip", headers)).toBeNull();
    expect(
      await getPreviewDocument("packages", "live-trip", new Headers({ Cookie: "thc-token=not-a-token", "Sec-Fetch-Site": "same-origin" }))
    ).toBeNull();
  });
});

describe("isPreviewCollection", () => {
  it("accepts only packages and destinations", () => {
    expect(isPreviewCollection("packages")).toBe(true);
    expect(isPreviewCollection("destinations")).toBe(true);
    expect(isPreviewCollection("gallery-items")).toBe(false);
    expect(isPreviewCollection("users")).toBe(false);
  });

  it("is a closed type", () => {
    // @ts-expect-error gallery items have no drafts to preview
    const collection: PreviewCollection = "gallery-items";
    expect(collection).toBe("gallery-items");
  });
});
