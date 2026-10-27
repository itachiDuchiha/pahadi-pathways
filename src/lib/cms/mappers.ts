import type {
  Destination as DestinationDoc,
  Experience as ExperienceDoc,
  GalleryItem as GalleryItemDoc,
  Media,
  Package as PackageDoc,
  Testimonial as TestimonialDoc,
} from "@/cms/payload-types";

import { formatCurrency } from "@/lib/pricing";

import type {
  Destination,
  Experience,
  GalleryItem,
  Package,
  PackagePricing,
  Testimonial,
  VehicleKey,
} from "./types";

/**
 * Payload builds media URLs from `serverURL`. The site serves media from
 * its own origin, so keep only the path; next/image then treats it as a
 * local image (allowed by `images.localPatterns`).
 */
export function mediaPath(url: string): string {
  return new URL(url, "http://localhost").pathname;
}

function populated(media: number | Media | null | undefined, owner: string, field: string): Media {
  if (typeof media === "object" && media !== null) return media;

  throw new Error(`Media for "${field}" on ${owner} is not populated; read it with depth >= 1.`);
}

function mediaUrl(media: number | Media | null | undefined, owner: string, field: string): string {
  const doc = populated(media, owner, field);
  if (!doc.url) throw new Error(`Media for "${field}" on ${owner} has no URL.`);
  return mediaPath(doc.url);
}

/** The hero rendition when one was generated (only for wide originals), else the original. */
function heroUrl(media: number | Media | null | undefined, owner: string, field: string): string {
  const doc = populated(media, owner, field);
  const hero = doc.sizes?.hero?.url;
  return hero ? mediaPath(hero) : mediaUrl(doc, owner, field);
}

/** `null` becomes `undefined`, so optional domain fields stay absent. */
function opt<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

function list(rows: { item: string }[] | null | undefined): string[] | undefined {
  return rows ? rows.map((row) => row.item) : undefined;
}

const VEHICLE_KEYS: readonly VehicleKey[] = ["sedan", "ertiga", "crysta"];

/**
 * The package's `pricing` group. Vehicle rates are kept only when at
 * least one is set; a vehicle left empty then uses the base rate.
 */
export function mapPackagePricing(pricing: PackageDoc["pricing"]): PackagePricing {
  const { basePricePerAdult } = pricing;
  const rates = pricing.vehicleRates;

  if (!rates || VEHICLE_KEYS.every((key) => rates[key] == null)) return { basePricePerAdult };

  return {
    basePricePerAdult,
    vehicleRates: {
      sedan: rates.sedan ?? basePricePerAdult,
      ertiga: rates.ertiga ?? basePricePerAdult,
      crysta: rates.crysta ?? basePricePerAdult,
    },
  };
}

export function mapPackage(doc: PackageDoc): Package {
  const owner = `package "${doc.slug}"`;

  return {
    slug: doc.slug,
    title: doc.title,
    image: mediaUrl(doc.image, owner, "image"),
    heroImage: doc.heroImage ? heroUrl(doc.heroImage, owner, "heroImage") : undefined,
    duration: doc.duration,
    rating: doc.rating,
    pickup: doc.pickup,
    price: formatCurrency(doc.pricing.basePricePerAdult),
    pricing: mapPackagePricing(doc.pricing),
    popular: opt(doc.popular),
    itinerary: list(doc.itinerary) ?? [],
    hiddenItinerary: list(doc.hiddenItinerary),
    includes: list(doc.includes) ?? [],
    summary: opt(doc.summary),
    faqs: doc.faqs?.map(({ question, answer }) => ({ question, answer })),
    overview: opt(doc.overview),
    stayPlan: list(doc.stayPlan),
    highlights: list(doc.highlights),
    exclusions: list(doc.exclusions),
    travelNote: opt(doc.travelNote),
    bestTime: opt(doc.bestTime),
    vehicle: opt(doc.vehicle),
    tourType: opt(doc.tourType),
    maxAltitude: opt(doc.maxAltitude),
    idealFor: list(doc.idealFor),
    itineraryDays: doc.itineraryDays?.map((day) => ({
      day: day.day,
      title: day.title,
      start: opt(day.start),
      end: opt(day.end),
      stay: day.stay,
      description: day.description,
      places: list(day.places),
      details: day.details?.map(({ title, description }) => ({ title, description })),
    })),
  };
}

export function mapDestination(doc: DestinationDoc): Destination {
  const owner = `destination "${doc.slug}"`;
  const gallery = doc.gallery?.map((media, index) => mediaUrl(media, owner, `gallery[${index}]`));

  return {
    name: doc.name,
    slug: doc.slug,
    subtitle: doc.subtitle,
    description: doc.description,
    fullDescription: doc.fullDescription,
    gallery: gallery?.length ? gallery : undefined,
    image: mediaUrl(doc.image, owner, "image"),
    category: doc.category,
    layout: doc.layout ?? "shared",
  };
}

export function mapTestimonial(doc: TestimonialDoc): Testimonial {
  return { name: doc.name, city: doc.city, tour: doc.tour, review: doc.review, rating: doc.rating };
}

export function mapGalleryItem(doc: GalleryItemDoc): GalleryItem {
  return {
    title: doc.title,
    category: doc.category,
    image: mediaUrl(doc.image, `gallery item "${doc.title}"`, "image"),
    location: doc.location,
    size: doc.size,
    caption: doc.caption?.trim() || doc.title,
  };
}

export function mapExperience(doc: ExperienceDoc): Experience {
  return {
    title: doc.title,
    description: doc.description,
    image: mediaUrl(doc.image, `experience "${doc.title}"`, "image"),
    icon: doc.icon,
  };
}
