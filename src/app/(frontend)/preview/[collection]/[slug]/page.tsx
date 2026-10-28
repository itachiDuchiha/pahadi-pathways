import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import DestinationPage from "@/components/destination-page/DestinationPage";
import PackagePage from "@/components/package-details/PackagePage";
import RefreshRouteOnSave from "@/components/preview/RefreshRouteOnSave";
import { getPackages } from "@/lib/cms/packages";
import { getPreviewDocument, isPreviewCollection } from "@/lib/cms/preview";
import { getPricingTables } from "@/lib/cms/pricing-tables";
import { getSiteSettings } from "@/lib/cms/site";

// Drafts are read per request with the editor's admin cookie; never cached.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{
    collection: string;
    slug: string;
  }>;
};

/**
 * The latest draft of a package or destination, rendered with the same
 * components as its public page, for signed-in CMS users only (the admin's
 * live preview frames it). Everyone else gets a 404.
 */
export default async function PreviewPage({ params }: Props) {
  const { collection, slug } = await params;
  if (!isPreviewCollection(collection)) notFound();

  const requestHeaders = new Headers(await headers());

  if (collection === "packages") {
    const [pkg, globalPricing, settings] = await Promise.all([
      getPreviewDocument("packages", slug, requestHeaders),
      getPricingTables(),
      getSiteSettings(),
    ]);
    if (!pkg) notFound();

    return (
      <>
        <RefreshRouteOnSave />
        <PackagePage pkg={pkg} globalPricing={globalPricing} settings={settings} />
      </>
    );
  }

  const [destination, packages] = await Promise.all([
    getPreviewDocument("destinations", slug, requestHeaders),
    getPackages(),
  ]);
  if (!destination) notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <DestinationPage destination={destination} packages={packages} />
    </>
  );
}
