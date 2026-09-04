"use client";

import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
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
          <span className="sr-only">
            {title}
          </span>
        )}

        {/* Content */}

        <div className="w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}