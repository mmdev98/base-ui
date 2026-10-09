import type { LightboxRect } from "../types";
import {
  formatLightboxTransform,
  LIGHTBOX_IDENTITY_ZOOM,
} from "./lightbox-geometry";

/** A CSS border radius in px, capped at a circle so it animates evenly. */
export function getLightboxFlightRadius(
  radius: string,
  rect: LightboxRect,
): number {
  const value = parseFloat(radius) || 0;
  return Math.min(value, Math.min(rect.width, rect.height) / 2);
}

/** Corner radii in px: top-left, top-right, bottom-right, bottom-left. */
export type LightboxFlightRadii = [number, number, number, number];

/** The four corner radii of an element's computed style, each capped like `getLightboxFlightRadius`. */
export function getLightboxFlightRadii(
  style: Pick<
    CSSStyleDeclaration,
    | "borderTopLeftRadius"
    | "borderTopRightRadius"
    | "borderBottomRightRadius"
    | "borderBottomLeftRadius"
  >,
  rect: LightboxRect,
): LightboxFlightRadii {
  return [
    getLightboxFlightRadius(style.borderTopLeftRadius, rect),
    getLightboxFlightRadius(style.borderTopRightRadius, rect),
    getLightboxFlightRadius(style.borderBottomRightRadius, rect),
    getLightboxFlightRadius(style.borderBottomLeftRadius, rect),
  ];
}

/**
 * Keyframe that draws the image of `box` as it looks in `source`: scaled to
 * cover it, centred on it, and clipped to it with its corner `radii`. Animate
 * between it and `LIGHTBOX_FLIGHT_REST` to fly the image between the two.
 */
export function getLightboxFlightKeyframe(
  source: LightboxRect,
  box: LightboxRect,
  radii: LightboxFlightRadii,
): Keyframe {
  const scale = Math.max(source.width / box.width, source.height / box.height);
  const x = source.left + source.width / 2 - (box.left + box.width / 2);
  const y = source.top + source.height / 2 - (box.top + box.height / 2);
  // The clip is drawn before the scale, so it is in the box's own pixels.
  const insetX = Math.max(0, (box.width - source.width / scale) / 2);
  const insetY = Math.max(0, (box.height - source.height / scale) / 2);
  return {
    transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
    clipPath: `inset(${insetY}px ${insetX}px round ${radii
      .map((radius) => `${radius / scale}px`)
      .join(" ")})`,
  };
}

/** The image at rest in the viewer, as a flight keyframe. */
export const LIGHTBOX_FLIGHT_REST: Keyframe = {
  transform: formatLightboxTransform(LIGHTBOX_IDENTITY_ZOOM),
  clipPath: "inset(0px 0px round 0px)",
};

export function prefersLightboxReducedMotion(win: Window): boolean {
  return win.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
