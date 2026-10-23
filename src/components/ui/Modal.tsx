"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

// Matches the house focus-trap query used by PackageBookingPanel's enquiry modal.
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Prevent the page behind the modal from scrolling while it is open.
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

    dialogRef.current?.focus();

    return () => {
      const previouslyFocused = previouslyFocusedRef.current;

      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);

  // Close on Escape and keep Tab/Shift+Tab cycling within the dialog.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );

      if (focusable.length === 0) {
        // Nothing inside to cycle to; keep focus on the dialog itself.
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071426]/70 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
      onMouseDown={(event) => {
        // Close only when clicking the empty space outside the popup
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className="
          relative
          flex
          w-full
          max-w-[1040px]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.30)]
          max-h-[calc(100vh-24px)]
          sm:max-h-[calc(100vh-32px)]
        "
      >
        {/* Close button */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-4
            top-4
            z-30
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-500
            shadow-sm
            transition
            hover:bg-white
            hover:text-[#10264A]
            hover:shadow-md
          "
        >
          <X size={18} />
        </button>

        {/* Optional title for accessibility / existing usage */}

        {title && (
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
        )}

        {/* Content */}

        <div className="w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
