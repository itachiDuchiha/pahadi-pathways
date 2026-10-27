import type { Enquiry as EnquiryDoc } from "@/cms/payload-types";
import type { ContactEnquiry, PackageEnquiry, TripEnquiry } from "@/lib/enquiry/schema";
import type { PackagePrice } from "@/lib/pricing";

import { getPayloadClient } from "./client";

/** The price the server computed for a package enquiry; client totals are never stored. */
export type StoredPrice = Pick<PackagePrice, "packageCost" | "gst" | "gstPercent" | "estimatedTotal">;

/** The package a lead was for, as the route resolved it. */
export type StoredPackageRef = { id?: number; slug: string; title: string };

/**
 * A validated enquiry; a package enquiry also carries the package the route
 * resolved and the server-computed price.
 */
export type StoredEnquiryInput =
  | TripEnquiry
  | ContactEnquiry
  | (PackageEnquiry & { pkg: StoredPackageRef; price: StoredPrice });

export type StoreEnquiryResult = { ok: true; id: string | number } | { ok: false; error: string };

type EnquiryData = Omit<EnquiryDoc, "id" | "createdAt" | "updatedAt">;

/** Writes come from the enquiry handler only; this context is what `serverOnly` checks. */
const SERVER_CONTEXT = { internal: true, skipRevalidate: true };

/** Maps the typed fields only; the honeypot and any extra client keys are dropped. */
function toDocument(input: StoredEnquiryInput): EnquiryData {
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
        children: input.childAges.length,
        package: input.pkg.id ?? null,
        packageSlug: input.pkg.slug,
        packageTitle: input.pkg.title,
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
      data: toDocument(input),
      overrideAccess: true,
      context: SERVER_CONTEXT,
    });
    return { ok: true, id: doc.id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
