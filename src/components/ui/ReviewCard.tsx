import type { Testimonial } from "@/types/testimonial";
import { Star, Quote } from "lucide-react";

type ReviewCardProps = {
  testimonial: Testimonial;
};

export default function ReviewCard({
  testimonial,
}: ReviewCardProps) {
  return (
    <div
      className="
        group
        rounded-[22px]
        border
        border-[#E6ECF5]
        bg-white
        p-5
        shadow-[0_6px_22px_rgba(16,38,74,0.07)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C89A3D]/45
        hover:shadow-[0_12px_30px_rgba(16,38,74,0.11)]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-3 flex items-center justify-between">

        {/* Stars */}

        <div className="flex items-center gap-[2px]">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star
              key={index}
              size={15}
              strokeWidth={1.8}
              className="fill-[#D9B255] text-[#D9B255]"
            />
          ))}
        </div>

        {/* Quote Icon */}

        <Quote
          size={28}
          strokeWidth={1.6}
          className="
            text-[#D9B255]/20
            transition-all
            duration-300
            group-hover:text-[#D9B255]/40
          "
        />

      </div>


      {/* =====================================================
          REVIEW
      ===================================================== */}

      <div
        className="
          min-h-[108px]
          rounded-[16px]
          bg-[#F2F7FF]
          p-4
          transition-colors
          duration-300
          group-hover:bg-[#EAF3FF]
        "
      >

        <p
          className="
            text-[14px]
            italic
            leading-6
            text-[#596678]
          "
        >
          "{testimonial.review}"
        </p>

      </div>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div
        className="
          my-3
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#D9B255]/35
          to-transparent
        "
      />


      {/* =====================================================
          CUSTOMER
      ===================================================== */}

      <h3
        className="
          text-[16px]
          font-bold
          leading-tight
          text-[#10264A]
        "
      >
        {testimonial.name}
      </h3>

      <p
        className="
          mt-1
          text-[13px]
          text-[#718096]
        "
      >
        {testimonial.city}
      </p>


      {/* =====================================================
          TOUR
      ===================================================== */}

      <div
        className="
          mt-3
          inline-flex
          items-center
          rounded-full
          bg-[#10264A]
          px-3.5
          py-1.5
          text-[11px]
          font-medium
          text-[#F4D06F]
          transition-all
          duration-300
          group-hover:bg-[#C89A3D]
          group-hover:text-[#10264A]
        "
      >
        {testimonial.tour}
      </div>

    </div>
  );
}