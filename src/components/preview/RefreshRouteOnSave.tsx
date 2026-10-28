"use client";

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

import { site } from "@/config/site";

/**
 * Re-renders the preview on the server each time the admin saves the
 * document, so the live preview frame shows the latest draft.
 */
export default function RefreshRouteOnSave() {
  const router = useRouter();

  return <PayloadRefreshRouteOnSave refresh={router.refresh} serverURL={site.url} />;
}
