"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Clock3,
  Hotel,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function PackageCard({ pkg }: Props) {
  /* =========================================================
     ROUTE — DYNAMIC FITTING
     ========================================================= */

  const routeRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(
    pkg.itinerary.length
  );

  const calculateVisibleStops = useCallback(() => {
    const container = routeRef.current;
    const measureContainer = measureRef.current;

    if (!container || !measureContainer) return;

    const availableWidth = container.clientWidth;

    if (availableWidth <= 0) return;

    const stopElements = Array.from(
      measureContainer.children
    ).filter(
      (element) =>
        !(element as HTMLElement).hasAttribute(
          "data-more-measure"
        )
    ) as HTMLElement[];

    const moreElement =
      measureContainer.querySelector(
        "[data-more-measure]"
      ) as HTMLElement | null;

    const gap = 10;

    let usedWidth = 0;
    let count = 0;

    /*
     * Fit as many COMPLETE location names as possible.
     */
    for (let i = 0; i < stopElements.length; i++) {
      const stopWidth = stopElements[i].offsetWidth;

      const newWidth =
        usedWidth +
        (count > 0 ? gap : 0) +
        stopWidth;

      if (newWidth <= availableWidth) {
        usedWidth = newWidth;
        count++;
        continue;
      }

      /*
       * More locations remain.
       * Reserve space for +N More.
       */
      const remaining =
        pkg.itinerary.length - count;

      if (remaining > 0) {
        const moreWidth =
          moreElement?.offsetWidth ?? 45;

        let currentCount = count;

        while (currentCount > 0) {
          let currentWidth = 0;

          for (let j = 0; j < currentCount; j++) {
            currentWidth +=
              (j > 0 ? gap : 0) +
              stopElements[j].offsetWidth;
          }

          const currentRemaining =
            pkg.itinerary.length - currentCount;

          const currentMoreText =
            `+${currentRemaining} More`;

          const measuredMoreWidth =
            currentRemaining ===
            pkg.itinerary.length
              ? moreWidth
              : Math.max(
                  moreWidth,
                  currentMoreText.length * 6
                );

          const finalWidth =
            currentWidth +
            (currentCount > 0 ? gap : 0) +
            measuredMoreWidth;

          if (finalWidth <= availableWidth) {
            count = currentCount;
            break;
          }

          currentCount--;
        }
      }

      break;
    }

    /*
     * Always show at least one location.
     */
    setVisibleCount(
      Math.max(
        1,
        Math.min(count, pkg.itinerary.length)
      )
    );
  }, [pkg.itinerary.length]);

  useLayoutEffect(() => {
    calculateVisibleStops();
  }, [calculateVisibleStops]);

  useEffect(() => {
    const container = routeRef.current;

    if (!container) return;

    const observer = new ResizeObserver(() => {
      calculateVisibleStops();
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [calculateVisibleStops]);

  /*
   * Recalculate after fonts/layout settle.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      calculateVisibleStops();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [calculateVisibleStops]);

  const visibleStops = pkg.itinerary.slice(
    0,
    visibleCount
  );

  const hiddenStops = pkg.itinerary.slice(
    visibleCount
  );

  /* =========================================================
     INCLUDES — ROBUST DETECTION
     ========================================================= */

  /*
   * Normalize everything first.
   *
   * We intentionally use includes() instead of exact matching.
   * This means values such as:
   *
   * "Transfer"
   * "Transfers"
   * "Airport Transfer"
   * "Cab / Transfer"
   *
   * will all correctly trigger the Transfer item.
   */

  const normalizedIncludes = pkg.includes.map((item) =>
    String(item)
      .trim()
      .toLowerCase()
  );

  const hasTransfer = normalizedIncludes.some(
    (item) =>
      item.includes("transfer") ||
      item.includes("transport") ||
      item.includes("cab") ||
      item.includes("car") ||
      item.includes("vehicle")
  );

  const hasStay = normalizedIncludes.some(
    (item) =>
      item.includes("stay") ||
      item.includes("hotel") ||
      item.includes("accommodation") ||
      item.includes("lodging")
  );

  const hasMeals = normalizedIncludes.some(
    (item) =>
      item.includes("meal") ||
      item.includes("food") ||
      item.includes("dining") ||
      item.includes("breakfast") ||
      item.includes("lunch") ||
      item.includes("dinner")
  );

  const hasAnyInclude =
    hasTransfer ||
    hasStay ||
    hasMeals;

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
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
        className="block shrink-0"
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
            <Clock3
              size={12}
              className="text-[#D4AF37]"
            />

            {pkg.duration}
          </div>
        </div>
      </Link>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="flex flex-1 flex-col p-4">

        {/* =======================================================
            TITLE
        ======================================================= */}

        <div className="group/title relative min-w-0">

          <Link
            href={`/packages/${pkg.slug}`}
            title={pkg.title}
            className="
              block
              h-[1.4rem]
              min-w-0
              truncate
              whitespace-nowrap
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

          {/* =====================================================
              FULL TITLE HOVER
          ===================================================== */}

          <div
            className="
              pointer-events-none
              invisible
              absolute
              left-0
              top-full
              z-[100]
              mt-2
              max-w-[280px]
              rounded-lg
              border
              border-[#10264A]/10
              bg-[#081526]
              px-3
              py-2
              text-[10px]
              font-medium
              leading-4
              text-white
              opacity-0
              shadow-[0_10px_30px_rgba(16,38,74,0.20)]
              transition-all
              duration-200
              group-hover/title:visible
              group-hover/title:opacity-100
            "
          >
            {pkg.title}

            <span
              className="
                absolute
                -top-1
                left-4
                h-2
                w-2
                rotate-45
                border-l
                border-t
                border-[#10264A]/10
                bg-[#081526]
              "
            />
          </div>

        </div>

        {/* =========================================================
            DURATION + PICKUP
        ========================================================= */}

        <div
          className="
            mt-2.5
            flex
            h-[18px]
            items-center
            gap-4
            overflow-hidden
            whitespace-nowrap
            text-[11px]
            text-gray-600
          "
        >

          {/* Duration */}

          <div className="flex shrink-0 items-center gap-1.5">

            <Clock3
              size={13}
              className="text-[#C89A3D]"
            />

            <span className="font-medium">
              {pkg.duration}
            </span>

          </div>

          {/* Pickup */}

          <div className="flex min-w-0 items-center gap-1.5">

            <MapPin
              size={13}
              className="shrink-0 text-[#C89A3D]"
            />

            <span className="truncate">
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

        <div
          className="
            mt-3
            h-[48px]
            border-t
            border-gray-100
            pt-3
          "
        >

          <div className="flex min-w-0 items-center">

            {/* ROUTE LABEL */}

            <span
              className="
                mr-3
                shrink-0
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#C89A3D]
              "
            >
              Route
            </span>

            {/* ROUTE CONTENT */}

            <div
              ref={routeRef}
              className="
                relative
                min-w-0
                flex-1
                overflow-visible
              "
            >

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  overflow-visible
                  whitespace-nowrap
                "
              >

                {visibleStops.map((stop, index) => (
                  <div
                    key={`${stop}-${index}`}
                    className="
                      flex
                      shrink-0
                      items-center
                    "
                  >

                    <span
                      className="
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        text-[#10264A]
                      "
                    >
                      {stop}
                    </span>

                    {/* Natural gap — NO ARROW */}

                    {index !==
                      visibleStops.length - 1 && (
                      <span className="w-[10px] shrink-0" />
                    )}

                  </div>
                ))}

                {/* =================================================
                    +N MORE
                ================================================= */}

                {hiddenStops.length > 0 && (
                  <div className="group/more relative ml-1 shrink-0">

                    <span
                      className="
                        cursor-default
                        whitespace-nowrap
                        text-[10px]
                        font-semibold
                        text-[#C89A3D]
                        transition-colors
                        duration-200
                        group-hover/more:text-[#10264A]
                      "
                    >
                      +{hiddenStops.length} More
                    </span>

                    {/* =================================================
                        MORE STOPS TOOLTIP
                    ================================================= */}

                    <div
                      className="
                        pointer-events-none
                        invisible
                        absolute
                        bottom-full
                        right-0
                        z-[100]
                        mb-2
                        w-[135px]
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

                        {hiddenStops.map(
                          (item, index) => (
                            <div
                              key={`${item}-${index}`}
                              className="
                                text-[10px]
                                font-medium
                                leading-4
                                text-[#10264A]
                              "
                            >
                              {item}
                            </div>
                          )
                        )}

                      </div>

                      {/* Tooltip arrow */}

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

              {/* ===================================================
                  HIDDEN MEASUREMENT ROW
              =================================================== */}

              <div
                ref={measureRef}
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  flex
                  h-0
                  overflow-hidden
                  whitespace-nowrap
                  opacity-0
                "
                aria-hidden="true"
              >

                {pkg.itinerary.map((stop, index) => (
                  <span
                    key={`${stop}-${index}`}
                    className="
                      shrink-0
                      text-[11px]
                      font-medium
                    "
                  >
                    {stop}
                  </span>
                ))}

                <span
                  data-more-measure
                  className="
                    text-[10px]
                    font-semibold
                  "
                >
                  +{pkg.itinerary.length} More
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            INCLUDES
        ========================================================= */}

        {hasAnyInclude && (
          <div
            className="
              mt-3
              flex
              h-[30px]
              items-center
              gap-5
              overflow-hidden
              border-t
              border-gray-100
              pt-3
            "
          >

            {/* =======================================================
                TRANSFER
            ======================================================= */}

            {hasTransfer && (
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                "
              >

                <CarFront
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#10264A]"
                />

                <span className="text-[10px] text-gray-600">
                  Transfer
                </span>

              </div>
            )}

            {/* =======================================================
                STAY
            ======================================================= */}

            {hasStay && (
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                "
              >

                <Hotel
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#10264A]"
                />

                <span className="text-[10px] text-gray-600">
                  Stay
                </span>

              </div>
            )}

            {/* =======================================================
                MEALS
            ======================================================= */}

            {hasMeals && (
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                "
              >

                <UtensilsCrossed
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#10264A]"
                />

                <span className="text-[10px] text-gray-600">
                  Meals
                </span>

              </div>
            )}

          </div>
        )}

        {/* =========================================================
            PRICE
        ========================================================= */}

        <div
          className="
            mt-3
            flex
            h-[42px]
            items-end
            justify-between
            border-t
            border-gray-100
            pt-3
          "
        >

          <div className="flex items-baseline gap-2">

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#C89A3D]
              "
            >
              Starting from
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
            h-[38px]
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#10264A]
            px-4
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