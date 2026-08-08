"use client";

import { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPopup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setIsOpen(true);
  };

  const closePopup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    /*
      Small delay allows the mouse to travel
      from the WhatsApp button to the popup.
    */
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">

      {/* ================= WHATSAPP BUTTON ================= */}
      <button
        type="button"
        aria-label="WhatsApp"
        onMouseEnter={openPopup}
        onMouseLeave={closePopup}
        onFocus={openPopup}
        onBlur={closePopup}
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border-4
          border-white
          bg-[#25D366]
          text-white
          shadow-[0_10px_30px_rgba(37,211,102,0.35)]
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)]
        "
      >
        <FaWhatsapp size={32} />
      </button>


      {/* ================= POPUP ================= */}
      <div
        onMouseEnter={openPopup}
        onMouseLeave={closePopup}
        className={`
          absolute
          bottom-[78px]
          right-0
          w-[285px]
          rounded-2xl
          bg-white
          p-5
          text-left
          shadow-[0_15px_45px_rgba(0,0,0,0.18)]
          transition-all
          duration-200

          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0"
          }
        `}
      >

        {/* Small Arrow */}
        <div
          className="
            absolute
            -bottom-2
            right-6
            h-4
            w-4
            rotate-45
            bg-white
          "
        />

        {/* Popup Content */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89A3D]">
          Need Help?
        </p>

        <h3 className="mt-2 text-lg font-bold text-[#10264A]">
          Chat with a Travel Expert
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Ask us anything about Himachal packages,
          hotels, transport or custom itineraries.
        </p>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#25D366]
            px-5
            py-3
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#20bd5a]
          "
        >
          <FaWhatsapp size={18} />
          Open WhatsApp
        </a>

      </div>

    </div>
  );
}