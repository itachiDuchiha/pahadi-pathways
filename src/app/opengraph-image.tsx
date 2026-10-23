import { ImageResponse } from "next/og";

import { site } from "@/config/site";
import { ogImageAlt, ogImageSize } from "@/lib/seo";

export const alt = ogImageAlt;

export const size = ogImageSize;

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#10264A",
          color: "#F8F6F1",
        }}
      >
        <div
          style={{
            width: 120,
            height: 6,
            marginBottom: 48,
            background: "#C89A3D",
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            color: "#C89A3D",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 64,
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F8F6F1",
            opacity: 0.7,
          }}
        >
          {`${site.address.region}, India`}
        </div>
      </div>
    ),
    { ...size }
  );
}
