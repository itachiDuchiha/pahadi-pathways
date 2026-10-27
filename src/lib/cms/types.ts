/**
 * Domain types the frontend renders. Payload documents are mapped into
 * these shapes in `mappers.ts`, so components never see CMS documents.
 */
import type { VehicleKey } from "@/lib/pricing";

export type { Package } from "@/cms/seed/packages";
export type { Testimonial } from "@/types/testimonial";

export type DestinationCategory =
  | "Featured Journeys"
  | "Along the Way"
  | "Hidden Himachal"
  | "Culture & Soul";

/** Display order of the destination categories. */
export const DESTINATION_CATEGORIES: readonly DestinationCategory[] = [
  "Featured Journeys",
  "Along the Way",
  "Hidden Himachal",
  "Culture & Soul",
];

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

export type ExperienceIcon =
  | "Camera"
  | "Compass"
  | "Footprints"
  | "Home"
  | "Landmark"
  | "Mountain"
  | "Star"
  | "Utensils";

export type Experience = {
  title: string;
  description: string;
  image: string;
  icon: ExperienceIcon;
};

export type PriceOption = { label: string; delta: number };

export type VehiclePriceOption = {
  label: string;
  key: VehicleKey;
  perDayUpgrade: number;
  /** Per-day upgrade on Spiti routes; absent when it equals `perDayUpgrade`. */
  perDayUpgradeSpiti?: number;
};

/** Option tables and rules that `computePackagePrice` needs. */
export type PricingTables = {
  stayOptions: PriceOption[];
  mealOptions: PriceOption[];
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
};
