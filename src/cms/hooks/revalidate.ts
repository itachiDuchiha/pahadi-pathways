import { revalidatePath, revalidateTag } from "next/cache";
import type { RequestContext } from "payload";

import { SLUG_PATTERN } from "../fields/slug";

export type RevalidateKind =
  | "package"
  | "destination"
  | "testimonial"
  | "gallery"
  | "experience"
  | "pricing"
  | "site";

export type RevalidateTarget = { path: string; type?: "page" | "layout" };

/** Routes that render content from every collection. */
const SHARED_PATHS = ["/", "/sitemap.xml", "/llms.txt", "/llms-full.txt"];

const TAGS: Record<RevalidateKind, string> = {
  package: "packages",
  destination: "destinations",
  testimonial: "testimonials",
  gallery: "gallery-items",
  experience: "experiences",
  pricing: "pricing-settings",
  site: "site-settings",
};

const LISTINGS: Record<RevalidateKind, string | null> = {
  package: "/packages",
  destination: "/destinations",
  testimonial: "/reviews",
  gallery: "/gallery",
  experience: "/experiences",
  pricing: "/packages",
  site: null,
};

export function tagFor(kind: RevalidateKind): string {
  return TAGS[kind];
}

/** Package cards also render on destination pages, so both caches go. */
export function tagsFor(kind: RevalidateKind): string[] {
  return kind === "package" ? [TAGS.package, TAGS.destination] : [TAGS[kind]];
}

function slugOf(doc: unknown): string | null {
  if (typeof doc !== "object" || doc === null || !("slug" in doc)) return null;

  const { slug } = doc;

  return typeof slug === "string" && SLUG_PATTERN.test(slug) ? slug : null;
}

function documentPaths(kind: RevalidateKind, docs: unknown[]): string[] {
  const base = kind === "package" ? "/packages" : kind === "destination" ? "/destinations" : null;

  if (!base) return [];

  return docs.map(slugOf).flatMap((slug) => (slug ? [`${base}/${slug}`] : []));
}

/**
 * The routes to revalidate after a change. Includes the previous slug's
 * page so a rename does not leave the old URL cached.
 */
export function pathsFor(
  kind: RevalidateKind,
  doc: unknown,
  previousDoc?: unknown
): RevalidateTarget[] {
  const paths = new Set<string>([...documentPaths(kind, [doc, previousDoc]), ...SHARED_PATHS]);
  const listing = LISTINGS[kind];

  if (listing) paths.add(listing);

  const targets: RevalidateTarget[] = [...paths].map((path) => ({ path }));

  if (kind === "package") {
    targets.push({ path: "/destinations" }, { path: "/destinations/[slug]", type: "page" });
  }
  if (kind === "pricing") targets.push({ path: "/packages/[slug]", type: "page" });
  // Contact details render in the footer and navbar of every page, so the
  // whole layout goes; the two pages that list them are named as well.
  if (kind === "site") {
    targets.push({ path: "/contact" }, { path: "/privacy" }, { path: "/", type: "layout" });
  }

  return targets;
}

type HookReq = {
  context?: RequestContext;
  payload: { logger: { warn(message: string): void } };
};

type ChangeArgs<T> = { doc: T; previousDoc?: unknown; req: HookReq; context?: RequestContext };
type DeleteArgs<T> = { doc: T; req: HookReq; context?: RequestContext };

function shouldSkip(req: HookReq, context?: RequestContext): boolean {
  return context?.skipRevalidate === true || req.context?.skipRevalidate === true;
}

function run(kind: RevalidateKind, req: HookReq, doc: unknown, previousDoc?: unknown): void {
  try {
    for (const target of pathsFor(kind, doc, previousDoc)) {
      revalidatePath(target.path, target.type);
    }
    // Editors expect the next visit to show their change, so expire now.
    for (const tag of tagsFor(kind)) revalidateTag(tag, { expire: 0 });
  } catch (error) {
    // Outside a Next request (scripts, tests) there is no cache to clear.
    const message = error instanceof Error ? error.message : String(error);
    req.payload.logger.warn(`Revalidation skipped for ${kind}: ${message}`);
  }
}

/**
 * afterChange / afterDelete hooks that clear the Next cache for the routes
 * a change affects. The seed sets `context.skipRevalidate` to opt out.
 * `afterChange` also fits a global's hook signature.
 */
export function revalidateHooks(kind: RevalidateKind) {
  return {
    afterChange: async <T>({ doc, previousDoc, req, context }: ChangeArgs<T>): Promise<T> => {
      if (!shouldSkip(req, context)) run(kind, req, doc, previousDoc);
      return doc;
    },
    afterDelete: async <T>({ doc, req, context }: DeleteArgs<T>): Promise<T> => {
      if (!shouldSkip(req, context)) run(kind, req, doc);
      return doc;
    },
  };
}
