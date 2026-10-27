import type { Field, GlobalConfig } from "payload";

import { isRecipientEmail, MAX_RECIPIENTS } from "@/lib/enquiry/recipients";

import { isAdmin, isEditorOrAdmin } from "../access";

/**
 * Validates one source's recipient list on save: every address valid,
 * none repeated (ignoring case), at most `MAX_RECIPIENTS`.
 */
export function validateRecipients(value: unknown): true | string {
  if (!Array.isArray(value)) return true;

  if (value.length > MAX_RECIPIENTS) return `Add at most ${MAX_RECIPIENTS} recipients.`;

  const seen = new Set<string>();
  for (const row of value) {
    const raw: unknown = typeof row === "object" && row !== null ? Reflect.get(row, "email") : undefined;
    const email = typeof raw === "string" ? raw.trim() : "";
    if (!isRecipientEmail(email)) return `"${email}" is not a valid email address.`;
    const key = email.toLowerCase();
    if (seen.has(key)) return `"${email}" appears more than once.`;
    seen.add(key);
  }

  return true;
}

function sourceGroup(name: "trip" | "contact" | "package", label: string): Field {
  return {
    name,
    type: "group",
    label,
    fields: [
      {
        name: "sendEmail",
        type: "checkbox",
        label: "Send an email for each enquiry",
        defaultValue: true,
        admin: { description: "When off, enquiries are still saved under Enquiries but no email is sent." },
      },
      {
        name: "recipients",
        type: "array",
        labels: { singular: "Recipient", plural: "Recipients" },
        validate: (value: unknown) => validateRecipients(value),
        admin: {
          description: "Leave empty to send to the address configured on the server (TRIP_ENQUIRY_EMAIL).",
        },
        fields: [{ name: "email", type: "email", required: true }],
      },
    ],
  };
}

/**
 * Who is emailed when an enquiry arrives, per source. Internal: editors
 * may look, only admins may change it, and visitors cannot read it. Not
 * rendered on any page, so saving it revalidates nothing.
 */
export const NotificationSettings: GlobalConfig = {
  slug: "notification-settings",
  label: "Notification settings",
  admin: {
    description: "Who receives an email when a visitor sends an enquiry.",
  },
  access: {
    read: isEditorOrAdmin,
    update: isAdmin,
  },
  fields: [
    sourceGroup("trip", "Trip planner enquiries"),
    sourceGroup("contact", "Contact form enquiries"),
    sourceGroup("package", "Package enquiries"),
  ],
};
