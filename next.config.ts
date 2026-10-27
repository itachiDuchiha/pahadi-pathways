import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { headerRules } from "./src/config/headers";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/api/media/file/**" },
    ],
  },
  async headers() {
    return headerRules;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
