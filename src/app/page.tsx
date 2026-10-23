import Hero from "@/components/home/Hero";
import PopularPackages from "@/components/home/PopularPackages";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

import JsonLd from "@/components/seo/JsonLd";

import { defaultDescription, pageMetadata } from "@/lib/seo";
import { websiteJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  description: defaultDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <Hero />

      <PopularPackages />

      <FeaturedDestinations />

      <Testimonials />

      <WhyChooseUs />

      <CallToAction />
    </>
  );
}
