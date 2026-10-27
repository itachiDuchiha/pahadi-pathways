import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { withTempPayload } from "@/cms/test/withTempPayload";

const temp = withTempPayload();

vi.mock("./client", () => ({ getPayloadClient: async () => temp.payload }));

const { storeEnquiry } = await import("./enquiries");

const quiet = { internal: true, skipRevalidate: true };
let packageId = 0;

beforeEach(async () => {
  const data = await sharp({ create: { width: 4, height: 4, channels: 3, background: "#336699" } })
    .png()
    .toBuffer();
  const image = await temp.payload.create({
    collection: "media",
    data: { alt: "Test image" },
    file: { data, mimetype: "image/png", name: "test.png", size: data.length },
    overrideAccess: true,
    context: quiet,
  });
  const pkg = await temp.payload.create({
    collection: "packages",
    data: {
      slug: "shimla-escape",
      title: "Shimla Escape",
      image: image.id,
      duration: "2N / 3D",
      rating: 5,
      pickup: "Chandigarh",
      pricing: { basePricePerAdult: 12000 },
      itinerary: [{ item: "Shimla" }],
      includes: [{ item: "Hotels" }],
      _status: "published",
    },
    overrideAccess: true,
    context: quiet,
  });
  packageId = pkg.id;
});

afterEach(() => {
  vi.restoreAllMocks();
});

async function stored(id: number | string) {
  return temp.payload.findByID({ collection: "enquiries", id, depth: 0, overrideAccess: true });
}

describe("storeEnquiry", () => {
  it("stores a trip enquiry with its trip fields", async () => {
    const result = await storeEnquiry({
      source: "trip",
      name: "Asha",
      phone: "9876543210",
      email: "asha@example.com",
      travelDate: "2026-12-01",
      destination: "spiti",
      adults: 2,
      children: 1,
      budgetPerPerson: 25000,
      message: "Window seats",
      website: "",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await stored(result.id);
    expect(doc).toMatchObject({
      source: "trip",
      name: "Asha",
      phone: "9876543210",
      email: "asha@example.com",
      destination: "spiti",
      adults: 2,
      children: 1,
      budgetPerPerson: 25000,
      message: "Window seats",
    });
    expect(doc.travelDate?.slice(0, 10)).toBe("2026-12-01");
    expect(doc.package ?? null).toBeNull();
  });

  it("stores a contact enquiry with only the contact fields", async () => {
    const result = await storeEnquiry({
      source: "contact",
      name: "Ravi",
      phone: "+91 75596 97919",
      message: "Hello",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await stored(result.id);
    expect(doc).toMatchObject({ source: "contact", name: "Ravi", phone: "+91 75596 97919", message: "Hello" });
    expect(doc.email ?? null).toBeNull();
    expect(doc.adults ?? null).toBeNull();
    expect(doc.selections?.stay ?? null).toBeNull();
  });

  it("stores a package enquiry with its package, selections and server price", async () => {
    const result = await storeEnquiry({
      source: "package",
      name: "Meera",
      phone: "9876543210",
      slug: "shimla-escape",
      adults: 2,
      childAges: [3, 7],
      stay: "Premium",
      meals: "Breakfast Only (CP)",
      vehicle: "Sedan",
      price: { packageCost: 48654, gst: 2433, gstPercent: 5, estimatedTotal: 51087 },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await stored(result.id);
    expect(doc).toMatchObject({
      source: "package",
      name: "Meera",
      adults: 2,
      package: packageId,
      selections: {
        stay: "Premium",
        meals: "Breakfast Only (CP)",
        vehicle: "Sedan",
        childAges: [{ age: 3 }, { age: 7 }],
      },
      computedPrice: { packageCost: 48654, gst: 2433, gstPercent: 5, estimatedTotal: 51087 },
    });
  });

  it("returns an error instead of throwing when the write fails", async () => {
    vi.spyOn(temp.payload, "create").mockRejectedValueOnce(new Error("disk full"));

    await expect(
      storeEnquiry({ source: "contact", name: "Ravi", phone: "9876543210" })
    ).resolves.toEqual({ ok: false, error: "disk full" });
  });
});
