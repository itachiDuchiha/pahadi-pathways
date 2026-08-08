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
        rounded-3xl
        border
        border-[#E6ECF5]
        bg-white
        p-6
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C89A3D]/40
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star
              key={index}
              size={17}
              className="fill-[#D9B255] text-[#D9B255]"
            />
          ))}
        </div>

        <Quote
          size={34}
          className="text-[#D9B255]/20 transition-all duration-300 group-hover:text-[#D9B255]/40"
        />

      </div>

      {/* Review Bubble */}

      <div
        className="
          min-h-[150px]
          rounded-2xl
          bg-[#F2F7FF]
          p-5
          transition-all
          duration-300
          group-hover:bg-[#EAF3FF]
        "
      >

        <p className="text-[15px] italic leading-7 text-gray-700">
          "{testimonial.review}"
        </p>

      </div>

      {/* Divider */}

      <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#D9B255]/40 to-transparent" />

      {/* Customer */}

      <h3 className="text-lg font-bold text-[#10264A]">
        {testimonial.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {testimonial.city}
      </p>

      {/* Tour */}

      <div
        className="
          mt-4
          inline-flex
          items-center
          rounded-full
          bg-[#10264A]
          px-4
          py-2
          text-sm
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