"use client";

import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import {
  LIGHTBOX_DISMISS_PROGRESS_VARIABLE,
  LIGHTBOX_SETTLE_DURATION,
} from "../constants";
import type { LightboxDismiss, LightboxZoom } from "../types";
import {
  clampLightboxZoom,
  formatLightboxTransform,
  LIGHTBOX_IDENTITY_DISMISS,
  LIGHTBOX_IDENTITY_ZOOM,
} from "../utils/lightbox-geometry";
import { tweenLightbox } from "../utils/lightbox-motion";
import type { LightboxImageEntry } from "./lightbox-root-context";

export interface UseLightboxZoomOptions {
  getActiveImage: () => LightboxImageEntry | undefined;
  /** Elements that receive `--lightbox-dismiss-progress`. */
  getDismissTargets: () => (HTMLElement | null)[];
  /**
   * Elements of the active item that move with the close drag besides its
   * image, such as `Lightbox.Fallback`: they get its offset and scale, not the zoom.
   */
  getDismissFollowers: () => Iterable<HTMLElement>;
  minScale: number;
  maxScale: number;
}

export interface UseLightboxZoomResult {
  /** Scale of the active image, rounded to hundredths, for rendering. */
  scale: number;
  getZoom: () => LightboxZoom;
  /** Where the running zoom animation ends, or the current zoom. */
  getTargetZoom: () => LightboxZoom;
  setZoom: (zoom: LightboxZoom) => void;
  animateZoom: (zoom: LightboxZoom, options?: { clamp?: boolean }) => void;
  setDismiss: (dismiss: LightboxDismiss, progress: number) => void;
  /** Animates the close drag to `dismiss`, then calls `onComplete`. */
  animateDismiss: (dismiss: LightboxDismiss, onComplete?: () => void) => void;
  /** Puts the active image back at rest at once, without animation. */
  reset: () => void;
}

function mix(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

/**
 * Zoom, pan and close-drag of the active image. The values live in refs and
 * are written to the image's `transform` directly, so a gesture frame only
 * re-renders the parts that show the scale.
 */
export function useLightboxZoom(
  options: UseLightboxZoomOptions,
): UseLightboxZoomResult {
  const {
    getActiveImage,
    getDismissTargets,
    getDismissFollowers,
    minScale,
    maxScale,
  } = options;

  const [scale, setScale] = React.useState(minScale);
  const zoomRef = React.useRef(LIGHTBOX_IDENTITY_ZOOM);
  const dismissRef = React.useRef(LIGHTBOX_IDENTITY_DISMISS);
  const dismissProgressRef = React.useRef(0);
  const stopZoomRef = React.useRef<(() => void) | null>(null);
  const targetZoomRef = React.useRef<LightboxZoom | null>(null);
  const stopDismissRef = React.useRef<(() => void) | null>(null);

  const write = useStableCallback(() => {
    const entry = getActiveImage();
    if (entry) {
      entry.element.style.transform = formatLightboxTransform(
        zoomRef.current,
        dismissRef.current,
      );
    }
    // The individual `translate` and `scale` properties, so they add to
    // whatever `transform` the app gives the element.
    const { x, y, scale: dismissScale } = dismissRef.current;
    const atRest = x === 0 && y === 0 && dismissScale === 1;
    for (const follower of getDismissFollowers()) {
      follower.style.translate = atRest ? "" : `${x}px ${y}px`;
      follower.style.scale = atRest ? "" : String(dismissScale);
    }
    for (const target of getDismissTargets()) {
      target?.style.setProperty(
        LIGHTBOX_DISMISS_PROGRESS_VARIABLE,
        String(dismissProgressRef.current),
      );
    }
    setScale(Math.round(zoomRef.current.scale * 100) / 100);
  });

  const stopZoom = () => {
    stopZoomRef.current?.();
    stopZoomRef.current = null;
    targetZoomRef.current = null;
  };

  const stopDismiss = () => {
    stopDismissRef.current?.();
    stopDismissRef.current = null;
  };

  const getZoom = useStableCallback(() => zoomRef.current);
  const getTargetZoom = useStableCallback(
    () => targetZoomRef.current ?? zoomRef.current,
  );

  const setZoom = useStableCallback((zoom: LightboxZoom) => {
    stopZoom();
    zoomRef.current = zoom;
    write();
  });

  const animateZoom = useStableCallback(
    (zoom: LightboxZoom, animateOptions?: { clamp?: boolean }) => {
      stopZoom();
      const entry = getActiveImage();
      const target =
        animateOptions?.clamp && entry
          ? clampLightboxZoom(zoom, entry.layout, minScale, maxScale)
          : zoom;
      const from = zoomRef.current;
      targetZoomRef.current = target;
      stopZoomRef.current = tweenLightbox(
        LIGHTBOX_SETTLE_DURATION,
        (progress) => {
          zoomRef.current = {
            scale: mix(from.scale, target.scale, progress),
            x: mix(from.x, target.x, progress),
            y: mix(from.y, target.y, progress),
          };
          write();
        },
        () => {
          targetZoomRef.current = null;
        },
      );
    },
  );

  const setDismiss = useStableCallback(
    (dismiss: LightboxDismiss, progress: number) => {
      stopDismiss();
      dismissRef.current = dismiss;
      dismissProgressRef.current = progress;
      write();
    },
  );

  const animateDismiss = useStableCallback(
    (dismiss: LightboxDismiss, onComplete?: () => void) => {
      stopDismiss();
      const from = dismissRef.current;
      const fromProgress = dismissProgressRef.current;
      const isRest = dismiss.x === 0 && dismiss.y === 0 && dismiss.scale === 1;
      stopDismissRef.current = tweenLightbox(
        LIGHTBOX_SETTLE_DURATION,
        (progress) => {
          dismissRef.current = {
            x: mix(from.x, dismiss.x, progress),
            y: mix(from.y, dismiss.y, progress),
            scale: mix(from.scale, dismiss.scale, progress),
          };
          dismissProgressRef.current = isRest
            ? mix(fromProgress, 0, progress)
            : fromProgress;
          write();
        },
        onComplete,
      );
    },
  );

  const reset = useStableCallback(() => {
    stopZoom();
    stopDismiss();
    zoomRef.current = LIGHTBOX_IDENTITY_ZOOM;
    dismissRef.current = LIGHTBOX_IDENTITY_DISMISS;
    dismissProgressRef.current = 0;
    write();
  });

  return {
    scale,
    getZoom,
    getTargetZoom,
    setZoom,
    animateZoom,
    setDismiss,
    animateDismiss,
    reset,
  };
}
