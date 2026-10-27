import type { Enquiry as EnquiryDoc } from "@/cms/payload-types";
import type { ContactEnquiry, PackageEnquiry, TripEnquiry } from "@/lib/enquiry/schema";
import type { PackagePrice } from "@/lib/pricing";

import { getPayloadClient } from "./client";

/** The price the server computed for a package enquiry; client totals are never stored. */
export type StoredPrice = Pick<PackagePrice, "packageCost" | "gst" | "gstPercent" | "estimatedTotal">;

/** A validated enquiry, plus the server-computed price for a package enquiry. */
export type StoredEnquiryInput =
  | TripEnquiry
  | ContactEnquiry
  | (PackageEnquiry & { price: StoredPrice });

export type StoreEnquiryResult = { ok: true; id: string | number } | { ok: false; error: string };

type EnquiryData = Omit<EnquiryDoc, "id" | "createdAt" | "updatedAt">;

/** Writes come from the enquiry handler only; this context is what `serverOnly` checks. */
const SERVER_CONTEXT = { internal: true, skipRevalidate: true };

async function packageIdBySlug(slug: string): Promise<number | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "packages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  });
  return docs[0]?.id ?? null;
}

/** Maps the typed fields only; the honeypot and any extra client keys are dropped. */
async function toDocument(input: StoredEnquiryInput): Promise<EnquiryData> {
  const shared = {
    source: input.source,
    name: input.name,
    phone: input.phone,
    email: input.email,
  };

  switch (input.source) {
    case "contact":
      return { ...shared, message: input.message };
    case "trip":
      return {
        ...shared,
        message: input.message,
        travelDate: input.travelDate,
        destination: input.destination,
        adults: input.adults,
        children: input.children,
        budgetPerPerson: input.budgetPerPerson,
      };
    case "package":
      return {
        ...shared,
        travelDate: input.travelDate,
        adults: input.adults,
        package: await packageIdBySlug(input.slug),
        selections: {
          stay: input.stay,
          meals: input.meals,
          vehicle: input.vehicle,
          childAges: input.childAges.map((age) => ({ age })),
        },
        computedPrice: {
          packageCost: input.price.packageCost,
          gst: input.price.gst,
          gstPercent: input.price.gstPercent,
          estimatedTotal: input.price.estimatedTotal,
        },
      };
  }
}

/**
 * Stores an enquiry as a lead in the CMS. Never throws: the handler still
 * sends the email when storage fails, so a failure is returned instead.
 */
export async function storeEnquiry(input: StoredEnquiryInput): Promise<StoreEnquiryResult> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "enquiries",
      data: await toDocument(input),
      overrideAccess: true,
      context: SERVER_CONTEXT,
    });
    return { ok: true, id: doc.id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
