import { useCallback, useState, type CSSProperties } from "react";

import { placePopup } from "@/components/home/planner/popupPosition";

type Options = {
  /*
    Which width keeps the popup inside the viewport horizontally: the
    popup's own rendered width (default) or the anchor's width.
  */
  widthFrom?: "popup" | "anchor";
};

/*
  Fixed-position style for one hero planner popup, placed next to its
  anchor by `placePopup`. `place` measures both elements against the
  current viewport; `reset` returns the popup to the top-left origin.
*/
export function usePopupPosition({ widthFrom = "popup" }: Options = {}): {
  style: CSSProperties;
  place(anchor: HTMLElement, popup: HTMLElement): void;
  reset(): void;
} {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Stable across renders so effects can list it as a dependency.
  const place = useCallback((anchor: HTMLElement, popup: HTMLElement) => {
    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    setPosition(
      placePopup(
        anchorRect,
        {
          width: widthFrom === "anchor" ? anchorRect.width : popupRect.width,
          height: popupRect.height,
        },
        { width: window.innerWidth, height: window.innerHeight }
      )
    );
  }, [widthFrom]);

  const reset = useCallback(() => setPosition({ top: 0, left: 0 }), []);

  return {
    style: {
      position: "fixed",
      top: `${position.top}px`,
      left: `${position.left}px`,
    },
    place,
    reset,
  };
}
