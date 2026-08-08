import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import ReviewCard from "@/components/ui/ReviewCard";

export default function ScrollingTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;

    const animate = () => {
      if (!paused) {
        container.scrollTop += 0.5;

        if (
          container.scrollTop >=
          container.scrollHeight / 2
        ) {
          container.scrollTop = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [paused]);

  return (
    <div className="relative">

      {/* Top Fade */}

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-20 bg-gradient-to-b from-[#F8F8F6] to-transparent" />

      {/* Bottom Fade */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-20 bg-gradient-to-t from-[#F8F8F6] to-transparent" />

      {/* Reviews */}

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="
          h-[560px]
          overflow-y-auto
          rounded-3xl
          scroll-smooth
          no-scrollbar
          pr-2
        "
      >
        {[...testimonials, ...testimonials].map((review, index) => (
          <div key={index} className="mb-4">
            <ReviewCard testimonial={review} />
          </div>
        ))}
      </div>

    </div>
  );
}