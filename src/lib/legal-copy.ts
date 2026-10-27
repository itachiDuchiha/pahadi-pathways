/**
 * Fixed legal prose for /privacy and /terms. The wording lives in code so
 * it cannot be weakened from the admin; only the facts in `Legal` vary.
 *
 * Paragraphs are plain text. The page renders email addresses as mailto
 * links and `[text](/path)` as an internal link.
 */
import type { Legal } from "@/lib/cms/types";

export type Section = { heading: string; paragraphs: string[] };

export type PrivacyOptions = {
  /** True when at least one analytics ID is configured. */
  analyticsEnabled: boolean;
  /** Vendor names shown when analytics is enabled, e.g. "Google Analytics". */
  vendors: string[];
};

export const DEFAULT_RETENTION_STATEMENT = "We keep enquiry records to maintain a history of your requests.";
export const DEFAULT_DELETION_WINDOW_MONTHS = 6;
/** The date the current wording took effect; used until the admin sets one. */
export const DEFAULT_EFFECTIVE_DATE = "2026-10-27";

export const GRIEVANCE_PLACEHOLDER = "Grievance officer details will be published here.";

const NO_SALE =
  "We do not sell or share your data with third parties, except the service providers we use to deliver email and, when enabled, measure site usage.";

const ACT = "Digital Personal Data Protection Act, 2023";

function months(count: number): string {
  return count === 1 ? "1 month" : `${count} months`;
}

function deletion(legal: Legal): string {
  return `If you want your data deleted, email us at ${legal.dataContactEmail} and it will be deleted within ${months(legal.deletionWindowMonths)}.`;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "27 October 2026", read in India time so a date picked at local midnight stays that day. */
export function formatEffectiveDate(value: string): string {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00+05:30`) : new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function privacySections(legal: Legal, options: PrivacyOptions): Section[] {
  const processors = [
    NO_SALE,
    "Enquiry details are delivered to us by email using Resend, a transactional email provider, and land in our Google Workspace / Gmail inbox. These providers process your information only to deliver and store your enquiry on our behalf.",
  ];

  if (options.analyticsEnabled && options.vendors.length > 0) {
    processors.push(
      `If you accept analytics cookies, we use ${list(options.vendors)} to measure how the site is used. These scripts load only after you accept, and declining keeps the site fully usable.`
    );
  }

  const officer = legal.grievanceOfficer;

  return [
    {
      heading: "What We Collect",
      paragraphs: [
        "When you use our trip planner, contact form or package enquiry form, we collect the information you choose to share with us: your name, phone number, email address, travel dates, party size and any message or trip details you include.",
      ],
    },
    {
      heading: "Why We Collect It",
      paragraphs: [
        "We collect this information only for this website's own purpose: to respond to your enquiry, plan your Himalayan journey and follow up with the details you have asked for. We do not use it for any other purpose.",
      ],
    },
    { heading: "Who Processes It", paragraphs: processors },
    {
      heading: "Retention",
      paragraphs: [
        `${legal.retentionStatement} Enquiries are stored in our inbox and in the website's content system so our team can follow up.`,
        deletion(legal),
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: [
        `Under the ${ACT}, you have the right to access the personal data you have shared with us, to have it corrected, to have it erased, and to grievance redressal. To exercise any of these rights, email us at ${legal.dataContactEmail}.`,
      ],
    },
    {
      heading: "Grievance Officer",
      paragraphs: officer
        ? [
            `As required by the ${ACT}, you can raise any concern about how your personal data is handled with our grievance officer.`,
            `Name: ${officer.name}`,
            `Email: ${officer.email}`,
            `Phone: ${officer.phone}`,
          ]
        : [GRIEVANCE_PLACEHOLDER],
    },
    {
      heading: "Contact",
      paragraphs: [
        `If you have any questions about this privacy policy or how your information is handled, reach out to us at ${legal.dataContactEmail}.`,
      ],
    },
  ];
}

/** `contactEmail` is the site email; it defaults to the data contact. */
export function termsSections(legal: Legal, contactEmail: string = legal.dataContactEmail): Section[] {
  return [
    {
      heading: "Enquiries",
      paragraphs: [
        "Sending an enquiry through our trip planner, contact form or a package page is a request for a quote or more information. It is not a confirmed booking. A booking is confirmed only when we confirm it to you in writing.",
      ],
    },
    {
      heading: "Prices",
      paragraphs: [
        "Prices shown on this website are indicative. The final price is confirmed to you in writing before any payment is made.",
      ],
    },
    {
      heading: "Package Terms",
      paragraphs: [
        "Inclusions, exclusions and cancellation terms differ between packages. The terms shown on each package page apply to that package.",
      ],
    },
    {
      heading: "Travel in the Himalayas",
      paragraphs: [
        "Travel in the Himalayas depends on the weather and on road conditions. Itineraries may change for your safety, including changes of route, timing or stops.",
      ],
    },
    {
      heading: "Your Data",
      paragraphs: [
        `We collect your details only to respond to and follow up on your enquiry. ${NO_SALE} ${legal.retentionStatement} ${deletion(legal)}`,
        "Read our [privacy policy](/privacy) for the full details.",
      ],
    },
    {
      heading: "Governing Law",
      paragraphs: ["These terms are governed by the laws of India."],
    },
    {
      heading: "Contact",
      paragraphs: [`If you have any questions about these terms, email us at ${contactEmail}.`],
    },
  ];
}
