function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const siteUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thehimalayancompass.in"
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
} as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.phone.whatsapp}`;

  if (!message) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:${site.phone.e164}`;
}

export function mailtoUrl(): string {
  return `mailto:${site.email}`;
}
