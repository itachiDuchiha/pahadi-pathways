import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";

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
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Handcrafted Himachal Pradesh tours, custom itineraries and trusted local hosts for Shimla, Manali, Spiti and beyond.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_IN",
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