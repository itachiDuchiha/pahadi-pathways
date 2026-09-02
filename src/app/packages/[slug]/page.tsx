import { notFound } from "next/navigation";

import SiteLayout from "@/components/layout/SiteLayout";

import Hero from "@/components/package-details/Hero";
import PackageSectionNav from "@/components/package-details/PackageSectionNav";

import Overview from "@/components/package-details/Overview";
import QuickFacts from "@/components/package-details/QuickFacts";
import StayPlan from "@/components/package-details/StayPlan";
import DayTimeline from "@/components/package-details/DayTimeline";
import Highlights from "@/components/package-details/Highlights";
import IncludedExcluded from "@/components/package-details/IncludedExcluded";
import TravelNote from "@/components/package-details/TravelNote";

import CancellationPolicy from "@/components/package-details/CancellationPolicy";
import TermsConditions from "@/components/package-details/TermsConditions";

import PackageBookingPanel from "@/components/package-details/PackageBookingPanel";

import { packages } from "@/data/packages";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PackageDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <SiteLayout>
      <main>

        {/* =========================================================
            PACKAGE HERO
        ========================================================= */}

        <Hero pkg={pkg} />

        {/* =========================================================
            PACKAGE SECTION NAVIGATION
        ========================================================= */}

        <PackageSectionNav />

        {/* =========================================================
            MAIN PACKAGE CONTENT
        ========================================================= */}

        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* =====================================================
                LEFT — PACKAGE DETAILS
            ===================================================== */}

            <div className="min-w-0">

              {/* OVERVIEW */}

              <section
                id="overview"
                className="scroll-mt-32"
              >
                <Overview pkg={pkg} />
              </section>

              {/* QUICK FACTS */}

              <section
                id="quick-facts"
                className="scroll-mt-32"
              >
                <QuickFacts pkg={pkg} />
              </section>

              {/* DETAILED ITINERARY */}

              <section
                id="itinerary"
                className="scroll-mt-32"
              >
                <DayTimeline pkg={pkg} />
              </section>

              {/* STAYS */}

              <section
                id="stays"
                className="scroll-mt-32"
              >
                <StayPlan pkg={pkg} />
              </section>

              {/* INCLUSIONS */}

              <section
                id="inclusions"
                className="scroll-mt-32"
              >
                <IncludedExcluded pkg={pkg} />
              </section>

              {/* THINGS TO KNOW */}

              <section
                id="things-to-know"
                className="scroll-mt-32"
              >
                <TravelNote pkg={pkg} />
              </section>

              {/* TERMS & CONDITIONS */}

              <section
                id="terms"
                className="scroll-mt-32"
              >
                <TermsConditions />
              </section>

              {/* CANCELLATION POLICY */}

              <section
                id="cancellation"
                className="scroll-mt-32"
              >
                <CancellationPolicy />
              </section>

            </div>

            {/* =====================================================
                RIGHT — PACKAGE PLANNER
            ===================================================== */}

            <aside className="hidden lg:block">

              <div
                className="
                  sticky
                  top-[145px]
                  max-h-[calc(100vh-165px)]
                  overflow-y-auto
                  pr-1
                  scrollbar-thin
                  scrollbar-thumb-[#C89A3D]/40
                  scrollbar-track-transparent
                "
              >
                <PackageBookingPanel pkg={pkg} />
              </div>

            </aside>

          </div>
        </div>

      </main>
    </SiteLayout>
  );
}