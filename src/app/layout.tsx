import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";
import { defaultDescription, defaultTitle } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";

import JsonLd from "@/components/seo/JsonLd";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import PlannerProvider from "@/components/layout/PlannerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  openGraph: {
    title: {
      default: defaultTitle,
      template: `%s | ${site.name}`,
    },
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: defaultTitle,
      template: `%s | ${site.name}`,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <PlannerProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </PlannerProvider>
      </body>
    </html>
  );
}