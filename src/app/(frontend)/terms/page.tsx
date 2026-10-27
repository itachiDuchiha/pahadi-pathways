import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalSettings } from "@/lib/cms/legal";
import { getSiteSettings } from "@/lib/cms/site";
import { formatEffectiveDate, termsSections } from "@/lib/legal-copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: "Terms and Conditions",
      description: `The terms that apply when you enquire about or book a journey with ${settings.name}.`,
      path: "/terms",
    },
    settings
  );
}

export default async function TermsPage() {
  const [settings, legal] = await Promise.all([getSiteSettings(), getLegalSettings()]);

  return (
    <LegalDocument
      title="Terms and Conditions"
      description={`The terms that apply when you enquire about or book a journey with ${settings.name}.`}
      effectiveDate={formatEffectiveDate(legal.effectiveDate)}
      sections={termsSections(legal, settings.email)}
    />
  );
}
