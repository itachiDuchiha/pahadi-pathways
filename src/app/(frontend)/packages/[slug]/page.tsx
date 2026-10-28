import type { Metadata } from "next";

import { notFound } from "next/navigation";

import PackagePage from "@/components/package-details/PackagePage";
import { assertContentPresent } from "@/lib/cms/guard";
import { getPackageBySlug, getPackages } from "@/lib/cms/packages";
import { getPricingTables } from "@/lib/cms/pricing-tables";
import { getSiteSettings } from "@/lib/cms/site";
import { pageMetadata, truncate } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const packages = await getPackages();
  assertContentPresent(packages.length, "packages");

  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return { title: "Not found" };
  }

  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: pkg.title,
      description: truncate(pkg.overview ?? pkg.summary ?? pkg.title, 155),
      path: `/packages/${pkg.slug}`,
      image: pkg.heroImage ?? pkg.image,
    },
    settings
  );
}

export default async function PackageDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const [pkg, globalPricing, settings] = await Promise.all([
    getPackageBySlug(slug),
    getPricingTables(),
    getSiteSettings(),
  ]);

  if (!pkg) {
    notFound();
  }

  return <PackagePage pkg={pkg} globalPricing={globalPricing} settings={settings} />;
}
