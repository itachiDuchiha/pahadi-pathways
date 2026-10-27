import type { LegalSetting } from "@/cms/payload-types";
import {
  DEFAULT_DELETION_WINDOW_MONTHS,
  DEFAULT_EFFECTIVE_DATE,
  DEFAULT_RETENTION_STATEMENT,
} from "@/lib/legal-copy";

/**
 * The `legal-settings` global as first seeded. The grievance officer and
 * the data contact email are left for the owner: an empty contact email
 * falls back to the site email when read, in both seed modes.
 */
export type LegalSeed = Omit<LegalSetting, "id" | "updatedAt" | "createdAt">;

export const legalSettings: LegalSeed = {
  effectiveDate: `${DEFAULT_EFFECTIVE_DATE}T00:00:00.000Z`,
  deletionWindowMonths: DEFAULT_DELETION_WINDOW_MONTHS,
  retentionStatement: DEFAULT_RETENTION_STATEMENT,
};

/**
 * What the default (non-overwrite) seed writes into an existing global:
 * only the seeded fields that are still empty, so an owner's edits are
 * never replaced. `null` when there is nothing to fill. The contact email
 * is never filled: an empty one falls back to the site email when read.
 */
export function legalFill(current: Partial<LegalSeed>): Partial<LegalSeed> | null {
  const fill: Partial<LegalSeed> = {};

  if (!current.effectiveDate?.trim()) fill.effectiveDate = legalSettings.effectiveDate;
  if (current.deletionWindowMonths == null) fill.deletionWindowMonths = legalSettings.deletionWindowMonths;
  if (!current.retentionStatement?.trim()) fill.retentionStatement = legalSettings.retentionStatement;

  return Object.keys(fill).length > 0 ? fill : null;
}
