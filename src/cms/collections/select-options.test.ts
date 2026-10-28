import type { CollectionConfig } from "payload";
import { describe, expect, it } from "vitest";

import { DESTINATION_CATEGORIES, EXPERIENCE_ICONS } from "@/lib/cms/types";

import * as destinationsModule from "./Destinations";
import * as experiencesModule from "./Experiences";

function selectOptions(collection: CollectionConfig, name: string): unknown {
  const field = collection.fields.find((item) => "name" in item && item.name === name);
  return field && field.type === "select" ? field.options : undefined;
}

describe("shared select options", () => {
  it("builds the destination categories from the site's single list", () => {
    expect(selectOptions(destinationsModule.Destinations, "category")).toEqual(
      DESTINATION_CATEGORIES.map((value) => ({ label: value, value }))
    );
    expect(destinationsModule).not.toHaveProperty("DESTINATION_CATEGORIES");
  });

  it("builds the experience icons from the site's single list", () => {
    expect(selectOptions(experiencesModule.Experiences, "icon")).toEqual(
      EXPERIENCE_ICONS.map((value) => ({ label: value, value }))
    );
    expect(experiencesModule).not.toHaveProperty("EXPERIENCE_ICONS");
  });
});
