"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

import {
  CONSENT_KEY,
  expiredCookieStrings,
  isVendorCookie,
  parseConsent,
  readConsentCookie,
  serializeConsentCookie,
  UNKNOWN_CONSENT,
  type Consent,
  type ConsentSnapshot,
} from "@/lib/consent";

/**
 * The visitor's analytics choice, mirrored in `localStorage` and a
 * same-named cookie (one year). The server never knows the choice, so
 * every page renders as "unknown" and the stored value is read on the
 * client after hydration.
 */
type ConsentState = {
  consent: ConsentSnapshot;
  accept(): void;
  decline(): void;
};

const ConsentContext = createContext<ConsentState | null>(null);

const listeners = new Set<() => void>();

function readStored(): Consent | null {
  try {
    const stored = parseConsent(window.localStorage.getItem(CONSENT_KEY));
    if (stored) return stored;
  } catch {
    // Storage can be blocked (private mode, site settings); the cookie still works.
  }

  return readConsentCookie(document.cookie);
}

/**
 * Expires every analytics vendor cookie this origin can see. Clarity's
 * `CLID`, `ANONCHK`, `MUID` and `SM` live on its own domain and cannot be
 * removed from here.
 */
function clearVendorCookies(): void {
  const secure = window.location.protocol === "https:";

  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (!name || !isVendorCookie(name)) continue;

    for (const cookie of expiredCookieStrings(name, window.location.hostname, secure)) {
      document.cookie = cookie;
    }
  }
}

/** The choice as this tab last saw it, so a change from accepted can be spotted. */
let lastSeen: Consent | null | undefined;

/** Whether this tab has rendered a vendor script, which only a reload can stop. */
let vendorScriptsLoaded = false;

/** Called by `AnalyticsScripts` once it renders a vendor script tag. */
export function markVendorScriptsLoaded(): void {
  vendorScriptsLoaded = true;
}

function store(value: Consent): void {
  const secure = window.location.protocol === "https:";

  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // See readStored.
  }
  document.cookie = serializeConsentCookie(value, secure);
  lastSeen = value;

  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Another tab changed the choice.
  if (lastSeen === undefined) lastSeen = readStored();
  const onStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;

    const previous = lastSeen;
    const next = readStored();
    lastSeen = next;

    // Scripts this tab already ran cannot be unloaded; drop them and the
    // cookies they set. `lastSeen` has moved on, so this happens once.
    if (previous === "accepted" && next !== "accepted") {
      clearVendorCookies();
      if (vendorScriptsLoaded) {
        window.location.reload();
        return;
      }
    }
    listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const unknownOnServer = (): ConsentSnapshot => UNKNOWN_CONSENT;

export default function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore<ConsentSnapshot>(subscribe, readStored, unknownOnServer);

  const accept = useCallback(() => store("accepted"), []);
  const decline = useCallback(() => {
    store("declined");
    clearVendorCookies();
    // Vendor scripts cannot be unloaded, so a reload drops any that ran.
    if (vendorScriptsLoaded) window.location.reload();
  }, []);

  const value = useMemo(() => ({ consent, accept, decline }), [consent, accept, decline]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentState {
  const state = useContext(ConsentContext);

  if (!state) throw new Error("useConsent must be used inside ConsentProvider");

  return state;
}
