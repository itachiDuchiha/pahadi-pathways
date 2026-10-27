import type { NotificationSetting } from "@/cms/payload-types";
import { fallbackRecipients, isRecipientEmail, MAX_RECIPIENTS } from "@/lib/enquiry/recipients";
import type { EnquirySource } from "@/lib/enquiry/schema";

import { getPayloadClient } from "./client";

export type NotificationPolicy = { sendEmail: boolean; recipients: string[] };

/**
 * The admin's addresses for one source, re-checked before use (the stored
 * data may predate validation): the first `MAX_RECIPIENTS` valid unique ones.
 */
function savedRecipients(group: NotificationSetting[EnquirySource], source: EnquirySource): string[] {
  const seen = new Set<string>();
  const recipients: string[] = [];

  for (const row of group?.recipients ?? []) {
    if (recipients.length >= MAX_RECIPIENTS) break;
    const email = row.email?.trim() ?? "";
    if (!isRecipientEmail(email)) {
      console.warn(`Notification settings: ignoring an invalid address in ${source}.recipients.`);
      continue;
    }
    if (seen.has(email.toLowerCase())) continue;
    seen.add(email.toLowerCase());
    recipients.push(email);
  }

  return recipients;
}

/**
 * Whether an enquiry from `source` is emailed, and to whom. An empty list
 * falls back to `TRIP_ENQUIRY_EMAIL`, so an unconfigured screen never
 * silently drops mail; settings that cannot be read fall back the same way.
 *
 * Reads with `overrideAccess: true`: the global is not publicly readable
 * (the list is internal) and this runs only inside the enquiry route on
 * the server, on behalf of an anonymous visitor, and never returns the
 * addresses to them.
 */
export async function getNotificationPolicy(source: EnquirySource): Promise<NotificationPolicy> {
  let doc: NotificationSetting;
  try {
    const payload = await getPayloadClient();
    doc = await payload.findGlobal({ slug: "notification-settings", overrideAccess: true, depth: 0 });
  } catch (error) {
    console.error(
      "Notification settings could not be read; using the server address:",
      error instanceof Error ? error.message : String(error)
    );
    return { sendEmail: true, recipients: fallbackRecipients() };
  }

  const group = doc[source];
  const recipients = savedRecipients(group, source);

  return {
    sendEmail: group?.sendEmail !== false,
    recipients: recipients.length > 0 ? recipients : fallbackRecipients(),
  };
}
