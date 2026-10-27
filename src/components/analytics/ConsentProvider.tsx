"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

import {
  CONSENT_KEY,
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

function store(value: Consent): void {
  const secure = window.location.protocol === "https:";

  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // See readStored.
  }
  document.cookie = serializeConsentCookie(value, secure);

  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Another tab changed the choice.
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) listener();
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
    const wasAccepted = readStored() === "accepted";
    store("declined");
    // Vendor scripts cannot be unloaded, so a reload drops any that ran.
    if (wasAccepted) window.location.reload();
  }, []);

  const value = useMemo(() => ({ consent, accept, decline }), [consent, accept, decline]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentState {
  const state = useContext(ConsentContext);

  if (!state) throw new Error("useConsent must be used inside ConsentProvider");

  return state;
}
