import type {
  GalleryDismiss,
  GalleryImageLayout,
  GalleryImageSize,
  GalleryRect,
  GalleryZoom,
} from "../types";

export const GALLERY_IDENTITY_ZOOM: GalleryZoom = { scale: 1, x: 0, y: 0 };

export const GALLERY_IDENTITY_DISMISS: GalleryDismiss = {
  x: 0,
  y: 0,
  scale: 1,
};

export function clampGalleryValue(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}

/** Largest box of `aspectRatio` that fits in `width` × `height`. */
export function getGalleryContainedSize(
  aspectRatio: number,
  width: number,
  height: number,
): GalleryImageSize {
  const containedWidth = Math.max(0, Math.min(width, height * aspectRatio));
  return { width: containedWidth, height: containedWidth / aspectRatio };
}

export function isGalleryRectInViewport(
  rect: GalleryRect,
  viewport: GalleryImageSize,
): boolean {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.left < viewport.width &&
    rect.top < viewport.height &&
    rect.left + rect.width > 0 &&
    rect.top + rect.height > 0
  );
}

export function formatGalleryTransform(
  zoom: GalleryZoom,
  dismiss: GalleryDismiss = GALLERY_IDENTITY_DISMISS,
): string {
  const x = zoom.x + dismiss.x;
  const y = zoom.y + dismiss.y;
  return `translate3d(${x}px, ${y}px, 0px) scale(${zoom.scale * dismiss.scale})`;
}

/** Pan limits at `scale`, so a zoomed image always covers its item. */
export function getGalleryPanBounds(
  layout: GalleryImageLayout,
  scale: number,
): { minX: number; maxX: number; minY: number; maxY: number } {
  const getAxis = (start: number, size: number, itemSize: number) => {
    const scaledSize = size * scale;
    if (scaledSize <= itemSize) return { min: 0, max: 0 };
    const center = start + size / 2;
    return {
      min: itemSize - (center + scaledSize / 2),
      max: -(center - scaledSize / 2),
    };
  };
  const x = getAxis(layout.left, layout.width, layout.itemWidth);
  const y = getAxis(layout.top, layout.height, layout.itemHeight);
  return { minX: x.min, maxX: x.max, minY: y.min, maxY: y.max };
}

/** Distance an overflow moves under the finger: less and less as it grows. */
export function rubberbandGalleryOverflow(
  overflow: number,
  dimension: number,
): number {
  if (dimension <= 0) return 0;
  const sign = Math.sign(overflow);
  const distance = Math.abs(overflow);
  return sign * (1 - 1 / ((distance * 0.55) / dimension + 1)) * dimension;
}

/** `value` inside `[min, max]`, with a rubber band past the limits. */
export function rubberbandGalleryValue(
  value: number,
  min: number,
  max: number,
  dimension: number,
): number {
  if (value < min)
    return min + rubberbandGalleryOverflow(value - min, dimension);
  if (value > max)
    return max + rubberbandGalleryOverflow(value - max, dimension);
  return value;
}

/**
 * Zoom to `scale` keeping `point` (px from the item's corner) under the
 * finger or cursor.
 */
export function zoomGalleryAroundPoint(
  zoom: GalleryZoom,
  scale: number,
  point: { x: number; y: number },
  layout: GalleryImageLayout,
): GalleryZoom {
  const centerX = layout.left + layout.width / 2;
  const centerY = layout.top + layout.height / 2;
  const ratio = scale / zoom.scale;
  return {
    scale,
    x: point.x - centerX - (point.x - centerX - zoom.x) * ratio,
    y: point.y - centerY - (point.y - centerY - zoom.y) * ratio,
  };
}

/** `zoom` with its scale in `[minScale, maxScale]` and its pan in bounds. */
export function clampGalleryZoom(
  zoom: GalleryZoom,
  layout: GalleryImageLayout,
  minScale: number,
  maxScale: number,
): GalleryZoom {
  const scale = clampGalleryValue(zoom.scale, minScale, maxScale);
  // Scaling back to rest also drops the pan.
  if (scale <= minScale) return { scale, x: 0, y: 0 };
  const bounds = getGalleryPanBounds(layout, scale);
  return {
    scale,
    x: clampGalleryValue(zoom.x, bounds.minX, bounds.maxX),
    y: clampGalleryValue(zoom.y, bounds.minY, bounds.maxY),
  };
}

export function isGalleryZoomed(scale: number, minScale: number): boolean {
  return scale > minScale + 0.01;
}

export function toGalleryRect(element: Element): GalleryRect {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
}
