"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Site } from "@/lib/cms/types";

/**
 * Hands the site settings, read on the server by the root layout, to the
 * client components that show contact details. This is the only route by
 * which CMS values reach client code. It also carries the server's
 * `captchaEnabled()` (both Turnstile keys set), so the widget follows the
 * same rule as the server check without the secret reaching the client.
 */
const SiteSettingsContext = createContext<Site | null>(null);
const CaptchaEnabledContext = createContext(false);

type SiteSettingsProviderProps = {
  settings: Site;
  captchaEnabled: boolean;
  children: ReactNode;
};

export default function SiteSettingsProvider({ settings, captchaEnabled, children }: SiteSettingsProviderProps) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      <CaptchaEnabledContext.Provider value={captchaEnabled}>{children}</CaptchaEnabledContext.Provider>
    </SiteSettingsContext.Provider>
  );
}

/** True when the server has both Turnstile keys. */
export function useCaptchaEnabled(): boolean {
  return useContext(CaptchaEnabledContext);
}

export function useSiteSettings(): Site {
  const settings = useContext(SiteSettingsContext);

  if (!settings) {
    throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  }

  return settings;
}
