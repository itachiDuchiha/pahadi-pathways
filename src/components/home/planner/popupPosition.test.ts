import { describe, expect, it } from "vitest";

import { placePopup, type Rect } from "./popupPosition";

const viewport = { width: 1440, height: 900 };
const popup = { width: 300, height: 270 };

function anchorAt(left: number, top: number, width = 200, height = 50): Rect {
  return { top, left, width, height };
}

describe("placePopup", () => {
  it("opens 8px below the anchor, aligned to its left edge, by default", () => {
    expect(placePopup(anchorAt(400, 100), popup, viewport)).toEqual({
      top: 158,
      left: 400,
    });
  });

  it("clamps to the right edge so left + width stays within width - padding", () => {
    const place = placePopup(anchorAt(1300, 100), popup, viewport);

    expect(place.left).toBe(1440 - 300 - 12);
    expect(place.left + popup.width).toBeLessThanOrEqual(viewport.width - 12);
  });

  it("clamps to the left padding when the anchor starts left of it", () => {
    expect(placePopup(anchorAt(4, 100), popup, viewport).left).toBe(12);
  });

  it("flips above the anchor when there is no room below but room above", () => {
    // Anchor bottom at 850: 50px below, 800px above.
    expect(placePopup(anchorAt(400, 800), popup, viewport).top).toBe(
      800 - 270 - 8,
    );
  });

  it("stays below, then clamps to the bottom padding, when the room below exactly fits popup plus gap", () => {
    // Anchor bottom at 622: 900 - 622 = 278 = 270 + 8, so it does not flip;
    // 630 is then pulled up to 900 - 270 - 12 = 618.
    expect(placePopup(anchorAt(400, 572), popup, viewport).top).toBe(618);
  });

  it("clamps above the bottom padding when it fits neither below nor above", () => {
    const short = { width: 1440, height: 400 };

    // Bottom 250: 150px below, 200px above; neither fits 278.
    expect(placePopup(anchorAt(400, 200), popup, short).top).toBe(
      400 - 270 - 12,
    );
  });

  it("pins to the top padding when the popup is taller than the viewport", () => {
    const tiny = { width: 1440, height: 200 };

    expect(placePopup(anchorAt(400, 20), popup, tiny).top).toBe(12);
  });

  it("pins to the left padding when the popup is wider than the viewport", () => {
    const narrow = { width: 250, height: 900 };

    expect(placePopup(anchorAt(100, 100), popup, narrow).left).toBe(12);
  });

  it("applies a custom padding to both axes", () => {
    expect(
      placePopup(anchorAt(1300, 100), popup, viewport, 20).left,
    ).toBe(1440 - 300 - 20);
    expect(placePopup(anchorAt(0, 100), popup, viewport, 20).left).toBe(20);
  });
});
