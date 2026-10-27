import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import JsonLd from "@/components/seo/JsonLd";

import { getPackages } from "@/lib/cms/packages";
import { getTestimonials } from "@/lib/cms/testimonials";
import { defaultDescription, pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/cms/site";
import { websiteJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata(
    {
      description: defaultDescription,
      path: "/",
    },
    settings
  );
}

export default async function Home() {
  const [packages, testimonials] = await Promise.all([getPackages(), getTestimonials()]);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <Hero />

      <PopularPackages packages={packages} />

      <FeaturedDestinations />

      <Testimonials testimonials={testimonials} />

      <WhyChooseUs />

      <CallToAction />
    </>
  );
}
