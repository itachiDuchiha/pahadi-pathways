import type { LegalSetting } from "@/cms/payload-types";
import { site } from "@/config/site";
import {
  DEFAULT_DELETION_WINDOW_MONTHS,
  DEFAULT_EFFECTIVE_DATE,
  DEFAULT_RETENTION_STATEMENT,
} from "@/lib/legal-copy";

/** The `legal-settings` global as first seeded; the grievance officer is left for the owner. */
export type LegalSeed = Omit<LegalSetting, "id" | "updatedAt" | "createdAt">;

export const legalSettings: LegalSeed = {
  dataContactEmail: site.email,
  effectiveDate: `${DEFAULT_EFFECTIVE_DATE}T00:00:00.000Z`,
  deletionWindowMonths: DEFAULT_DELETION_WINDOW_MONTHS,
  retentionStatement: DEFAULT_RETENTION_STATEMENT,
};
