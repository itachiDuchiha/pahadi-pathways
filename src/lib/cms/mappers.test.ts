import { afterEach, describe, expect, it, vi } from "vitest";

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
  mediaUrl,
  heroUrl,
  PLACEHOLDER_IMAGE,
  resetMissingMediaWarnings,
} from "./mappers";

// The fixtures name files that are not on disk; the mapping tests below
// treat every file as present. Missing files are tested with `exists`.
vi.mock("./media-files", () => ({ mediaFileExists: () => true }));

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

function videoMedia(filename: string): Media {
  return {
    id: nextId++,
    alt: filename,
    createdAt: STAMP,
    updatedAt: STAMP,
    filename,
    mimeType: "video/mp4",
    url: `${ORIGIN}/api/media/file/${filename}`,
    sizes: { card: { url: null }, hero: { url: null }, og: { url: null } },
  };
}

function videoItemDoc(overrides: Partial<GalleryItemDoc> = {}): GalleryItemDoc {
  const poster = media("poster.webp");
  poster.sizes!.card!.filename = "poster-800x533.webp";
  return {
    id: 3,
    kind: "video",
    title: "Road to Kaza",
    category: "Road Journeys",
    location: "Spiti",
    size: "normal",
    image: null,
    video: videoMedia("road.mp4"),
    poster,
    caption: null,
    order: 0,
    createdAt: STAMP,
    updatedAt: STAMP,
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

  it("keeps the pricing group so the booking panel and the server read the same rates", () => {
    expect(pkg.pricing).toEqual({
      basePricePerAdult: 32249,
      vehicleRates: { sedan: 32249, ertiga: 38749, crysta: 54999 },
    });
  });

  it("drops vehicle rates when none is set and fills an empty one from the base rate", () => {
    const empty = { sedan: null, ertiga: null, crysta: null };
    expect(mapPackage(packageDoc({ pricing: { basePricePerAdult: 20000, vehicleRates: empty } })).pricing).toEqual({
      basePricePerAdult: 20000,
    });
    expect(mapPackage(packageDoc({ pricing: { basePricePerAdult: 20000 } })).pricing).toEqual({
      basePricePerAdult: 20000,
    });

    const partial = mapPackage(
      packageDoc({ pricing: { basePricePerAdult: 20000, vehicleRates: { ...empty, crysta: 30000 } } })
    );
    expect(partial.pricing.vehicleRates).toEqual({ sedan: 20000, ertiga: 20000, crysta: 30000 });
    expect(partial.price).toBe("₹20,000");
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
      kind: "image",
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
      kind: "image",
      title: "Spiti Valley",
      category: "Landscapes",
      location: "Spiti",
      size: "large",
      image: "/api/media/file/hero-hero-jpg.webp",
      caption: "Spiti Valley",
    });
    expect(mapGalleryItem({ ...doc, caption: "Dawn" })?.caption).toBe("Dawn");
    expect(() => mapGalleryItem({ ...doc, image: 1 })).toThrow(/Spiti Valley/);
  });

  it("maps a video item to the video file and the poster's card size", () => {
    const doc = videoItemDoc();
    expect(mapGalleryItem(doc)).toEqual({
      kind: "video",
      title: "Road to Kaza",
      category: "Road Journeys",
      location: "Spiti",
      size: "normal",
      image: "/api/media/file/poster-800x533.webp",
      caption: "Road to Kaza",
      video: { src: "/api/media/file/road.mp4", poster: "/api/media/file/poster-800x533.webp" },
    });
  });

  it("uses the poster original when it has no card size", () => {
    const poster = media("small-poster.webp");
    poster.sizes = { card: { url: null } };
    expect(mapGalleryItem(videoItemDoc({ poster }))?.video?.poster).toBe("/api/media/file/small-poster.webp");
  });

  it("throws for a video item whose video or poster is not populated", () => {
    expect(() => mapGalleryItem(videoItemDoc({ video: 4 }))).toThrow(/Road to Kaza/);
    expect(() => mapGalleryItem(videoItemDoc({ poster: 5 }))).toThrow(/Road to Kaza/);
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

describe("missing media files", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetMissingMediaWarnings();
  });

  it("keeps the media path when the file exists", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(mediaUrl(media("a.webp"), "owner", "image", () => true)).toBe("/api/media/file/a.webp");
    expect(warn).not.toHaveBeenCalled();
  });

  it("returns the placeholder and warns once per file when the file is missing", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const doc = media("a.webp");
    expect(mediaUrl(doc, "owner", "image", () => false)).toBe(PLACEHOLDER_IMAGE);
    expect(mediaUrl(doc, "other", "image", () => false)).toBe(PLACEHOLDER_IMAGE);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("a.webp");
  });

  it("still throws for an unpopulated relation", () => {
    expect(() => mediaUrl(7, "owner", "image", () => false)).toThrow(/not populated/);
    expect(() => heroUrl(7, "owner", "image", () => false)).toThrow(/not populated/);
  });

  it("checks the hero rendition's own file and falls back to the placeholder", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const doc = media("h.webp", { hero: true });
    doc.sizes!.hero!.filename = "h-1920x1280.webp";
    const onlyOriginal = (name: string) => name === "h.webp";
    expect(heroUrl(doc, "owner", "heroImage", () => true)).toBe("/api/media/file/h-1920x1280.webp");
    expect(heroUrl(doc, "owner", "heroImage", onlyOriginal)).toBe(PLACEHOLDER_IMAGE);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("h-1920x1280.webp");
  });

  it("uses the original when there is no hero rendition", () => {
    expect(heroUrl(media("a.webp"), "owner", "heroImage", () => true)).toBe("/api/media/file/a.webp");
  });

  it("shows the placeholder poster when the poster's file is missing", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const item = mapGalleryItem(videoItemDoc(), (name) => name !== "poster-800x533.webp");
    expect(item?.video).toEqual({ src: "/api/media/file/road.mp4", poster: PLACEHOLDER_IMAGE });
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("falls back to the item's image when the video file is missing", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const doc = videoItemDoc({ image: media("still.webp") });
    const item = mapGalleryItem(doc, (name) => name !== "road.mp4");
    expect(item).toMatchObject({ kind: "image", image: "/api/media/file/still.webp" });
    expect(item).not.toHaveProperty("video");
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("road.mp4");
  });

  it("skips a video item with a missing video file and no image, warning once", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const missingVideo = (name: string) => name !== "road.mp4";
    expect(mapGalleryItem(videoItemDoc(), missingVideo)).toBeNull();
    expect(mapGalleryItem(videoItemDoc(), missingVideo)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("road.mp4");
  });
});
