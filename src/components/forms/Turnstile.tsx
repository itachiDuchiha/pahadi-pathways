"use client";

import Script from "next/script";
import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";

import { captchaSiteKey } from "@/lib/captcha-config";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
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

type Props = {
  /** Called with a fresh token, or `null` when it expires or the check errors. */
  onToken: (token: string | null) => void;
};

/**
 * Cloudflare Turnstile widget. Renders nothing (and loads no script) when
 * no site key is configured. A token is single-use: remount the widget
 * (change its `key`) after each submission to get a new one.
 */
export default function Turnstile({ onToken }: Props) {
  const siteKey = captchaSiteKey();
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const emit = useEffectEvent((token: string | null) => onToken(token));

  useEffect(() => {
    const api = window.turnstile;
    const element = container.current;
    if (!ready || !siteKey || !api || !element) return;

    const widgetId = api.render(element, {
      sitekey: siteKey,
      callback: (token) => emit(token),
      "expired-callback": () => emit(null),
      "error-callback": () => emit(null),
      theme: "light",
    });

    return () => {
      if (widgetId) api.remove(widgetId);
    };
  }, [ready, siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={container} className="flex min-h-[65px] justify-center" />
    </>
  );
}

/**
 * Token state for a form with a Turnstile widget. `ready` is true once a
 * token exists, or always when no site key is configured. Call `renew`
 * after every submission (the token is spent) and pass `round` as the
 * widget's `key` so it remounts for a fresh token.
 */
export function useCaptchaToken() {
  const required = captchaSiteKey() !== null;
  const [token, setToken] = useState<string | null>(null);
  const [round, setRound] = useState(0);

  const renew = useCallback(() => {
    setToken(null);
    setRound((value) => value + 1);
  }, []);

  return { required, token, setToken, round, renew, ready: !required || token !== null };
}
