import { z } from "zod";

/** The most addresses one enquiry source may notify. */
export const MAX_RECIPIENTS = 10;

const recipientEmail = z.email();

/** True for an address the enquiry mail may be sent to. */
export function isRecipientEmail(value: string): boolean {
  return recipientEmail.safeParse(value).success;
}

/** The server's fallback recipient, `TRIP_ENQUIRY_EMAIL`, when it is a valid address. */
export function fallbackRecipients(): string[] {
  const email = process.env.TRIP_ENQUIRY_EMAIL?.trim();
  return email && isRecipientEmail(email) ? [email] : [];
}
