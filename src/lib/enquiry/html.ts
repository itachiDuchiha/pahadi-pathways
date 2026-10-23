import { site } from "@/config/site";

export const REPLY_TO_WARNING =
  "Reply-To is the address the visitor typed. Verify before sharing documents or payment links.";

export const PRICE_NOTE = "Prices computed by the website at submission time.";

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ENTITIES[character]);
}

export type EnquiryContent = {
  heading: string;
  intro: string;
  rows: [string, string][];
  replyTo?: string;
  /** "package" adds the note that prices were computed by the website. */
  kind?: "trip" | "contact" | "package";
};

function notesFor(input: EnquiryContent): string[] {
  return [
    ...(input.kind === "package" ? [PRICE_NOTE] : []),
    ...(input.replyTo ? [REPLY_TO_WARNING] : []),
  ];
}

export function renderEnquiryHtml(input: EnquiryContent): string {
  const rows = input.rows
    .map(
      ([label, value]) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:bold;color:#10264A;vertical-align:top;width:190px;">${escapeHtml(label)}</td>
            <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#374151;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(value)}</td>
          </tr>`
    )
    .join("");

  const notes = notesFor(input)
    .map(
      (note) =>
        `<p style="margin:16px 0 0;font-size:12px;color:#6b7280;">${escapeHtml(note)}</p>`
    )
    .join("");

  return `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#374151;max-width:680px;margin:0 auto;">
        <div style="background:#10264A;padding:24px;border-radius:10px 10px 0 0;">
          <p style="margin:0 0 8px;color:#D4AF37;font-size:12px;letter-spacing:2px;font-weight:bold;">${escapeHtml(site.name.toUpperCase())}</p>
          <h1 style="margin:0;color:#ffffff;font-size:23px;">${escapeHtml(input.heading)}</h1>
        </div>
        <div style="padding:22px;background:#ffffff;border:1px solid #e5e7eb;border-top:0;">
          <p style="margin-top:0;line-height:1.6;">${escapeHtml(input.intro)}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;"><tbody>${rows}
          </tbody></table>${notes}
          <p style="margin:22px 0 0;font-size:12px;color:#6b7280;">This enquiry was submitted through the ${escapeHtml(site.name)} website.</p>
        </div>
      </div>`;
}

export function renderEnquiryText(input: EnquiryContent): string {
  return [
    `${input.heading} — ${site.name}`,
    "",
    input.intro,
    "",
    ...input.rows.map(([label, value]) => `${label}: ${value}`),
    ...notesFor(input).flatMap((note) => ["", note]),
  ].join("\n");
}
