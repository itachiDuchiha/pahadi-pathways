import { cache } from "react";

import type { LegalSetting } from "@/cms/payload-types";
import {
  DEFAULT_DELETION_WINDOW_MONTHS,
  DEFAULT_EFFECTIVE_DATE,
  DEFAULT_RETENTION_STATEMENT,
} from "@/lib/legal-copy";

import { getPayloadClient } from "./client";
import { getSiteSettings } from "./site";
import type { GrievanceOfficer, Legal } from "./types";

function text(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function officer(doc: LegalSetting["grievanceOfficer"]): GrievanceOfficer | undefined {
  const name = text(doc?.name);
  const email = text(doc?.email);
  const phone = text(doc?.phone);

  return name && email && phone ? { name, email, phone } : undefined;
}

function months(value: number | null | undefined): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 12
    ? value
    : DEFAULT_DELETION_WINDOW_MONTHS;
}

/**
 * Lays the `legal-settings` global over its defaults. `siteEmail` stands
 * in for an empty data contact.
 */
export function mergeLegalSettings(doc: LegalSetting, siteEmail: string): Legal {
  const grievanceOfficer = officer(doc.grievanceOfficer);

  return {
    ...(grievanceOfficer ? { grievanceOfficer } : {}),
    dataContactEmail: text(doc.dataContactEmail) || siteEmail,
    effectiveDate: text(doc.effectiveDate) || DEFAULT_EFFECTIVE_DATE,
    deletionWindowMonths: months(doc.deletionWindowMonths),
    retentionStatement: text(doc.retentionStatement) || DEFAULT_RETENTION_STATEMENT,
  };
}

/** Request-scoped (React `cache`), like `getSiteSettings`. */
export const getLegalSettings = cache(async (): Promise<Legal> => {
  const payload = await getPayloadClient();
  const [doc, site] = await Promise.all([
    payload.findGlobal({ slug: "legal-settings", draft: false, overrideAccess: false, depth: 0 }),
    getSiteSettings(),
  ]);

  return mergeLegalSettings(doc, site.email);
});
