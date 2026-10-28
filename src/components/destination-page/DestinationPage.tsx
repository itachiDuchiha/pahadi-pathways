import { createElement } from "react";

import { getDestinationPage, type DestinationPageProps } from "@/components/destination-page/registry";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, destinationJsonLd } from "@/lib/structured-data";

/** A destination's page; the public route and the draft preview both render it. */
export default function DestinationPage({ destination, packages }: DestinationPageProps) {
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

      {createElement(getDestinationPage(destination), {
        destination,
        packages,
      })}
    </>
  );
}
