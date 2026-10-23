"use client";

import { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}