import { site } from "@/config/site";
import type { Destination, PackageContent, Site } from "@/lib/cms/types";
import { parsePackagePrice } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/seo";

export type JsonLdObject = Record<string, unknown>;

const SCHEMA_CONTEXT = "https://schema.org";

type Faq = { question: string; answer: string };
type Crumb = { name: string; path: string };

/** `settings` is the merged site settings; the URL always comes from the environment. */
function organization(settings: Site): JsonLdObject {
  return {
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#organization"),
    name: settings.name,
    url: site.url,
    logo: absoluteUrl("/images/logo/full-logo.webp"),
    telephone: settings.phone.e164,
    email: settings.email,
    sameAs: [settings.social.instagram, settings.social.facebook],
    areaServed: "Himachal Pradesh, India",
    address: {
      "@type": "PostalAddress",
      addressRegion: settings.address.region,
      addressCountry: settings.address.country,
    },
  };
}

export function organizationJsonLd(settings: Site): JsonLdObject {
  return { "@context": SCHEMA_CONTEXT, ...organization(settings) };
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

export function contactPageJsonLd(settings: Site): JsonLdObject {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPage",
    name: `Contact ${settings.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      ...organization(settings),
      "@type": ["TravelAgency", "LocalBusiness"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: settings.phone.e164,
        email: settings.email,
        areaServed: "IN",
      },
    },
  };
}

export function packageJsonLd(pkg: PackageContent, settings: Site): JsonLdObject {
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
    provider: organization(settings),
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
