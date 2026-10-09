"use client";

import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import {
  GALLERY_DISMISS_PROGRESS_VARIABLE,
  GALLERY_SETTLE_DURATION,
} from "../constants";
import type { GalleryDismiss, GalleryZoom } from "../types";
import {
  clampGalleryZoom,
  formatGalleryTransform,
  GALLERY_IDENTITY_DISMISS,
  GALLERY_IDENTITY_ZOOM,
} from "../utils/gallery-geometry";
import { tweenGallery } from "../utils/gallery-motion";
import type { GalleryImageEntry } from "./gallery-root-context";

export interface UseGalleryZoomOptions {
  getActiveImage: () => GalleryImageEntry | undefined;
  /** Elements that receive `--gallery-dismiss-progress`. */
  getDismissTargets: () => (HTMLElement | null)[];
  minScale: number;
  maxScale: number;
}

export interface UseGalleryZoomResult {
  /** Scale of the active image, rounded to hundredths, for rendering. */
  scale: number;
  getZoom: () => GalleryZoom;
  /** Where the running zoom animation ends, or the current zoom. */
  getTargetZoom: () => GalleryZoom;
  setZoom: (zoom: GalleryZoom) => void;
  animateZoom: (zoom: GalleryZoom, options?: { clamp?: boolean }) => void;
  setDismiss: (dismiss: GalleryDismiss, progress: number) => void;
  /** Animates the close drag to `dismiss`, then calls `onComplete`. */
  animateDismiss: (dismiss: GalleryDismiss, onComplete?: () => void) => void;
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
export function useGalleryZoom(
  options: UseGalleryZoomOptions,
): UseGalleryZoomResult {
  const { getActiveImage, getDismissTargets, minScale, maxScale } = options;

  const [scale, setScale] = React.useState(minScale);
  const zoomRef = React.useRef(GALLERY_IDENTITY_ZOOM);
  const dismissRef = React.useRef(GALLERY_IDENTITY_DISMISS);
  const dismissProgressRef = React.useRef(0);
  const stopZoomRef = React.useRef<(() => void) | null>(null);
  const targetZoomRef = React.useRef<GalleryZoom | null>(null);
  const stopDismissRef = React.useRef<(() => void) | null>(null);

  const write = useStableCallback(() => {
    const entry = getActiveImage();
    if (entry) {
      entry.element.style.transform = formatGalleryTransform(
        zoomRef.current,
        dismissRef.current,
      );
    }
    for (const target of getDismissTargets()) {
      target?.style.setProperty(
        GALLERY_DISMISS_PROGRESS_VARIABLE,
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

  const setZoom = useStableCallback((zoom: GalleryZoom) => {
    stopZoom();
    zoomRef.current = zoom;
    write();
  });

  const animateZoom = useStableCallback(
    (zoom: GalleryZoom, animateOptions?: { clamp?: boolean }) => {
      stopZoom();
      const entry = getActiveImage();
      const target =
        animateOptions?.clamp && entry
          ? clampGalleryZoom(zoom, entry.layout, minScale, maxScale)
          : zoom;
      const from = zoomRef.current;
      targetZoomRef.current = target;
      stopZoomRef.current = tweenGallery(
        GALLERY_SETTLE_DURATION,
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
    (dismiss: GalleryDismiss, progress: number) => {
      stopDismiss();
      dismissRef.current = dismiss;
      dismissProgressRef.current = progress;
      write();
    },
  );

  const animateDismiss = useStableCallback(
    (dismiss: GalleryDismiss, onComplete?: () => void) => {
      stopDismiss();
      const from = dismissRef.current;
      const fromProgress = dismissProgressRef.current;
      const isRest = dismiss.x === 0 && dismiss.y === 0 && dismiss.scale === 1;
      stopDismissRef.current = tweenGallery(
        GALLERY_SETTLE_DURATION,
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
    zoomRef.current = GALLERY_IDENTITY_ZOOM;
    dismissRef.current = GALLERY_IDENTITY_DISMISS;
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
