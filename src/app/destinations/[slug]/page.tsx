import { notFound } from "next/navigation";
import Image from "next/image";

import { allDestinations } from "@/data/destinations";

import DestinationOverview from "@/components/destination-page/DestinationOverview";
import DestinationHighlights from "@/components/destination-page/DestinationHighlights";
import DestinationExperiences from "@/components/destination-page/DestinationExperiences";
import NearbyDestinations from "@/components/destination-page/NearbyDestinations";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DestinationPage({
  params,
}: Props) {
  const { slug } = await params;

  const destination = allDestinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    notFound();
  }

  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">

        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#081526]/70" />

        <div className="relative z-10 px-6 text-center text-white">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {destination.subtitle}
          </p>

          <h1 className="mt-5 text-5xl font-extrabold md:text-7xl">
            {destination.name}
          </h1>

        </div>

      </section>

      <DestinationOverview destination={destination} />

      <DestinationHighlights destination={destination} />

      <DestinationExperiences destination={destination} />

      <NearbyDestinations destination={destination} />

      {/* ================= PLACEHOLDER ================= */}

      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="rounded-3xl bg-[#F8F8F8] p-10">

          <h3 className="text-2xl font-bold text-[#10264A]">
            More Coming Soon
          </h3>

          <p className="mt-4 leading-8 text-gray-600">
            Soon this page will include recommended tour packages,
            suggested itineraries, travel information and an easy
            way to plan your Himalayan journey.
          </p>

        </div>

      </section>

    </main>
  );
}