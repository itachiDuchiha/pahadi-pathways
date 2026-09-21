import SiteLayout from "@/components/layout/SiteLayout";

import PackageCard from "@/components/packages/PackageCard";

import CustomJourneyCTA from "@/components/packages/CustomJourneyCTA";

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

   "Spiti Valley"     -> "spiti"
   "Tirthan Valley"   -> "tirthan"
   "McLeod Ganj"      -> "mcleod"
   "Dharamshala"      -> "dharamshala"
   "Kaza"             -> "kaza"
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

     When searching:

     1. Matching packages
     2. Popular packages
     3. Remaining packages
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
  ======================================================= */

  const searchHeroImage =
    hasSearch
      ? (matchingPackages[0] as any)?.image ??
        "/images/hero/packages-hero.png"
      : "/images/hero/packages-hero.png";

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

            {/* BACKGROUND IMAGE */}

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

            {/* SUBTLE IMAGE TONE */}

            <div
              className="
                absolute
                inset-0
                bg-[#10264A]/10
              "
            />

            {/* LEFT READABILITY */}

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

            {/* CONTENT */}

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
              <div className="w-full max-w-[620px]">

                {/* LABEL */}

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

                {/* HEADING */}

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
                  {matchingCount > 0 ? (
                    <>
                      Journeys for{" "}
                      <span className="italic text-[#C89A3D]">
                        {destination}
                      </span>
                    </>
                  ) : (
                    <>
                      Explore journeys around{" "}
                      <span className="italic text-[#C89A3D]">
                        {destination}
                      </span>
                    </>
                  )}
                </h1>

                {/* RESULT DESCRIPTION */}

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
                      className="contents"
                    >

                      {/* =====================================
                          OTHER POPULAR ESCAPES
                      ===================================== */}

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

          <CustomJourneyCTA />

        </>

      ) : (

        /* ===================================================
           NORMAL /packages PAGE
        =================================================== */

        <>
          {/* =================================================
              NORMAL PACKAGES HERO
          ================================================= */}

          <section
            className="
              relative
              flex
              min-h-[440px]
              items-center
              justify-center
              overflow-hidden
              md:min-h-[460px]
            "
          >

            {/* BACKGROUND IMAGE */}

            <img
              src="/images/hero/packages-hero.png"
              alt="Himalayan mountain journey"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* CINEMATIC OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#081526]/75
                via-[#081526]/50
                to-[#081526]/80
              "
            />

            {/* SUBTLE CENTER GLOW */}

            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]
              "
            />

            {/* HERO CONTENT */}

            <div
              className="
                relative
                z-10
                mx-auto
                w-full
                max-w-4xl
                px-6
                pb-2
                pt-16
                text-center
                text-white
                sm:px-8
                md:pt-20
              "
            >

              {/* EYEBROW */}

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

              {/* MAIN HEADING */}

              <h1
                className="
                  mx-auto
                  mt-5
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

              {/* DIVIDER */}

              <div
                className="
                  mx-auto
                  mt-4
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

              {/* DESCRIPTION */}

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-6
                  text-gray-200
                  sm:text-base
                  sm:leading-7
                "
              >
                Thoughtfully crafted journeys through
                the Himalayas, designed around comfort,
                discovery and authentic experiences.
              </p>

              {/* SUPPORTING LINE */}

              <p
                className="
                  mt-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#D4AF37]/90
                  sm:text-[10px]
                  sm:tracking-[0.32em]
                "
              >
                Private Trips
                <span className="mx-2 text-[#C89A3D]/70">
                  ·
                </span>
                Flexible Itineraries
                <span className="mx-2 text-[#C89A3D]/70">
                  ·
                </span>
                Local Expertise
              </p>

            </div>

            {/* BOTTOM IMAGE FADE */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-16
                bg-gradient-to-t
                from-[#081526]/25
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
              Explore Our Himalayan Journeys
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

          <CustomJourneyCTA />

        </>
      )}

    </SiteLayout>
  );
}