import type { GlobalConfig } from "payload";

import { isAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("site");

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
  },
  fields: [
    { name: "phoneDisplay", type: "text", admin: { description: "For example +91 75596 97919" } },
    {
      name: "phoneE164",
      type: "text",
      validate: (value: unknown) =>
        value == null || value === "" || (typeof value === "string" && /^\+[1-9]\d{6,14}$/.test(value))
          ? true
          : "Use E.164 format, for example +917559697919",
    },
    {
      name: "whatsapp",
      type: "text",
      admin: { description: "Digits only with country code, for example 917559697919" },
      validate: (value: unknown) =>
        value == null || value === "" || (typeof value === "string" && /^[1-9]\d{6,14}$/.test(value))
          ? true
          : "Use digits only with the country code",
    },
    { name: "email", type: "email" },
    { name: "instagram", type: "text", validate: httpsUrl },
    { name: "facebook", type: "text", validate: httpsUrl },
    { name: "tagline", type: "text" },
  ],
};

function httpsUrl(value: unknown): true | string {
  if (value == null || value === "") return true;
  if (typeof value !== "string") return "Enter an https:// URL";

  try {
    return new URL(value).protocol === "https:" ? true : "Enter an https:// URL";
  } catch {
    return "Enter an https:// URL";
  }
}
