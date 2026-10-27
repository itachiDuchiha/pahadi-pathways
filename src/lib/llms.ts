import { site, whatsappUrl } from "@/config/site";
import type { Destination, Package } from "@/lib/cms/types";
import { absoluteUrl } from "@/lib/seo";

function packageUrl(pkg: Package): string {
  return absoluteUrl(`/packages/${pkg.slug}`);
}

function header(): string[] {
  return [
    `# ${site.name}`,
    "",
    `> ${site.tagline}: private, customisable tour packages across Himachal Pradesh, India.`,
    "",
    `${site.name} is a travel company that plans and runs private road journeys in Himachal Pradesh, India, including Shimla, Manali, Kinnaur, Spiti Valley, Jibhi and the surrounding hill country. Each package lists its inclusions, and itineraries can be customised on enquiry. Prices are in Indian rupees (INR) per adult.`,
  ];
}

function packageLine(pkg: Package): string {
  return `- [${pkg.title}](${packageUrl(pkg)}): ${pkg.duration}, from ${pkg.price} per adult, pickup from ${pkg.pickup}`;
}

/** The published content the llms.txt files describe. */
export type LlmsContent = {
  packages: readonly Package[];
  destinations: readonly Destination[];
};

function destinationLines(destinations: readonly Destination[]): string[] {
  return destinations.map(
    (destination) =>
      `- [${destination.name}](${absoluteUrl(`/destinations/${destination.slug}`)}): ${destination.description}`
  );
}

function footer(): string[] {
  return [
    "## Contact",
    "",
    `- Phone: ${site.phone.display}`,
    `- Email: ${site.email}`,
    `- WhatsApp: ${whatsappUrl()}`,
    `- Contact page: ${absoluteUrl("/contact")}`,
    "",
    "## Policies",
    "",
    `- [Privacy policy](${absoluteUrl("/privacy")})`,
  ];
}

function packageDetail(pkg: Package): string[] {
  const days =
    pkg.itineraryDays?.map((day) => `- Day ${day.day}: ${day.title}`) ??
    pkg.itinerary.map((stop) => `- ${stop}`);

  return [
    `### ${pkg.title}`,
    "",
    `URL: ${packageUrl(pkg)}`,
    `Duration: ${pkg.duration}`,
    `Price: from ${pkg.price} per adult`,
    `Pickup: ${pkg.pickup}`,
    ...(pkg.bestTime ? [`Best time: ${pkg.bestTime}`] : []),
    "",
    ...(pkg.summary ? [pkg.summary, ""] : []),
    ...(pkg.overview ? [pkg.overview, ""] : []),
    "#### Itinerary",
    "",
    ...days,
    "",
    "#### Inclusions",
    "",
    ...pkg.includes.map((item) => `- ${item}`),
    ...(pkg.faqs?.length
      ? [
          "",
          "#### Frequently asked questions",
          "",
          ...pkg.faqs.flatMap((faq) => [`Q: ${faq.question}`, `A: ${faq.answer}`, ""]),
        ]
      : [""]),
  ];
}

function join(lines: string[]): string {
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
}

export function buildLlmsTxt({ packages, destinations }: LlmsContent): string {
  return join([
    ...header(),
    "",
    "## Packages",
    "",
    ...packages.map(packageLine),
    "",
    "## Destinations",
    "",
    ...destinationLines(destinations),
    "",
    ...footer(),
  ]);
}

export function buildLlmsFullTxt({ packages, destinations }: LlmsContent): string {
  return join([
    ...header(),
    "",
    "## Packages",
    "",
    ...packages.flatMap(packageDetail),
    "",
    "## Destinations",
    "",
    ...destinationLines(destinations),
    "",
    ...footer(),
  ]);
}
