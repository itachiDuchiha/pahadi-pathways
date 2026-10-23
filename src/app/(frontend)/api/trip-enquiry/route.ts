import { createEnquiryHandler, type EnquiryEmail } from "@/lib/enquiry/handler";
import { sanitizeSubject } from "@/lib/enquiry/mail";
import { DESTINATIONS, type ContactEnquiry, type TripEnquiry } from "@/lib/enquiry/schema";

export const runtime = "nodejs";

function tripEmail(enquiry: TripEnquiry): EnquiryEmail {
  return {
    kind: "trip",
    heading: "New Trip Enquiry",
    subject: sanitizeSubject(`Trip enquiry from ${enquiry.name} (${enquiry.phone})`),
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
}

function contactEmail(enquiry: ContactEnquiry): EnquiryEmail {
  return {
    kind: "contact",
    heading: "New Contact Enquiry",
    subject: sanitizeSubject(`Contact enquiry from ${enquiry.name} (${enquiry.phone})`),
    intro: "A visitor has sent a message through the contact page of your website.",
    rows: [
      ["Name", enquiry.name],
      ["Phone", enquiry.phone],
      ["Email", enquiry.email ?? "Not provided"],
      ["Message", enquiry.message || "None"],
    ],
  };
}

export const POST = createEnquiryHandler({
  routeKey: "trip-enquiry",
  sources: ["trip", "contact"] as const,
  successMessage: {
    trip: "Your trip enquiry was sent successfully.",
    contact: "Your message was sent successfully.",
  },
  buildEmail: (enquiry) =>
    enquiry.source === "trip" ? tripEmail(enquiry) : contactEmail(enquiry),
});
