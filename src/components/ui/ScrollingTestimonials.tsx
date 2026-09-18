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
        container.scrollTop += 0.45;

        if (
          container.scrollTop >=
          container.scrollHeight / 2
        ) {
          container.scrollTop = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [paused]);

  return (
    <div className="relative">

      {/* =====================================================
          TOP FADE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-20
          h-12
          bg-gradient-to-b
          from-[#F8F7F3]
          to-transparent
        "
      />


      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-12
          bg-gradient-to-t
          from-[#F8F7F3]
          to-transparent
        "
      />


      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="
          h-[520px]
          overflow-y-auto
          rounded-[24px]
          scroll-smooth
          no-scrollbar
          pr-2
        "
      >

        {[...testimonials, ...testimonials].map(
          (review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="mb-3"
            >
              <ReviewCard testimonial={review} />
            </div>
          )
        )}

      </div>

    </div>
  );
}