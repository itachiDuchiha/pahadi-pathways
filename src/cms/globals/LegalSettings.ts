import type { GlobalConfig } from "payload";

import { DEFAULT_DELETION_WINDOW_MONTHS, DEFAULT_RETENTION_STATEMENT } from "@/lib/legal-copy";

import { isAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("legal");

/**
 * The facts the privacy and terms pages print. The legal wording itself is
 * fixed in code (`src/lib/legal-copy.ts`).
 */
export const LegalSettings: GlobalConfig = {
  slug: "legal-settings",
  label: "Legal settings",
  admin: {
    description: "Details shown on the Privacy Policy and Terms and Conditions pages.",
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
  },
  fields: [
    {
      name: "grievanceOfficer",
      type: "group",
      label: "Grievance officer",
      admin: {
        description:
          "Required by the Digital Personal Data Protection Act, 2023. The privacy page shows the officer once name, email and phone are all filled in.",
      },
      fields: [
        { name: "name", type: "text" },
        { name: "email", type: "email" },
        { name: "phone", type: "text", admin: { description: "For example +91 75596 97919" } },
      ],
    },
    {
      name: "dataContactEmail",
      type: "email",
      label: "Data contact email",
      admin: {
        description: "Where visitors send data and deletion requests. Leave empty to use the site email.",
      },
    },
    {
      name: "effectiveDate",
      type: "date",
      admin: {
        description: "The date the current privacy policy and terms took effect.",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
      },
    },
    {
      name: "deletionWindowMonths",
      type: "number",
      label: "Deletion window (months)",
      required: true,
      min: 1,
      max: 12,
      defaultValue: DEFAULT_DELETION_WINDOW_MONTHS,
      admin: { description: "How many months a deletion request may take, between 1 and 12." },
    },
    {
      name: "retentionStatement",
      type: "textarea",
      required: true,
      defaultValue: DEFAULT_RETENTION_STATEMENT,
      admin: { description: "One or two sentences on how long enquiry records are kept." },
    },
  ],
};
