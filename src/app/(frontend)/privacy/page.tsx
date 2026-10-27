import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalSettings } from "@/lib/cms/legal";
import { getSiteSettings } from "@/lib/cms/site";
import { formatEffectiveDate, privacySections } from "@/lib/legal-copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: "Privacy Policy",
      description:
        `How ${settings.name} collects, uses and protects the personal data you share when you enquire.`,
      path: "/privacy",
    },
    settings
  );
}

export default async function PrivacyPage() {
  const [settings, legal] = await Promise.all([getSiteSettings(), getLegalSettings()]);

  return (
    <LegalDocument
      title="Privacy Policy"
      description={`How ${settings.name} collects, uses and protects the information you share when you plan a trip with us.`}
      effectiveDate={formatEffectiveDate(legal.effectiveDate)}
      sections={privacySections(legal, { analyticsEnabled: false, vendors: [] })}
    />
  );
}
