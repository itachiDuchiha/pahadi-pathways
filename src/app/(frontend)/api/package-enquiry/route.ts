import { getPackageBySlug } from "@/lib/cms/packages";
import { createEnquiryHandler, type EnquiryEmail } from "@/lib/enquiry/handler";
import { sanitizeSubject } from "@/lib/enquiry/mail";
import type { PackageEnquiry } from "@/lib/enquiry/schema";
import {
  computePackagePrice,
  formatCurrency,
  packagePricingContext,
} from "@/lib/pricing";

export const runtime = "nodejs";

async function packageEmail(enquiry: PackageEnquiry): Promise<EnquiryEmail | null> {
  // The schema checks the slug's shape only; only a published package counts.
  const pkg = await getPackageBySlug(enquiry.slug);
  if (!pkg) return null;

  const price = computePackagePrice({
    ...packagePricingContext(pkg),
    stay: enquiry.stay,
    meals: enquiry.meals,
    vehicle: enquiry.vehicle,
    adults: enquiry.adults,
    childAges: enquiry.childAges,
  });

  const children = enquiry.childAges.length
    ? `${enquiry.childAges.length} (${enquiry.childAges.map((age) => `Age ${age}`).join(", ")})`
    : "None";

  return {
    kind: "package",
    heading: "New Package Booking Enquiry",
    subject: sanitizeSubject(`Package enquiry: ${pkg.title} — ${enquiry.name}`),
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
      ["GST (5%)", formatCurrency(price.gst)],
      ["Estimated Total", formatCurrency(price.estimatedTotal)],
    ],
  };
}

export const POST = createEnquiryHandler({
  routeKey: "package-enquiry",
  sources: ["package"] as const,
  successMessage: {
    package: "Your package enquiry has been sent successfully.",
  },
  buildEmail: packageEmail,
  invalidMessage: "Please choose a valid package.",
});
