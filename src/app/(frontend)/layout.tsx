import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";
import { getAnalyticsSettings } from "@/lib/cms/analytics";
import { getSiteSettings } from "@/lib/cms/site";
import { defaultDescription, defaultTitle } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";

import JsonLd from "@/components/seo/JsonLd";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import PlannerProvider from "@/components/layout/PlannerProvider";
import SiteSettingsProvider from "@/components/layout/SiteSettingsProvider";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import ConsentProvider from "@/components/analytics/ConsentProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = {
    default: defaultTitle(settings),
    template: `%s | ${settings.name}`,
  };

  return {
    // The site URL always comes from the environment, never the CMS.
    metadataBase: new URL(site.url),
    title,
    description: defaultDescription,
    openGraph: {
      title,
      siteName: settings.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, analytics] = await Promise.all([getSiteSettings(), getAnalyticsSettings()]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd(settings)} />
        <SiteSettingsProvider settings={settings}>
          <ConsentProvider>
            <PlannerProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingButtons />
            </PlannerProvider>
            <AnalyticsScripts
              gaMeasurementId={analytics.gaMeasurementId}
              clarityProjectId={analytics.clarityProjectId}
            />
            <ConsentBanner text={analytics.consentBannerText} enabled={analytics.enabled} />
          </ConsentProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}