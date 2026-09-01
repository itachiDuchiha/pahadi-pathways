import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function Hero({ pkg }: Props) {
  const images = pkg.images?.length
    ? pkg.images
    : [pkg.image];

  return (
    <section className="bg-[#F5F6F8] pb-6 pt-24 md:pb-8 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#10264A]/10
            bg-white
            shadow-[0_10px_35px_rgba(16,38,74,0.09)]
          "
        >
          <div className="grid md:grid-cols-[42%_58%]">

            {/* =====================================================
                IMAGE COLLAGE
            ===================================================== */}

            <Link
              href={`/packages/${pkg.slug}`}
              aria-label={`View ${pkg.title}`}
              className="group relative block min-h-[300px] overflow-hidden md:min-h-[390px]"
            >
              <div className="absolute inset-0 grid grid-cols-[1.65fr_1fr] gap-1.5">

                {/* MAIN IMAGE */}
                <div className="relative overflow-hidden">
                  <Image
                    src={images[0]}
                    alt={pkg.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 65vw, 28vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* SMALL IMAGES */}
                <div className="grid grid-rows-2 gap-1.5">

                  <div className="relative overflow-hidden">
                    <Image
                      src={images[1] || images[0]}
                      alt={`${pkg.title} view 2`}
                      fill
                      sizes="(max-width: 768px) 35vw, 15vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <div className="relative overflow-hidden">
                    <Image
                      src={images[2] || images[0]}
                      alt={`${pkg.title} view 3`}
                      fill
                      sizes="(max-width: 768px) 35vw, 15vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>

                </div>
              </div>

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081526]/65 via-transparent to-transparent" />

              {/* POPULAR */}
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

              {/* BOTTOM IMAGE FACTS */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">

                {/* Duration */}
                <div
                  className="
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
                    backdrop-blur-md
                  "
                >
                  <Clock3
                    size={12}
                    className="text-[#D4AF37]"
                  />

                  {pkg.duration}
                </div>

                {/* Rating */}
                <div
                  className="
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

            {/* =====================================================
                PACKAGE INFORMATION
            ===================================================== */}

            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-7">

              {/* EYEBROW */}
              <div className="flex items-center gap-2.5">
                <span className="h-px w-7 bg-[#C89A3D]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#C89A3D]">
                  Curated Himalayan Journey
                </p>
              </div>

              {/* TITLE */}
              <Link
                href={`/packages/${pkg.slug}`}
                className="
                  mt-2
                  block
                  font-serif
                  text-[1.85rem]
                  font-medium
                  leading-[1.08]
                  text-[#10264A]
                  transition-colors
                  duration-300
                  hover:text-[#C89A3D]
                  sm:text-[2.1rem]
                "
              >
                {pkg.title}
              </Link>

              {/* RATING */}
              <div className="mt-2 flex items-center gap-1.5">
                <Star
                  size={13}
                  fill="currentColor"
                  className="text-[#C89A3D]"
                />

                <span className="text-xs font-bold text-[#10264A]">
                  {pkg.rating}
                </span>

                <span className="text-[10px] text-gray-400">
                  rated journey
                </span>
              </div>

              {/* SHORT OVERVIEW */}
              {pkg.overview && (
                <p
                  className="
                    mt-3
                    max-w-xl
                    text-[12px]
                    leading-5.5
                    text-gray-500
                    line-clamp-3
                  "
                >
                  {pkg.overview}
                </p>
              )}

              {/* =================================================
                  QUICK FACTS
              ================================================= */}

              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-x-6
                  gap-y-3
                  border-y
                  border-gray-100
                  py-3.5
                "
              >

                {/* DURATION */}
                <div className="flex items-center gap-2.5">
                  <Clock3
                    size={15}
                    className="shrink-0 text-[#C89A3D]"
                  />

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#10264A]/60">
                      Duration
                    </p>

                    <p className="mt-0.5 text-[12px] font-bold text-[#10264A]">
                      {pkg.duration}
                    </p>
                  </div>
                </div>

                {/* STARTING FROM */}
                <div className="flex items-center gap-2.5">
                  <MapPin
                    size={15}
                    className="shrink-0 text-[#C89A3D]"
                  />

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#10264A]/60">
                      Starting From
                    </p>

                    <p className="mt-0.5 text-[12px] font-bold text-[#10264A]">
                      {pkg.pickup}
                    </p>
                  </div>
                </div>

                {/* TRANSPORT */}
                {pkg.vehicle && (
                  <div className="flex items-center gap-2.5">
                    <Car
                      size={15}
                      className="shrink-0 text-[#C89A3D]"
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#10264A]/60">
                        Transport
                      </p>

                      <p className="mt-0.5 text-[12px] font-bold text-[#10264A]">
                        {pkg.vehicle}
                      </p>
                    </div>
                  </div>
                )}

                {/* BEST TIME */}
                {pkg.bestTime && (
                  <div className="flex items-center gap-2.5">
                    <CalendarDays
                      size={15}
                      className="shrink-0 text-[#C89A3D]"
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#10264A]/60">
                        Best Time
                      </p>

                      <p className="mt-0.5 text-[12px] font-bold text-[#10264A]">
                        {pkg.bestTime}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* =================================================
                  ROUTE
              ================================================= */}

              <div className="mt-3">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#C89A3D]">
                  Journey Route
                </p>

                <div className="mt-1.5 flex flex-wrap items-center">
                  {pkg.itinerary.map((stop, index) => (
                    <div
                      key={stop}
                      className="flex items-center"
                    >
                      <span className="text-[10px] font-semibold text-[#10264A]">
                        {stop}
                      </span>

                      {index !== pkg.itinerary.length - 1 && (
                        <span className="mx-1.5 text-[#C89A3D]">
                          →
                        </span>
                      )}
                    </div>
                  ))}

                  {pkg.hiddenItinerary &&
                    pkg.hiddenItinerary.length > 0 && (
                      <span className="ml-2 text-[9px] font-semibold text-[#C89A3D]">
                        +{pkg.hiddenItinerary.length} more
                      </span>
                    )}
                </div>
              </div>

              {/* =================================================
                  PRICE + ACTIONS
              ================================================= */}

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-end
                  justify-between
                  gap-3
                  border-t
                  border-gray-100
                  pt-3
                "
              >

                {/* PRICE */}
                <div>
                  <div className="flex items-baseline gap-2">

                    <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#C89A3D]">
                      From
                    </span>

                    <span
                      className="
                        font-sans
                        text-[1.65rem]
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

                  <p className="mt-1 text-[9px] text-gray-400">
                    per person
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2">

                  <Link
                    href="/contact"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-[#C89A3D]
                      px-4
                      py-2.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.07em]
                      text-[#10264A]
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#D7AE57]
                      hover:shadow-md
                    "
                  >
                    Book This Tour
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-[#10264A]/20
                      bg-white
                      px-4
                      py-2.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.07em]
                      text-[#10264A]
                      transition-all
                      duration-300
                      hover:border-[#10264A]
                      hover:bg-[#10264A]
                      hover:text-white
                    "
                  >
                    WhatsApp
                    <ArrowRight size={13} />
                  </Link>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}