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

/**
 * What the default (non-overwrite) seed writes into an existing global:
 * only the seeded fields that are still empty, so an owner's edits are
 * never replaced. `null` when there is nothing to fill.
 */
export function legalFill(current: Partial<LegalSeed>): Partial<LegalSeed> | null {
  const fill: Partial<LegalSeed> = {};

  if (!current.dataContactEmail?.trim()) fill.dataContactEmail = legalSettings.dataContactEmail;
  if (!current.effectiveDate?.trim()) fill.effectiveDate = legalSettings.effectiveDate;
  if (current.deletionWindowMonths == null) fill.deletionWindowMonths = legalSettings.deletionWindowMonths;
  if (!current.retentionStatement?.trim()) fill.retentionStatement = legalSettings.retentionStatement;

  return Object.keys(fill).length > 0 ? fill : null;
}
