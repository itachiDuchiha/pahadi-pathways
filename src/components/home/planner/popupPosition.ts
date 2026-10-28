export type Rect = { top: number; left: number; width: number; height: number };

const gap = 8;

/*
  Viewport-aware placement for the hero planner popups.

  The popup opens `gap` px below the anchor, aligned to its left edge. It
  flips above only when it does not fit below but does fit above. The
  result is then clamped so the popup keeps `padding` px from every
  viewport edge; when the popup is larger than the viewport the top/left
  padding wins.
*/
export function placePopup(
  anchor: Rect,
  popup: { width: number; height: number },
  viewport: { width: number; height: number },
  padding = 12
): { top: number; left: number } {
  const anchorBottom = anchor.top + anchor.height;
  const spaceBelow = viewport.height - anchorBottom;
  const spaceAbove = anchor.top;

  const openUp =
    spaceBelow < popup.height + gap && spaceAbove >= popup.height + gap;

  const top = openUp ? anchor.top - popup.height - gap : anchorBottom + gap;

  return {
    top: Math.max(padding, Math.min(top, viewport.height - popup.height - padding)),
    left: Math.max(
      padding,
      Math.min(anchor.left, viewport.width - popup.width - padding)
    ),
  };
}
