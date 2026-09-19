import Link from "next/link";

import { packages } from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";

export default function ManaliPackages() {
  const manaliPackages = packages.filter((pkg) =>
    pkg.itinerary.some((stop) =>
      stop.toLowerCase().includes("manali")
    )
  );

  return (
    <section className="bg-[#F7F6F2] py-7 md:py-9">

      <div className="mx-auto max-w-6xl px-6">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
              Explore Manali
            </p>

            <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight text-[#10264A] md:text-5xl">
              Popular Manali Packages
            </h2>

          </div>

          <Link
            href="/packages"
            className="
              shrink-0
              text-sm
              font-bold
              text-[#B5852F]
              transition-colors
              hover:text-[#10264A]
            "
          >
            View All Packages →
          </Link>

        </div>

        {/* ================= PACKAGES ================= */}

        {manaliPackages.length > 0 ? (

          <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {manaliPackages.map((pkg) => (
              <PackageCard
                key={pkg.slug}
                pkg={pkg}
              />
            ))}

          </div>

        ) : (

          <div className="mt-6 rounded-3xl border border-[#10264A]/10 bg-white p-10 text-center">

            <p className="text-gray-600">
              Manali packages will be available soon.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}