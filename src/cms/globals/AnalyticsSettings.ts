import type { FieldHook, GlobalConfig, TextFieldSingleValidation } from "payload";

import {
  CLARITY_PROJECT_ID_PATTERN,
  DEFAULT_CONSENT_BANNER_TEXT,
  GA_MEASUREMENT_ID_PATTERN,
} from "@/lib/consent";

import { isAdmin } from "../access";
import { revalidateHooks } from "../hooks/revalidate";

const revalidate = revalidateHooks("analytics");

/** Pasted IDs often carry a stray space. */
const trim: FieldHook = ({ value }) => (typeof value === "string" ? value.trim() : value);

function idValidator(pattern: RegExp, message: string): TextFieldSingleValidation {
  return (value) => (!value || pattern.test(value) ? true : message);
}

/**
 * Google Analytics and Microsoft Clarity. Each loads only when its ID is
 * set here and the visitor accepts the consent banner.
 */
export const AnalyticsSettings: GlobalConfig = {
  slug: "analytics-settings",
  label: "Analytics settings",
  admin: {
    description:
      "Leave both IDs empty to run no analytics and show no consent banner. With an ID set, visitors see a banner and the script loads only after they accept.",
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
  },
  fields: [
    {
      name: "gaMeasurementId",
      type: "text",
      label: "Google Analytics measurement ID",
      hooks: { beforeValidate: [trim] },
      validate: idValidator(
        GA_MEASUREMENT_ID_PATTERN,
        "Enter a Google Analytics 4 measurement ID such as G-ABC123XYZ9, or leave it empty."
      ),
      admin: {
        description:
          "Starts with G-. In Google Analytics: Admin → Data streams → your web stream → Measurement ID.",
      },
    },
    {
      name: "clarityProjectId",
      type: "text",
      label: "Microsoft Clarity project ID",
      hooks: { beforeValidate: [trim] },
      validate: idValidator(
        CLARITY_PROJECT_ID_PATTERN,
        "Enter a Clarity project ID (lowercase letters and digits, at least 5), or leave it empty."
      ),
      admin: {
        description: "In Microsoft Clarity: your project → Settings → Overview → Project ID.",
      },
    },
    {
      name: "consentBannerText",
      type: "textarea",
      label: "Consent banner text",
      required: true,
      defaultValue: DEFAULT_CONSENT_BANNER_TEXT,
      admin: {
        description: "One or two sentences shown above the Accept and Decline buttons. A link to the privacy policy is added.",
      },
    },
  ],
};
