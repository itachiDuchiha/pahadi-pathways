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
        relative
        flex
        h-full
        flex-col
        overflow-visible
        rounded-[18px]
        bg-white
        shadow-[0_8px_30px_rgba(16,38,74,0.07)]
        transition-all
        duration-500
        ease-out
        hover:-translate-y-2
        hover:shadow-[0_22px_50px_rgba(16,38,74,0.16)]
        hover:shadow-[0_22px_50px_rgba(200,154,61,0.14)]
      "
    >
      {/* =========================================================
          CONSISTENT GOLD OUTLINE
          ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[30]
          rounded-[18px]
          border-[1.5px]
          border-[#C89A3D]/65
          transition-all
          duration-500
          group-hover:border-[#C89A3D]
          group-hover:shadow-[0_0_0_1px_rgba(200,154,61,0.10),0_0_22px_rgba(200,154,61,0.16)]
        "
      />

      {/* =========================================================
          SUBTLE TOP GOLD HIGHLIGHT
          ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-8
          top-0
          z-[40]
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#E2B85C]
          to-transparent
          opacity-60
          transition-all
          duration-500
          group-hover:inset-x-5
          group-hover:opacity-100
        "
      />

      {/* =========================================================
          IMAGE
      ========================================================= */}

      <Link
        href={`/packages/${pkg.slug}`}
        aria-label={`View ${pkg.title}`}
        className="block shrink-0"
      >
        <div
          className="
            relative
            h-[218px]
            overflow-hidden
            rounded-t-[18px]
            bg-[#E9EDF2]
          "
        >
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-[900ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* IMAGE GRADIENT */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#071525]/75
              via-[#071525]/5
              to-transparent
            "
          />

          {/* SUBTLE TOP IMAGE FADE */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-20
              bg-gradient-to-b
              from-black/10
              to-transparent
            "
          />

          {/* =====================================================
              DURATION BADGE
          ===================================================== */}

          <div
            className="
              absolute
              bottom-4
              left-4
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#C89A3D]/50
              bg-[#071525]/85
              px-3
              py-1.5
              text-[10px]
              font-semibold
              tracking-[0.02em]
              text-white
              shadow-[0_4px_15px_rgba(0,0,0,0.20)]
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:border-[#C89A3D]
              group-hover:shadow-[0_5px_18px_rgba(200,154,61,0.22)]
            "
          >
            <Clock3
              size={12}
              strokeWidth={2}
              className="text-[#D4AF37]"
            />

            {pkg.duration}
          </div>
        </div>
      </Link>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-[17px]
          pb-[17px]
          pt-[15px]
        "
      >
        {/* =======================================================
            TITLE
        ======================================================= */}

        <div className="group/title relative min-w-0">
          <Link
            href={`/packages/${pkg.slug}`}
            title={pkg.title}
            className="
              block
              h-[1.55rem]
              min-w-0
              truncate
              whitespace-nowrap
              font-serif
              text-[1.18rem]
              font-medium
              leading-[1.2]
              tracking-[-0.01em]
              text-[#10264A]
              transition-colors
              duration-300
              hover:text-[#B5852F]
            "
          >
            {pkg.title}
          </Link>

          {/* FULL TITLE HOVER */}

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
              rounded-xl
              border
              border-white/10
              bg-[#081526]
              px-3.5
              py-2.5
              text-[10px]
              font-medium
              leading-4
              text-white
              opacity-0
              shadow-[0_15px_35px_rgba(16,38,74,0.22)]
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
                border-white/10
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
            text-[10.5px]
            text-[#687386]
          "
        >
          {/* Duration */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
            "
          >
            <Clock3
              size={13}
              strokeWidth={1.8}
              className="text-[#C89A3D]"
            />

            <span className="font-medium">
              {pkg.duration}
            </span>
          </div>

          {/* Pickup */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-1.5
            "
          >
            <MapPin
              size={13}
              strokeWidth={1.8}
              className="
                shrink-0
                text-[#C89A3D]
              "
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
            border-[#10264A]/[0.07]
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
                tracking-[0.2em]
                text-[#B5852F]
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
                        text-[10.5px]
                        font-medium
                        text-[#10264A]
                      "
                    >
                      {stop}
                    </span>

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
                  <div
                    className="
                      group/more
                      relative
                      ml-1
                      shrink-0
                    "
                  >
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

                    {/* MORE STOPS TOOLTIP */}

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
                        shadow-[0_12px_35px_rgba(16,38,74,0.16)]
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
                      text-[10.5px]
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
              border-[#10264A]/[0.07]
              pt-3
            "
          >
            {/* TRANSFER */}

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
                  strokeWidth={1.7}
                  className="text-[#10264A]"
                />

                <span
                  className="
                    text-[10px]
                    text-[#687386]
                  "
                >
                  Transfer
                </span>
              </div>
            )}

            {/* STAY */}

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
                  strokeWidth={1.7}
                  className="text-[#10264A]"
                />

                <span
                  className="
                    text-[10px]
                    text-[#687386]
                  "
                >
                  Stay
                </span>
              </div>
            )}

            {/* MEALS */}

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
                  strokeWidth={1.7}
                  className="text-[#10264A]"
                />

                <span
                  className="
                    text-[10px]
                    text-[#687386]
                  "
                >
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
            border-[#10264A]/[0.07]
            pt-3
          "
        >
          <div className="flex items-baseline gap-2">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#B5852F]
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

          <span
            className="
              pb-0.5
              text-[9px]
              text-[#7B8492]
            "
          >
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
            h-[40px]
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-[#10264A]
            bg-[#10264A]
            px-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-white
            shadow-[0_4px_12px_rgba(16,38,74,0.12)]
            transition-all
            duration-300
            hover:border-[#18355F]
            hover:bg-[#18355F]
            hover:shadow-[0_7px_18px_rgba(16,38,74,0.18)]
          "
        >
          View Journey Details

          <ArrowRight
            size={14}
            strokeWidth={1.8}
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