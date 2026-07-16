import type { Testimonial } from "@/types/testimonial";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="mb-6 flex">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star
            key={index}
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="text-gray-600 leading-7 italic">
        "{testimonial.review}"
      </p>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900">
          {testimonial.name}
        </h3>

        <p className="text-sm text-gray-500">
          {testimonial.city}
        </p>

        <p className="mt-2 text-sm font-medium text-green-700">
          {testimonial.tour}
        </p>
      </div>
    </div>
  );
}