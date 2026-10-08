import type { GalleryRect } from "../types";
import {
  formatGalleryTransform,
  GALLERY_IDENTITY_ZOOM,
} from "./gallery-geometry";

/** A CSS border radius in px, capped at a circle so it animates evenly. */
export function getGalleryFlightRadius(
  radius: string,
  rect: GalleryRect,
): number {
  const value = parseFloat(radius) || 0;
  return Math.min(value, Math.min(rect.width, rect.height) / 2);
}

/**
 * Keyframe that draws the image of `box` as it looks in `source`: scaled to
 * cover it, centred on it, and clipped to it with `radius` corners. Animate
 * between it and `GALLERY_FLIGHT_REST` to fly the image between the two.
 */
export function getGalleryFlightKeyframe(
  source: GalleryRect,
  box: GalleryRect,
  radius: number,
): Keyframe {
  const scale = Math.max(source.width / box.width, source.height / box.height);
  const x = source.left + source.width / 2 - (box.left + box.width / 2);
  const y = source.top + source.height / 2 - (box.top + box.height / 2);
  // The clip is drawn before the scale, so it is in the box's own pixels.
  const insetX = Math.max(0, (box.width - source.width / scale) / 2);
  const insetY = Math.max(0, (box.height - source.height / scale) / 2);
  return {
    transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
    clipPath: `inset(${insetY}px ${insetX}px round ${radius / scale}px)`,
  };
}

/** The image at rest in the viewer, as a flight keyframe. */
export const GALLERY_FLIGHT_REST: Keyframe = {
  transform: formatGalleryTransform(GALLERY_IDENTITY_ZOOM),
  clipPath: "inset(0px 0px round 0px)",
};

export function prefersGalleryReducedMotion(win: Window): boolean {
  return win.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
