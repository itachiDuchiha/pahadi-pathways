"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Check,
  Clock3,
  Hotel,
  MapPin,
  Star,
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

    const moreElement = measureContainer.querySelector(
      "[data-more-measure]"
    ) as HTMLElement | null;

    const gap = 18;

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
          moreElement?.offsetWidth ?? 50;

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
            currentRemaining === pkg.itinerary.length
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
    String(item).trim().toLowerCase()
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

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-[#10264A]/[0.10]
        bg-white
        shadow-[0_8px_30px_rgba(16,38,74,0.065)]
        transition-all
        duration-500
        ease-out
        hover:-translate-y-2
        hover:border-[#C89A3D]
        hover:shadow-[0_24px_55px_rgba(16,38,74,0.14),0_0_0_1px_rgba(200,154,61,0.28)]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <Link
        href={`/packages/${pkg.slug}`}
        aria-label={`View ${pkg.title}`}
        className="block shrink-0"
      >
        <div
          className="
            relative
            h-[225px]
            overflow-hidden
            bg-[#E9EDF2]
          "
        >
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-[1100ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* Bottom cinematic gradient */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-[#071525]/80
              via-[#071525]/30
              to-transparent
            "
          />

          {/* Top protection */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-24
              bg-gradient-to-b
              from-black/15
              to-transparent
            "
          />

          {/* =================================================
              POPULAR BADGE
          ================================================= */}

          {pkg.popular && (
            <div
              className="
                absolute
                left-4
                top-4
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/20
                bg-[#10264A]/90
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
                shadow-[0_5px_18px_rgba(0,0,0,0.18)]
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]
                "
              />

              Most Popular
            </div>
          )}

          {/* =================================================
              RATING
          ================================================= */}

          <div
            className="
              absolute
              right-4
              top-4
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/50
              bg-white/95
              px-2.5
              py-1.5
              text-[#10264A]
              shadow-[0_5px_18px_rgba(0,0,0,0.15)]
              backdrop-blur-md
            "
          >
            <Star
              size={11}
              strokeWidth={1.8}
              fill="currentColor"
              className="text-[#C89A3D]"
            />

            <span className="text-[10px] font-bold">
              {pkg.rating.toFixed(1)}
            </span>
          </div>

          {/* =================================================
              DURATION
          ================================================= */}

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
              border-white/15
              bg-[#071525]/88
              px-3
              py-1.5
              text-[10px]
              font-semibold
              tracking-[0.03em]
              text-white
              shadow-[0_5px_18px_rgba(0,0,0,0.20)]
              backdrop-blur-md
            "
          >
            <Clock3
              size={12}
              strokeWidth={1.9}
              className="text-[#D4AF37]"
            />

            {pkg.duration}
          </div>
        </div>
      </Link>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-5
          pb-4
          pt-[15px]
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <div className="group/title relative min-w-0">
          <Link
            href={`/packages/${pkg.slug}`}
            title={pkg.title}
            className="
              block
              min-w-0
              font-serif
              text-[1.22rem]
              font-medium
              leading-[1.25]
              tracking-[-0.012em]
              text-[#10264A]
              transition-colors
              duration-300
              hover:text-[#B5852F]
            "
          >
            <span
              className="
                block
                truncate
              "
            >
              {pkg.title}
            </span>
          </Link>

          {/* Full title tooltip — ABOVE title */}

          {pkg.title.length > 30 && (
            <div
              className="
                pointer-events-none
                invisible
                absolute
                bottom-full
                left-0
                z-[100]
                mb-2.5
                max-w-[320px]
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
                  -bottom-1
                  left-4
                  h-2
                  w-2
                  rotate-45
                  border-b
                  border-r
                  border-white/10
                  bg-[#081526]
                "
              />
            </div>
          )}
        </div>

        {/* =================================================
            BASIC INFO
        ================================================= */}

        <div
          className="
            mt-2.5
            flex
            min-w-0
            items-center
            gap-3
            overflow-visible
            whitespace-nowrap
          "
        >
          {/* DURATION */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[10.5px]
              font-bold
              text-[#10264A]
            "
          >
            <Clock3
              size={13.5}
              strokeWidth={2}
              className="
                shrink-0
                text-[#C89A3D]
              "
            />

            <span>
              {pkg.duration}
            </span>
          </div>

          {/* DIVIDER */}

          <span
            className="
              h-4
              w-px
              shrink-0
              bg-[#10264A]/15
            "
          />

          {/* PICKUP */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[10.5px]
              font-medium
              text-[#10264A]
            "
          >
            <MapPin
              size={13.5}
              strokeWidth={2}
              className="
                shrink-0
                text-[#C89A3D]
              "
            />

            <span>
              From{" "}
              <span
                className="
                  font-bold
                  text-[#10264A]
                "
              >
                {pkg.pickup}
              </span>
            </span>
          </div>

          {/* SECOND DIVIDER */}

          {hasAnyInclude && (
            <span
              className="
                h-4
                w-px
                shrink-0
                bg-[#10264A]/15
              "
            />
          )}

          {/* =================================================
              FEATURE ICONS
          ================================================= */}

          {hasTransfer && (
            <div
              title="Transport"
              className="
                flex
                h-[27px]
                w-[27px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#10264A]/10
                bg-[#F8F8F6]
                text-[#10264A]
                shadow-[0_2px_7px_rgba(16,38,74,0.07)]
                transition-all
                duration-200
                hover:border-[#C89A3D]/60
                hover:bg-[#FFF9EC]
              "
            >
              <CarFront
                size={13}
                strokeWidth={1.9}
              />
            </div>
          )}

          {hasStay && (
            <div
              title="Stay"
              className="
                flex
                h-[27px]
                w-[27px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#10264A]/10
                bg-[#F8F8F6]
                text-[#10264A]
                shadow-[0_2px_7px_rgba(16,38,74,0.07)]
                transition-all
                duration-200
                hover:border-[#C89A3D]/60
                hover:bg-[#FFF9EC]
              "
            >
              <Hotel
                size={13}
                strokeWidth={1.9}
              />
            </div>
          )}

          {hasMeals && (
            <div
              title="Meals"
              className="
                flex
                h-[27px]
                w-[27px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#10264A]/10
                bg-[#F8F8F6]
                text-[#10264A]
                shadow-[0_2px_7px_rgba(16,38,74,0.07)]
                transition-all
                duration-200
                hover:border-[#C89A3D]/60
                hover:bg-[#FFF9EC]
              "
            >
              <UtensilsCrossed
                size={13}
                strokeWidth={1.9}
              />
            </div>
          )}
        </div>

        {/* =================================================
            JOURNEY
        ================================================= */}

        <div
          className="
            mt-3
            rounded-[14px]
            border
            border-[#10264A]/[0.07]
            bg-[#F7F6F2]
            px-3.5
            py-2.5
          "
        >
          <div
            ref={routeRef}
            className="
              relative
              min-w-0
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
                    min-w-0
                    shrink-0
                    items-center
                  "
                >
                  <span
                    className="
                      max-w-[110px]
                      truncate
                      text-[10.5px]
                      font-bold
                      text-[#10264A]
                    "
                    title={stop}
                  >
                    {stop}
                  </span>

                  {index !==
                    visibleStops.length - 1 && (
                    <span
                      className="
                        mx-[9px]
                        shrink-0
                        text-[10px]
                        font-semibold
                        text-[#B5852F]
                      "
                    >
                      →
                    </span>
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
                      rounded-full
                      bg-white
                      px-2
                      py-1
                      text-[9px]
                      font-bold
                      text-[#B5852F]
                      shadow-[0_2px_8px_rgba(16,38,74,0.06)]
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
                      mb-2.5
                      w-[150px]
                      rounded-xl
                      border
                      border-[#10264A]/10
                      bg-white
                      px-3.5
                      py-3
                      opacity-0
                      shadow-[0_15px_35px_rgba(16,38,74,0.16)]
                      transition-all
                      duration-200
                      group-hover/more:visible
                      group-hover/more:opacity-100
                    "
                  >
                    <p
                      className="
                        mb-2
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#C89A3D]
                      "
                    >
                      More Stops
                    </p>

                    <div className="space-y-1.5">
                      {hiddenStops.map(
                        (item, index) => (
                          <div
                            key={`${item}-${index}`}
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[10px]
                              font-medium
                              leading-4
                              text-[#10264A]
                            "
                          >
                            <span
                              className="
                                h-1
                                w-1
                                shrink-0
                                rounded-full
                                bg-[#C89A3D]
                              "
                            />

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

            {/* =================================================
                HIDDEN MEASUREMENT ROW
            ================================================= */}

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
                    font-semibold
                  "
                >
                  {stop}
                </span>
              ))}

              <span
                data-more-measure
                className="
                  text-[9px]
                  font-bold
                "
              >
                +{pkg.itinerary.length} More
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            PRICE + CTA AREA
        ================================================= */}

        <div
          className="
            mt-auto
            pt-3
          "
        >
          {/* TOP DIVIDER */}

          <div
            className="
              mb-3
              h-px
              w-full
              bg-[#10264A]/[0.09]
            "
          />

          <div
            className="
              flex
              items-end
              justify-between
            "
          >
            {/* PRICE */}

            <div>
              <div
                className="
                  mb-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.20em]
                  text-[#B5852F]
                "
              >
                Starting from
              </div>

              <div
                className="
                  flex
                  items-baseline
                  gap-1.5
                "
              >
                <span
                  className="
                    font-sans
                    text-[1.55rem]
                    font-bold
                    leading-none
                    tracking-[-0.025em]
                    tabular-nums
                    text-[#10264A]
                  "
                >
                  {pkg.price}
                </span>

                <span
                  className="
                    text-[9px]
                    font-medium
                    text-[#687386]
                  "
                >
                  / person
                </span>
              </div>
            </div>

            {/* PRIVATE TRIP */}

            <div
              className="
                flex
                items-center
                gap-1
                pb-0.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#687386]
              "
            >
              <Check
                size={11}
                strokeWidth={2}
                className="text-[#C89A3D]"
              />

              Private trip
            </div>
          </div>

          {/* CTA */}

          <Link
            href={`/packages/${pkg.slug}`}
            className="
              mt-3
              flex
              h-[46px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#10264A]
              px-4
              text-[9.5px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white
              shadow-[0_6px_16px_rgba(16,38,74,0.12)]
              transition-all
              duration-300
              hover:bg-[#18355F]
              hover:shadow-[0_9px_22px_rgba(16,38,74,0.20)]
            "
          >
            Explore Journey

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
      </div>
    </article>
  );
}