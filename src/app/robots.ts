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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // A crawler-specific group replaces the "*" group for that crawler,
      // so each one repeats the disallow list.
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
