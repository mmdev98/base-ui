import {
  GALLERY_PRELOAD_TIMEOUT,
  GALLERY_RENDERED_NEIGHBORS,
} from "../constants";
import type { GalleryImageSize, GalleryItemData } from "../types";
import { clampGalleryValue } from "./gallery-geometry";

export function clampGalleryIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return clampGalleryValue(Math.round(index), 0, count - 1);
}

export function isGalleryItemRendered(
  index: number,
  activeIndex: number,
): boolean {
  return Math.abs(index - activeIndex) <= GALLERY_RENDERED_NEIGHBORS;
}

/** Width / height from the loaded size, then the item's size, else `null`. */
export function getGalleryItemAspectRatio(
  item: GalleryItemData,
  size?: GalleryImageSize,
): number | null {
  const width = size?.width || item.width;
  const height = size?.height || item.height;
  return width && height ? width / height : null;
}

/**
 * Loads `item.src` and resolves with its natural size, or `null` when it
 * fails or takes longer than `GALLERY_PRELOAD_TIMEOUT`. Never rejects.
 */
export function loadGalleryImage(
  item: GalleryItemData,
): Promise<GalleryImageSize | null> {
  return new Promise((resolve) => {
    const image = new Image();
    const timer = setTimeout(() => resolve(null), GALLERY_PRELOAD_TIMEOUT);
    const finish = (size: GalleryImageSize | null) => {
      clearTimeout(timer);
      resolve(size);
    };
    image.onload = () =>
      finish({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => finish(null);
    image.src = item.src;
  });
}
