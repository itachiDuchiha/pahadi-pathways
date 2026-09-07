import SiteLayout from "@/components/layout/SiteLayout";
import PackageCard from "@/components/packages/PackageCard";

import { packages } from "@/data/packages";

type PackagesPageProps = {
  searchParams: Promise<{
    destination?: string;
    date?: string;
    adults?: string;
    children?: string;
  }>;
};

/* =========================================================
   NORMALIZE SEARCH TEXT
========================================================= */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   GET SEARCH KEYWORD

   Examples:

   "Spiti Valley"   -> "spiti"
   "Tirthan Valley" -> "tirthan"
   "McLeod Ganj"    -> "mcleod"
   "Dharamshala"    -> "dharamshala"
   "Kaza"           -> "kaza"
========================================================= */

function getSearchKeyword(destination: string) {
  const words = normalizeText(destination)
    .split(" ")
    .filter(Boolean);

  if (words.length === 0) return "";

  return words[0];
}

/* =========================================================
   PACKAGE SEARCH TEXT

   We search through:

   - Package title
   - Slug
   - Route / itinerary
   - Itinerary day titles
   - Stay locations
   - Descriptions
   - Places
   - Highlights
   - Stay plan
   - Overview

   Therefore:

   Search "Dharamshala"
   -> finds "1N Dharamshala" inside a route.

   Search "Spiti Valley"
   -> searches "spiti", so packages containing
      "Spiti" are found even if they don't literally
      contain "Spiti Valley".
========================================================= */

function getPackageSearchText(
  pkg: (typeof packages)[number]
) {
  const itineraryText =
    pkg.itinerary?.join(" ") ?? "";

  const itineraryDaysText =
    pkg.itineraryDays
      ?.map((day) =>
        [
          day.title,
          day.stay,
          day.description,
          ...(day.places ?? []),
        ].join(" ")
      )
      .join(" ") ?? "";

  const highlightsText =
    pkg.highlights?.join(" ") ?? "";

  const stayPlanText =
    pkg.stayPlan?.join(" ") ?? "";

  return normalizeText(
    [
      pkg.title,
      pkg.slug,
      itineraryText,
      itineraryDaysText,
      highlightsText,
      stayPlanText,
      pkg.overview ?? "",
    ].join(" ")
  );
}

/* =========================================================
   CHECK PACKAGE MATCH
========================================================= */

function packageMatchesDestination(
  pkg: (typeof packages)[number],
  destination: string
) {
  const keyword = getSearchKeyword(destination);

  if (!keyword) return false;

  const searchText = getPackageSearchText(pkg);

  return searchText.includes(keyword);
}

/* =========================================================
   PAGE
========================================================= */

