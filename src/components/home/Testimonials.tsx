import TestimonialCard from "../ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            What Our Travelers Say
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Real experiences from travelers who explored Himachal with
            Pahadi Pathways.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}