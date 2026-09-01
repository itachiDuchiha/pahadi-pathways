export type Package = {
  slug: string;
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
    stay: string;
    description: string;
  }[];
};

export const packages: Package[] = [
  {
  slug: "spiti-beyond-the-passes",

  title: "Spiti: Beyond the Passes",

  image: "/images/packages/spiti-package.jpg",

  duration: "10N / 9D",

  rating: 5.0,

  pickup: "Chandigarh",

  price: "₹31,999",

  popular: true,

  itinerary: [
    "2N Shimla",
    "2N Sangla",
    "1N Kalpa",
  ],

  hiddenItinerary: [
    "1N Tabo",
    "3N Kaza",
  ],

  includes: [
    "Transfer",
    "Stay",
    "Meals",
  ],

  overview:
    "Experience one of the most spectacular road journeys in the Himalayas. This carefully planned itinerary takes you through the lush valleys of Kinnaur into the cold desert of Spiti Valley. Explore ancient monasteries, remote villages, dramatic landscapes and some of the highest motorable settlements in the world while enjoying comfortable stays and private transportation.",

  stayPlan: [
    "Shimla – 2 Nights",
    "Sangla – 2 Nights",
    "Kalpa – 1 Night",
    "Tabo – 1 Night",
    "Kaza – 3 Nights",
  ],

  highlights: [
    "Shimla",
    "Sangla Valley",
    "Chitkul Village",
    "Kalpa",
    "Roghi Village",
    "Nako Lake",
    "Tabo Monastery",
    "Dhankar Monastery",
    "Key Monastery",
    "Kibber Village",
    "Chicham Bridge",
    "Langza",
    "Hikkim",
    "Komic",
    "Kaza Market",
  ],

  exclusions: [
    "Airfare / Train Tickets",
    "Personal Expenses",
    "Adventure Activities",
    "Travel Insurance",
    "Anything not mentioned under inclusions",
  ],

  bestTime: "May to October",

  vehicle: "Private SUV / Innova Crysta",

  tourType: "Private Tour",

  maxAltitude: "4,587 m (Komic Village)",

  idealFor: [
    "Families",
    "Couples",
    "Friends",
    "Photographers",
    "Adventure Travelers",
  ],

  travelNote:
    "Road conditions in Kinnaur and Spiti depend on weather and local administration. Sightseeing may change due to landslides, snowfall or road closures. This itinerary is recommended with a private SUV.",

  itineraryDays: [
    {
      day: 1,
      title: "Chandigarh → Shimla",
      stay: "Shimla",
      description:
        "Pickup from Chandigarh and drive to Shimla. Visit Mall Road, The Ridge and Christ Church before overnight stay."
    },

    {
      day: 2,
      title: "Shimla → Sangla",
      stay: "Sangla",
      description:
        "Drive via Rampur, Sarahan and Karcham into the beautiful Baspa Valley. Overnight stay in Sangla."
    },

    {
      day: 3,
      title: "Sangla → Chitkul → Sangla",
      stay: "Sangla",
      description:
        "Visit Chitkul, India's last inhabited village near the Indo-Tibetan border. Return to Sangla."
    },

    {
      day: 4,
      title: "Sangla → Kalpa",
      stay: "Kalpa",
      description:
        "Drive to Kalpa via Reckong Peo. Visit Roghi Village and admire the Kinner Kailash mountain range."
    },

    {
      day: 5,
      title: "Kalpa → Nako → Tabo",
      stay: "Tabo",
      description:
        "Visit Nako Lake and Nako Village before reaching the famous Tabo Monastery."
    },

    {
      day: 6,
      title: "Tabo → Dhankar → Kaza",
      stay: "Kaza",
      description:
        "Explore Dhankar Monastery and continue towards Kaza. Evening free to explore Kaza Market."
    },

    {
      day: 7,
      title: "Kaza Local Sightseeing",
      stay: "Kaza",
      description:
        "Visit Key Monastery, Kibber Village, Chicham Bridge and surrounding villages."
    },

    {
      day: 8,
      title: "Langza → Hikkim → Komic",
      stay: "Kaza",
      description:
        "Explore Langza Buddha Statue, Hikkim Post Office and Komic, one of the world's highest villages."
    },

    {
      day: 9,
      title: "Kaza → Shimla",
      stay: "Shimla",
      description:
        "Begin the return journey through Kinnaur to Shimla. Overnight stay in Shimla."
    },

    {
      day: 10,
      title: "Shimla → Chandigarh",
      stay: "-",
      description:
        "After breakfast, drive back to Chandigarh for your onward journey."
    }
  ]
},

  {
    slug: "shimla-manali-honeymoon",
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
    slug: "jibhi-hidden-himalayan-escape",
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
    slug: "tirthan-valley-escape",
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
    slug: "bir-dharamshala-adventure",
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
    slug: "kinnaur-valleys-beyond",
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