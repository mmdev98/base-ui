import { describe, expect, it } from "vitest";
import type { GalleryImageLayout } from "../types";
import {
  clampGalleryZoom,
  getGalleryContainedSize,
  getGalleryPanBounds,
  rubberbandGalleryOverflow,
  zoomGalleryAroundPoint,
} from "./gallery-geometry";

/** A 400 × 300 image centred in an 800 × 600 item. */
const LAYOUT: GalleryImageLayout = {
  left: 200,
  top: 150,
  width: 400,
  height: 300,
  itemWidth: 800,
  itemHeight: 600,
};

describe("getGalleryContainedSize", () => {
  it("fits the aspect ratio inside the box", () => {
    expect(getGalleryContainedSize(2, 800, 600)).toEqual({
      width: 800,
      height: 400,
    });
    expect(getGalleryContainedSize(0.5, 800, 600)).toEqual({
      width: 300,
      height: 600,
    });
  });
});

describe("getGalleryPanBounds", () => {
  it("doesn't pan an image smaller than its item", () => {
    expect(getGalleryPanBounds(LAYOUT, 1.5)).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    });
  });

  it("lets a zoomed image pan until its edges meet the item's", () => {
    // 1200 × 900 at scale 3: 200 px over each side horizontally, 150 vertically.
    expect(getGalleryPanBounds(LAYOUT, 3)).toEqual({
      minX: -200,
      maxX: 200,
      minY: -150,
      maxY: 150,
    });
  });
});

describe("zoomGalleryAroundPoint", () => {
  it("keeps the point under the cursor", () => {
    const point = { x: 500, y: 300 };
    const zoom = zoomGalleryAroundPoint(
      { scale: 1, x: 0, y: 0 },
      2,
      point,
      LAYOUT,
    );
    // The point was 100 px right of the centre; at scale 2 it would be 200,
    // so the image moves 100 px left.
    expect(zoom).toEqual({ scale: 2, x: -100, y: 0 });
  });
});

describe("clampGalleryZoom", () => {
  it("drops the pan back at rest", () => {
    expect(
      clampGalleryZoom({ scale: 0.5, x: 40, y: 10 }, LAYOUT, 1, 4),
    ).toEqual({ scale: 1, x: 0, y: 0 });
  });

  it("caps the scale and the pan", () => {
    expect(
      clampGalleryZoom({ scale: 9, x: 999, y: -999 }, LAYOUT, 1, 4),
    ).toEqual({ scale: 4, x: 400, y: -300 });
  });
});

describe("rubberbandGalleryOverflow", () => {
  it("moves less than the finger and keeps the sign", () => {
    const moved = rubberbandGalleryOverflow(200, 400);
    expect(moved).toBeGreaterThan(0);
    expect(moved).toBeLessThan(200);
    expect(rubberbandGalleryOverflow(-200, 400)).toBe(-moved);
  });
});
