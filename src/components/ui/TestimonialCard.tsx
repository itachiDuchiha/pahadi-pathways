import type { Testimonial } from "@/types/testimonial";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C89A3D]/40 hover:shadow-xl">

      {/* Stars */}

      <div className="mb-4 flex gap-1">

        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-[#D9B255] text-[#D9B255]"
          />
        ))}

      </div>

      {/* Review */}

      <p className="min-h-[110px] text-[15px] leading-7 text-gray-600 italic">
        “{testimonial.review}”
      </p>

      {/* Divider */}

      <div className="my-5 h-px bg-gray-100" />

      {/* Name */}

      <h3 className="text-lg font-bold text-[#10264A]">
        {testimonial.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {testimonial.city}
      </p>

      {/* Tour */}

      <div className="mt-4 inline-flex rounded-full bg-[#F8F8F6] px-4 py-2 text-sm font-medium text-[#10264A]">

        {testimonial.tour}

      </div>

    </div>
  );
}