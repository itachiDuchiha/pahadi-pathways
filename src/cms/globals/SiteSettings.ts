import type { GlobalConfig } from "payload";

import { isAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";
import {
  DEFAULT_IMAGE_QUALITY,
  DEFAULT_MAX_IMAGE_WIDTH,
  MAX_IMAGE_WIDTH,
  MIN_IMAGE_WIDTH,
} from "@/lib/media/compress";

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
    {
      name: "media",
      type: "group",
      label: "Uploaded images",
      admin: {
        description:
          "Every image uploaded to the media library is turned upright, made no wider than the maximum width and saved as WebP. These settings apply to new uploads only.",
      },
      fields: [
        {
          name: "imageQuality",
          type: "select",
          label: "Image quality",
          defaultValue: DEFAULT_IMAGE_QUALITY,
          options: [
            { label: "Small files (lower quality, fastest pages)", value: "small" },
            { label: "Balanced (recommended)", value: "balanced" },
            { label: "Sharp (best quality, larger files)", value: "sharp" },
          ],
          admin: {
            description:
              "Balanced suits most photos. Choose Sharp if photos look soft, or Small files to make pages load faster.",
          },
        },
        {
          name: "maxImageWidth",
          type: "number",
          label: "Maximum image width (pixels)",
          defaultValue: DEFAULT_MAX_IMAGE_WIDTH,
          min: MIN_IMAGE_WIDTH,
          max: MAX_IMAGE_WIDTH,
          admin: {
            step: 100,
            description:
              "Wider images are scaled down to this width; smaller ones are never enlarged. 2400 is plenty for full-screen photos.",
          },
        },
      ],
    },
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