export default async function PackagesPage({
  searchParams,
}: PackagesPageProps) {
  const params = await searchParams;

  const destination =
    params.destination?.trim() ?? "";

  const hasSearch =
    destination.length > 0;

  /* =======================================================
     MATCHING PACKAGES
  ======================================================= */

  const matchingPackages = hasSearch
    ? packages.filter((pkg) =>
        packageMatchesDestination(
          pkg,
          destination
        )
      )
    : [];

  const matchingCount =
    matchingPackages.length;

  /* =======================================================
     DISPLAYED PACKAGES

     SEARCH PAGE:

     1. Matching packages
     2. Popular packages
     3. Remaining packages

     This keeps the customer's actual results
     at the top.
  ======================================================= */

  let displayedPackages = packages;

  if (hasSearch) {
    const matchingSlugs = new Set(
      matchingPackages.map(
        (pkg) => pkg.slug
      )
    );

    const popularPackages =
      packages.filter(
        (pkg) =>
          pkg.popular &&
          !matchingSlugs.has(pkg.slug)
      );

    const popularSlugs = new Set(
      popularPackages.map(
        (pkg) => pkg.slug
      )
    );

    const otherPackages =
      packages.filter(
        (pkg) =>
          !matchingSlugs.has(pkg.slug) &&
          !popularSlugs.has(pkg.slug)
      );

    displayedPackages = [
      ...matchingPackages,
      ...popularPackages,
      ...otherPackages,
    ];
  }

  /* =======================================================
     SEARCH HERO IMAGE

     Use the first matching package image if your
     package data contains "image".

     IMPORTANT:
     If your package data uses a different image
     property, change only this line.
  ======================================================= */

  const searchHeroImage =
    hasSearch
      ? (matchingPackages[0] as any)?.image ??
        "/images/hero/hero.jpg"
      : "/images/hero/hero.jpg";

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <SiteLayout>

      {/* =====================================================
          SEARCH RESULTS PAGE
      ===================================================== */}

      {hasSearch ? (
        <>
          {/* =================================================
              SEARCH HERO

              IMPORTANT:

              pt-[96px] / mt-[96px] equivalent effect
              keeps the fixed navbar completely OUTSIDE
              the hero image.

              Therefore:
              - navbar stays readable
              - image never sits behind navbar
              - no transparency problem
          ================================================= */}

          <section
            className="
              relative
              mt-[96px]
              min-h-[380px]
              overflow-hidden
              border-b
              border-gray-200
              bg-[#EEF2F6]
              sm:min-h-[400px]
              md:min-h-[420px]
            "
          >

            {/* =================================================
                BACKGROUND IMAGE
            ================================================= */}

            <img
              src={searchHeroImage}
              alt=""
              aria-hidden="true"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
            />

            {/* =================================================
                OVERALL IMAGE TONE

                Very subtle.
                We don't want to wash out the photograph.
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                bg-[#10264A]/10
              "
            />

            {/* =================================================
                LEFT TEXT READABILITY

                Stronger on the left.
                Completely fades toward the image.
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#F7F8FA]/95
                via-[#F7F8FA]/75
                to-transparent
              "
            />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-10
                mx-auto
                flex
                min-h-[380px]
                max-w-7xl
                items-center
                px-6
                py-16
                sm:min-h-[400px]
                sm:px-8
                md:min-h-[420px]
                md:px-10
                lg:px-12
              "
            >
              <div
                className="
                  w-full
                  max-w-[620px]
                "
              >

                {/* =================================================
                    SMALL LABEL
                ================================================= */}

                <div className="flex items-center gap-3">
                  <span
                    className="
                      h-px
                      w-10
                      bg-[#C89A3D]
                      sm:w-14
                    "
                  />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.32em]
                      text-[#B58225]
                      sm:text-[11px]
                    "
                  >
                    Your Search
                  </p>
                </div>

                {/* =================================================
                    HEADING
                ================================================= */}

                <h1
                  className="
                    mt-5
                    font-serif
                    text-[3rem]
                    font-medium
                    leading-[0.98]
                    tracking-[-0.025em]
                    text-[#10264A]
                    sm:text-[4rem]
                    md:text-[4.6rem]
                    lg:text-[5rem]
                  "
                >
                  Journeys for
                  <br />

                  <span
                    className="
                      italic
                      text-[#C89A3D]
                    "
                  >
                    {destination}
                  </span>
                </h1>

                {/* =================================================
                    RESULT COUNT
                ================================================= */}

                <p
                  className="
                    mt-6
                    max-w-[560px]
                    text-sm
                    leading-7
                    text-[#294467]
                    sm:text-base
                  "
                >
                  {matchingCount > 0
                    ? `We found ${matchingCount} ${
                        matchingCount === 1
                          ? "journey"
                          : "journeys"
                      } that include ${destination} along the route.`
                    : `We don't have a journey that includes ${destination} yet, but you may find another Himalayan escape that suits you.`}
                </p>

              </div>
            </div>
          </section>

          {/* =================================================
              MATCHING RESULTS INTRO
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-5xl
              px-6
              pb-8
              pt-14
              text-center
              md:pb-10
              md:pt-16
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-[#C89A3D]
                sm:text-[11px]
              "
            >
              {matchingCount > 0
                ? "Matching Journeys"
                : "Explore More"}
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-medium
                text-[#10264A]
                md:text-4xl
              "
            >
              {matchingCount > 0
                ? "Trips That Include Your Destination"
                : "Other Himalayan Journeys"}
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-gray-600
                sm:text-base
              "
            >
              {matchingCount > 0
                ? "These journeys include your searched destination somewhere along the route."
                : "We are still growing our collection. Explore these Himalayan journeys in the meantime."}
            </p>
          </section>

          {/* =================================================
              PACKAGE GRID
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-6xl
              px-6
              pb-16
              md:pb-20
            "
          >
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {displayedPackages.map(
                (pkg, index) => {

                  const isMatching =
                    matchingPackages.some(
                      (matchingPkg) =>
                        matchingPkg.slug ===
                        pkg.slug
                    );

                  const isFirstOtherPackage =
                    hasSearch &&
                    matchingCount > 0 &&
                    index === matchingCount;

                  return (
                    <div
                      key={pkg.slug}
                      className="
                        contents
                      "
                    >

                      {/* =========================================
                          OTHER POPULAR ESCAPES

                          This is intentionally OUTSIDE the
                          matching cards.

                          Therefore it appears ONLY AFTER
                          ALL matching results.
                      ========================================= */}

                      {isFirstOtherPackage && (
                        <div
                          className="
                            col-span-full
                            mb-2
                            mt-8
                            border-t
                            border-gray-200
                            pt-10
                          "
                        >
                          <p
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.3em]
                              text-[#C89A3D]
                            "
                          >
                            More Himalayan Journeys
                          </p>

                          <h3
                            className="
                              mt-2
                              font-serif
                              text-2xl
                              font-medium
                              text-[#10264A]
                              md:text-3xl
                            "
                          >
                            Other Popular Escapes
                          </h3>

                          <p
                            className="
                              mt-2
                              text-sm
                              text-gray-500
                            "
                          >
                            Don't see exactly what
                            you want? Explore these
                            other journeys.
                          </p>
                        </div>
                      )}

                      <div
                        className={
                          isMatching
                            ? ""
                            : "relative"
                        }
                      >
                        <PackageCard
                          pkg={pkg}
                        />
                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </section>

          {/* =================================================
              CUSTOM JOURNEY
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-6xl
              px-6
              pb-16
              md:pb-20
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-[#10264A]
                px-7
                py-12
                text-center
                text-white
                sm:px-10
                md:px-16
                md:py-14
              "
            >

              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-[#C89A3D]/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-white/5
                  blur-3xl
                "
              />

              <div className="relative">

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#D4AF37]
                  "
                >
                  Travel Your Way
                </p>

                <h2
                  className="
                    mx-auto
                    mt-3
                    max-w-2xl
                    font-serif
                    text-3xl
                    font-medium
                    md:text-4xl
                  "
                >
                  Want Something More Personal?
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-7
                    text-gray-300
                    sm:text-base
                  "
                >
                  Every traveler is different.
                  Tell us what you're looking for
                  and we'll help create a Himalayan
                  journey around you.
                </p>

                <button
                  type="button"
                  className="
                    mt-7
                    rounded-full
                    bg-[#C89A3D]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-[#10264A]
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#D7AE57]
                    hover:shadow-xl
                    active:scale-95
                  "
                >
                  Plan My Journey
                </button>

              </div>
            </div>
          </section>
        </>
      ) : (

        /* =====================================================
           NORMAL /packages PAGE
        ===================================================== */

        <>
          {/* =================================================
              NORMAL PACKAGES HERO
          ================================================= */}

          <section
            className="
              relative
              flex
              min-h-[520px]
              items-center
              justify-center
              overflow-hidden
              md:min-h-[560px]
            "
          >

            <img
              src="/images/hero/hero.jpg"
              alt="Himalayan mountain journey"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#081526]/80
                via-[#081526]/55
                to-[#081526]/85
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]
              "
            />

            <div
              className="
                relative
                z-10
                mx-auto
                w-full
                max-w-4xl
                px-6
                pb-4
                pt-24
                text-center
                text-white
                sm:px-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span
                  className="
                    h-px
                    w-8
                    bg-[#C89A3D]/80
                    sm:w-14
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.38em]
                    text-[#D4AF37]
                    sm:text-xs
                  "
                >
                  Handpicked Himalayan Escapes
                </p>

                <span
                  className="
                    h-px
                    w-8
                    bg-[#C89A3D]/80
                    sm:w-14
                  "
                />
              </div>

              <h1
                className="
                  mx-auto
                  mt-6
                  max-w-3xl
                  font-serif
                  text-[2.75rem]
                  font-medium
                  leading-[1.05]
                  tracking-[-0.02em]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Journeys Made
                <br />

                <span
                  className="
                    italic
                    text-[#D4AF37]
                  "
                >
                  For You
                </span>
              </h1>

              <div
                className="
                  mx-auto
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span
                  className="
                    h-px
                    w-10
                    bg-[#C89A3D]/80
                    sm:w-16
                  "
                />

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#D4AF37]
                  "
                />

                <span
                  className="
                    h-px
                    w-10
                    bg-[#C89A3D]/80
                    sm:w-16
                  "
                />
              </div>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-6
                  text-gray-200
                  sm:text-base
                  sm:leading-7
                "
              >
                Thoughtfully planned journeys through
                the mountains, designed around comfort,
                discovery and authentic Himalayan
                experiences.
              </p>

            </div>

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-20
                bg-gradient-to-t
                from-[#081526]/35
                to-transparent
              "
            />

          </section>

          {/* =================================================
              NORMAL INTRO
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-5xl
              px-6
              pb-10
              pt-12
              text-center
              md:pb-12
              md:pt-14
            "
          >

            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#C89A3D]
              "
            >
              Our Journeys
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-medium
                text-[#10264A]
                md:text-4xl
              "
            >
              Choose Your Himalayan Experience
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-gray-600
                sm:text-base
              "
            >
              From short mountain escapes to deeper
              Himalayan adventures, choose a journey
              that matches the way you want to travel.
            </p>

          </section>

          {/* =================================================
              NORMAL PACKAGE GRID
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-6xl
              px-6
              pb-16
              md:pb-20
            "
          >
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
                  pkg={pkg}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              CUSTOM JOURNEY
          ================================================= */}

          <section
            className="
              mx-auto
              max-w-6xl
              px-6
              pb-16
              md:pb-20
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-[#10264A]
                px-7
                py-12
                text-center
                text-white
                sm:px-10
                md:px-16
                md:py-14
              "
            >

              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-[#C89A3D]/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-white/5
                  blur-3xl
                "
              />

              <div className="relative">

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#D4AF37]
                  "
                >
                  Travel Your Way
                </p>

                <h2
                  className="
                    mx-auto
                    mt-3
                    max-w-2xl
                    font-serif
                    text-3xl
                    font-medium
                    md:text-4xl
                  "
                >
                  Want Something More Personal?
                </h2>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-7
                    text-gray-300
                    sm:text-base
                  "
                >
                  Every traveler is different. Tell us
                  what you're looking for and we'll help
                  create a Himalayan journey around you.
                </p>

                <button
                  type="button"
                  className="
                    mt-7
                    rounded-full
                    bg-[#C89A3D]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-[#10264A]
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#D7AE57]
                    hover:shadow-xl
                    active:scale-95
                  "
                >
                  Plan My Journey
                </button>

              </div>
            </div>
          </section>

        </>
      )}

    </SiteLayout>
  );
}