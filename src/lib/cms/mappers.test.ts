import { describe, expect, it } from "vitest";

import type {
  Destination as DestinationDoc,
  Experience as ExperienceDoc,
  GalleryItem as GalleryItemDoc,
  Media,
  Package as PackageDoc,
  Testimonial as TestimonialDoc,
} from "@/cms/payload-types";
import { allDestinations } from "@/cms/seed/destinations";
import { packages } from "@/cms/seed/packages";

import {
  mapDestination,
  mapExperience,
  mapGalleryItem,
  mapPackage,
  mapTestimonial,
  mediaPath,
} from "./mappers";

const ORIGIN = "https://thehimalayancompass.in";
const STAMP = "2026-10-27T00:00:00.000Z";

let nextId = 1;

function media(filename: string, sizes: { hero?: boolean } = {}): Media {
  const stem = filename.replace(/\.webp$/, "");
  return {
    id: nextId++,
    alt: filename,
    createdAt: STAMP,
    updatedAt: STAMP,
    filename,
    url: `${ORIGIN}/api/media/file/${filename}`,
    sizes: {
      card: { url: `${ORIGIN}/api/media/file/${stem}-800x533.webp` },
      hero: { url: sizes.hero ? `${ORIGIN}/api/media/file/${stem}-1920x1280.webp` : null },
      og: { url: `${ORIGIN}/api/media/file/${stem}-1200x630.webp` },
    },
  };
}

const rows = (items?: string[]) => items?.map((item) => ({ item, id: item }));

const fixture = packages[0];

function packageDoc(overrides: Partial<PackageDoc> = {}): PackageDoc {
  return {
    id: 1,
    slug: fixture.slug,
    title: fixture.title,
    image: media("packages-spiti.webp"),
    heroImage: media("packages-heroes-spiti.webp", { hero: true }),
    duration: fixture.duration,
    rating: fixture.rating,
    pickup: fixture.pickup,
    price: 32249,
    popular: true,
    pricing: { basePricePerAdult: 32249, vehicleRates: { sedan: 32249, ertiga: 38749, crysta: 54999 } },
    summary: fixture.summary,
    overview: fixture.overview,
    itinerary: rows(fixture.itinerary) ?? [],
    hiddenItinerary: rows(fixture.hiddenItinerary),
    includes: rows(fixture.includes) ?? [],
    exclusions: rows(fixture.exclusions),
    stayPlan: rows(fixture.stayPlan),
    highlights: rows(fixture.highlights),
    idealFor: rows(fixture.idealFor),
    travelNote: fixture.travelNote,
    bestTime: fixture.bestTime,
    vehicle: fixture.vehicle,
    tourType: fixture.tourType,
    maxAltitude: fixture.maxAltitude,
    faqs: fixture.faqs?.map((faq) => ({ ...faq, id: faq.question })),
    itineraryDays: fixture.itineraryDays?.map((day) => ({
      ...day,
      places: rows(day.places),
      details: day.details?.map((detail) => ({ ...detail, id: detail.title })),
      id: String(day.day),
    })),
    createdAt: STAMP,
    updatedAt: STAMP,
    _status: "published",
    ...overrides,
  };
}

function destinationDoc(slug: string, overrides: Partial<DestinationDoc> = {}): DestinationDoc {
  const source = allDestinations.find((item) => item.slug === slug);
  if (!source) throw new Error(`No destination fixture ${slug}`);
  return {
    id: 2,
    slug: source.slug,
    name: source.name,
    subtitle: source.subtitle,
    description: source.description,
    fullDescription: source.fullDescription,
    image: media(`destinations-${slug}.webp`),
    gallery: source.gallery?.map((_, index) => media(`destinations-${slug}-${index + 1}.webp`)) ?? [],
    category: "Featured Journeys",
    layout: "dedicated",
    createdAt: STAMP,
    updatedAt: STAMP,
    _status: "published",
    ...overrides,
  };
}

describe("mediaPath", () => {
  it("drops the server origin so next/image treats the file as local", () => {
    expect(mediaPath(`${ORIGIN}/api/media/file/a.webp`)).toBe("/api/media/file/a.webp");
    expect(mediaPath("/api/media/file/a.webp")).toBe("/api/media/file/a.webp");
  });
});

