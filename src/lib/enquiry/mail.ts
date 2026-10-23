import { Resend } from "resend";

import { renderEnquiryHtml, renderEnquiryText, type EnquiryContent } from "./html";

export type MailConfig = { apiKey: string; fromEmail: string; toEmail: string };

export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.TRIP_ENQUIRY_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) return null;

  return { apiKey, fromEmail, toEmail };
}

const MAX_SUBJECT_LENGTH = 120;

/**
 * Removes control characters (including CR/LF and the Unicode line and
 * paragraph separators), strips bidirectional formatting controls, and
 * clamps the length by code point so surrogate pairs are never split.
 */
export function sanitizeSubject(subject: string): string {
  const value = subject
    .replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, " ")
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return Array.from(value).slice(0, MAX_SUBJECT_LENGTH).join("");
}

export async function sendEnquiryEmail(
  input: {
    subject: string;
    rows: [string, string][];
    replyTo?: string;
    intro: string;
  } & Partial<Pick<EnquiryContent, "heading" | "kind">>
): Promise<{ ok: true } | { ok: false; error: string }> {
  const config = getMailConfig();

  if (!config) return { ok: false, error: "Mail is not configured." };

  const content: EnquiryContent = {
    heading: input.heading ?? "New Enquiry",
    intro: input.intro,
    rows: input.rows,
    replyTo: input.replyTo,
    kind: input.kind,
  };

  try {
    const resend = new Resend(config.apiKey);

    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: sanitizeSubject(input.subject),
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      html: renderEnquiryHtml(content),
      text: renderEnquiryText(content),
    });

    if (error) return { ok: false, error: error.message };

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown mail error.",
    };
  }
}
