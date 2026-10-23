import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createElement } from "react";

import { getDestinationPage } from "@/components/destination-page/registry";
import JsonLd from "@/components/seo/JsonLd";
import { allDestinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { pageMetadata, truncate } from "@/lib/seo";
import { breadcrumbJsonLd, destinationJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function findDestination(slug: string) {
  return allDestinations.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return allDestinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = findDestination(slug);

  if (!destination) {
    return { title: "Not found" };
  }

  return pageMetadata({
    title: destination.name,
    description: truncate(destination.description, 155),
    path: `/destinations/${destination.slug}`,
    image: destination.image,
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = findDestination(slug);

  if (!destination) {
    notFound();
  }

  // The registry returns stable, module-level components, so creating the
  // element from the looked-up type does not remount anything per render.
  return (
    <>
      <JsonLd data={destinationJsonLd(destination)} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ])}
      />

      {createElement(getDestinationPage(destination.slug), {
        destination,
        packages,
      })}
    </>
  );
}
