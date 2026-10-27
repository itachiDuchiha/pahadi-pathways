import { storeEnquiry } from "@/lib/cms/enquiries";
import { createEnquiryHandler, type BuiltEnquiry, type EnquiryEmail } from "@/lib/enquiry/handler";
import { DESTINATIONS, type ContactEnquiry, type TripEnquiry } from "@/lib/enquiry/schema";

export const runtime = "nodejs";

function buildTripEnquiry(enquiry: TripEnquiry): BuiltEnquiry {
  const email: EnquiryEmail = {
    kind: "trip",
    heading: "New Trip Enquiry",
    subject: `Trip enquiry from ${enquiry.name} (${enquiry.phone})`,
    intro: "A traveller has submitted a new trip planning request through your website.",
    rows: [
      ["Name", enquiry.name],
      ["Phone", enquiry.phone],
      ["Email", enquiry.email ?? "Not provided"],
      [
        "Destination",
        enquiry.destination ? DESTINATIONS[enquiry.destination] : "Not specified",
      ],
      ["Travel date", enquiry.travelDate ?? "Flexible / not specified"],
      ["Adults", String(enquiry.adults)],
      ["Children", String(enquiry.children)],
      ["Budget per person", `₹${enquiry.budgetPerPerson.toLocaleString("en-IN")}`],
      ["Additional requirements", enquiry.message || "None specified"],
    ],
  };

  return { email, stored: enquiry };
}

function buildContactEnquiry(enquiry: ContactEnquiry): BuiltEnquiry {
  const email: EnquiryEmail = {
    kind: "contact",
    heading: "New Contact Enquiry",
    subject: `Contact enquiry from ${enquiry.name} (${enquiry.phone})`,
    intro: "A visitor has sent a message through the contact page of your website.",
    rows: [
      ["Name", enquiry.name],
      ["Phone", enquiry.phone],
      ["Email", enquiry.email ?? "Not provided"],
      ["Message", enquiry.message || "None"],
    ],
  };

  return { email, stored: enquiry };
}

export const POST = createEnquiryHandler({
  routeKey: "trip-enquiry",
  sources: ["trip", "contact"] as const,
  successMessage: {
    trip: "Your trip enquiry was sent successfully.",
    contact: "Your message was sent successfully.",
  },
  buildEnquiry: (enquiry) =>
    enquiry.source === "trip" ? buildTripEnquiry(enquiry) : buildContactEnquiry(enquiry),
  storeEnquiry,
});
