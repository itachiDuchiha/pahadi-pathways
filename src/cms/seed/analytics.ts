import type { AnalyticsSetting } from "@/cms/payload-types";
import { DEFAULT_CONSENT_BANNER_TEXT } from "@/lib/consent";

/** The `analytics-settings` global as first seeded: no IDs, so no analytics and no banner. */
export type AnalyticsSeed = Pick<AnalyticsSetting, "gaMeasurementId" | "clarityProjectId" | "consentBannerText">;

export const analyticsSettings: AnalyticsSeed = {
  gaMeasurementId: "",
  clarityProjectId: "",
  consentBannerText: DEFAULT_CONSENT_BANNER_TEXT,
};

/**
 * What the default (non-overwrite) seed writes into an existing global:
 * the banner text when it is empty. The IDs are the owner's and are never
 * written. `null` when there is nothing to fill.
 */
export function analyticsFill(current: Partial<AnalyticsSeed>): Partial<AnalyticsSeed> | null {
  return current.consentBannerText?.trim() ? null : { consentBannerText: analyticsSettings.consentBannerText };
}
