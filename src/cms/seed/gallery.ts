/** Gallery images seeded into the `gallery-items` collection. */
export type GallerySeedItem = {
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
    title: "Spiti Valley",
    category: "Landscapes",
    image: "/images/hero/hero-jpg.webp",
    location: "Spiti, Himachal Pradesh",
    size: "large",
  },
  {
    title: "The Himalayan Roads",
    category: "Road Journeys",
    image: "/images/hero/hero-jpg.webp",
    location: "Mountain roads",
    size: "normal",
  },
  {
    title: "Shimla",
    category: "Mountain Towns",
    image: "/images/hero/hero-jpg.webp",
    location: "Shimla, Himachal Pradesh",
    size: "normal",
  },
  {
    title: "Manali",
    category: "Valleys",
    image: "/images/hero/hero-jpg.webp",
    location: "Manali, Himachal Pradesh",
    size: "large",
  },
  {
    title: "Life in the Mountains",
    category: "Local Life",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
  {
    title: "Beyond the Ordinary",
    category: "Landscapes",
    image: "/images/hero/hero-jpg.webp",
    location: "The Himalayas",
    size: "normal",
  },
  {
    title: "Quiet Mountain Towns",
    category: "Mountain Towns",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
  {
    title: "The Journey Itself",
    category: "Road Journeys",
    image: "/images/hero/hero-jpg.webp",
    location: "Himalayan highways",
    size: "large",
  },
  {
    title: "Valleys of Himachal",
    category: "Valleys",
    image: "/images/hero/hero-jpg.webp",
    location: "Himachal Pradesh",
    size: "normal",
  },
];
