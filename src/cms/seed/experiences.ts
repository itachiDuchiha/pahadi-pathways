import type { Experience } from "@/cms/payload-types";

/** Experiences seeded into the `experiences` collection. */
export type ExperienceSeedItem = {
  title: string;
  description: string;
  image: string;
  /** A lucide-react icon name; the experiences page maps it to a component. */
  icon: Experience["icon"];
};

export const experiences: ExperienceSeedItem[] = [
  {
    title: "Himalayan Road Trips",
    description:
      "Take the long way through dramatic mountain roads, high passes, river valleys and remote landscapes.",
    image: "/images/hero/hero-jpg.webp",
    icon: "Mountain",
  },
  {
    title: "Village Life & Homestays",
    description:
      "Slow down in mountain villages, discover local traditions and experience a quieter side of Himachal.",
    image: "/images/packages/manali.webp",
    icon: "Home",
  },
  {
    title: "Monasteries & Culture",
    description:
      "Discover ancient monasteries, Buddhist traditions, mountain temples and local stories.",
    image: "/images/packages/spiti.webp",
    icon: "Landmark",
  },
  {
    title: "Adventure & Trekking",
    description:
      "Explore mountain trails, valleys and outdoor adventures. Activities depend on season and availability.",
    image: "/images/packages/manali.webp",
    icon: "Footprints",
  },
  {
    title: "Food & Local Flavours",
    description:
      "Discover traditional dishes, local ingredients and regional flavours that make every journey memorable.",
    image: "/images/packages/shimla.webp",
    icon: "Utensils",
  },
  {
    title: "Stargazing & Night Skies",
    description:
      "Discover quieter mountain destinations where clear skies can offer beautiful views of the stars.",
    image: "/images/packages/kalpa1.webp",
    icon: "Star",
  },
  {
    title: "Photography & Scenic Views",
    description:
      "From sunrise over mountain ranges to winding roads and quiet villages, find moments worth capturing.",
    image: "/images/packages/dharamshala.webp",
    icon: "Camera",
  },
  {
    title: "Offbeat Himalayan Exploration",
    description:
      "Go beyond familiar routes and discover remote landscapes, peaceful villages and lesser-known corners.",
    image: "/images/packages/keylong.webp",
    icon: "Compass",
  },
];
