export const allDestinations = [
  // ================= FEATURED JOURNEYS =================

  {
    name: "Shimla",
    slug: "shimla",
    subtitle: "The Queen of Hills",
    description:
      "Colonial charm, pine forests and beautiful Himalayan views.",
    image: "/images/destinations/shimla.jpg",
    category: "Featured Journeys",
  },

  {
    name: "Manali",
    slug: "manali",
    subtitle: "Adventure in the Mountains",
    description:
      "Snow peaks, rivers, forests and unforgettable mountain adventures.",
    image: "/images/destinations/manali.jpg",
    category: "Featured Journeys",
  },

  {
    name: "Spiti Valley",
    slug: "spiti-valley",
    subtitle: "The Middle Land",
    description:
      "Ancient monasteries and dramatic Himalayan landscapes.",
    image: "/images/destinations/spiti.jpg",
    category: "Featured Journeys",
  },

  // ================= ALONG THE WAY =================

  {
    name: "Kufri",
    slug: "kufri",
    subtitle: "Snow & Scenic Views",
    description:
      "A popular stop near Shimla known for panoramic Himalayan views.",
    image: "/images/destinations/shimla.jpg",
    category: "Along the Way",
  },

  {
    name: "Solang Valley",
    slug: "solang-valley",
    subtitle: "Adventure Hub",
    description:
      "A scenic valley surrounded by majestic mountains.",
    image: "/images/destinations/manali.jpg",
    category: "Along the Way",
  },

  {
    name: "Khajjiar",
    slug: "khajjiar",
    subtitle: "Mini Switzerland",
    description:
      "Rolling green meadows surrounded by cedar forests.",
    image: "/images/destinations/shimla.jpg",
    category: "Along the Way",
  },

  // ================= HIDDEN HIMACHAL =================

  {
    name: "Chitkul",
    slug: "chitkul",
    subtitle: "India's Last Village",
    description:
      "A peaceful Himalayan village near the Indo-Tibet border.",
    image: "/images/destinations/spiti.jpg",
    category: "Hidden Himachal",
  },

  {
    name: "Kalpa",
    slug: "kalpa",
    subtitle: "Views of Kinner Kailash",
    description:
      "Traditional Himalayan villages and breathtaking scenery.",
    image: "/images/destinations/spiti.jpg",
    category: "Hidden Himachal",
  },

  {
    name: "Tosh",
    slug: "tosh",
    subtitle: "Mountain Escape",
    description:
      "A peaceful village overlooking the beautiful Parvati Valley.",
    image: "/images/destinations/manali.jpg",
    category: "Hidden Himachal",
  },

  // ================= CULTURE & SOUL =================

  {
    name: "Tabo",
    slug: "tabo",
    subtitle: "Ajanta of the Himalayas",
    description:
      "One of the world's oldest functioning Buddhist monasteries.",
    image: "/images/destinations/spiti.jpg",
    category: "Culture & Soul",
  },

  {
    name: "Dhankar",
    slug: "dhankar",
    subtitle: "Cliffside Monastery",
    description:
      "Historic monastery dramatically perched above Spiti Valley.",
    image: "/images/destinations/spiti.jpg",
    category: "Culture & Soul",
  },

  {
    name: "Manikaran",
    slug: "manikaran",
    subtitle: "Sacred Hot Springs",
    description:
      "A revered pilgrimage destination in Parvati Valley.",
    image: "/images/destinations/manali.jpg",
    category: "Culture & Soul",
  },
];

// ================= FILTERED GROUPS =================

export const featuredJourneys = allDestinations.filter(
  (d) => d.category === "Featured Journeys"
);

export const alongTheWay = allDestinations.filter(
  (d) => d.category === "Along the Way"
);

export const hiddenHimachal = allDestinations.filter(
  (d) => d.category === "Hidden Himachal"
);

export const cultureAndSoul = allDestinations.filter(
  (d) => d.category === "Culture & Soul"
);