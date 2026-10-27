import type { Metadata } from "next";

import ConsentControls from "@/components/analytics/ConsentControls";
import LegalDocument from "@/components/legal/LegalDocument";
import { getAnalyticsSettings } from "@/lib/cms/analytics";
import { getLegalSettings } from "@/lib/cms/legal";
import { getSiteSettings } from "@/lib/cms/site";
import { formatEffectiveDate, PROCESSORS_HEADING, privacySections } from "@/lib/legal-copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: "Privacy Policy",
      description:
        `How ${settings.name} collects, uses and protects the information you share when you plan a trip with us.`,
      path: "/privacy",
    },
    settings
  );
}

export default async function PrivacyPage() {
  const [settings, legal, analytics] = await Promise.all([
    getSiteSettings(),
    getLegalSettings(),
    getAnalyticsSettings(),
  ]);

  return (
    <LegalDocument
      title="Privacy Policy"
      description={`How ${settings.name} collects, uses and protects the information you share when you plan a trip with us.`}
      effectiveDate={formatEffectiveDate(legal.effectiveDate)}
      sections={privacySections(legal, { analyticsEnabled: analytics.enabled, vendors: analytics.vendors })}
      extras={analytics.enabled ? { [PROCESSORS_HEADING]: <ConsentControls /> } : undefined}
    />
  );
}
