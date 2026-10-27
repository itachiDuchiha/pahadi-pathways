import { describe, expect, it } from "vitest";

import { site } from "@/config/site";
import { adminGraphics, adminMeta } from "@/cms/config/admin";

import { ICON_SRC, Icon } from "./Icon";
import { LOGO_SRC, Logo } from "./Logo";

describe("admin branding", () => {
  it("suffixes admin titles with the site name", () => {
    expect(adminMeta.titleSuffix?.endsWith(site.name)).toBe(true);
  });

  it("turns off Payload's generated Open Graph images", () => {
    expect(adminMeta.defaultOGImageType).toBe("off");
  });

  it("wires the brand graphics", () => {
    expect(adminGraphics).toEqual({
      Logo: "/cms/admin/Logo#Logo",
      Icon: "/cms/admin/Icon#Icon",
    });
  });

  it("renders the brand logos with the site name as alt text", () => {
    const logo = Logo();
    const icon = Icon();
    expect(logo.props).toMatchObject({ src: LOGO_SRC, alt: site.name });
    expect(icon.props).toMatchObject({ src: ICON_SRC, alt: site.name });
  });
});
