"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Site } from "@/lib/cms/types";

/**
 * Hands the site settings, read on the server by the root layout, to the
 * client components that show contact details. This is the only route by
 * which CMS values reach client code.
 */
const SiteSettingsContext = createContext<Site | null>(null);

type SiteSettingsProviderProps = {
  settings: Site;
  children: ReactNode;
};

export default function SiteSettingsProvider({ settings, children }: SiteSettingsProviderProps) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): Site {
  const settings = useContext(SiteSettingsContext);

  if (!settings) {
    throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  }

  return settings;
}
