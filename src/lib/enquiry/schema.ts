import { z } from "zod";

export const DESTINATIONS = {
  shimla: "Shimla",
  manali: "Manali",
  spiti: "Spiti Valley",
  kinnaur: "Kinnaur",
  lahaul: "Lahaul",
  jibhi: "Jibhi",
  dharamshala: "Dharamshala",
  multiple: "Multiple destinations",
  unsure: "Not sure yet",
} as const;

export type DestinationKey = keyof typeof DESTINATIONS;

const destinationKeys = Object.keys(DESTINATIONS) as [
  DestinationKey,
  ...DestinationKey[],
];

/**
 * An option label. The labels live in the CMS pricing tables, so the
 * package route checks them against the tables it loads; here only the
 * shape is checked.
 */
function optionLabel(error: string) {
  return z.string({ error }).trim().min(1, { error }).max(100, { error });
}

/* Shared fields ------------------------------------------------------- */

const name = z
  .string({ error: "Please enter a valid name." })
  .trim()
  .min(1, { error: "Please enter a valid name." })
  .max(100, { error: "Please enter a valid name." });

const phone = z
  .string({ error: "Please enter a valid phone number." })
  .trim()
  .min(7, { error: "Please enter a valid phone number." })
  .max(30, { error: "Please enter a valid phone number." })
  .refine((value) => (value.match(/\d/g)?.length ?? 0) >= 7, {
    error: "Please enter a valid phone number.",
  });

/** Optional; an empty string is treated as absent. */
const email = z
  .string({ error: "Please enter a valid email address." })
  .trim()
  .max(254, { error: "Please enter a valid email address." })
  .refine((value) => value === "" || z.email().safeParse(value).success, {
    error: "Please enter a valid email address.",
  })
  .transform((value) => value || undefined)
  .optional();

/** Hidden field that people never see; bots fill it in. */
const website = z.literal("", { error: "Invalid enquiry details." }).optional();

/** Optional ISO calendar date (YYYY-MM-DD); an empty string is treated as absent. */
const travelDate = z
  .union([z.literal(""), z.iso.date()], {
    error: "Please enter a valid travel date.",
  })
  .transform((value) => value || undefined)
  .optional();

const message = z
  .string()
  .trim()
  .max(2000, { error: "Please shorten your message." })
  .optional();

/** Turnstile response token; checked by the handler, then dropped before storage and mail. */
const turnstileToken = z.string().max(2048).optional();

const shared = { name, phone, email, website, turnstileToken };

/* Per-source schemas -------------------------------------------------- */

export const tripEnquirySchema = z.object({
  source: z.literal("trip"),
  ...shared,
  travelDate,
  destination: z
    .union([z.literal(""), z.enum(destinationKeys)], {
      error: "Please select a valid destination.",
    })
    .transform((value) => value || undefined)
    .optional(),
  adults: z
    .number({ error: "Please check the number of adults." })
    .int({ error: "Please check the number of adults." })
    .min(1, { error: "Please check the number of adults." })
    .max(15, { error: "Please check the number of adults." }),
  children: z
    .number({ error: "Please check the number of children." })
    .int({ error: "Please check the number of children." })
    .min(0, { error: "Please check the number of children." })
    .max(10, { error: "Please check the number of children." }),
  budgetPerPerson: z
    .number({ error: "Please check your selected budget." })
    .min(15000, { error: "Please check your selected budget." })
    .max(100000, { error: "Please check your selected budget." }),
  message,
});

export const contactEnquirySchema = z.object({
  source: z.literal("contact"),
  ...shared,
  message,
});

/** Same shape as the CMS slug field; the handler checks the package exists. */
const PACKAGE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const packageEnquirySchema = z.object({
  source: z.literal("package"),
  ...shared,
  slug: z
    .string({ error: "Please choose a valid package." })
    .max(200, { error: "Please choose a valid package." })
    .regex(PACKAGE_SLUG, { error: "Please choose a valid package." }),
  travelDate,
  adults: z
    .number({ error: "Please select 1 to 10 adults." })
    .int({ error: "Please select 1 to 10 adults." })
    .min(1, { error: "Please select 1 to 10 adults." })
    .max(10, { error: "Please select 1 to 10 adults." }),
  childAges: z
    .array(
      z
        .number({ error: "Please check the children's ages." })
        .int({ error: "Please check the children's ages." })
        .min(0, { error: "Please check the children's ages." })
        .max(17, { error: "Please check the children's ages." }),
      { error: "Please check the children's ages." }
    )
    .max(10, { error: "Please add no more than 10 children." }),
  stay: optionLabel("Please choose a valid stay."),
  meals: optionLabel("Please choose a valid meal plan."),
  vehicle: optionLabel("Please choose a valid vehicle."),
});

export const enquirySchema = z.discriminatedUnion(
  "source",
  [tripEnquirySchema, contactEnquirySchema, packageEnquirySchema],
  { error: "Invalid enquiry details." }
);

export type TripEnquiry = z.infer<typeof tripEnquirySchema>;
export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;
export type PackageEnquiry = z.infer<typeof packageEnquirySchema>;
export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquirySource = Enquiry["source"];

/** First user-facing validation message, for the API response. */
export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid enquiry details.";
}
