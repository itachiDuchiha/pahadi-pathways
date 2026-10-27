import { site } from "@/config/site";
import type { StoredEnquiryInput, StoreEnquiryResult } from "@/lib/cms/enquiries";

import { checkOrigin, rateLimitKey, readJson } from "./guards";
import type { EnquiryContent } from "./html";
import { getMailConfig, sendEnquiryEmail } from "./mail";
import { rateLimit } from "./rate-limit";
import { enquirySchema, firstIssueMessage, type Enquiry, type EnquirySource } from "./schema";

export type EnquiryEmail = Required<Pick<EnquiryContent, "heading" | "kind">> & {
  subject: string;
  intro: string;
  rows: [string, string][];
};

/** The enquiry is well formed but refers to something that does not exist. */
export type InvalidEnquiry = { invalid: string };

/** What a route builds from a valid enquiry: the email and the lead to store. */
export type BuiltEnquiry = { email: EnquiryEmail; stored: StoredEnquiryInput };

type BuildResult = BuiltEnquiry | InvalidEnquiry | null;

type HandlerConfig<S extends EnquirySource> = {
  /** Distinguishes this route's rate-limit buckets from other routes'. */
  routeKey: string;
  sources: readonly S[];
  successMessage: Record<S, string>;
  /**
   * Builds the notification email and the lead to store. Returning `null`
   * means the enquiry refers to something that does not exist (for
   * example an unknown package), which is answered with 400 and
   * `invalidMessage`; returning `{ invalid }` answers 400 with that
   * message instead.
   */
  buildEnquiry: (
    enquiry: Extract<Enquiry, { source: S }>
  ) => BuildResult | Promise<BuildResult>;
  /** Stores the lead in the CMS; a failure is reported, not thrown. */
  storeEnquiry: (input: StoredEnquiryInput) => Promise<StoreEnquiryResult>;
  invalidMessage?: string;
};

function respond(
  status: number,
  ok: boolean,
  message: string,
  headers?: Record<string, string>
): Response {
  return Response.json({ ok, message }, { status, headers });
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Same-host requests are allowed even when the site URL is not this host (dev, previews). */
function originAllowed(request: Request): boolean {
  return checkOrigin(request, site.url) || checkOrigin(request, request.url);
}

function honeypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const website = (body as Record<string, unknown>).website;
  return website !== undefined && website !== "";
}

/**
 * Builds a POST handler that runs every enquiry through the same pipeline:
 * origin check, size-capped JSON read, honeypot, rate limit, schema, then
 * storage and mail. Honeypot hits are answered before the limiter so
 * they never consume a real visitor's allowance.
 *
 * A stored lead counts as success: when the email cannot be sent the
 * visitor still gets 200, because the lead is in the admin and a retry
 * would only create a duplicate. Storage failure never blocks the email;
 * only when both fail does the visitor get 502 or 503.
 */
export function createEnquiryHandler<S extends EnquirySource>(
  config: HandlerConfig<S>
): (request: Request) => Promise<Response> {
  const isSource = (value: unknown): value is S =>
    (config.sources as readonly unknown[]).includes(value);

  return async function POST(request: Request): Promise<Response> {
    try {
      if (!originAllowed(request)) {
        return respond(403, false, "This request is not allowed.");
      }

      const read = await readJson(request);

      if (!read.ok) {
        return read.status === 413
          ? respond(413, false, "Your enquiry is too large.")
          : respond(400, false, "Invalid enquiry details.");
      }

      const source = (read.body as { source?: unknown } | null)?.source;

      if (honeypotFilled(read.body)) {
        const text = isSource(source)
          ? config.successMessage[source]
          : config.successMessage[config.sources[0]];
        return respond(200, true, text);
      }

      const key = rateLimitKey(config.routeKey, request);
      const limit = key === null ? null : rateLimit(key);

      if (limit && !limit.allowed) {
        return respond(
          429,
          false,
          "Too many enquiries. Please try again later or contact us on WhatsApp.",
          { "Retry-After": String(limit.retryAfterSeconds) }
        );
      }

      const parsed = enquirySchema.safeParse(read.body);

      if (!parsed.success) {
        return respond(400, false, firstIssueMessage(parsed.error));
      }

      const enquiry = parsed.data;

      if (!isSource(enquiry.source)) {
        return respond(400, false, "Invalid enquiry details.");
      }

      const built = await config.buildEnquiry(enquiry as Extract<Enquiry, { source: S }>);

      if (!built) {
        return respond(400, false, config.invalidMessage ?? "Invalid enquiry details.");
      }

      if ("invalid" in built) {
        return respond(400, false, built.invalid);
      }

      const accepted: S = enquiry.source;
      const success = () => respond(200, true, config.successMessage[accepted]);

      const stored = await config
        .storeEnquiry(built.stored)
        .catch((error: unknown) => ({ ok: false as const, error: errorMessage(error) }));

      if (!stored.ok) {
        console.error("Enquiry storage failed:", stored.error);
      }

      if (!getMailConfig()) {
        if (stored.ok) {
          console.error("Enquiry stored; mail is not configured.");
          return success();
        }
        console.error("Enquiry email configuration is incomplete.");
        return respond(
          503,
          false,
          "Our enquiry service is being configured. Please try again shortly."
        );
      }

      const sent = await sendEnquiryEmail({ ...built.email, replyTo: enquiry.email }).catch(
        (error: unknown) => ({ ok: false as const, error: errorMessage(error) })
      );

      if (!sent.ok) {
        if (stored.ok) {
          console.error("Enquiry email failed; enquiry stored:", sent.error);
          return success();
        }
        console.error("Enquiry email failed:", sent.error);
        return respond(
          502,
          false,
          "We couldn't send your enquiry right now. Please try again shortly."
        );
      }

      return success();
    } catch (error) {
      console.error("Enquiry handler error:", errorMessage(error));
      return respond(
        500,
        false,
        "Something went wrong while submitting your enquiry. Please try again."
      );
    }
  };
}
