export type Package = {
  title: string;
  image: string;
  duration: string;
  rating: number;
  pickup: string;
 price: string;
  popular?: boolean;

  itinerary: string[];
  hiddenItinerary?: string[];

  includes: string[];
};

export const packages: Package[] = [
  {
    title: "Spiti: Beyond the Passes",
    image: "/images/packages/spiti-package.jpg",
    duration: "7N / 8D",
    rating: 5.0,
    pickup: "Chandigarh",
    price: "₹31,999",
    popular: true,

    itinerary: [
      "1N Shimla",
      "1N Sangla",
      "1N Kalpa",
    ],

    hiddenItinerary: [
      "1N Tabo",
      "2N Kaza",
      "1N Manali",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },

  {
    title: "Shimla & Manali Honeymoon",
    image: "/images/packages/shimla-package.jpg",
    duration: "5N / 6D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹24,999",

    itinerary: [
      "2N Shimla",
      "3N Manali",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },

  {
    title: "Jibhi: Hidden Himalayan Escape",
    image: "/images/packages/manali-package.jpg",
    duration: "5N / 6D",
    rating: 4.8,
    pickup: "Chandigarh",
    price: "₹17,499",

    itinerary: [
      "2N Manali",
      "1N Kasol",
      "2N Jibhi",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },

  {
    title: "Tirthan Valley Escape",
    image: "/images/packages/manali-package.jpg",
    duration: "4N / 5D",
    rating: 4.8,
    pickup: "Chandigarh",
    price: "₹16,999",

    itinerary: [
      "2N Tirthan",
      "2N Shoja",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },

  {
    title: "Bir & Dharamshala Adventure",
    image: "/images/packages/shimla-package.jpg",
    duration: "5N / 6D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹21,999",

    itinerary: [
      "2N Dharamshala",
      "3N Bir",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },

  {
    title: "Kinnaur: Valleys Beyond",
    image: "/images/packages/spiti-package.jpg",
    duration: "6N / 7D",
    rating: 4.8,
    pickup: "Chandigarh",
    price: "₹27,999",

    itinerary: [
      "2N Sarahan",
      "2N Sangla",
      "2N Kalpa",
    ],

    includes: [
      "Transfer",
      "Stay",
      "Meals",
    ],
  },
];