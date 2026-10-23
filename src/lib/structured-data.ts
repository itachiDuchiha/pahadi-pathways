import { site } from "@/config/site";
import type { Destination } from "@/data/destinations";
import type { Package } from "@/data/packages";
import { parsePackagePrice } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/seo";

export type JsonLdObject = Record<string, unknown>;

const SCHEMA_CONTEXT = "https://schema.org";

type Faq = { question: string; answer: string };
type Crumb = { name: string; path: string };

function organization(): JsonLdObject {
  return {
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/images/logo/full-logo.png"),
    telephone: site.phone.e164,
    email: site.email,
    sameAs: [site.social.instagram, site.social.facebook],
    areaServed: "Himachal Pradesh, India",
    address: {
      "@type": "PostalAddress",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  };
}

export function organizationJsonLd(): JsonLdObject {
  return { "@context": SCHEMA_CONTEXT, ...organization() };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/packages?destination={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function contactPageJsonLd(): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      ...organization(),
      "@type": ["TravelAgency", "LocalBusiness"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone.e164,
        email: site.email,
        areaServed: "IN",
      },
    },
  };
}

export function packageJsonLd(pkg: Package): JsonLdObject {
  const url = absoluteUrl(`/packages/${pkg.slug}`);
  const stops = pkg.itineraryDays?.map((day) => day.title) ?? pkg.itinerary;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary ?? pkg.overview ?? pkg.title,
    image: absoluteUrl(pkg.heroImage ?? pkg.image),
    url,
    ...(pkg.idealFor?.length ? { touristType: pkg.idealFor } : {}),
    itinerary: {
      "@type": "ItemList",
      numberOfItems: stops.length,
      itemListElement: stops.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
    offers: {
      "@type": "Offer",
      price: parsePackagePrice(pkg.price),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
    },
    provider: organization(),
  };
}

export function destinationJsonLd(destination: Destination): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.fullDescription ?? destination.description,
    image: absoluteUrl(destination.image),
    url: absoluteUrl(`/destinations/${destination.slug}`),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Himachal Pradesh",
    },
  };
}

export function breadcrumbJsonLd(items: Crumb[]): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
