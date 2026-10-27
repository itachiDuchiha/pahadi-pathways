import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { allDestinations } from "@/cms/seed/destinations";
import { packages } from "@/cms/seed/packages";

import { absoluteUrl } from "./seo";
import {
  breadcrumbJsonLd,
  destinationJsonLd,
  faqJsonLd,
  organizationJsonLd,
  packageJsonLd,
  websiteJsonLd,
} from "./structured-data";

type Offer = { "@type": string; price: number; priceCurrency: string };
type ItemList = { itemListElement: { position: number; name: string }[] };

describe("packageJsonLd", () => {
  const data = packageJsonLd(packages[0]);

  it("prices the offer as a number in INR", () => {
    const offers = data.offers as Offer;

    expect(offers.price).toBe(32249);
    expect(offers.priceCurrency).toBe("INR");
  });

  it("is a TouristTrip with a schema.org context", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("TouristTrip");
    expect(data.url).toBe(absoluteUrl(`/packages/${packages[0].slug}`));
  });

  it("lists the itinerary day titles in order", () => {
    const itinerary = data.itinerary as ItemList;
    const days = packages[0].itineraryDays ?? [];

    expect(itinerary.itemListElement).toHaveLength(days.length);
    expect(itinerary.itemListElement[0]).toMatchObject({
      position: 1,
      name: days[0].title,
    });
  });

  it("falls back to the itinerary stops without day titles", () => {
    const pkg = { ...packages[0], itineraryDays: undefined };
    const itinerary = packageJsonLd(pkg).itinerary as ItemList;

    expect(itinerary.itemListElement.map((item) => item.name)).toEqual(
      pkg.itinerary
    );
  });

  it("nests the provider without its own context", () => {
    const provider = data.provider as Record<string, unknown>;

    expect(provider["@type"]).toBe("TravelAgency");
    expect(provider["@id"]).toBe(organizationJsonLd()["@id"]);
    expect(provider["@context"]).toBeUndefined();
  });
});

describe("breadcrumbJsonLd", () => {
  it("numbers the items from one", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Packages", path: "/packages" },
    ]);
    const list = data.itemListElement as { position: number; item: string }[];

    expect(list[1].position).toBe(2);
    expect(list[1].item).toBe(absoluteUrl("/packages"));
  });
});

describe("faqJsonLd", () => {
  it("maps each FAQ to a Question with an accepted Answer", () => {
    const data = faqJsonLd([{ question: "Q", answer: "A" }]);
    const entity = data.mainEntity as Record<string, unknown>[];

    expect(data["@type"]).toBe("FAQPage");
    expect(entity[0]["@type"]).toBe("Question");
    expect(entity[0].acceptedAnswer).toEqual({ "@type": "Answer", text: "A" });
  });
});

describe("organizationJsonLd", () => {
  it("uses the E.164 phone number and the site name", () => {
    const data = organizationJsonLd();

    expect(data.telephone).toBe("+917559697919");
    expect(data["@id"]).toBe(absoluteUrl("/#organization"));
    expect(data.name).toBe(site.name);
    expect(data["@context"]).toBe("https://schema.org");
  });
});

describe("websiteJsonLd", () => {
  it("points the search action at the packages filter", () => {
    const action = websiteJsonLd().potentialAction as {
      target: { urlTemplate: string };
    };

    expect(action.target.urlTemplate).toBe(
      absoluteUrl("/packages?destination={search_term_string}")
    );
  });
});

describe("destinationJsonLd", () => {
  it("places the destination in Himachal Pradesh", () => {
    const data = destinationJsonLd(allDestinations[0]);

    expect(data["@type"]).toBe("TouristDestination");
    expect(data.containedInPlace).toEqual({
      "@type": "AdministrativeArea",
      name: "Himachal Pradesh",
    });
  });
});
