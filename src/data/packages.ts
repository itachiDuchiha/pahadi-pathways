export type Package = {
  slug: string;
  title: string;
  image: string;
  heroImage?: string;
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
    start?: string;
    end?: string;
    stay: string;
    description: string;
    places?: string[];
    details?: {
      title: string;
      description: string;
    }[];
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
    heroImage: "/images/packages/heroes/spiti.png",
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
      // ========================================================
      // DAY 1
      // ========================================================

      {
        day: 1,
        title: "Chandigarh → Shimla",
        start: "Chandigarh",
        end: "Shimla",
        stay: "Shimla",

        description:
          "Arrive at Chandigarh railway station or airport and begin your Himalayan journey with a scenic drive towards Shimla. As the road climbs into the hills, the landscape gradually changes from the plains to pine-covered mountain slopes. On arrival, check in at your hotel and unwind after the journey.",

        places: ["Chandigarh", "Shimla"],

        details: [
          {
            title: "Chandigarh",
            description:
              "Your journey begins at Chandigarh railway station or airport, where you will meet your driver and begin the drive towards the Himalayan hills.",
          },
          {
            title: "Shimla",
            description:
              "The former summer capital of the British Raj and the present capital of Himachal Pradesh, Shimla is known for its colonial architecture, mountain setting, Mall Road and the historic Ridge. Spend the evening relaxing and enjoying the pleasant hill-station atmosphere.",
          },
        ],
      },

      // ========================================================
      // DAY 2
      // ========================================================

      {
        day: 2,
        title: "Shimla → Sangla",
        start: "Shimla",
        end: "Sangla",
        stay: "Sangla",

        description:
          "After breakfast, leave Shimla and drive towards the remote Baspa Valley. The route passes through Kufri, Fagu and Narkanda before descending towards the Sutlej River and continuing deeper into Kinnaur. Arrive in Sangla by evening and check in at your hotel.",

        places: ["Kufri", "Fagu", "Narkanda", "Sangla"],

        details: [
          {
            title: "Kufri",
            description:
              "Located near Shimla, Kufri is surrounded by dense deodar forests and offers beautiful Himalayan views. The area is also known for horse rides and winter activities.",
          },
          {
            title: "Fagu",
            description:
              "A quiet mountain settlement surrounded by orchards, terraced fields and forested slopes. Fagu provides a peaceful introduction to the changing landscapes of the journey.",
          },
          {
            title: "Narkanda",
            description:
              "Set among pine, cedar and oak forests, Narkanda is known for its apple orchards and wide Himalayan views. From here, the route gradually descends towards the Sutlej valley.",
          },
          {
            title: "Sangla",
            description:
              "Sangla lies in the beautiful Baspa Valley of Kinnaur, surrounded by high mountains, deodar forests and apple orchards. The valley is also known for its distinctive Kinnauri culture and traditional architecture.",
          },
        ],
      },

      // ========================================================
      // DAY 3
      // ========================================================

      {
        day: 3,
        title: "Sangla Local → Chitkul → Sangla",
        start: "Sangla",
        end: "Sangla",
        stay: "Sangla",

        description:
          "After breakfast, explore the cultural side of Sangla with visits to Kamru Fort, Kamakhya Devi Temple and the local Nag Devta Temple. Later, drive towards Chitkul, one of the most scenic villages in the Baspa Valley, before returning to Sangla for the night.",

        places: [
          "Kamru Fort",
          "Kamakhya Devi Temple",
          "Nag Devta Temple",
          "Chitkul Village",
          "Baspa Valley",
        ],

        details: [
          {
            title: "Kamru Fort",
            description:
              "An ancient wooden structure overlooking the Sangla Valley, Kamru Fort reflects the traditional architecture and history of Kinnaur while offering impressive views of the surrounding mountains.",
          },
          {
            title: "Kamakhya Devi Temple",
            description:
              "Located within the Kamru Fort complex, the temple is dedicated to Kamakhya Devi and adds an important spiritual and cultural element to the visit.",
          },
          {
            title: "Nag Devta Temple",
            description:
              "A traditional local temple reflecting the deep connection between Kinnauri communities, their customs and the mountain landscape.",
          },
          {
            title: "Chitkul Village",
            description:
              "Chitkul is a picturesque high-altitude village in the Baspa Valley, known for traditional wooden houses, apple orchards, mountain streams and dramatic Himalayan scenery.",
          },
        ],
      },

      // ========================================================
      // DAY 4
      // ========================================================

      {
        day: 4,
        title: "Sangla → Kalpa",
        start: "Sangla",
        end: "Kalpa",
        stay: "Kalpa",

        description:
          "After breakfast, leave Sangla and continue towards Kalpa through the spectacular landscapes of Kinnaur. On arrival, settle into the hotel and explore the peaceful surroundings of Kalpa, with its traditional houses, apple orchards and remarkable views towards the Kinner Kailash range.",

        places: [
          "Kalpa",
          "Hu-Bu-Lan-Kar Monastery",
          "Roghi Village",
          "Kinner Kailash Views",
        ],

        details: [
          {
            title: "Kalpa",
            description:
              "A peaceful Himalayan village known for its traditional Kinnauri character, apple orchards and spectacular views of the surrounding snow-covered mountains.",
          },
          {
            title: "Kinner Kailash & Jorkanden Views",
            description:
              "On clear days, the mountains around Kalpa provide dramatic views of the Kinner Kailash range and Jorkanden Peak. These peaks hold deep cultural and religious significance in the region.",
          },
          {
            title: "Hu-Bu-Lan-Kar Monastery",
            description:
              "A historic Buddhist monastery in Kalpa, offering a quiet atmosphere and an opportunity to experience the Buddhist heritage of the Kinnaur region.",
          },
          {
            title: "Roghi Village",
            description:
              "A traditional Kinnauri village near Kalpa where visitors can experience mountain homes, orchards and local village life against a dramatic Himalayan backdrop.",
          },
        ],
      },

      // ========================================================
      // DAY 5
      // ========================================================

      {
        day: 5,
        title: "Kalpa → Nako → Giu → Tabo",
        start: "Kalpa",
        end: "Tabo",
        stay: "Tabo",

        description:
          "After breakfast, leave Kalpa and enter the stark and dramatic landscapes of Spiti Valley. The route takes you through Nako and its high-altitude lake before continuing towards Giu and finally Tabo. Arrive in Tabo by evening and settle into your accommodation.",

        places: [
          "Nako",
          "Nako Lake",
          "Padmasambhava Temple",
          "Giu",
          "Giu Mummy",
          "Tabo",
        ],

        details: [
          {
            title: "Nako",
            description:
              "A remote Himalayan village surrounded by barren mountain slopes and traditional houses. Nako marks the transition from the greener landscapes of Kinnaur towards the high desert terrain of Spiti.",
          },
          {
            title: "Nako Lake",
            description:
              "A small high-altitude lake located within the village of Nako. During the colder months, the lake can freeze, creating a striking contrast with the surrounding mountains.",
          },
          {
            title: "Padmasambhava Temple",
            description:
              "A small but culturally important Buddhist shrine associated with Padmasambhava, reflecting the strong Buddhist traditions of the region.",
          },
          {
            title: "Giu",
            description:
              "A small mountain settlement known for its unusual historical and religious attraction, located away from the main route between Kinnaur and Tabo.",
          },
          {
            title: "Giu Mummy",
            description:
              "Giu is known for a naturally preserved mummified Buddhist monk kept at a small shrine in the village. It is an unusual cultural and historical stop along the route.",
          },
          {
            title: "Tabo",
            description:
              "A historic Buddhist settlement and one of the most important cultural destinations in Spiti, known for its ancient monastery and remarkable Buddhist heritage.",
          },
        ],
      },

      // ========================================================
      // DAY 6
      // ========================================================

      {
        day: 6,
        title: "Tabo → Dhankar → Kaza",
        start: "Tabo",
        end: "Kaza",
        stay: "Kaza",

        description:
          "Begin the day with a visit to the ancient Tabo Monastery before continuing towards Dhankar. Explore the historic monastery and dramatic mountain setting before driving onward to Kaza, the main town and commercial centre of Spiti Valley.",

        places: [
          "Tabo Monastery",
          "Tabo Caves",
          "Dhankar Monastery",
          "Dhankar",
          "Kaza",
        ],

        details: [
          {
            title: "Tabo Monastery",
            description:
              "Founded in the 10th century, Tabo Monastery is one of the most significant Buddhist monasteries in the Himalayas. Its ancient murals, sculptures and monastic spaces make it one of the cultural highlights of Spiti.",
          },
          {
            title: "Tabo Caves",
            description:
              "The caves around Tabo reflect the area's long history of meditation and Buddhist practice and form part of the unique spiritual landscape surrounding the monastery.",
          },
          {
            title: "Dhankar Monastery",
            description:
              "Perched dramatically above the Spiti landscape, Dhankar Monastery is surrounded by rugged mountains and deep river valleys. The setting offers some of the most striking views on this section of the journey.",
          },
          {
            title: "Kaza",
            description:
              "Kaza is the main settlement of Spiti Valley and serves as the base for exploring several of the valley's high-altitude villages, monasteries and mountain landscapes.",
          },
        ],
      },

      // ========================================================
      // DAY 7
      // ========================================================

      {
        day: 7,
        title: "Kaza → Kaza",
        start: "Kaza",
        end: "Kaza",
        stay: "Kaza",

        description:
          "After breakfast, head into the high-altitude villages surrounding Kaza. The day's route introduces you to the distinctive landscape, traditional settlements and Buddhist culture of upper Spiti before returning to Kaza for the night.",

        places: ["Langza", "Hikkim", "Komik", "Kaza"],

        details: [
          {
            title: "Langza",
            description:
              "Known for its fossil-rich surroundings and spectacular mountain views, Langza is one of Spiti's most recognizable villages. Traditional homes and the large Buddha statue add to its distinctive character.",
          },
          {
            title: "Hikkim",
            description:
              "A remote high-altitude village famous for its post office and its isolated setting among the mountains. It offers a glimpse into everyday life in one of Spiti's remote settlements.",
          },
          {
            title: "Komik",
            description:
              "A high-altitude village known for its traditional Spitian architecture, monastery and expansive views across the barren Himalayan landscape.",
          },
        ],
      },

      // ========================================================
      // DAY 8
      // ========================================================

      {
        day: 8,
        title: "Kaza → Key → Kibber → Chicham → Chandratal",
        start: "Kaza",
        end: "Chandratal",
        stay: "Chandratal",

        description:
          "After breakfast, leave Kaza and explore some of the most spectacular settlements of upper Spiti. Visit Key Monastery, Kibber and Chicham before crossing the high Kunzum Pass and continuing towards the magical Chandratal region for your overnight camp stay.",

        places: [
          "Key Monastery",
          "Kibber",
          "Chicham Bridge",
          "Kunzum Pass",
          "Chandratal",
        ],

        details: [
          {
            title: "Key Monastery",
            description:
              "One of the most prominent Buddhist monasteries in Spiti, Key Monastery sits dramatically above the Spiti River and provides panoramic views across the surrounding valley.",
          },
          {
            title: "Kibber",
            description:
              "A high-altitude Spitian village known for its traditional stone and mud houses, rugged landscape and proximity to the Kibber Wildlife Sanctuary.",
          },
          {
            title: "Chicham Bridge",
            description:
              "The spectacular bridge near Chicham spans a deep mountain gorge and provides dramatic views of the surrounding terrain.",
          },
          {
            title: "Kunzum Pass",
            description:
              "One of the major high mountain passes connecting Spiti with the Lahaul side of the Himalayas. Weather and road conditions can affect access to the pass.",
          },
          {
            title: "Chandratal",
            description:
              "The approach to Chandratal takes you into a remote high-altitude landscape surrounded by rugged peaks. Depending on road and weather conditions, arrival at the campsite may be later in the day.",
          },
        ],
      },

      // ========================================================
      // DAY 9
      // ========================================================

      {
        day: 9,
        title: "Chandratal → Manali",
        start: "Chandratal",
        end: "Manali",
        stay: "Manali",

        description:
          "Start the day with a visit to the beautiful Chandratal Lake before beginning the journey towards Manali. The route crosses the high-altitude Lahaul landscape and continues through the Atal Tunnel before reaching the Manali Valley.",

        places: [
          "Chandratal Lake",
          "Lahaul Valley",
          "Atal Tunnel",
          "Manali",
        ],

        details: [
          {
            title: "Chandratal Lake",
            description:
              "Known as the 'Moon Lake', Chandratal is surrounded by dramatic mountain peaks and is one of the most memorable landscapes of the Spiti journey. Its appearance changes with the light and weather.",
          },
          {
            title: "Lahaul Valley",
            description:
              "As the route leaves the Chandratal region, the landscape gradually changes from the stark terrain of Spiti towards the greener valleys of Lahaul.",
          },
          {
            title: "Atal Tunnel",
            description:
              "The Atal Tunnel provides an important all-weather road connection between Manali and Lahaul, significantly shortening the route between the two regions.",
          },
          {
            title: "Manali",
            description:
              "Arrive in Manali and settle into your hotel after the long mountain journey. The evening is kept free for rest.",
          },
        ],
      },

      // ========================================================
      // DAY 10
      // ========================================================

      {
        day: 10,
        title: "Manali → Chandigarh",
        start: "Manali",
        end: "Chandigarh",
        stay: "-",

        description:
          "After breakfast, check out from the hotel and begin your return journey from Manali to Chandigarh. Enjoy the changing scenery as the road descends from the mountains towards the plains. On arrival, you will be dropped at Chandigarh Airport or Railway Station for your onward journey.",

        places: ["Manali", "Chandigarh"],

        details: [
          {
            title: "Manali",
            description:
              "After breakfast, check out from your hotel and begin the final road journey of the trip.",
          },
          {
            title: "Chandigarh",
            description:
              "The journey concludes with your drop-off at Chandigarh Airport or Railway Station for your onward travel.",
          },
        ],
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
    heroImage: "/images/packages/heroes/shimla.png",
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
    heroImage: "/images/packages/heroes/dharamshala.png",
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
    heroImage: "/images/packages/heroes/manali.png",
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
    image: "/images/packages/kalpa1.jpg",
    heroImage: "/images/packages/heroes/kalpa.png",
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
          "Explore the high-altitude villages around Kaza, including Key Monastery, Kibber and Chicham Bridge.",
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
    heroImage: "/images/packages/heroes/keylong.png",
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
    heroImage: "/images/packages/heroes/chandratal.png",
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