import { describe, expect, it } from "vitest";

import { enquirySchema, packageEnquirySchema, tripEnquirySchema } from "./schema";

const trip = {
  source: "trip",
  name: "Asha",
  phone: "+91 75596 97919",
  email: "asha@example.com",
  travelDate: "2026-12-01",
  destination: "spiti",
  adults: 2,
  children: 1,
  budgetPerPerson: 40000,
  message: "Window seats please",
  website: "",
};

const pkg = {
  source: "package",
  slug: "shimla-manali-getaway",
  name: "Asha",
  phone: "9876543210",
  email: "",
  travelDate: "",
  adults: 2,
  childAges: [4, 8],
  stay: "Deluxe",
  meals: "Breakfast + Dinner (MAP)",
  vehicle: "Sedan",
  website: "",
};

describe("enquirySchema", () => {
  it("parses a valid trip payload", () => {
    const result = enquirySchema.safeParse(trip);
    expect(result.success).toBe(true);
  });

  it("rejects 16 adults on a trip", () => {
    expect(tripEnquirySchema.safeParse({ ...trip, adults: 16 }).success).toBe(false);
  });

  it("rejects a budget below the minimum", () => {
    expect(
      tripEnquirySchema.safeParse({ ...trip, budgetPerPerson: 5000 }).success
    ).toBe(false);
  });

  it("rejects an impossible calendar date", () => {
    expect(
      tripEnquirySchema.safeParse({ ...trip, travelDate: "2026-02-30" }).success
    ).toBe(false);
  });

  it("rejects a phone number with fewer than 7 digits", () => {
    expect(enquirySchema.safeParse({ ...trip, phone: "12-34-56" }).success).toBe(false);
  });

  it("parses a contact payload with only name, phone and source", () => {
    const result = enquirySchema.safeParse({
      source: "contact",
      name: "Asha",
      phone: "9876543210",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown package slug", () => {
    expect(enquirySchema.safeParse({ ...pkg, slug: "nope" }).success).toBe(false);
  });

  it("rejects a stay label that is not in the option table", () => {
    expect(enquirySchema.safeParse({ ...pkg, stay: "Palace" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(
      enquirySchema.safeParse({ ...trip, website: "http://spam" }).success
    ).toBe(false);
  });

  it("strips client-supplied prices from a package payload", () => {
    const result = packageEnquirySchema.safeParse({
      ...pkg,
      packageCost: 1,
      gst: 0,
      estimatedTotal: 1,
    });

    expect(result.success).toBe(true);
    expect(result.data).not.toHaveProperty("estimatedTotal");
    expect(result.data).not.toHaveProperty("packageCost");
    expect(result.data).not.toHaveProperty("gst");
  });
});
