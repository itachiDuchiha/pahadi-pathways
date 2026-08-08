import ScrollingTestimonials from "@/components/ui/ScrollingTestimonials";
export default function Testimonials() {
  return (
    <section className="bg-[#F8F8F6] py-20">

      <div className="mx-auto max-w-6xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left Side */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C89A3D]">
              TESTIMONIALS
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#10264A]">

              Stories From
              <br />
              The Mountains

            </h2>

            <div className="mt-6 flex items-center gap-2">

              <span className="text-2xl text-[#D9B255]">
                ★★★★★
              </span>

              <span className="font-semibold text-[#10264A]">
                4.9 Google Rating
              </span>

            </div>

            <p className="mt-6 max-w-md text-lg leading-8 text-gray-600">

              Real stories from travelers who discovered Himachal
              the Pahadi way.

            </p>

            <button className="mt-10 rounded-full border border-[#10264A] px-7 py-3 font-semibold text-[#10264A] transition-all duration-300 hover:bg-[#10264A] hover:text-white">

              View All Reviews

            </button>

          </div>

          {/* Right Side */}

          <ScrollingTestimonials />

        </div>

      </div>

    </section>
  );
}