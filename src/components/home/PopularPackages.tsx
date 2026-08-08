import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";

export default function PopularPackages() {
  return (
    <section className="bg-[#F8F8F6] py-20">

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C89A3D]">
            Popular Packages
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#10264A]">
            Journeys Loved By Travelers
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#C89A3D]" />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-gray-600">
            Handcrafted experiences designed for travelers who want more than
            just a holiday—discover the very best of Himachal Pradesh.
          </p>

        </div>

        {/* Packages */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {packages.map((pkg) => (

            <PackageCard
              key={pkg.title}
              title={pkg.title}
              image={pkg.image}
              duration={pkg.duration}
              rating={pkg.rating}
              pickup={pkg.pickup}
              price={pkg.price}
              itinerary={pkg.itinerary}
              hiddenItinerary={pkg.hiddenItinerary}
              includes={pkg.includes}
              popular={pkg.popular}
            />

          ))}

        </div>

        {/* Button */}

        <div className="mt-14 text-center">

          <button className="rounded-full bg-[#10264A] px-10 py-4 font-semibold text-white transition hover:bg-[#18355F]">
            View All Packages
          </button>

        </div>

      </div>

    </section>
  );
}