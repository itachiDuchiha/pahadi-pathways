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
    places?: string[];
  }[];
};

export const packages: Package[] = [
  // ============================================================
  // 1. SHIMLA → SANGLA → KALPA → TABO → KAZA → CHANDRATAL
  // ============================================================

  {
    slug: "shimla-kinnaur-spiti-chandratal",
    title: "Kinnaur & Spiti: The Himalayan Circuit",
    image: "/images/packages/spiti.jpg",
    duration: "9N / 10D",
    rating: 5.0,
    pickup: "Chandigarh",
    price: "₹31,999",
    popular: true,

    itinerary: [
      "1N Shimla",
      "2N Sangla",
      "1N Kalpa",
      "1N Tabo",
      "2N Kaza",
      "1N Chandratal",
      "1N Manali",
    ],

    includes: [
      "Private Transportation",
      "Hotel / Camp Stay",
      "Breakfast",
      "Sightseeing",
    ],

    overview:
      "A spectacular Himalayan road journey covering Shimla, Sangla, Kalpa, Tabo, Kaza, Chandratal and Manali. Explore ancient monasteries, remote Himalayan villages, high mountain passes and breathtaking landscapes across Kinnaur and Spiti Valley.",

    stayPlan: [
      "Shimla – 1 Night",
      "Sangla – 2 Nights",
      "Kalpa – 1 Night",
      "Tabo – 1 Night",
      "Kaza – 2 Nights",
      "Chandratal – 1 Night",
      "Manali – 1 Night",
    ],

    highlights: [
      "Shimla",
      "Kufri",
      "Sangla Valley",
      "Kamru Fort",
      "Chitkul",
      "Kalpa",
      "Roghi Village",
      "Nako Lake",
      "Giu Mummy",
      "Tabo Monastery",
      "Dhankar Monastery",
      "Kaza",
      "Langza",
      "Hikkim",
      "Komik",
      "Key Monastery",
      "Kibber",
      "Chicham Bridge",
      "Kunzum Pass",
      "Chandratal Lake",
      "Atal Tunnel",
      "Manali",
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

    idealFor: [
      "Families",
      "Couples",
      "Friends",
      "Photographers",
      "Adventure Travelers",
    ],

    travelNote:
      "Road conditions in Kinnaur and Spiti depend on weather and local administration. Sightseeing and route plans may change due to landslides, snowfall or road closures.",

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Shimla",
        stay: "Shimla",
        description:
          "Arrive at Chandigarh railway station or airport and enjoy a scenic drive to Shimla. Check in at the hotel and relax after the journey.",
        places: ["Chandigarh", "Shimla"],
      },
      {
        day: 2,
        title: "Shimla → Sangla",
        stay: "Sangla",
        description:
          "After breakfast, drive towards Sangla via Kufri, Fagu and Narkanda, following the scenic Sutlej River before entering the beautiful Baspa Valley.",
        places: ["Kufri", "Fagu", "Narkanda", "Sangla"],
      },
      {
        day: 3,
        title: "Sangla Local → Chitkul → Sangla",
        stay: "Sangla",
        description:
          "Explore Sangla and visit the historic Kamru Fort and Kamakhya Devi Temple. Later continue to Chitkul, the last inhabited village on the old Indo-Tibetan trade route, before returning to Sangla.",
        places: [
          "Kamru Fort",
          "Kamakhya Devi Temple",
          "Chitkul Village",
          "Baspa River",
        ],
      },
      {
        day: 4,
        title: "Sangla → Kalpa",
        stay: "Kalpa",
        description:
          "Drive from Sangla to Kalpa and explore the scenic Kinnaur region. After lunch and rest, visit the local monastery, Roghi Village and the famous viewpoint near Roghi.",
        places: [
          "Kalpa",
          "Hu-Bu-Lan-Kar Monastery",
          "Roghi Village",
          "Suicide Point",
          "Kinner Kailash Views",
        ],
      },
      {
        day: 5,
        title: "Kalpa → Nako → Tabo",
        stay: "Tabo",
        description:
          "Drive deeper into Spiti Valley via Nako. Visit Nako Lake and the famous Padmasambhava Temple, with a stop at Giu to see the naturally preserved mummy before reaching Tabo.",
        places: [
          "Nako",
          "Nako Lake",
          "Padmasambhava Temple",
          "Giu Mummy",
          "Tabo",
        ],
      },
      {
        day: 6,
        title: "Tabo → Dhankar → Kaza",
        stay: "Kaza",
        description:
          "Visit the ancient Tabo Monastery before continuing towards Dhankar. Explore Dhankar Monastery and then drive onward to Kaza for your overnight stay.",
        places: [
          "Tabo Monastery",
          "Tabo Caves",
          "Dhankar Monastery",
          "Kaza",
        ],
      },
      {
        day: 7,
        title: "Kaza Local Sightseeing",
        stay: "Kaza",
        description:
          "Explore the high-altitude villages around Kaza. Visit Langza, Hikkim and Komik and experience the unique landscape and culture of Spiti Valley.",
        places: ["Langza", "Hikkim", "Komik"],
      },
      {
        day: 8,
        title: "Kaza → Key → Kibber → Chicham → Chandratal",
        stay: "Chandratal",
        description:
          "Visit Key Monastery, Kibber Village and Chicham Bridge before crossing the spectacular Kunzum Pass towards Chandratal. Overnight stay at the camp near Chandratal.",
        places: [
          "Key Monastery",
          "Kibber",
          "Chicham Bridge",
          "Kunzum Pass",
          "Chandratal",
        ],
      },
      {
        day: 9,
        title: "Chandratal → Manali",
        stay: "Manali",
        description:
          "Visit the breathtaking Chandratal Lake in the morning before beginning the journey towards Manali through the high-altitude Lahaul landscape and Atal Tunnel.",
        places: [
          "Chandratal Lake",
          "Lahaul Valley",
          "Atal Tunnel",
          "Manali",
        ],
      },
      {
        day: 10,
        title: "Manali → Chandigarh",
        stay: "-",
        description:
          "After breakfast, begin the return journey from Manali to Chandigarh for your onward journey.",
        places: ["Manali", "Chandigarh"],
      },
    ],
  },

  // ============================================================
  // 2. SHIMLA → MANALI
  // ============================================================

  {
    slug: "shimla-manali-getaway",
    title: "Shimla & Manali Getaway",
    image: "/images/packages/shimla.jpg",
    duration: "6N / 7D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹24,999",

    itinerary: [
      "2N Shimla",
      "4N Manali",
    ],

    includes: [
      "Private Transportation",
      "Hotel Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Shimla",
        stay: "Shimla",
        description:
          "Pickup from Chandigarh airport or railway station and drive to Shimla. Check in and relax at the hotel.",
      },
      {
        day: 2,
        title: "Shimla Local Sightseeing",
        stay: "Shimla",
        description:
          "Explore Shimla with visits to Kufri, Jakhu Temple, The Ridge, Mall Road and Christ Church.",
        places: [
          "Kufri",
          "Jakhu Temple",
          "The Ridge",
          "Mall Road",
          "Christ Church",
        ],
      },
      {
        day: 3,
        title: "Shimla → Manali",
        stay: "Manali",
        description:
          "Drive from Shimla to Manali through the scenic Himalayan valleys with en-route views around Sundernagar, Pandoh and Kullu.",
        places: [
          "Sundernagar Lake",
          "Pandoh Dam",
          "Mandi",
          "Kullu Valley",
        ],
      },
      {
        day: 4,
        title: "Manali Local Sightseeing",
        stay: "Manali",
        description:
          "Explore Manali with visits to Hadimba Temple, Club House, Tibetan Monastery and Vashisht Village.",
        places: [
          "Hadimba Temple",
          "Club House",
          "Tibetan Monastery",
          "Vashisht Village",
        ],
      },
      {
        day: 5,
        title: "Manali → Solang Valley → Atal Tunnel → Sissu",
        stay: "Manali",
        description:
          "Enjoy a full-day excursion to Solang Valley, Atal Tunnel and Sissu Valley. Adventure activities at Solang can be enjoyed at an additional cost.",
        places: [
          "Solang Valley",
          "Atal Tunnel",
          "Sissu Valley",
        ],
      },
      {
        day: 6,
        title: "Manali → Kasol → Manikaran → Manali",
        stay: "Manali",
        description:
          "Visit the scenic Parvati Valley and Kasol before continuing to Manikaran Sahib Gurudwara and its famous hot springs.",
        places: [
          "Kasol",
          "Parvati Valley",
          "Manikaran Sahib Gurudwara",
          "Hot Springs",
        ],
      },
      {
        day: 7,
        title: "Manali → Chandigarh",
        stay: "-",
        description:
          "After breakfast, depart from Manali and travel to Chandigarh for your drop-off.",
      },
    ],
  },

  // ============================================================
  // 3. SHIMLA → MANALI → DHARAMSHALA → DALHOUSIE → AMRITSAR
  // ============================================================

  {
    slug: "himachal-grand-circuit",
    title: "Himachal Grand Circuit",
    image: "/images/packages/dharamshala.jpg",
    duration: "9N / 10D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹34,999",

    itinerary: [
      "2N Shimla",
      "3N Manali",
      "1N Dharamshala",
      "2N Dalhousie",
      "1N Amritsar",
    ],

    includes: [
      "Private Transportation",
      "Hotel Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Shimla",
        stay: "Shimla",
        description:
          "Pickup from Chandigarh and scenic drive to Shimla. Overnight stay at Shimla.",
      },
      {
        day: 2,
        title: "Shimla Local → Kufri",
        stay: "Shimla",
        description:
          "Explore Shimla and Kufri, followed by a visit to the famous Mall Road.",
        places: ["Kufri", "Mall Road"],
      },
      {
        day: 3,
        title: "Shimla → Manali",
        stay: "Manali",
        description:
          "Drive from Shimla to Manali through the scenic Himalayan valleys.",
      },
      {
        day: 4,
        title: "Manali Local → Solang Valley",
        stay: "Manali",
        description:
          "Explore Manali and visit Solang Valley.",
        places: ["Manali", "Solang Valley"],
      },
      {
        day: 5,
        title: "Manali Local Sightseeing",
        stay: "Manali",
        description:
          "Visit Vashisht Temple and Hadimba Temple before returning to the hotel.",
        places: ["Vashisht Temple", "Hadimba Temple"],
      },
      {
        day: 6,
        title: "Manali → Dharamshala",
        stay: "Dharamshala",
        description:
          "Travel from Manali to Dharamshala. On arrival, explore McLeod Ganj and the Dalai Lama Temple.",
        places: ["McLeod Ganj", "Dalai Lama Temple"],
      },
      {
        day: 7,
        title: "Dharamshala → Dalhousie",
        stay: "Dalhousie",
        description:
          "After breakfast, depart from Dharamshala and drive towards Dalhousie.",
      },
      {
        day: 8,
        title: "Dalhousie → Khajjiar → Dalhousie",
        stay: "Dalhousie",
        description:
          "Enjoy a day excursion to Khajjiar before returning to Dalhousie.",
        places: ["Khajjiar"],
      },
      {
        day: 9,
        title: "Dalhousie → Amritsar",
        stay: "Amritsar",
        description:
          "Drive from Dalhousie to Amritsar and check in at the hotel.",
      },
      {
        day: 10,
        title: "Amritsar Sightseeing → Drop",
        stay: "-",
        description:
          "Visit the Golden Temple and Wagah Border before your evening drop-off.",
        places: ["Golden Temple", "Wagah Border"],
      },
    ],
  },

  // ============================================================
  // 4. SHIMLA → MANALI → JIBHI
  // ============================================================

  {
    slug: "shimla-manali-jibhi",
    title: "Shimla, Manali & Jibhi Escape",
    image: "/images/packages/manali.jpg",
    duration: "7N / 8D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹27,999",

    itinerary: [
      "2N Shimla",
      "3N Manali",
      "2N Jibhi",
    ],

    includes: [
      "Private Transportation",
      "Hotel Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Shimla",
        stay: "Shimla",
        description:
          "Pickup from Chandigarh and drive to Shimla. Overnight stay in Shimla.",
      },
      {
        day: 2,
        title: "Shimla Local → Kufri",
        stay: "Shimla",
        description:
          "Visit Kufri for scenic Himalayan views and optional horse riding. Return to Shimla and explore Mall Road.",
        places: ["Kufri", "Horse Riding", "Mall Road"],
      },
      {
        day: 3,
        title: "Shimla → Manali",
        stay: "Manali",
        description:
          "Drive from Shimla to Manali with scenic en-route stops around Sundernagar Lake and Pandoh Dam. River rafting and other activities are available at additional cost.",
        places: [
          "Sundernagar Lake",
          "Pandoh Dam",
          "River Rafting",
        ],
      },
      {
        day: 4,
        title: "Manali Local Sightseeing",
        stay: "Manali",
        description:
          "Visit Hadimba Temple and Vashisht Temple and explore the local surroundings.",
        places: ["Hadimba Temple", "Vashisht Temple"],
      },
      {
        day: 5,
        title: "Manali → Solang Valley → Atal Tunnel",
        stay: "Manali",
        description:
          "Enjoy a day excursion to Solang Valley and the North Portal of Atal Tunnel. Rohtang Pass can be visited on an additional-charge basis, subject to permits and road conditions.",
        places: [
          "Solang Valley",
          "Atal Tunnel",
          "Rohtang Pass",
        ],
      },
      {
        day: 6,
        title: "Manali → Jibhi",
        stay: "Jibhi",
        description:
          "Drive from Manali to the peaceful Himalayan village of Jibhi. Check in and relax.",
      },
      {
        day: 7,
        title: "Jibhi Local Sightseeing",
        stay: "Jibhi",
        description:
          "Explore Jibhi Waterfall and visit Jalori Jot for panoramic mountain views.",
        places: ["Jibhi Waterfall", "Jalori Jot"],
      },
      {
        day: 8,
        title: "Jibhi → Chandigarh",
        stay: "-",
        description:
          "After breakfast, depart from Jibhi and drive to Chandigarh for your drop-off.",
      },
    ],
  },

  // ============================================================
  // 5. CHANDIGARH → SHIMLA → SANGLA → TABO → KAZA → KALPA
  // ============================================================

  {
    slug: "shimla-kinnaur-spiti-kalpa",
    title: "Shimla, Kinnaur & Spiti Explorer",
    image: "/images/packages/kalpa.jpg",
    duration: "8N / 9D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹29,999",

    itinerary: [
      "1N Shimla",
      "2N Sangla",
      "1N Tabo",
      "2N Kaza",
      "1N Kalpa",
      "1N Shimla",
    ],

    includes: [
      "Private Transportation",
      "Hotel Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Shimla",
        stay: "Shimla",
        description:
          "Arrive at Chandigarh and drive to Shimla. Check in and relax at the hotel.",
      },
      {
        day: 2,
        title: "Shimla → Sangla",
        stay: "Sangla",
        description:
          "Drive from Shimla towards Sangla through Kufri, Fagu and Narkanda, following the scenic Sutlej River.",
        places: ["Kufri", "Fagu", "Narkanda", "Sangla"],
      },
      {
        day: 3,
        title: "Sangla Local → Chitkul",
        stay: "Sangla",
        description:
          "Explore Kamru Fort and Kamakhya Devi Temple before visiting Chitkul and returning to Sangla.",
        places: [
          "Kamru Fort",
          "Kamakhya Devi Temple",
          "Chitkul",
        ],
      },
      {
        day: 4,
        title: "Sangla → Tabo",
        stay: "Tabo",
        description:
          "Travel from Sangla towards Tabo through the dramatic landscapes of Kinnaur and Spiti.",
      },
      {
        day: 5,
        title: "Tabo → Kaza",
        stay: "Kaza",
        description:
          "Visit Tabo Monastery and Dhankar Monastery before continuing to Kaza.",
        places: ["Tabo Monastery", "Dhankar Monastery", "Kaza"],
      },
      {
        day: 6,
        title: "Kaza Local Sightseeing",
        stay: "Kaza",
        description:
          "Explore the monasteries and high-altitude villages around Kaza, including Key Monastery, Kibber and Chicham Bridge.",
        places: ["Key Monastery", "Kibber", "Chicham Bridge"],
      },
      {
        day: 7,
        title: "Kaza → Hikkim → Langza → Kalpa",
        stay: "Kalpa",
        description:
          "Visit Hikkim and Langza before beginning the journey towards Kalpa.",
        places: ["Hikkim", "Langza", "Kalpa"],
      },
      {
        day: 8,
        title: "Kalpa Local → Shimla",
        stay: "Shimla",
        description:
          "Explore Kalpa in the morning before travelling towards Shimla for the overnight stay.",
        places: ["Kalpa", "Roghi Village"],
      },
      {
        day: 9,
        title: "Shimla → Chandigarh",
        stay: "-",
        description:
          "After breakfast, drive from Shimla to Chandigarh for your final drop-off.",
      },
    ],
  },

  // ============================================================
  // 6. CHANDIGARH → MANALI → KEYLONG → KAZA → TABO → CHANDRATAL
  // ============================================================

  {
    slug: "manali-keylong-spiti-chandratal",
    title: "Manali, Lahaul & Spiti Expedition",
    image: "/images/packages/keylong.jpg",
    duration: "9N / 10D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹34,999",

    itinerary: [
      "2N Manali",
      "2N Keylong",
      "2N Kaza",
      "1N Tabo",
      "1N Chandratal",
      "1N Manali",
    ],

    includes: [
      "Private Transportation",
      "Hotel / Camp Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Manali",
        stay: "Manali",
        description:
          "Pickup from Chandigarh and scenic drive towards Manali through Mandi and Kullu Valley with an en-route stop at Pandoh Dam.",
        places: ["Mandi", "Pandoh Dam", "Kullu Valley"],
      },
      {
        day: 2,
        title: "Manali Local Sightseeing",
        stay: "Manali",
        description:
          "Explore Manali and its surrounding attractions before preparing for the high-altitude journey ahead.",
        places: ["Hadimba Temple", "Vashisht", "Manali"],
      },
      {
        day: 3,
        title: "Manali → Keylong",
        stay: "Keylong",
        description:
          "Morning drive to Keylong, visiting Solang Valley and crossing the Atal Tunnel before entering the spectacular Lahaul Valley. Rohtang Pass excursion is available at additional cost, subject to permits and road conditions.",
        places: [
          "Solang Valley",
          "Atal Tunnel",
          "Rohtang Pass",
          "Keylong",
        ],
      },
      {
        day: 4,
        title: "Keylong Local Sightseeing",
        stay: "Keylong",
        description:
          "Explore Keylong with visits to Khardang Monastery, Trilokinath Temple and Shashur Monastery.",
        places: [
          "Khardang Monastery",
          "Trilokinath Temple",
          "Shashur Monastery",
        ],
      },
      {
        day: 5,
        title: "Keylong → Kaza",
        stay: "Kaza",
        description:
          "Morning drive from Keylong towards Kaza through the spectacular high-altitude Himalayan landscape and across Kunzum Pass.",
        places: [
          "Kunzum Pass",
          "Spiti Valley",
          "Kaza",
        ],
      },
      {
        day: 6,
        title: "Kaza Local Sightseeing",
        stay: "Kaza",
        description:
          "Explore the high-altitude villages around Kaza, including Langza, Hikkim and Komik.",
        places: ["Langza", "Hikkim", "Komik"],
      },
      {
        day: 7,
        title: "Kaza → Dhankar → Tabo",
        stay: "Tabo",
        description:
          "Travel from Kaza towards Tabo, visiting Dhankar Monastery and the ancient Buddhist heritage of Spiti.",
        places: ["Dhankar Monastery", "Tabo"],
      },
      {
        day: 8,
        title: "Tabo → Chandratal",
        stay: "Chandratal",
        description:
          "After breakfast, check out from the hotel and enjoy local sightseeing in Tabo, visiting Tabo Monastery, Tabo Cave, Key, Kibber and Chicham. Continue towards Chandratal for an overnight camp stay.",
        places: [
          "Tabo Monastery",
          "Tabo Cave",
          "Key Monastery",
          "Kibber",
          "Chicham",
          "Chandratal",
        ],
      },
      {
        day: 9,
        title: "Chandratal → Manali",
        stay: "Manali",
        description:
          "Morning visit to Chandratal Lake, followed by the drive back to Manali through the Atal Tunnel.",
        places: [
          "Chandratal Lake",
          "Atal Tunnel",
          "Manali",
        ],
      },
      {
        day: 10,
        title: "Manali → Chandigarh",
        stay: "-",
        description:
          "After breakfast, drive from Manali to Chandigarh for your final drop-off.",
      },
    ],
  },

  // ============================================================
  // 7. SHORT SPITI CIRCUIT
  // ============================================================

  {
    slug: "manali-spiti-chandratal",
    title: "Manali & Spiti: High Himalayan Escape",
    image: "/images/packages/chandratal1.jpg",
    duration: "5N / 6D",
    rating: 4.9,
    pickup: "Chandigarh",
    price: "₹25,999",

    itinerary: [
      "1N Manali",
      "1N Kaza",
      "1N Tabo",
      "1N Chandratal",
      "1N Manali",
    ],

    includes: [
      "Private Transportation",
      "Hotel / Camp Stay",
      "Breakfast",
      "Sightseeing",
    ],

    itineraryDays: [
      {
        day: 1,
        title: "Chandigarh → Manali",
        stay: "Manali",
        description:
          "Pickup from Chandigarh and scenic drive to Manali through Mandi and Kullu Valley, with an en-route stop at Pandoh Dam.",
        places: ["Pandoh Dam", "Kullu Valley", "Manali"],
      },
      {
        day: 2,
        title: "Manali → Kaza",
        stay: "Kaza",
        description:
          "After breakfast, drive towards Kaza through the Atal Tunnel and across the spectacular Kunzum Pass.",
        places: ["Atal Tunnel", "Kunzum Pass", "Kaza"],
      },
      {
        day: 3,
        title: "Kaza → Tabo",
        stay: "Tabo",
        description:
          "Explore the high-altitude villages around Kaza, including Langza, Hikkim and Komik, before continuing towards Tabo.",
        places: [
          "Langza",
          "Hikkim",
          "Komik",
          "Tabo",
        ],
      },
      {
        day: 4,
        title: "Tabo → Chandratal",
        stay: "Chandratal",
        description:
          "After breakfast, check out from the hotel and enjoy local sightseeing in Tabo, visiting Tabo Monastery, Tabo Cave, Key, Kibber and Chicham. Continue towards Chandratal for an overnight camp stay.",
        places: [
          "Tabo Monastery",
          "Tabo Cave",
          "Key Monastery",
          "Kibber",
          "Chicham",
          "Chandratal",
        ],
      },
      {
        day: 5,
        title: "Chandratal → Manali",
        stay: "Manali",
        description:
          "Visit Chandratal Lake in the morning before driving back towards Manali through the Atal Tunnel.",
        places: [
          "Chandratal Lake",
          "Atal Tunnel",
          "Manali",
        ],
      },
      {
        day: 6,
        title: "Manali → Chandigarh",
        stay: "-",
        description:
          "After breakfast, depart from Manali and drive to Chandigarh for your final drop-off.",
      },
    ],
  },
];