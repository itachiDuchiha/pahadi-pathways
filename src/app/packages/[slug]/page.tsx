import type { Metadata } from "next";

import { notFound } from "next/navigation";

import Hero from "@/components/package-details/Hero";
import PackageSectionNav from "@/components/package-details/PackageSectionNav";

import Overview from "@/components/package-details/Overview";
import StayPlan from "@/components/package-details/StayPlan";
import DayTimeline from "@/components/package-details/DayTimeline";
import IncludedExcluded from "@/components/package-details/IncludedExcluded";
import TravelNote from "@/components/package-details/TravelNote";

import CancellationPolicy from "@/components/package-details/CancellationPolicy";
import TermsConditions from "@/components/package-details/TermsConditions";

import PackageBookingPanel from "@/components/package-details/PackageBookingPanel";
import PackageFaq from "@/components/package-details/PackageFaq";

import JsonLd from "@/components/seo/JsonLd";

import { packages } from "@/data/packages";

import { pageMetadata, truncate } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  packageJsonLd,
} from "@/lib/structured-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    return { title: "Not found" };
  }

  return pageMetadata({
    title: pkg.title,
    description: truncate(pkg.overview ?? pkg.summary ?? pkg.title, 155),
    path: `/packages/${pkg.slug}`,
    image: pkg.heroImage ?? pkg.image,
  });
}

export default async function PackageDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <>
      <JsonLd data={packageJsonLd(pkg)} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
          { name: pkg.title, path: `/packages/${pkg.slug}` },
        ])}
      />

      {pkg.faqs?.length ? <JsonLd data={faqJsonLd(pkg.faqs)} /> : null}

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
              <TravelNote />
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

            {/* FREQUENTLY ASKED QUESTIONS */}

            {pkg.faqs?.length ? (
              <section
                id="faq"
                className="scroll-mt-32"
              >
                <PackageFaq faqs={pkg.faqs} />
              </section>
            ) : null}

          </div>

          {/* =====================================================
              RIGHT — PACKAGE PLANNER
          ===================================================== */}

          <aside className="order-first min-w-0 lg:order-none">

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
    </>
  );
}
