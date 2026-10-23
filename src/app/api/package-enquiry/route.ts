import { packages } from "@/data/packages";
import { createEnquiryHandler, type EnquiryEmail } from "@/lib/enquiry/handler";
import { sanitizeSubject } from "@/lib/enquiry/mail";
import type { PackageEnquiry } from "@/lib/enquiry/schema";
import {
  computePackagePrice,
  formatCurrency,
  packagePricingContext,
} from "@/lib/pricing";

export const runtime = "nodejs";

function packageEmail(enquiry: PackageEnquiry): EnquiryEmail {
  // The schema guarantees the slug exists.
  const pkg = packages.find((item) => item.slug === enquiry.slug);
  if (!pkg) throw new Error("Validated package slug not found.");

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
});
