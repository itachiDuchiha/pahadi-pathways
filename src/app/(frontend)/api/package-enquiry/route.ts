import { storeEnquiry } from "@/lib/cms/enquiries";
import { getPackageForEnquiry } from "@/lib/cms/packages";
import { getPricingTables } from "@/lib/cms/pricing-tables";
import type { PricingTables } from "@/lib/cms/types";
import {
  createEnquiryHandler,
  type BuiltEnquiry,
  type EnquiryEmail,
  type InvalidEnquiry,
} from "@/lib/enquiry/handler";
import type { PackageEnquiry } from "@/lib/enquiry/schema";
import {
  computePackagePrice,
  formatCurrency,
  packagePricingContext,
} from "@/lib/pricing";

export const runtime = "nodejs";

/** The schema checks only the labels' shape; they must be options editors have published. */
function unknownOption(enquiry: PackageEnquiry, tables: PricingTables): string | null {
  const has = (options: { label: string }[], label: string) =>
    options.some((option) => option.label === label);

  if (!has(tables.stayOptions, enquiry.stay)) return "Please choose a valid stay.";
  if (!has(tables.mealOptions, enquiry.meals)) return "Please choose a valid meal plan.";
  if (!has(tables.vehicleOptions, enquiry.vehicle)) return "Please choose a valid vehicle.";
  return null;
}

async function buildPackageEnquiry(
  enquiry: PackageEnquiry
): Promise<BuiltEnquiry | InvalidEnquiry | null> {
  // The schema checks the slug's shape only; only a published package counts.
  // Prices come from the CMS on every enquiry; client totals are never used.
  const found = await getPackageForEnquiry(enquiry.slug);
  if (!found) return null;
  const { pkg } = found;

  const tables = await getPricingTables();
  const invalid = unknownOption(enquiry, tables);
  if (invalid) return { invalid };

  const price = computePackagePrice(
    {
      package: packagePricingContext(pkg),
      stay: enquiry.stay,
      meals: enquiry.meals,
      vehicle: enquiry.vehicle,
      adults: enquiry.adults,
      childAges: enquiry.childAges,
    },
    tables
  );

  const children = enquiry.childAges.length
    ? `${enquiry.childAges.length} (${enquiry.childAges.map((age) => `Age ${age}`).join(", ")})`
    : "None";

  const email: EnquiryEmail = {
    kind: "package",
    heading: "New Package Booking Enquiry",
    subject: `Package enquiry: ${pkg.title} — ${enquiry.name}`,
    intro: "A customer has submitted a package booking enquiry through your website.",
    rows: [
      ["Customer Name", enquiry.name],
      ["Phone Number", enquiry.phone],
      ["Email", enquiry.email ?? "Not provided"],
      ["Package", pkg.title],
      ["Travel Date", enquiry.travelDate ?? "Not provided"],
      ["Adults", String(enquiry.adults)],
      ["Children", children],
      ["Stay Preference", enquiry.stay],
      ["Meal Preference", enquiry.meals],
      ["Vehicle Preference", enquiry.vehicle],
      ["Package Cost", formatCurrency(price.packageCost)],
      [`GST (${price.gstPercent}%)`, formatCurrency(price.gst)],
      ["Estimated Total", formatCurrency(price.estimatedTotal)],
    ],
  };

  // Only the server-computed price is stored alongside the typed fields.
  const stored = {
    ...enquiry,
    pkg: { id: found.id, slug: pkg.slug, title: pkg.title },
    price: {
      packageCost: price.packageCost,
      gst: price.gst,
      gstPercent: price.gstPercent,
      estimatedTotal: price.estimatedTotal,
    },
  };

  return { email, stored };
}

export const POST = createEnquiryHandler({
  routeKey: "package-enquiry",
  sources: ["package"] as const,
  successMessage: {
    package: "Your package enquiry has been sent successfully.",
  },
  buildEnquiry: buildPackageEnquiry,
  storeEnquiry,
  invalidMessage: "Please choose a valid package.",
});
