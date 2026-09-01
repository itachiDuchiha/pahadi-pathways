import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Clock3,
  Hotel,
  MapPin,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function PackageCard({ pkg }: Props) {
  return (
    <article
      className="
        group
        overflow-visible
        rounded-2xl
        border
        border-[#10264A]/10
        bg-white
        shadow-[0_6px_24px_rgba(16,38,74,0.07)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_14px_35px_rgba(16,38,74,0.12)]
      "
    >
      {/* =========================================================
          IMAGE
      ========================================================= */}

      <Link
        href={`/packages/${pkg.slug}`}
        aria-label={`View ${pkg.title}`}
        className="block"
      >
        <div className="relative h-[205px] overflow-hidden rounded-t-2xl">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />

          {/* Dark image gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/70 via-transparent to-transparent" />

          {/* Popular badge */}
          {pkg.popular && (
            <span
              className="
                absolute
                left-4
                top-4
                rounded-full
                bg-[#D4AF37]
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#10264A]
                shadow-md
              "
            >
              Most Popular
            </span>
          )}

          {/* Duration */}
          <div
            className="
              absolute
              bottom-3.5
              left-4
              flex
              items-center
              gap-1.5
              rounded-full
              bg-[#081526]/80
              px-3
              py-1.5
              text-[10px]
              font-semibold
              text-white
              backdrop-blur-sm
            "
          >
            <Clock3 size={12} className="text-[#D4AF37]" />
            {pkg.duration}
          </div>

          {/* Rating */}
          <div
            className="
              absolute
              bottom-3.5
              right-4
              flex
              items-center
              gap-1
              rounded-full
              bg-white
              px-2.5
              py-1.5
              text-[#10264A]
              shadow-md
            "
          >
            <Star
              size={12}
              fill="currentColor"
              className="text-[#C89A3D]"
            />

            <span className="text-[10px] font-bold">
              {pkg.rating}
            </span>
          </div>
        </div>
      </Link>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="p-4">
        {/* Title */}

        <Link
          href={`/packages/${pkg.slug}`}
          className="
            block
            font-serif
            text-[1.2rem]
            font-medium
            leading-[1.15]
            text-[#10264A]
            transition-colors
            duration-300
            hover:text-[#C89A3D]
          "
        >
          {pkg.title}
        </Link>

        {/* Duration + Pickup */}

        <div className="mt-2.5 flex items-center gap-4 text-[11px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock3
              size={13}
              className="text-[#C89A3D]"
            />

            <span className="font-medium">
              {pkg.duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin
              size={13}
              className="text-[#C89A3D]"
            />

            <span>
              Ex{" "}
              <span className="font-semibold text-[#10264A]">
                {pkg.pickup}
              </span>
            </span>
          </div>
        </div>

        {/* =========================================================
            ROUTE
        ========================================================= */}

        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
              Route
            </span>

            <div className="flex min-w-0 flex-1 items-center overflow-visible whitespace-nowrap">
              {pkg.itinerary.map((stop, index) => (
                <div
                  key={stop}
                  className="flex shrink-0 items-center"
                >
                  <span className="text-[11px] font-medium text-[#10264A]">
                    {stop}
                  </span>

                  {index !== pkg.itinerary.length - 1 && (
                    <span className="mx-1.5 text-[#C89A3D]">
                      →
                    </span>
                  )}
                </div>
              ))}

              {/* More stops */}

              {pkg.hiddenItinerary &&
                pkg.hiddenItinerary.length > 0 && (
                  <div className="group/more relative ml-2 shrink-0">
                    <span
                      className="
                        cursor-default
                        text-[10px]
                        font-semibold
                        text-[#C89A3D]
                        transition-colors
                        duration-200
                        group-hover/more:text-[#10264A]
                      "
                    >
                      +{pkg.hiddenItinerary.length} More
                    </span>

                    {/* Hover card */}

                    <div
                      className="
                        invisible
                        absolute
                        bottom-full
                        right-0
                        z-[100]
                        mb-2
                        w-[125px]
                        rounded-xl
                        border
                        border-[#10264A]/10
                        bg-white
                        px-3
                        py-2.5
                        opacity-0
                        shadow-[0_10px_30px_rgba(16,38,74,0.16)]
                        transition-all
                        duration-200
                        group-hover/more:visible
                        group-hover/more:opacity-100
                      "
                    >
                      <p
                        className="
                          mb-1.5
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#C89A3D]
                        "
                      >
                        More Stops
                      </p>

                      <div className="space-y-1">
                        {pkg.hiddenItinerary.map((item) => (
                          <div
                            key={item}
                            className="
                              text-[10px]
                              font-medium
                              leading-4
                              text-[#10264A]
                            "
                          >
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Popup arrow */}

                      <span
                        className="
                          absolute
                          -bottom-1
                          right-4
                          h-2
                          w-2
                          rotate-45
                          border-b
                          border-r
                          border-[#10264A]/10
                          bg-white
                        "
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* =========================================================
            INCLUDES
        ========================================================= */}

        <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3">
          {pkg.includes.includes("Transfer") && (
            <div className="flex items-center gap-1.5">
              <Car
                size={14}
                className="text-[#10264A]"
              />

              <span className="text-[10px] text-gray-600">
                Transfer
              </span>
            </div>
          )}

          {pkg.includes.includes("Stay") && (
            <div className="flex items-center gap-1.5">
              <Hotel
                size={14}
                className="text-[#10264A]"
              />

              <span className="text-[10px] text-gray-600">
                Stay
              </span>
            </div>
          )}

          {pkg.includes.includes("Meals") && (
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed
                size={14}
                className="text-[#10264A]"
              />

              <span className="text-[10px] text-gray-600">
                Meals
              </span>
            </div>
          )}
        </div>

        {/* =========================================================
            PRICE
        ========================================================= */}

        <div className="mt-3 flex items-end justify-between border-t border-gray-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#C89A3D]
              "
            >
              From
            </span>

            <span
              className="
                font-sans
                text-[1.35rem]
                font-bold
                leading-none
                tracking-tight
                tabular-nums
                text-[#10264A]
              "
            >
              {pkg.price}
            </span>
          </div>

          <span className="pb-0.5 text-[9px] text-gray-500">
            per person
          </span>
        </div>

        {/* =========================================================
            CTA
        ========================================================= */}

        <Link
          href={`/packages/${pkg.slug}`}
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#10264A]
            px-4
            py-2.5
            text-[11px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-white
            transition-all
            duration-300
            hover:bg-[#18355F]
          "
        >
          View Journey Details

          <ArrowRight
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </article>
  );
}