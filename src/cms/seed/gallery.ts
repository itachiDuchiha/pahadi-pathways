/** Gallery images seeded into the `gallery-items` collection. */
export type GallerySeedItem = {
  /** Seeded items are images; videos are added in the admin. */
  kind: "image";
  title: string;
  category: string;
  image: string;
  location: string;
  size: "normal" | "large";
};

/*
  TEMPORARY GALLERY IMAGES

  All gallery cards currently use the same image for testing.
  Later, replace each image path with your own image filename.

  Example:
  "/images/gallery/spiti-valley.webp"
*/

export const galleryItems: GallerySeedItem[] = [
  {
    kind: "image",
    title: "Spiti Valley",
    category: "Landscapes",
    image: "/images/hero/hero-jpg.webp",
    location: "Spiti, Himachal Pradesh",
    size: "large",
  },
  {
    kind: "image",
    title: "The Himalayan Roads",
    category: "Road Journeys",
    image: "/images/hero/hero-jpg.webp",
    location: "Mountain roads",
    size: "normal",
  },
  {
    kind: "image",
    title: "Shimla",
    category: "Mountain Towns",
    image: "/images/hero/hero-jpg.webp",
    location: "Shimla, Himachal Pradesh",
    size: "normal",
  },
  {
    kind: "image",
    title: "Manali",
    category: "Valleys",
    image: "/images/hero/hero-jpg.webp",
    location: "Manali, Himachal Pradesh",
    size: "large",
  },
  {
    kind: "image",
    title: "Life in the Mountains",
    category: "Local Life",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
  {
    kind: "image",
    title: "Beyond the Ordinary",
    category: "Landscapes",
    image: "/images/hero/hero-jpg.webp",
    location: "The Himalayas",
    size: "normal",
  },
  {
    kind: "image",
    title: "Quiet Mountain Towns",
    category: "Mountain Towns",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
  {
    kind: "image",
    title: "The Journey Itself",
    category: "Road Journeys",
    image: "/images/hero/hero-jpg.webp",
    location: "Himalayan highways",
    size: "large",
  },
  {
    kind: "image",
    title: "Valleys of Himachal",
    category: "Valleys",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
];
