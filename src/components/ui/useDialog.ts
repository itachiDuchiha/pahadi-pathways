"use client";

import { useEffect, useRef, type RefObject } from "react";

export const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

type DialogOptions = {
  closeOnEscape?: boolean;
};

/**
 * Shared modal-dialog behaviour: locks page scroll, moves focus into the
 * dialog on open and restores it on close, closes on Escape and keeps
 * Tab/Shift+Tab cycling within the dialog. The element behind `ref` should
 * carry `tabIndex={-1}` so it can receive focus itself.
 */
export function useDialog(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
  options?: DialogOptions
) {
  const closeOnEscape = options?.closeOnEscape ?? true;
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Prevent the page behind the dialog from scrolling while it is open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Move focus into the dialog on open and restore it to the triggering
  // element on close.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    ref.current?.focus();

    return () => {
      const previouslyFocused = previouslyFocusedRef.current;

      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, ref]);

  // Close on Escape and keep Tab/Shift+Tab cycling within the dialog.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeOnEscape) {
          onClose();
        }
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = ref.current;

      if (!dialog) {
        return;
      }

      // Skip elements explicitly removed from the tab order (for example a
      // hidden honeypot input), which the selector alone still matches.
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.tabIndex >= 0);

      if (focusable.length === 0) {
        // Nothing inside to cycle to; keep focus on the dialog itself.
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      // Right after open, focus sits on the dialog container itself (not
      // on `first`), and `dialog.contains(active)` is true for the dialog
      // itself too — so that case must be checked explicitly, or neither
      // branch below fires and native Tab/Shift+Tab escapes the trap.
      const atDialog = active === dialog;

      if (event.shiftKey) {
        if (active === first || atDialog || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || atDialog || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEscape, ref]);
}