describe("mapPackage", () => {
  const pkg = mapPackage(packageDoc());

  it("formats the base price for display", () => {
    expect(pkg.price).toBe("₹32,249");
    expect(pkg.price).toBe(fixture.price);
  });

  it("flattens string lists and keeps every itinerary day", () => {
    expect(pkg.itinerary).toEqual(fixture.itinerary);
    expect(pkg.includes).toEqual(fixture.includes);
    expect(pkg.itineraryDays).toHaveLength(fixture.itineraryDays?.length ?? -1);
    expect(pkg.itineraryDays?.[0].places).toEqual(fixture.itineraryDays?.[0].places);
    expect(pkg.faqs).toEqual(fixture.faqs);
  });

  it("uses the media URL for the card image and prefers the hero size for the hero", () => {
    expect(pkg.image).toBe("/api/media/file/packages-spiti.webp");
    expect(pkg.heroImage).toBe("/api/media/file/packages-heroes-spiti-1920x1280.webp");
  });

  it("falls back to the original file when no hero size was generated", () => {
    const small = mapPackage(packageDoc({ heroImage: media("packages-heroes-small.webp") }));
    expect(small.heroImage).toBe("/api/media/file/packages-heroes-small.webp");
  });

  it("leaves optional fields undefined rather than null", () => {
    const bare = mapPackage(
      packageDoc({ heroImage: null, popular: null, hiddenItinerary: null, faqs: null, travelNote: null })
    );
    expect(bare.heroImage).toBeUndefined();
    expect(bare.popular).toBeUndefined();
    expect(bare.hiddenItinerary).toBeUndefined();
    expect(bare.faqs).toBeUndefined();
    expect(bare.travelNote).toBeUndefined();
  });

  it("throws with the slug when a media relation is not populated", () => {
    expect(() => mapPackage(packageDoc({ image: 7 }))).toThrow(/shimla-kinnaur-spiti-chandratal/);
  });
});

describe("mapDestination", () => {
  it("maps gallery media to URLs", () => {
    const destination = mapDestination(destinationDoc("manali"));
    expect(destination.gallery).toEqual([1, 2, 3, 4].map((n) => `/api/media/file/destinations-manali-${n}.webp`));
    expect(destination.image).toBe("/api/media/file/destinations-manali.webp");
    expect(destination.layout).toBe("dedicated");
  });

  it("leaves gallery undefined for a destination without one", () => {
    const destination = mapDestination(destinationDoc("tabo", { gallery: [], layout: "shared" }));
    expect(destination.gallery).toBeUndefined();
    expect(destination.layout).toBe("shared");
    expect(mapDestination(destinationDoc("tabo", { gallery: null })).gallery).toBeUndefined();
  });

  it("defaults a missing layout to shared", () => {
    expect(mapDestination(destinationDoc("tabo", { layout: null })).layout).toBe("shared");
  });

  it("throws with the slug when a gallery image is not populated", () => {
    expect(() => mapDestination(destinationDoc("manali", { gallery: [3] }))).toThrow(/manali/);
  });
});

describe("mapTestimonial, mapGalleryItem, mapExperience", () => {
  it("keeps the testimonial fields only", () => {
    const doc: TestimonialDoc = {
      id: 1,
      name: "Asha",
      city: "Delhi",
      tour: "Spiti",
      review: "Lovely",
      rating: 5,
      createdAt: STAMP,
      updatedAt: STAMP,
    };
    expect(mapTestimonial(doc)).toEqual({ name: "Asha", city: "Delhi", tour: "Spiti", review: "Lovely", rating: 5 });
  });

  it("falls back to the title when a gallery item has no caption", () => {
    const doc: GalleryItemDoc = {
      id: 1,
      title: "Spiti Valley",
      category: "Landscapes",
      location: "Spiti",
      size: "large",
      image: media("hero-hero-jpg.webp"),
      caption: null,
      order: 0,
      createdAt: STAMP,
      updatedAt: STAMP,
    };
    expect(mapGalleryItem(doc)).toEqual({
      title: "Spiti Valley",
      category: "Landscapes",
      location: "Spiti",
      size: "large",
      image: "/api/media/file/hero-hero-jpg.webp",
      caption: "Spiti Valley",
    });
    expect(mapGalleryItem({ ...doc, caption: "Dawn" }).caption).toBe("Dawn");
    expect(() => mapGalleryItem({ ...doc, image: 1 })).toThrow(/Spiti Valley/);
  });

  it("maps an experience with its icon name", () => {
    const doc: ExperienceDoc = {
      id: 1,
      title: "Stargazing",
      description: "Night skies",
      image: media("packages-kalpa1.webp"),
      icon: "Star",
      order: 5,
      createdAt: STAMP,
      updatedAt: STAMP,
    };
    expect(mapExperience(doc)).toEqual({
      title: "Stargazing",
      description: "Night skies",
      image: "/api/media/file/packages-kalpa1.webp",
      icon: "Star",
    });
  });
});
