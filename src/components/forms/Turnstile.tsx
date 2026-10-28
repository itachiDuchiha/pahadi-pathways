"use client";

import Script from "next/script";
import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";
import { whatsappUrl } from "@/config/site";
import { captchaSiteKey } from "@/lib/captcha-config";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "unsupported-callback": () => void;
  "before-interactive-callback": () => void;
  theme: "light";
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string | undefined;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** How long the widget may take to produce a token or show a challenge before the fallback shows. */
export const CAPTCHA_FALLBACK_MS = 15_000;

/** `pending` until a token arrives; `failed` when the widget could not load or errored. */
export type CaptchaStatus = "pending" | "verified" | "failed";

type Props = {
  status: CaptchaStatus;
  /** Called with a fresh token, or `null` when it expires. */
  onToken: (token: string | null) => void;
  /** The script failed to load, or the widget reported an error. */
  onError: () => void;
  /** The widget is showing an interactive challenge to the visitor. */
  onChallenge: () => void;
};

/**
 * Cloudflare Turnstile widget with a status line. Renders nothing (and
 * loads no script) when no site key is configured. A token is single-use:
 * remount the widget (change its `key`) to get a new one. State lives in
 * `useCaptchaToken`, which hands these props over as `widget`.
 */
export default function Turnstile({ status, onToken, onError, onChallenge }: Props) {
  const siteKey = captchaSiteKey();
  const settings = useSiteSettings();
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const emitToken = useEffectEvent((token: string | null) => onToken(token));
  const emitError = useEffectEvent(() => onError());
  const emitChallenge = useEffectEvent(() => onChallenge());

  useEffect(() => {
    const api = window.turnstile;
    const element = container.current;
    if (!ready || !siteKey || !element) return;

    if (!api) {
      emitError();
      return;
    }

    let widgetId: string | undefined;
    try {
      widgetId = api.render(element, {
        sitekey: siteKey,
        callback: (token) => emitToken(token),
        "expired-callback": () => emitToken(null),
        "error-callback": () => emitError(),
        "unsupported-callback": () => emitError(),
        "before-interactive-callback": () => emitChallenge(),
        theme: "light",
      });
    } catch {
      emitError();
    }

    return () => {
      if (widgetId) api.remove(widgetId);
    };
  }, [ready, siteKey]);

  if (!siteKey) return null;

  return (
    <div>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => onError()}
      />
      <div
        ref={container}
        role="group"
        aria-label="Spam protection check"
        className="flex min-h-[65px] justify-center"
      />
      <p aria-live="polite" className="mt-1 text-center text-xs leading-5 text-[#526078]">
        {status === "pending" && "Checking you're a real visitor…"}
        {status === "failed" && (
          <>
            The verification could not load. Message us on WhatsApp at{" "}
            <a
              href={whatsappUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-[#10264A]"
            >
              {settings.phone.display}
            </a>{" "}
            instead.
          </>
        )}
      </p>
    </div>
  );
}

/**
 * Token and status for a form with a Turnstile widget, shared by the three
 * enquiry forms. `ready` is true once a token exists, or always when no
 * site key is configured. The status turns `failed` when the script fails
 * to load, the widget errors, or no token or challenge appears within
 * `CAPTCHA_FALLBACK_MS`; submit stays disabled and the widget names
 * WhatsApp instead. Call `renew` after a failed submission (the token is
 * spent) or before reusing the form; render
 * `<Turnstile key={round} {...widget} />`.
 */
export function useCaptchaToken() {
  const required = captchaSiteKey() !== null;
  const [token, setToken] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [challenged, setChallenged] = useState(false);
  const [round, setRound] = useState(0);

  const status: CaptchaStatus = token ? "verified" : failed ? "failed" : "pending";

  useEffect(() => {
    if (!required || token || failed || challenged) return;
    const timer = window.setTimeout(() => setFailed(true), CAPTCHA_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [required, round, token, failed, challenged]);

  const renew = useCallback(() => {
    setToken(null);
    setFailed(false);
    setChallenged(false);
    setRound((value) => value + 1);
  }, []);

  const onError = useCallback(() => setFailed(true), []);
  const onChallenge = useCallback(() => setChallenged(true), []);

  return {
    required,
    token,
    status,
    round,
    renew,
    ready: !required || token !== null,
    widget: { status, onToken: setToken, onError, onChallenge },
  };
}
