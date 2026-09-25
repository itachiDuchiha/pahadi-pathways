"use client";

import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Moon,
  Navigation,
  ArrowRight,
  Info,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

/* ============================================================
   PLACE DESCRIPTIONS
   ------------------------------------------------------------
   These descriptions are intentionally kept inside the
   itinerary component so your existing Package type does not
   need additional fields.
============================================================ */

const placeDescriptions: Record<string, string> = {
  Chandigarh:
    "The journey begins in Chandigarh, where you meet your driver at the airport or railway station before heading towards the Himalayan foothills.",

  Shimla:
    "The former summer capital of British India and the present capital of Himachal Pradesh, Shimla combines colonial architecture, pine-covered slopes, the historic Ridge and the lively Mall Road.",

  Kufri:
    "A scenic hill destination near Shimla surrounded by deodar forests and Himalayan views. It is a popular stop for photography, short walks and optional horse riding.",

  Fagu:
    "A peaceful hillside settlement surrounded by orchards, forests and terraced fields, offering a quieter glimpse of rural Himachal.",

  Narkanda:
    "A high-altitude town surrounded by pine and oak forests and famous for apple orchards, mountain views and its winter landscape.",

  Sangla:
    "Set in the beautiful Baspa Valley of Kinnaur, Sangla is known for apple orchards, traditional Kinnauri villages, dramatic mountain scenery and the Baspa River.",

  "Sangla Valley":
    "The Baspa Valley around Sangla is known for its striking combination of forested slopes, high mountain peaks, orchards and traditional Kinnauri settlements.",

  "Kamru Fort":
    "An historic wooden fort above Sangla, Kamru offers panoramic views of the Baspa Valley and provides an introduction to the area's traditional architecture and heritage.",

  "Kamakhya Devi Temple":
    "Located within the Kamru Fort complex, this temple reflects the region's distinctive blend of local Himalayan traditions and wider Hindu cultural influences.",

  "Chitkul Village":
    "A remote village in the Baspa Valley known for traditional wooden houses, mountain scenery, orchards and the peaceful surroundings of the upper Baspa region.",

  Chitkul:
    "A remote village in the Baspa Valley known for traditional wooden houses, mountain scenery, orchards and the peaceful surroundings of the upper Baspa region.",

  "Baspa River":
    "The Baspa River flows through the Sangla Valley, adding to the dramatic scenery of forests, villages, orchards and high Himalayan slopes.",

  Kalpa:
    "A traditional Kinnauri village famous for its apple orchards, wooden architecture and clear views towards the Kinner Kailash mountain range.",

  "Kinner Kailash Views":
    "On clear days, Kalpa provides impressive views towards the sacred Kinner Kailash range and surrounding high Himalayan peaks.",

  "Hu-Bu-Lan-Kar Monastery":
    "A historic Buddhist monastery in Kalpa associated with the region's deep Buddhist heritage, offering a peaceful setting with mountain views and traditional religious architecture.",

  "Roghi Village":
    "A traditional Kinnauri village near Kalpa where narrow paths, wooden homes, orchards and terraced fields provide a glimpse into local mountain life.",

  "Suicide Point":
    "A dramatic roadside viewpoint near Roghi offering expansive views into the deep valleys and surrounding mountain slopes. Conditions near the edge can be exposed, so care is important.",

  Nako:
    "A remote high-altitude village on the Kinnaur-Spiti route, surrounded by barren mountain slopes and traditional Himalayan homes.",

  "Nako Lake":
    "A small high-altitude lake beside Nako village, particularly striking against the surrounding dry mountain landscape. Its appearance changes considerably with the season.",

  "Padmasambhava Temple":
    "A small Buddhist shrine associated with Guru Padmasambhava, reflecting the strong Buddhist traditions found across the upper Kinnaur and Spiti region.",

  Giu:
    "A small mountain settlement located away from the main highway route, known for its unusual historical and religious attraction.",

  "Giu Mummy":
    "Giu is known for a naturally preserved Buddhist monk displayed at a small shrine. The site is an unusual cultural and historical stop along the route.",

  Tabo:
    "One of Spiti's most important cultural destinations, Tabo is renowned for its ancient Buddhist monastery, traditional village setting and remarkable Himalayan surroundings.",

  "Tabo Monastery":
    "Founded in 996 AD, Tabo Monastery is one of the oldest continuously functioning Buddhist monasteries in the Himalayan region and is celebrated for its ancient murals and sacred art.",

  "Tabo Caves":
    "Caves around Tabo reflect the area's long history of Buddhist meditation and spiritual practice and add another layer to the heritage of the monastery complex.",

  "Dhankar Monastery":
    "Dramatically positioned above the Spiti Valley, Dhankar Monastery is one of the region's most striking cultural landmarks, surrounded by rugged mountains and deep valleys.",

  Kaza:
    "The main town of Spiti Valley, Kaza serves as the region's practical and cultural hub and is an ideal base for exploring surrounding villages and monasteries.",

  Langza:
    "Known for its fossils, traditional houses and huge mountain backdrop, Langza offers an excellent glimpse into life in the high-altitude villages of Spiti.",

  Hikkim:
    "A remote high-altitude village famous for its post office and expansive views across the stark landscape of Spiti Valley.",

  Komik:
    "A high-altitude Spitian village surrounded by barren mountain slopes and traditional homes, offering a quiet look at life in one of the region's remote settlements.",

  "Key Monastery":
    "Perched above the Spiti River, Key Monastery is one of the most important Buddhist monasteries in the valley and offers sweeping views of the surrounding landscape.",

  Key:
    "The village around Key Monastery is one of the most scenic settlements in Spiti, with traditional homes and dramatic views over the valley.",

  Kibber:
    "A high-altitude village known for its rugged landscape, traditional homes and proximity to the Kibber Wildlife Sanctuary.",

  Chicham:
    "Chicham is known for its spectacular bridge and dramatic views into the deep gorge of the Spiti River, making it one of the memorable stops around Kaza.",

  "Chicham Bridge":
    "The Chicham Bridge spans a dramatic gorge high above the Spiti River and provides spectacular views of the surrounding mountains and valley.",

  "Kunzum Pass":
    "A high mountain pass connecting the Spiti and Lahaul regions. The landscape around the pass is stark, open and highly sensitive to changing weather conditions.",

  Chandratal:
    "Chandratal, meaning 'Lake of the Moon', is a spectacular high-altitude lake surrounded by barren mountain peaks and wide open Himalayan landscapes.",

  "Chandratal Lake":
    "Known as the 'Lake of the Moon', Chandratal is famous for its crescent-shaped shoreline, clear mountain water and dramatic high-altitude setting.",

  "Lahaul Valley":
    "The Lahaul region presents a striking transition from the dry landscapes of Spiti to broader mountain valleys, glaciers and high Himalayan terrain.",

  "Atal Tunnel":
    "The Atal Tunnel provides an all-weather road connection between Manali and Lahaul and significantly shortens the journey between the two regions.",

  Manali:
    "A major Himalayan resort town surrounded by forests, rivers and high mountain landscapes, Manali is the final mountain base before the return journey towards Chandigarh.",

  "Mandi":
    "A historic Himalayan town located along the route between Chandigarh, Kullu and Manali, known for its temples and location beside the Beas River.",

  "Pandoh Dam":
    "A major hydroelectric reservoir on the Beas River, Pandoh offers a scenic roadside stop amid steep Himalayan valleys.",

  "Kullu Valley":
    "The broad Kullu Valley follows the Beas River and is known for forests, orchards, traditional villages and spectacular mountain scenery.",

  "Sundernagar Lake":
    "A scenic reservoir and roadside stop in the Mandi region, surrounded by green Himalayan slopes.",

  "Hadimba Temple":
    "A distinctive wooden temple set among tall deodar trees in Manali, known for its traditional architecture and connection with local mythology.",

  "Vashisht Village":
    "A traditional village above Manali known for its temples, mountain views and natural hot-water springs.",

  Vashisht:
    "A traditional village above Manali known for its temples, mountain views and natural hot-water springs.",

  "Tibetan Monastery":
    "A peaceful cultural stop in Manali where visitors can experience Tibetan Buddhist traditions, prayer wheels and local handicrafts.",

  "Club House":
    "A recreation area in Manali offering a relaxed stop during local sightseeing and access to the surrounding riverside landscape.",

  "Solang Valley":
    "A popular mountain valley near Manali known for wide Himalayan views and seasonal adventure activities such as paragliding and snow-based experiences.",

  "Sissu Valley":
    "A scenic Lahaul settlement surrounded by rugged mountains, waterfalls and broad valley landscapes beyond the Atal Tunnel.",

  Kasol:
    "A popular village in the Parvati Valley surrounded by pine forests and mountain streams, known for its relaxed atmosphere and scenic setting.",

  "Parvati Valley":
    "A dramatic Himalayan valley following the Parvati River, combining forests, mountain villages, riverside landscapes and high peaks.",

  "Manikaran Sahib Gurudwara":
    "A prominent Sikh pilgrimage site in the Parvati Valley, known for its spiritual significance and natural hot springs.",

  "Hot Springs":
    "Natural hot-water springs are a distinctive feature of Manikaran and the surrounding Parvati Valley, attracting visitors throughout the year.",

  "Jibhi Waterfall":
    "A peaceful forest waterfall near Jibhi reached by a short walk, surrounded by cedar and pine-covered slopes.",

  "Jalori Jot":
    "A high mountain pass near Jibhi offering panoramic views of the surrounding Himalayan ranges and access to nearby trekking routes.",

  "Rohtang Pass":
    "A high mountain pass above Manali offering dramatic Himalayan scenery when accessible. Visits depend on permits, weather and road conditions.",

  "McLeod Ganj":
    "A lively hill settlement near Dharamshala known for Tibetan culture, monasteries, cafés and mountain views.",

  "Dalai Lama Temple":
    "An important Tibetan Buddhist cultural and spiritual centre in McLeod Ganj, visited for its peaceful atmosphere and religious significance.",

  Khajjiar:
    "A scenic meadow near Dalhousie surrounded by cedar forests and mountain slopes, often described as one of Himachal's most picturesque landscapes.",

  "Golden Temple":
    "The Golden Temple in Amritsar is one of India's most important Sikh pilgrimage sites and a major cultural highlight of the region.",

  "Wagah Border":
    "The India-Pakistan border ceremony at Wagah is a popular visitor experience near Amritsar, subject to security arrangements and operating schedules.",
};

