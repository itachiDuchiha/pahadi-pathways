import { notFound } from "next/navigation";

import SiteLayout from "@/components/layout/SiteLayout";

import Hero from "@/components/package-details/Hero";
import Overview from "@/components/package-details/Overview";
import QuickFacts from "@/components/package-details/QuickFacts";
import StayPlan from "@/components/package-details/StayPlan";
import DayTimeline from "@/components/package-details/DayTimeline";
import Highlights from "@/components/package-details/Highlights";
import IncludedExcluded from "@/components/package-details/IncludedExcluded";
import TravelNote from "@/components/package-details/TravelNote";
import BookingCard from "@/components/package-details/BookingCard";

import PackageSectionNav from "@/components/packages/PackageSectionNav";

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
            OVERVIEW
        ========================================================= */}

        <Overview pkg={pkg} />

        {/* =========================================================
            QUICK FACTS
        ========================================================= */}

        <QuickFacts pkg={pkg} />

        {/* =========================================================
            STAY PLAN
        ========================================================= */}

        <StayPlan pkg={pkg} />

        {/* =========================================================
            DAY-BY-DAY ITINERARY
        ========================================================= */}

        <DayTimeline pkg={pkg} />

        {/* =========================================================
            HIGHLIGHTS
        ========================================================= */}

        <Highlights pkg={pkg} />

        {/* =========================================================
            INCLUDED / EXCLUDED
        ========================================================= */}

        <IncludedExcluded pkg={pkg} />

        {/* =========================================================
            TRAVEL NOTE
        ========================================================= */}

        <TravelNote pkg={pkg} />

        {/* =========================================================
            BOOKING / ENQUIRY
        ========================================================= */}

        <BookingCard pkg={pkg} />
      </main>
    </SiteLayout>
  );
}