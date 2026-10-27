import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import type { Section } from "@/lib/legal-copy";

const LINK_CLASS = "font-semibold text-[#10264A] underline hover:text-[#A97925]";

/** `[text](/path)` (internal paths only) or an email address. */
const TOKEN = /\[([^\]]+)\]\((\/[^)\s]*)\)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

/** Renders a paragraph's internal links and email addresses as links. */
function inline(paragraph: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of paragraph.matchAll(TOKEN)) {
    const [whole, label, href, email] = match;
    const start = match.index;

    if (start > last) nodes.push(paragraph.slice(last, start));
    nodes.push(
      email ? (
        <a key={start} href={`mailto:${email}`} className={LINK_CLASS}>
          {email}
        </a>
      ) : (
        <Link key={start} href={href ?? "/"} className={LINK_CLASS}>
          {label}
        </Link>
      )
    );
    last = start + whole.length;
  }

  if (last < paragraph.length) nodes.push(paragraph.slice(last));

  return nodes;
}

type Props = {
  title: string;
  description: string;
  effectiveDate: string;
  sections: Section[];
  /** Rendered after the section with the matching heading. */
  extras?: Partial<Record<string, ReactNode>>;
};

/** The shared shell of the legal pages: hero, then the sections in a card. */
export default function LegalDocument({ title, description, effectiveDate, sections, extras }: Props) {
  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-[82px]">
      <section className="relative overflow-hidden bg-[#10264A]">
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#C89A3D]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C89A3D]/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D9B255]">Legal</p>
            <span className="h-px w-10 bg-[#C89A3D]/70" />
          </div>

          <h1 className="font-serif text-[2.8rem] font-medium leading-tight tracking-[-0.025em] text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C89A3D]/60" />
            <span className="h-[7px] w-[7px] rotate-45 bg-[#C89A3D]" />
            <span className="h-px w-10 bg-[#C89A3D]/60" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-[15px] leading-7 text-white/75 md:text-[16px] md:leading-8">
            {description}
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-[28px] border border-[#10264A]/10 bg-white p-7 shadow-[0_15px_45px_rgba(16,38,74,0.08)] md:p-10">
            <p className="text-sm leading-6 text-[#6B7685]">Effective date: {effectiveDate}</p>

            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mt-8 font-serif text-2xl font-medium text-[#10264A]">{section.heading}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 max-w-2xl font-serif text-[15px] leading-7 text-[#596678]">
                    {inline(paragraph)}
                  </p>
                ))}

                {extras?.[section.heading]}
              </div>
            ))}

            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#10264A]/20 bg-[#F8F7F3] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#10264A] transition-all duration-300 hover:border-[#C89A3D] hover:bg-white"
              >
                <ArrowLeft size={14} />
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
