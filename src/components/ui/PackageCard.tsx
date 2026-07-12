import Image from "next/image";
import type { Package } from "@/types/package";

type PackageCardProps = {
  packageData: Package;
};

export default function PackageCard({
  packageData,
}: PackageCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 w-full">
        <Image
          src={packageData.image}
          alt={packageData.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          {packageData.duration}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {packageData.title}
        </h3>

        <ul className="mt-4 space-y-2">
          {packageData.highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-gray-600"
            >
              • {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <p className="text-2xl font-bold text-green-700">
            {packageData.price}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            *Final pricing may vary by season and hotel category.
          </p>
        </div>

        <button className="mt-6 w-full rounded-full bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800">
          View Details
        </button>
      </div>
    </div>
  );
}