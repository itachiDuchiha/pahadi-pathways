import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

// AI search and answer-engine crawlers are welcomed explicitly so the site
// can be cited in generated answers.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
];

// The API is not for crawlers, but uploaded media served from it is used
// on public pages and as og:image, so it stays crawlable (the longer Allow
// match wins over the Disallow). Draft previews are for signed-in editors.
const access = { allow: ["/", "/api/media/file/"], disallow: ["/api/", "/preview/"] };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...access },
      // A crawler-specific group replaces the "*" group for that crawler,
      // so each one repeats the same rules.
      ...aiCrawlers.map((userAgent) => ({ userAgent, ...access })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
