import PackageCard from "../ui/PackageCard";
import { packages } from "@/data/packages";

export default function PopularPackages() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Popular Himachal Packages
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Carefully planned journeys designed to help you experience the
            very best of Himachal Pradesh with comfortable travel,
            quality stays, and unforgettable memories.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((tourPackage) => (
            <PackageCard
              key={tourPackage.title}
              packageData={tourPackage}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Looking for something different?
          </p>

          <button className="mt-4 rounded-full bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800">
            Plan My Custom Journey
          </button>
        </div>
      </div>
    </section>
  );
}