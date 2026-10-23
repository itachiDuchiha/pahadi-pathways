import { ChevronDown } from "lucide-react";

type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

export default function PackageFaq({ faqs }: Props) {
  return (
    <div className="pb-12 sm:pb-16">
      <div className="overflow-hidden rounded-2xl border border-[#10264A]/12 bg-white shadow-[0_8px_28px_rgba(16,38,74,0.06)]">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="border-b border-[#10264A]/10 bg-[#FAFAF8] px-6 py-5 sm:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89A3D]">
            Quick Answers
          </p>

          <h2 className="mt-1 font-serif text-2xl font-medium text-[#10264A] sm:text-[28px]">
            Frequently asked questions
          </h2>
        </div>

        {/* =========================================================
            QUESTIONS
        ========================================================= */}

        <div className="space-y-3 px-6 py-7 sm:px-8 sm:py-8">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[#10264A]/[0.07] bg-[#FAFAF8] px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[14px] font-bold text-[#10264A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89A3D] [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>

                <ChevronDown
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#C89A3D] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>

              <p className="mt-3 text-[13px] leading-6 text-[#52627A]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}
