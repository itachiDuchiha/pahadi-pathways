import {
  Check,
  X,
  ShieldCheck,
  Info,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function IncludedExcluded({ pkg }: Props) {
  return (
    <section
      id="inclusions"
      className="border-b border-[#10264A]/[0.06] bg-[#F7F6F2]"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-7 sm:py-12 lg:px-8 lg:py-14">

        {/* =========================================================
            SECTION INTRO
        ========================================================= */}

        <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C89A3D]" />

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-[#C89A3D]
                  sm:text-[9px]
                "
              >
                Package Details
              </p>
            </div>

            <h2
              className="
                mt-2
                font-serif
                text-[28px]
                font-medium
                leading-tight
                text-[#10264A]
                sm:text-[31px]
                lg:text-[34px]
              "
            >
              Inclusions & Exclusions
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-[10px]
              leading-5
              text-[#687386]
              sm:text-right
              sm:text-[10.5px]
            "
          >
            A clear overview of what is covered in your journey and
            what may require additional payment.
          </p>
        </div>

        {/* =========================================================
            MAIN INFORMATION PANEL
        ========================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#10264A]/[0.08]
            bg-white
            shadow-[0_10px_35px_rgba(16,38,74,0.055)]
          "
        >

          <div className="grid lg:grid-cols-2">

            {/* =====================================================
                INCLUDED
            ===================================================== */}

            <div className="border-b border-[#10264A]/[0.07] lg:border-b-0 lg:border-r">

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#10264A]/[0.07]
                  bg-[#FBFCFA]
                  px-5
                  py-4
                  sm:px-6
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#ECF8F0]
                    text-[#1D9A52]
                  "
                >
                  <ShieldCheck
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-[13px]
                      font-semibold
                      text-[#10264A]
                      sm:text-[14px]
                    "
                  >
                    What's Included
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#8992A1]
                    "
                  >
                    Covered in your package
                  </p>
                </div>

              </div>

              {/* ITEMS */}

              <div>
                {pkg.includes.map((item, index) => (
                  <div
                    key={item}
                    className={`
                      flex
                      gap-3.5
                      px-5
                      py-4
                      sm:px-6
                      ${
                        index !== pkg.includes.length - 1
                          ? "border-b border-[#10264A]/[0.055]"
                          : ""
                      }
                    `}
                  >

                    {/* ICON */}

                    <div
                      className="
                        mt-0.5
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#ECF8F0]
                        text-[#1D9A52]
                      "
                    >
                      <Check
                        size={11}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* TEXT */}

                    <div className="min-w-0">
                      <p
                        className="
                          text-[11px]
                          font-semibold
                          leading-5
                          text-[#193253]
                          sm:text-[11.5px]
                        "
                      >
                        {item}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          leading-4
                          text-[#7A8493]
                        "
                      >
                        Included according to the package itinerary
                        and selected options.
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* =====================================================
                EXCLUDED
            ===================================================== */}

            <div>

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#10264A]/[0.07]
                  bg-[#FCFAFA]
                  px-5
                  py-4
                  sm:px-6
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFF0F0]
                    text-[#D94B4B]
                  "
                >
                  <Info
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-[13px]
                      font-semibold
                      text-[#10264A]
                      sm:text-[14px]
                    "
                  >
                    What's Not Included
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#8992A1]
                    "
                  >
                    Additional expenses
                  </p>
                </div>

              </div>

              {/* ITEMS */}

              <div>
                {pkg.exclusions && pkg.exclusions.length > 0 ? (
                  pkg.exclusions.map((item, index) => (
                    <div
                      key={item}
                      className={`
                        flex
                        gap-3.5
                        px-5
                        py-4
                        sm:px-6
                        ${
                          index !== pkg.exclusions!.length - 1
                            ? "border-b border-[#10264A]/[0.055]"
                            : ""
                        }
                      `}
                    >

                      {/* ICON */}

                      <div
                        className="
                          mt-0.5
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#FFF0F0]
                          text-[#D94B4B]
                        "
                      >
                        <X
                          size={10}
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* TEXT */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-[11px]
                            font-semibold
                            leading-5
                            text-[#193253]
                            sm:text-[11.5px]
                          "
                        >
                          {item}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[9px]
                            leading-4
                            text-[#7A8493]
                          "
                        >
                          Payable separately unless specifically
                          mentioned in the package.
                        </p>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="px-5 py-6 sm:px-6">
                    <p className="text-[10px] text-[#7A8493]">
                      No exclusions have been specified for this package.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* =======================================================
              BOTTOM NOTE
          ======================================================= */}

          <div
            className="
              flex
              items-start
              gap-2.5
              border-t
              border-[#10264A]/[0.07]
              bg-[#FAFAF8]
              px-5
              py-3.5
              sm:px-6
            "
          >

            <Info
              size={13}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-[#C89A3D]"
            />

            <p
              className="
                text-[9px]
                leading-4
                text-[#737D8D]
              "
            >
              Package inclusions may vary depending on the selected
              vehicle, stay category, meal plan and final itinerary.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}