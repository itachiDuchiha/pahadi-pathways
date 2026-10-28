"use client";

import Script from "next/script";
import { useEffect } from "react";

import { shouldLoadAnalytics } from "@/lib/consent";

import { markVendorScriptsLoaded, useConsent } from "./ConsentProvider";

type Props = { gaMeasurementId: string | null; clarityProjectId: string | null };

/**
 * A JS string literal for an ID. The IDs are already regex-checked on save
 * and on load; escaping `<` as well keeps `</script>` out regardless.
 */
function literal(id: string): string {
  return JSON.stringify(id).replace(/</g, "\\u003c");
}

/**
 * Google Analytics and Microsoft Clarity, mounted only on the client once
 * the visitor has accepted and the vendor's ID is set. The server render
 * never includes them. The vendors' standard snippets are the only
 * executable inline scripts on the site and live only here (the JSON-LD
 * blocks are inline too, but data the browser never runs).
 */
export default function AnalyticsScripts({ gaMeasurementId, clarityProjectId }: Props) {
  const { consent } = useConsent();
  const load = shouldLoadAnalytics(consent, { ga: gaMeasurementId, clarity: clarityProjectId });
  const loadsAny = load.ga || load.clarity;

  useEffect(() => {
    if (loadsAny) markVendorScriptsLoaded();
  }, [loadsAny]);

  return (
    <>
      {load.ga && gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${literal(gaMeasurementId)});`,
            }}
          />
        </>
      ) : null}
      {load.clarity && clarityProjectId ? (
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${literal(clarityProjectId)});`,
          }}
        />
      ) : null}
    </>
  );
}
