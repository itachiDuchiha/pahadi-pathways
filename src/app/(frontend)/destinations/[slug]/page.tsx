import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DestinationPage from "@/components/destination-page/DestinationPage";
import { getDestinationBySlug, getDestinations } from "@/lib/cms/destinations";
import { assertContentPresent } from "@/lib/cms/guard";
import { getPackages } from "@/lib/cms/packages";
import { getSiteSettings } from "@/lib/cms/site";
import { pageMetadata, truncate } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const destinations = await getDestinations();
  assertContentPresent(destinations.length, "destinations");

  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Not found" };
  }

  const settings = await getSiteSettings();

  return pageMetadata(
    {
      title: destination.name,
      description: truncate(destination.description, 155),
      path: `/destinations/${destination.slug}`,
      image: destination.image,
    },
    settings
  );
}

export default async function DestinationDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [destination, packages] = await Promise.all([getDestinationBySlug(slug), getPackages()]);

  if (!destination) {
    notFound();
  }

  return <DestinationPage destination={destination} packages={packages} />;
}
