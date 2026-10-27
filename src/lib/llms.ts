import { whatsappUrl } from "@/config/site";
import type { Destination, PackageContent, Site } from "@/lib/cms/types";
import { absoluteUrl } from "@/lib/seo";

function packageUrl(pkg: PackageContent): string {
  return absoluteUrl(`/packages/${pkg.slug}`);
}

function header(site: Site): string[] {
  return [
    `# ${site.name}`,
    "",
    `> ${site.tagline}: private, customisable tour packages across Himachal Pradesh, India.`,
    "",
    `${site.name} is a travel company that plans and runs private road journeys in Himachal Pradesh, India, including Shimla, Manali, Kinnaur, Spiti Valley, Jibhi and the surrounding hill country. Each package lists its inclusions, and itineraries can be customised on enquiry. Prices are in Indian rupees (INR) per adult.`,
  ];
}

function packageLine(pkg: PackageContent): string {
  return `- [${pkg.title}](${packageUrl(pkg)}): ${pkg.duration}, from ${pkg.price} per adult, pickup from ${pkg.pickup}`;
}

/** The published content the llms.txt files describe. */
export type LlmsContent = {
  packages: readonly PackageContent[];
  destinations: readonly Destination[];
  /** The merged site settings, for the name, tagline and contact details. */
  site: Site;
};

function destinationLines(destinations: readonly Destination[]): string[] {
  return destinations.map(
    (destination) =>
      `- [${destination.name}](${absoluteUrl(`/destinations/${destination.slug}`)}): ${destination.description}`
  );
}

function footer(site: Site): string[] {
  return [
    "## Contact",
    "",
    `- Phone: ${site.phone.display}`,
    `- Email: ${site.email}`,
    `- WhatsApp: ${whatsappUrl(site)}`,
    `- Contact page: ${absoluteUrl("/contact")}`,
    "",
    "## Policies",
    "",
    `- [Privacy policy](${absoluteUrl("/privacy")})`,
  ];
}

function packageDetail(pkg: PackageContent): string[] {
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

export function buildLlmsTxt({ packages, destinations, site }: LlmsContent): string {
  return join([
    ...header(site),
    "",
    "## Packages",
    "",
    ...packages.map(packageLine),
    "",
    "## Destinations",
    "",
    ...destinationLines(destinations),
    "",
    ...footer(site),
  ]);
}

export function buildLlmsFullTxt({ packages, destinations, site }: LlmsContent): string {
  return join([
    ...header(site),
    "",
    "## Packages",
    "",
    ...packages.flatMap(packageDetail),
    "",
    "## Destinations",
    "",
    ...destinationLines(destinations),
    "",
    ...footer(site),
  ]);
}
