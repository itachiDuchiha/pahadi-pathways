/**
 * Domain types the frontend renders. Payload documents are mapped into
 * these shapes in `mappers.ts`, so components never see CMS documents.
 */
import type { MediaSettings } from "@/lib/media/compress";

export type { Testimonial } from "@/types/testimonial";

/**
 * Display order of the destination categories; the frontend sorts groups by
 * this order and the CMS offers them as the `category` select options.
 */
export const DESTINATION_CATEGORIES = [
  "Featured Journeys",
  "Along the Way",
  "Hidden Himachal",
  "Culture & Soul",
] as const;

export type DestinationCategory = (typeof DESTINATION_CATEGORIES)[number];

export type DestinationLayout = "dedicated" | "shared";

export type Destination = {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  /** Image URLs; present only when the destination has a gallery. */
  gallery?: string[];
  image: string;
  category: string;
  /** `dedicated` destinations render their own page component when one exists. */
  layout?: DestinationLayout;
};

export type GalleryItem = {
  title: string;
  category: string;
  image: string;
  location: string;
  size: "normal" | "large";
  caption: string;
};

/**
 * lucide-react icon names the experiences page maps to components; the CMS
 * offers them as the `icon` select options.
 */
export const EXPERIENCE_ICONS = [
  "Camera",
  "Compass",
  "Footprints",
  "Home",
  "Landmark",
  "Mountain",
  "Star",
  "Utensils",
] as const;

export type ExperienceIcon = (typeof EXPERIENCE_ICONS)[number];

export type Experience = {
  title: string;
  description: string;
  image: string;
  icon: ExperienceIcon;
};

export type VehicleKey = "sedan" | "ertiga" | "crysta";

/** A package's own pricing, from its `pricing` group in the CMS. */
export type PackagePricing = {
  /** Rupees per adult before upgrades and GST. */
  basePricePerAdult: number;
  /** Fixed per-adult rate for each vehicle; absent when the package has none. */
  vehicleRates?: Record<VehicleKey, number>;
  /** The package's own hotel tiers; absent when it uses the site-wide ones. */
  stayOptions?: PricingOption[];
  /** The package's own meal plans; absent when it uses the site-wide ones. */
  mealOptions?: PricingOption[];
};

/**
 * A published package. `price` is the display string derived from
 * `pricing.basePricePerAdult`; it is never stored.
 */
export type Package = {
  slug: string;
  title: string;
  image: string;
  heroImage?: string;
  duration: string;
  rating: number;
  pickup: string;
  price: string;
  popular?: boolean;

  itinerary: string[];
  hiddenItinerary?: string[];
  includes: string[];

  summary?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];

  // Package Details
  overview?: string;
  stayPlan?: string[];
  highlights?: string[];
  exclusions?: string[];
  travelNote?: string;
  bestTime?: string;
  vehicle?: string;
  tourType?: string;
  maxAltitude?: string;
  idealFor?: string[];

  itineraryDays?: {
    day: number;
    title: string;
    start?: string;
    end?: string;
    stay: string;
    description: string;
    places?: string[];
    details?: {
      title: string;
      description: string;
    }[];
  }[];

  pricing: PackagePricing;
};

/** A package without its pricing group: the seed's authored content, and all that llms.txt and JSON-LD read. */
export type PackageContent = Omit<Package, "pricing">;

/** A stay or meal option: rupees per booking per night (once, regardless of adults), times the package's nights. */
export type PricingOption = { label: string; deltaPerNight: number };

export type VehiclePriceOption = {
  label: string;
  key: VehicleKey;
  perDayUpgrade: number;
  /** Per-day upgrade on Spiti routes; omitted when unset, so `perDayUpgrade` applies. */
  perDayUpgradeSpiti?: number;
};

/** Option tables and rules that `computePackagePrice` needs. */
export type PricingTables = {
  stayOptions: PricingOption[];
  mealOptions: PricingOption[];
  vehicleOptions: VehiclePriceOption[];
  gstPercent: number;
  childFreeUnderAge: number;
  childPercentOfAdult: number;
};

/** Contact details and identity, the same shape as `site` in `src/config/site.ts`. */
export type Site = {
  name: string;
  tagline: string;
  url: string;
  phone: { display: string; e164: string; whatsapp: string };
  email: string;
  social: { instagram: string; facebook: string };
  address: { region: string; country: string };
  /** How uploaded images are compressed, with the defaults applied. */
  media: MediaSettings;
};

export type GrievanceOfficer = { name: string; email: string; phone: string };

/** The `legal-settings` global merged over its defaults. */
export type Legal = {
  /** Present only once name, email and phone are all set. */
  grievanceOfficer?: GrievanceOfficer;
  dataContactEmail: string;
  /** ISO date or timestamp. */
  effectiveDate: string;
  deletionWindowMonths: number;
  retentionStatement: string;
};
