function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const siteUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://thehimalayancompass.in"
);

export const site = {
  name: "The Himalayan Compass",
  tagline: "Handcrafted Himalayan Journeys",
  url: siteUrl,
  phone: {
    display: "+91 75596 97919",
    e164: "+917559697919",
    whatsapp: "917559697919",
  },
  email: "thehimalayancompass@gmail.com",
  social: {
    instagram: "https://www.instagram.com/thehimalayancompass.in/",
    facebook: "https://www.facebook.com/profile.php?id=61595698851399",
  },
  address: {
    region: "Himachal Pradesh",
    country: "IN",
  },
  /** Upload compression defaults; the owner changes them in the site settings. */
  media: {
    imageQuality: "balanced",
    maxImageWidth: 2400,
  },
} as const;

/**
 * The contact details the link helpers need. `site` above satisfies it, and
 * so does the merged CMS value, so callers pass whichever they hold.
 */
export type ContactDetails = {
  phone: { e164: string; whatsapp: string };
  email: string;
};

export function whatsappUrl(details: ContactDetails, message?: string): string {
  const base = `https://wa.me/${details.phone.whatsapp}`;

  if (!message) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telUrl(details: ContactDetails): string {
  return `tel:${details.phone.e164}`;
}

export function mailtoUrl(details: ContactDetails): string {
  return `mailto:${details.email}`;
}
