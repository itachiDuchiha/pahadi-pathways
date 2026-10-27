import type { NotificationSetting } from "@/cms/payload-types";

/** The `notification-settings` global as first seeded: email on, no list (the server address is used). */
export type NotificationSeed = Pick<NotificationSetting, "trip" | "contact" | "package">;

const SOURCES = ["trip", "contact", "package"] as const;

export const notificationSettings: NotificationSeed = {
  trip: { sendEmail: true, recipients: [] },
  contact: { sendEmail: true, recipients: [] },
  package: { sendEmail: true, recipients: [] },
};

/**
 * What the default (non-overwrite) seed writes into an existing global:
 * `sendEmail: true` for a source whose switch was never set, keeping its
 * recipients. An admin's choices, including email off, are never
 * replaced. `null` when there is nothing to fill.
 */
export function notificationFill(current: Partial<NotificationSeed>): Partial<NotificationSeed> | null {
  const fill: Partial<NotificationSeed> = {};

  for (const source of SOURCES) {
    const group = current[source];
    if (group?.sendEmail == null) {
      fill[source] = { sendEmail: true, recipients: group?.recipients ?? [] };
    }
  }

  return Object.keys(fill).length > 0 ? fill : null;
}
