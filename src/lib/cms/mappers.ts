import type {
  Destination as DestinationDoc,
  Experience as ExperienceDoc,
  GalleryItem as GalleryItemDoc,
  Media,
  Package as PackageDoc,
  Testimonial as TestimonialDoc,
} from "@/cms/payload-types";

import { formatCurrency } from "@/lib/pricing";

import { mediaFileExists } from "./media-files";

import type {
  Destination,
  Experience,
  GalleryItem,
  Package,
  PackagePricing,
  PricingOption,
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

/** Shown in place of an image whose file is gone from the media directory. */
export const PLACEHOLDER_IMAGE = "/images/placeholder.webp";

const warnedMissing = new Set<string>();

/** Lets tests see the warning again; each missing file is otherwise reported once per process. */
export function resetMissingMediaWarnings(): void {
  warnedMissing.clear();
}

type FileExists = (filename: string) => boolean;

function storedName(url: string, filename: string | null | undefined): string {
  return filename ?? mediaPath(url).split("/").pop() ?? "";
}

/** Reports a missing file once per process; `outcome` says what is shown instead. */
function warnMissing(name: string, outcome: string): void {
  if (warnedMissing.has(name)) return;
  warnedMissing.add(name);
  console.warn(`Media file "${name}" is missing from the media directory; ${outcome}.`);
}

/** The site path for a stored file, or the placeholder (with one warning per file) when it is missing. */
function servedPath(url: string, filename: string | null | undefined, exists: FileExists): string {
  const name = storedName(url, filename);
  if (exists(name)) return mediaPath(url);

  warnMissing(name, "showing a placeholder image");
  return PLACEHOLDER_IMAGE;
}

export function mediaUrl(
  media: number | Media | null | undefined,
  owner: string,
  field: string,
  exists: FileExists = mediaFileExists
): string {
  const doc = populated(media, owner, field);
  if (!doc.url) throw new Error(`Media for "${field}" on ${owner} has no URL.`);
  return servedPath(doc.url, doc.filename, exists);
}

/** The hero rendition when one was generated (only for wide originals), else the original. */
export function heroUrl(
  media: number | Media | null | undefined,
  owner: string,
  field: string,
  exists: FileExists = mediaFileExists
): string {
  const doc = populated(media, owner, field);
  const hero = doc.sizes?.hero;
  return hero?.url ? servedPath(hero.url, hero.filename, exists) : mediaUrl(doc, owner, field, exists);
}

/** `null` becomes `undefined`, so optional domain fields stay absent. */
function opt<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

function list(rows: { item: string }[] | null | undefined): string[] | undefined {
  return rows ? rows.map((row) => row.item) : undefined;
}

const VEHICLE_KEYS: readonly VehicleKey[] = ["sedan", "ertiga", "crysta"];

/** Stay or meal option rows with trimmed labels, as the enquiry schema trims submitted ones. */
export function mapPricingOptions(
  rows: readonly { label: string; deltaPerNight: number }[] | null | undefined
): PricingOption[] {
  return (rows ?? []).map(({ label, deltaPerNight }) => ({ label: label.trim(), deltaPerNight }));
}

function vehicleRatesOf(pricing: PackageDoc["pricing"]): PackagePricing["vehicleRates"] {
  const { basePricePerAdult } = pricing;
  const rates = pricing.vehicleRates;

  if (!rates || VEHICLE_KEYS.every((key) => rates[key] == null)) return undefined;

  return {
    sedan: rates.sedan ?? basePricePerAdult,
    ertiga: rates.ertiga ?? basePricePerAdult,
    crysta: rates.crysta ?? basePricePerAdult,
  };
}

/**
 * The package's `pricing` group. Vehicle rates are kept only when at
 * least one is set; a vehicle left empty then uses the base rate. Stay
 * and meal lists are kept only when filled in; an empty list means the
 * package uses the site-wide options.
 */
export function mapPackagePricing(pricing: PackageDoc["pricing"]): PackagePricing {
  const vehicleRates = vehicleRatesOf(pricing);
  const stayOptions = mapPricingOptions(pricing.stayOptions);
  const mealOptions = mapPricingOptions(pricing.mealOptions);

  return {
    basePricePerAdult: pricing.basePricePerAdult,
    ...(vehicleRates && { vehicleRates }),
    ...(stayOptions.length > 0 && { stayOptions }),
    ...(mealOptions.length > 0 && { mealOptions }),
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

/** A video poster at the card size when one was generated (small posters have none), else the original. */
function posterUrl(media: number | Media | null | undefined, owner: string, exists: FileExists): string {
  const doc = populated(media, owner, "poster");
  const card = doc.sizes?.card;
  return card?.url ? servedPath(card.url, card.filename, exists) : mediaUrl(doc, owner, "poster", exists);
}

/**
 * A gallery item. A video item whose video file is missing is left out
 * (`null`, with one warning), so no card shows a video that cannot play.
 */
export function mapGalleryItem(doc: GalleryItemDoc, exists: FileExists = mediaFileExists): GalleryItem | null {
  const owner = `gallery item "${doc.title}"`;
  const common = {
    title: doc.title,
    category: doc.category,
    location: doc.location,
    size: doc.size,
    caption: doc.caption?.trim() || doc.title,
  };

  if (doc.kind === "video") {
    const video = populated(doc.video, owner, "video");
    if (!video.url) throw new Error(`Media for "video" on ${owner} has no URL.`);
    const poster = posterUrl(doc.poster, owner, exists);
    const name = storedName(video.url, video.filename);

    if (exists(name)) {
      return { kind: "video", ...common, image: poster, video: { src: mediaPath(video.url), poster } };
    }
    warnMissing(name, `leaving ${owner} out`);
    return null;
  }

  return { kind: "image", ...common, image: mediaUrl(doc.image, owner, "image", exists) };
}

export function mapExperience(doc: ExperienceDoc): Experience {
  return {
    title: doc.title,
    description: doc.description,
    image: mediaUrl(doc.image, `experience "${doc.title}"`, "image"),
    icon: doc.icon,
  };
}
