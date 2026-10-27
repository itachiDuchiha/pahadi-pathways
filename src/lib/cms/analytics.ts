import { cache } from "react";

import type { AnalyticsSetting } from "@/cms/payload-types";
import {
  CLARITY_PROJECT_ID_PATTERN,
  DEFAULT_CONSENT_BANNER_TEXT,
  GA_MEASUREMENT_ID_PATTERN,
} from "@/lib/consent";

import { getPayloadClient } from "./client";

export type Analytics = {
  gaMeasurementId: string | null;
  clarityProjectId: string | null;
  consentBannerText: string;
  /** Vendor names for the privacy page, in a fixed order. */
  vendors: string[];
  /** True when at least one ID is set. */
  enabled: boolean;
};

type AnalyticsDoc = Partial<Pick<AnalyticsSetting, "gaMeasurementId" | "clarityProjectId" | "consentBannerText">>;

/** The stored ID when it still matches `pattern` (the data may predate validation). */
function validId(value: string | null | undefined, pattern: RegExp, field: string): string | null {
  const id = value?.trim() ?? "";
  if (!id) return null;
  if (pattern.test(id)) return id;

  console.warn(`Analytics settings: ignoring an invalid ${field}.`);
  return null;
}

export function mergeAnalyticsSettings(doc: AnalyticsDoc): Analytics {
  const gaMeasurementId = validId(doc.gaMeasurementId, GA_MEASUREMENT_ID_PATTERN, "gaMeasurementId");
  const clarityProjectId = validId(doc.clarityProjectId, CLARITY_PROJECT_ID_PATTERN, "clarityProjectId");
  const vendors = [
    ...(gaMeasurementId ? ["Google Analytics"] : []),
    ...(clarityProjectId ? ["Microsoft Clarity"] : []),
  ];

  return {
    gaMeasurementId,
    clarityProjectId,
    consentBannerText: doc.consentBannerText?.trim() || DEFAULT_CONSENT_BANNER_TEXT,
    vendors,
    enabled: vendors.length > 0,
  };
}

/** Request-scoped (React `cache`), like `getSiteSettings`. */
export const getAnalyticsSettings = cache(async (): Promise<Analytics> => {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({ slug: "analytics-settings", overrideAccess: false, depth: 0 });

  return mergeAnalyticsSettings(doc);
});
