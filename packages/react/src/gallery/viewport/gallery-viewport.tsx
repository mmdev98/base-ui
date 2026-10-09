"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ownerWindow } from "@base-ui/utils/owner";
import { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import { GALLERY_SETTLE_DURATION } from "../constants";
import { useGalleryRootContext } from "../root/gallery-root-context";
import type { GalleryItemData } from "../types";
import { isGalleryItemRendered } from "../utils/gallery-items";
import { tweenGallery } from "../utils/gallery-motion";
import {
  GalleryViewportContext,
  type GalleryViewportContextValue,
} from "./gallery-viewport-context";
import { useGalleryGestures } from "./use-gallery-gestures";

export type GalleryViewportState = {
  /** Whether the active image is zoomed in. */
  zoomed: boolean;
};

export interface GalleryViewportProps extends Omit<
  useRender.ComponentProps<"div", GalleryViewportState>,
  "children"
> {
  /**
   * Renders one item: a `Gallery.Item` with a `Gallery.Image` inside. Called
   * only for the active item and its neighbours.
   */
  children: (item: GalleryItemData, index: number) => React.ReactNode;
}

const INITIAL_METRICS: GalleryViewportContextValue = {
  width: 0,
  gap: 0,
  directionSign: 1,
};

/**
 * The swipeable strip of images. Handles the gestures: swipe, pinch, double
 * tap, pan, drag to close, wheel zoom. Give it a size (usually
 * `position: absolute; inset: 0` in the popup). Set the space between items with
 * `column-gap` (`gap-4`). Has `data-dragging` while a finger or the mouse
 * drags. Renders a `<div>` element.
 */
export function GalleryViewport(
  props: GalleryViewportProps,
): React.ReactElement {
  const { children, render, ref, ...elementProps } = props;

  const root = useGalleryRootContext();
  const { items, index, zoomed, takeTrackTransition } = root;

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(ref, viewportRef);
  const [metrics, setMetrics] = React.useState(INITIAL_METRICS);
  const metricsRef = React.useRef(metrics);
  const offsetRef = React.useRef(0);
  const stopOffsetRef = React.useRef<(() => void) | null>(null);

  const stride = metrics.width + metrics.gap;

  /** Positions the track: the active item, moved by the swipe offset. */
  const writeTrack = useStableCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { directionSign } = metricsRef.current;
    const x = (-index * stride + offsetRef.current) * directionSign;
    track.style.transform = `translate3d(${x}px, 0px, 0px)`;
  });

  const setOffset = useStableCallback((offset: number) => {
    stopOffsetRef.current?.();
    stopOffsetRef.current = null;
    offsetRef.current = offset;
    writeTrack();
  });

  const animateOffset = useStableCallback((offset: number) => {
    stopOffsetRef.current?.();
    const from = offsetRef.current;
    stopOffsetRef.current = tweenGallery(
      GALLERY_SETTLE_DURATION,
      (progress) => {
        offsetRef.current = from + (offset - from) * progress;
        writeTrack();
      },
    );
  });

  const measure = useStableCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const style = ownerWindow(viewport).getComputedStyle(viewport);
    const next: GalleryViewportContextValue = {
      width: viewport.clientWidth,
      gap: parseFloat(style.columnGap) || 0,
      directionSign: style.direction === "rtl" ? -1 : 1,
    };
    const current = metricsRef.current;
    if (
      current.width === next.width &&
      current.gap === next.gap &&
      current.directionSign === next.directionSign
    )
      return;
    metricsRef.current = next;
    setMetrics(next);
  });

  useIsoLayoutEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  // After the index changes, the track slides from where the swipe left it
  // (or from the previous item) to the new one. Every dependency but `index`
  // is stable, so a context change mid-slide doesn't restart or cut it.
  useIsoLayoutEffect(() => {
    const transition = takeTrackTransition();
    if (transition && stride > 0) {
      setOffset(transition.offset + transition.step * stride);
      animateOffset(0);
    } else {
      setOffset(0);
    }
  }, [index, takeTrackTransition, setOffset, animateOffset]);

  useIsoLayoutEffect(writeTrack, [writeTrack, stride, metrics.directionSign]);

  React.useEffect(() => () => stopOffsetRef.current?.(), []);

  const gestures = useGalleryGestures({
    root,
    getViewport: () => viewportRef.current,
    getWidth: () => metricsRef.current.width,
    getStride: () => metricsRef.current.width + metricsRef.current.gap,
    directionSign: metrics.directionSign,
    getOffset: () => offsetRef.current,
    setOffset,
    animateOffset,
  });

  const state: GalleryViewportState = React.useMemo(
    () => ({ zoomed }),
    [zoomed],
  );

  const element = useRender({
    defaultTagName: "div",
    render,
    ref: mergedRef,
    state,
    props: mergeProps<"div">(
      {
        "aria-roledescription": "carousel",
        // Its size and position come from the app (`position: absolute; inset: 0`).
        style: {
          overflow: "hidden",
          // The gestures handle every touch; the browser must not scroll or zoom.
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        },
        ...gestures,
        children: (
          <div
            ref={trackRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              willChange: "transform",
            }}
          >
            {items.map((item, itemIndex) =>
              isGalleryItemRendered(itemIndex, index) ? (
                <React.Fragment key={item.id}>
                  {children(item, itemIndex)}
                </React.Fragment>
              ) : null,
            )}
          </div>
        ),
      },
      elementProps,
    ),
  });

  return (
    <GalleryViewportContext value={metrics}>{element}</GalleryViewportContext>
  );
}