/* ============================================================
   ROUTE HELPERS
============================================================ */

function getRouteEndpoints(title: string) {
  const parts = title
    .split("→")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return {
      start: parts[0],
      end: parts[parts.length - 1],
    };
  }

  const localMatch = title.match(/^(.+?)\s+Local(?:\s+Sightseeing)?$/i);

  if (localMatch) {
    return {
      start: localMatch[1].trim(),
      end: localMatch[1].trim(),
    };
  }

  const sightseeingMatch = title.match(/^(.+?)\s+Sightseeing$/i);

  if (sightseeingMatch) {
    return {
      start: sightseeingMatch[1].trim(),
      end: sightseeingMatch[1].trim(),
    };
  }

  return {
    start: "",
    end: "",
  };
}

/* ============================================================
   TRAVEL NOTE HELPER
============================================================ */

function getTravelNote(
  title: string,
  places: string[] = [],
): string | null {
  const route = `${title} ${places.join(" ")}`.toLowerCase();

  if (
    route.includes("kunzum") ||
    route.includes("chandratal") ||
    route.includes("kaza") ||
    route.includes("tabo")
  ) {
    return "This is a high-altitude travel section. Road conditions, weather and local restrictions can affect driving time and the sightseeing order. Please allow flexibility in the day's schedule.";
  }

  if (
    route.includes("sangla") ||
    route.includes("kalpa") ||
    route.includes("nako")
  ) {
    return "Mountain roads in Kinnaur can be winding and conditions may change after rain, snowfall or landslides. Sightseeing stops may be adjusted by the driver according to road and weather conditions.";
  }

  if (
    route.includes("manali") &&
    (route.includes("rohtang") || route.includes("atal tunnel"))
  ) {
    return "Access to high-altitude areas is subject to weather, road conditions and local permissions. Any optional Rohtang excursion is subject to availability and applicable charges.";
  }

  return null;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function DayTimeline({ pkg }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const days = pkg.itineraryDays ?? [];

  if (!days.length) {
    return null;
  }

  return (
    <section
      id="itinerary"
      className="border-b border-[#10264A]/10 bg-[#F8F7F3]"
    >
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}

      <div className="border-b border-[#10264A]/10 bg-white">
        <div className="px-5 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* LEFT — TITLE */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#C89A3D]" />

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.32em]
                    text-[#C89A3D]
                    sm:text-[10px]
                  "
                >
                  Complete Journey
                </p>
              </div>

              <h2
                className="
                  mt-2
                  font-serif
                  text-[30px]
                  font-medium
                  leading-tight
                  text-[#10264A]
                  sm:text-[34px]
                  md:text-[36px]
                "
              >
                Detailed Itinerary
              </h2>

              <div className="mt-3 h-[3px] w-12 rounded-full bg-[#C89A3D]" />

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-[12px]
                  leading-6
                  text-[#52627A]
                  sm:text-[13px]
                "
              >
                Follow the journey day by day, including major routes,
                overnight stays, places to explore and experiences along the
                way.
              </p>
            </div>

            {/* RIGHT — JOURNEY SUMMARY */}
            <div
              className="
                shrink-0
                rounded-xl
                border
                border-[#10264A]/10
                bg-[#FAFAF8]
                px-5
                py-3.5
                shadow-[0_4px_16px_rgba(16,38,74,0.045)]
                sm:min-w-[112px]
              "
            >
              <p
                className="
                  text-center
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#C89A3D]
                "
              >
                Journey
              </p>

              <p
                className="
                  mt-1
                  text-center
                  font-serif
                  text-[22px]
                  font-medium
                  leading-none
                  text-[#10264A]
                "
              >
                {days.length} Days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          ITINERARY TIMELINE
      ========================================================= */}

      <div className="px-5 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10">
        <div className="relative">
          {/* =====================================================
              VERTICAL JOURNEY LINE
          ===================================================== */}

          <div
            className="
              absolute
              bottom-7
              left-[20px]
              top-7
              w-px
              bg-[#C89A3D]/45
              sm:left-[22px]
            "
          />

          <div className="space-y-4">
            {days.map((day) => {
              const isOpen = openDay === day.day;

              const { start, end } = getRouteEndpoints(day.title);

              const travelNote = getTravelNote(
                day.title,
                day.places ?? [],
              );

              const detailedPlaces =
                day.places?.filter(
                  (place) => placeDescriptions[place],
                ) ?? [];

              return (
                <div
                  key={day.day}
                  className="
                    relative
                    pl-[52px]
                    sm:pl-[58px]
                  "
                >
                  {/* =================================================
                      DAY NUMBER
                  ================================================= */}

                  <div
                    className={`
                      absolute
                      left-0
                      top-5
                      z-10
                      flex
                      h-[42px]
                      w-[42px]
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      text-[10px]
                      font-bold
                      tracking-[0.03em]
                      transition-all
                      duration-200
                      sm:h-[46px]
                      sm:w-[46px]

                      ${
                        isOpen
                          ? `
                            border-[#C89A3D]
                            bg-[#10264A]
                            text-white
                            shadow-[0_4px_14px_rgba(16,38,74,0.18)]
                          `
                          : `
                            border-[#C89A3D]
                            bg-[#F8F7F3]
                            text-[#10264A]
                            shadow-[0_2px_8px_rgba(16,38,74,0.05)]
                          `
                      }
                    `}
                  >
                    {String(day.day).padStart(2, "0")}
                  </div>

                  {/* =================================================
                      DAY CARD
                  ================================================= */}

                  <div
                    className={`
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-white
                      transition-all
                      duration-200

                      ${
                        isOpen
                          ? `
                            border-[#C89A3D]/35
                            shadow-[0_8px_24px_rgba(16,38,74,0.075)]
                          `
                          : `
                            border-[#10264A]/10
                            shadow-[0_3px_12px_rgba(16,38,74,0.035)]
                          `
                      }
                    `}
                  >
                    {/* =================================================
                        DAY HEADER
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenDay(isOpen ? null : day.day)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`itinerary-day-${day.day}`}
                      className="
                        flex
                        min-h-[98px]
                        w-full
                        items-center
                        gap-4
                        px-5
                        py-4
                        text-left
                        sm:px-6
                      "
                    >
                      <div className="min-w-0 flex-1">
                        {/* DAY LABEL */}

                        <div className="flex items-center gap-2">
                          <span
                            className="
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.22em]
                              text-[#C89A3D]
                              sm:text-[9px]
                            "
                          >
                            Day {day.day}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-[#C89A3D]" />

                          <span
                            className="
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.18em]
                              text-[#7B8798]
                              sm:text-[9px]
                            "
                          >
                            Journey
                          </span>
                        </div>

                        {/* ROUTE */}

                        <h3
                          className="
                            mt-1.5
                            text-[14px]
                            font-semibold
                            leading-6
                            text-[#10264A]
                            sm:text-[15px]
                          "
                        >
                          {day.title}
                        </h3>

                        {/* START → END */}

                        {start && end && (
                          <div
                            className="
                              mt-2
                              flex
                              flex-wrap
                              items-center
                              gap-1.5
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              text-[#6B7890]
                              sm:text-[8.5px]
                            "
                          >
                            <span className="text-[#8A94A5]">
                              Starts at
                            </span>

                            <span className="text-[#34435A]">
                              {start}
                            </span>

                            <ArrowRight
                              size={11}
                              strokeWidth={1.8}
                              className="text-[#C89A3D]"
                            />

                            <span className="text-[#8A94A5]">
                              Ends at
                            </span>

                            <span className="text-[#34435A]">
                              {end}
                            </span>
                          </div>
                        )}

                        {/* OVERNIGHT */}

                        {day.stay && day.stay !== "-" && (
                          <div className="mt-2">
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-[#10264A]/8
                                bg-[#F6F8FA]
                                px-2.5
                                py-1
                                text-[9px]
                                font-medium
                                text-[#52627A]
                              "
                            >
                              <Moon
                                size={10}
                                strokeWidth={2}
                                className="text-[#C89A3D]"
                              />

                              Overnight · {day.stay}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CHEVRON */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-all
                          duration-200

                          ${
                            isOpen
                              ? `
                                border-[#C89A3D]/35
                                bg-[#FBF8EF]
                                text-[#C89A3D]
                              `
                              : `
                                border-[#10264A]/10
                                bg-[#FAFAF8]
                                text-[#52627A]
                              `
                          }
                        `}
                      >
                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={`
                            transition-transform
                            duration-200
                            ${isOpen ? "rotate-180" : ""}
                          `}
                        />
                      </span>
                    </button>

                    {/* =================================================
                        EXPANDED DETAILS
                    ================================================= */}

                    {isOpen && (
                      <div
                        id={`itinerary-day-${day.day}`}
                        className="
                          border-t
                          border-[#10264A]/10
                          bg-[#FCFCFA]
                          px-5
                          pb-6
                          pt-5
                          sm:px-6
                        "
                      >
                        {/* =================================================
                            JOURNEY DESCRIPTION
                        ================================================= */}

                        {day.description && (
                          <div>
                            <div
                              className="
                                mb-2.5
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <span className="h-px w-5 bg-[#C89A3D]" />

                              <span
                                className="
                                  text-[8px]
                                  font-bold
                                  uppercase
                                  tracking-[0.22em]
                                  text-[#C89A3D]
                                "
                              >
                                The Journey
                              </span>
                            </div>

                            <p
                              className="
                                max-w-3xl
                                text-[12px]
                                leading-7
                                text-[#34435A]
                                sm:text-[12.5px]
                              "
                            >
                              {day.description}
                            </p>
                          </div>
                        )}

                        {/* =================================================
                            INDIVIDUAL PLACES
                        ================================================= */}

                        {detailedPlaces.length > 0 && (
                          <div className="mt-6">
                            <div
                              className="
                                mb-3.5
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <span className="h-px w-5 bg-[#C89A3D]" />

                              <span
                                className="
                                  text-[8px]
                                  font-bold
                                  uppercase
                                  tracking-[0.22em]
                                  text-[#C89A3D]
                                "
                              >
                                Stops & Experiences
                              </span>
                            </div>

                            <div className="space-y-3.5">
                              {detailedPlaces.map((place) => (
                                <div
                                  key={place}
                                  className="
                                    border-l-2
                                    border-[#C89A3D]/70
                                    pl-4
                                    sm:pl-5
                                  "
                                >
                                  <h4
                                    className="
                                      text-[12px]
                                      font-semibold
                                      leading-5
                                      text-[#10264A]
                                      sm:text-[12.5px]
                                    "
                                  >
                                    {place}
                                  </h4>

                                  <p
                                    className="
                                      mt-1
                                      max-w-3xl
                                      text-[11px]
                                      leading-6
                                      text-[#52627A]
                                      sm:text-[11.5px]
                                    "
                                  >
                                    {placeDescriptions[place]}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* =================================================
                            QUICK PLACE SUMMARY
                        ================================================= */}

                        {day.places && day.places.length > 0 && (
                          <div
                            className="
                              mt-6
                              rounded-xl
                              border
                              border-[#10264A]/8
                              bg-white
                              px-4
                              py-4
                              sm:px-5
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#C89A3D]
                              "
                            >
                              <span
                                className="
                                  flex
                                  h-6
                                  w-6
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#FBF8EF]
                                "
                              >
                                <MapPin
                                  size={11}
                                  strokeWidth={2}
                                  className="text-[#C89A3D]"
                                />
                              </span>

                              Places & Experiences
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {day.places.map((place) => (
                                <span
                                  key={place}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-[#10264A]/10
                                    bg-[#F8F7F3]
                                    px-3
                                    py-1.5
                                    text-[9.5px]
                                    font-medium
                                    text-[#34435A]
                                  "
                                >
                                  <span
                                    className="
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      bg-[#C89A3D]
                                    "
                                  />

                                  {place}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* =================================================
                            TRAVEL NOTE
                        ================================================= */}

                        {travelNote && (
                          <div
                            className="
                              mt-5
                              flex
                              items-start
                              gap-3
                              rounded-xl
                              border
                              border-[#C89A3D]/30
                              bg-[#FBF8EF]
                              px-4
                              py-3.5
                            "
                          >
                            <span
                              className="
                                mt-0.5
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                shadow-[0_2px_6px_rgba(16,38,74,0.06)]
                              "
                            >
                              <Info
                                size={12}
                                strokeWidth={2}
                                className="text-[#C89A3D]"
                              />
                            </span>

                            <div>
                              <p
                                className="
                                  text-[8px]
                                  font-bold
                                  uppercase
                                  tracking-[0.2em]
                                  text-[#9B7325]
                                "
                              >
                                Travel Note
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-[10.5px]
                                  leading-5
                                  text-[#52627A]
                                  sm:text-[11px]
                                "
                              >
                                {travelNote}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* =================================================
                            OVERNIGHT SUMMARY
                        ================================================= */}

                        {day.stay && day.stay !== "-" && (
                          <div
                            className="
                              mt-5
                              flex
                              items-center
                              gap-2
                              text-[10px]
                              font-medium
                              text-[#52627A]
                            "
                          >
                            <Moon
                              size={12}
                              strokeWidth={2}
                              className="text-[#C89A3D]"
                            />

                            Overnight stay in{" "}
                            <span className="font-semibold text-[#10264A]">
                              {day.stay}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            GENERAL TRAVEL NOTE
        ========================================================= */}

        <div
          className="
            mt-7
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-[#C89A3D]/30
            bg-[#FBF8EF]
            px-4
            py-3.5
            text-[10px]
            leading-5
            text-[#52627A]
            sm:px-5
          "
        >
          <span
            className="
              mt-0.5
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-[0_2px_6px_rgba(16,38,74,0.06)]
            "
          >
            <Navigation
              size={11}
              strokeWidth={2}
              className="text-[#C89A3D]"
            />
          </span>

          <span>
            Daily timings and sightseeing order may vary depending on road
            conditions, weather, traffic, local restrictions and operational
            requirements. Mountain journeys may require flexibility, especially
            on high-altitude routes.
          </span>
        </div>
      </div>
    </section>
  );
}