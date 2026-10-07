"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ownerWindow } from "@base-ui/utils/owner";
import { useControlled } from "@base-ui/utils/useControlled";
import { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import { useTimeout } from "@base-ui/utils/useTimeout";
import { useValueAsRef } from "@base-ui/utils/useValueAsRef";
import * as React from "react";
import {
  GALLERY_FLIGHT_DURATION,
  GALLERY_FLIGHT_EASING,
  GALLERY_ZOOM_SCALE,
} from "../constants";
import {
  type GalleryImageSize,
  type GalleryItemData,
  GalleryPhase,
  type GalleryRect,
} from "../types";
import {
  GALLERY_FLIGHT_REST,
  getGalleryFlightKeyframe,
  getGalleryFlightRadius,
  prefersGalleryReducedMotion,
} from "../utils/gallery-flight";
import {
  isGalleryRectInViewport,
  isGalleryZoomed,
  toGalleryRect,
  zoomGalleryAroundPoint,
} from "../utils/gallery-geometry";
import { clampGalleryIndex, loadGalleryImage } from "../utils/gallery-items";
import {
  type GalleryImageEntry,
  GalleryRootContext,
  type GalleryRootContextValue,
  GalleryRootZoomContext,
  type GalleryRootZoomContextValue,
  type GalleryTrackTransition,
} from "./gallery-root-context";
import { useGalleryZoom } from "./use-gallery-zoom";

/** Longest the viewer waits for its image before it counts as open (ms). */
const OPENING_FALLBACK_DELAY = GALLERY_FLIGHT_DURATION + 1000;

/**
 * Runs a flight with the Web Animations API and calls `onFinish` when it
 * ends. Finishes at once where the API is missing (jsdom, old browsers).
 */
function animateGalleryImage(
  element: HTMLElement,
  keyframes: Keyframe[],
  onFinish: () => void,
  fill: FillMode = "none",
): Animation | null {
  if (typeof element.animate !== "function") {
    onFinish();
    return null;
  }
  const animation = element.animate(keyframes, {
    duration: GALLERY_FLIGHT_DURATION,
    easing: GALLERY_FLIGHT_EASING,
    fill,
  });
  // A cancelled flight rejects; the code that cancels it moves on itself.
  animation.finished.then(onFinish, () => {});
  return animation;
}

/** Image state when there is no trigger on screen to fly from or back to. */
const FADED_OUT: Keyframe = { opacity: 0, scale: "0.95" };
const FADED_IN: Keyframe = { opacity: 1, scale: "1" };

export interface GalleryRootProps {
  /** The images, in order. */
  items: GalleryItemData[];
  children?: React.ReactNode;
  /** Whether the viewer is open. */
  open?: boolean;
  /**
   * Whether the viewer is open at first, when `open` is not controlled.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the viewer opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Index of the active item. */
  index?: number;
  /**
   * Index of the active item at first, when `index` is not controlled.
   * @default 0
   */
  defaultIndex?: number;
  /** Called when the active item changes. */
  onIndexChange?: (index: number) => void;
  /**
   * Loads an item's image before the viewer opens, so it shows at once.
   * Resolves with its natural size, or `null`. The default loads `src` with
   * the browser's `Image`; pass your own when `Gallery.Image` requests
   * another URL, such as a resized one.
   * @default loadGalleryImage
   */
  loadImage?: (item: GalleryItemData) => Promise<GalleryImageSize | null>;
  /**
   * Largest zoom scale.
   * @default 4
   */
  maxScale?: number;
}

/**
 * Holds the gallery state: the items, the active index, the viewer's open
 * state and animation, and the zoom of the active image. Place triggers,
 * lists and the viewer parts anywhere inside it. Renders no element.
 */
export function GalleryRoot(props: GalleryRootProps): React.ReactElement {
  const {
    items,
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    index: indexProp,
    defaultIndex = 0,
    onIndexChange,
    loadImage = loadGalleryImage,
    maxScale = GALLERY_ZOOM_SCALE.max,
  } = props;
  const minScale = GALLERY_ZOOM_SCALE.min;

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Gallery",
    state: "open",
  });
  const [rawIndex, setIndexState] = useControlled({
    controlled: indexProp,
    default: defaultIndex,
    name: "Gallery",
    state: "index",
  });

  const [phase, setPhase] = React.useState(GalleryPhase.Closed);
  const [pendingIndex, setPendingIndex] = React.useState<number | null>(null);
  const [flyingItemId, setFlyingItemId] = React.useState<string | null>(null);
  const [controlsHidden, setControlsHidden] = React.useState(false);
  const [imageSizes, setImageSizes] = React.useState<
    Record<string, GalleryImageSize>
  >({});

  const phaseRef = useValueAsRef(phase);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const triggersRef = React.useRef(new Map<string, Set<HTMLElement>>());
  const imagesRef = React.useRef(new Map<string, GalleryImageEntry>());
  const popupRef = React.useRef<HTMLElement | null>(null);
  const backdropRef = React.useRef<HTMLElement | null>(null);
  const flightRef = React.useRef<Animation | null>(null);
  const openFlightStartedRef = React.useRef(false);
  const trackTransitionRef = React.useRef<GalleryTrackTransition | null>(null);
  const openingTimeout = useTimeout();

  // Items can be removed while the viewer is open (delete), so the index is
  // always clamped to the current list.
  const index = clampGalleryIndex(rawIndex, items.length);
  const activeItem = items[index];
  const activeItemId = activeItem?.id;

  const getActiveImage = useStableCallback(() =>
    activeItemId ? imagesRef.current.get(activeItemId) : undefined,
  );

  const zoom = useGalleryZoom({
    getActiveImage,
    getDismissTargets: () => [popupRef.current, backdropRef.current],
    minScale,
    maxScale,
  });
  const zoomed = isGalleryZoomed(zoom.scale, minScale);

  /** The item's trigger on the page, preferring the one that opened the viewer. */
  const findTrigger = useStableCallback((itemId: string) => {
    const elements = triggersRef.current.get(itemId);
    if (!elements?.size) return null;
    const opener = openerRef.current;
    if (opener && elements.has(opener)) return opener;
    return elements.values().next().value ?? null;
  });

  const setOpen = useStableCallback((nextOpen: boolean) => {
    setOpenState(nextOpen);
    onOpenChange?.(nextOpen);
  });

  const changeIndex = useStableCallback(
    (nextIndex: number, transition: GalleryTrackTransition | null = null) => {
      if (nextIndex === index) return;
      zoom.reset();
      trackTransitionRef.current = transition;
      setIndexState(nextIndex);
      onIndexChange?.(nextIndex);
    },
  );

  const setImageSize = useStableCallback(
    (itemId: string, size: GalleryImageSize) => {
      setImageSizes((sizes) => {
        const current = sizes[itemId];
        if (current?.width === size.width && current?.height === size.height)
          return sizes;
        return { ...sizes, [itemId]: size };
      });
    },
  );

  const openAt = useStableCallback(
    async (nextIndex: number, trigger?: HTMLElement | null) => {
      const item = items[nextIndex];
      if (!item || open || pendingIndex !== null) return;
      if (phaseRef.current !== GalleryPhase.Closed) return;

      openerRef.current = trigger ?? findTrigger(item.id);
      setPendingIndex(nextIndex);
      const size = await loadImage(item);
      if (size) setImageSize(item.id, size);
      setPendingIndex(null);
      changeIndex(nextIndex);
      setOpen(true);
    },
  );

  const close = useStableCallback(() => {
    if (open) setOpen(false);
  });

  const getImageBox = (entry: GalleryImageEntry): GalleryRect => {
    const itemRect = toGalleryRect(entry.itemElement);
    return {
      left: itemRect.left + entry.layout.left,
      top: itemRect.top + entry.layout.top,
      width: entry.layout.width,
      height: entry.layout.height,
    };
  };

  /** Rect and corner radius of the item's trigger, when it's on screen. */
  const getTriggerTarget = (itemId: string) => {
    const trigger = findTrigger(itemId);
    if (!trigger?.isConnected) return null;
    const win = ownerWindow(trigger);
    const rect = toGalleryRect(trigger);
    const viewport = {
      width: win.document.documentElement.clientWidth,
      height: win.document.documentElement.clientHeight,
    };
    if (!isGalleryRectInViewport(rect, viewport)) return null;
    const radius = getGalleryFlightRadius(
      win.getComputedStyle(trigger).borderTopLeftRadius,
      rect,
    );
    return { rect, radius };
  };

  const stopFlight = () => {
    flightRef.current?.cancel();
    flightRef.current = null;
    setFlyingItemId(null);
  };

  const finishOpening = useStableCallback(() => {
    openingTimeout.clear();
    flightRef.current = null;
    setFlyingItemId(null);
    if (phaseRef.current === GalleryPhase.Opening) setPhase(GalleryPhase.Open);
  });

  const finishClosing = useStableCallback(() => {
    flightRef.current = null;
    setFlyingItemId(null);
    zoom.reset();
    setPhase(GalleryPhase.Closed);
  });

  /** Starts the open flight once the active image is laid out in the viewer. */
  const tryStartOpenFlight = useStableCallback(() => {
    if (phaseRef.current !== GalleryPhase.Opening) return;
    if (openFlightStartedRef.current) return;
    const entry = getActiveImage();
    if (!entry || !activeItem) return;
    openFlightStartedRef.current = true;

    const win = ownerWindow(entry.element);
    if (prefersGalleryReducedMotion(win)) {
      finishOpening();
      return;
    }
    const target = getTriggerTarget(activeItem.id);
    const keyframes: Keyframe[] = target
      ? [
          getGalleryFlightKeyframe(
            target.rect,
            getImageBox(entry),
            target.radius,
          ),
          GALLERY_FLIGHT_REST,
        ]
      : [FADED_OUT, FADED_IN];
    if (target) setFlyingItemId(activeItem.id);
    flightRef.current = animateGalleryImage(
      entry.element,
      keyframes,
      finishOpening,
    );
  });

  const startCloseFlight = () => {
    const entry = getActiveImage();
    if (!entry || !activeItem) {
      finishClosing();
      return;
    }
    const win = ownerWindow(entry.element);
    if (prefersGalleryReducedMotion(win)) {
      finishClosing();
      return;
    }
    // Starts from where the image is now: zoomed, panned or dragged.
    const current = entry.element.style.transform || "none";
    const target = getTriggerTarget(activeItem.id);
    const keyframes: Keyframe[] = target
      ? [
          { transform: current, clipPath: "inset(0px 0px round 0px)" },
          getGalleryFlightKeyframe(
            target.rect,
            getImageBox(entry),
            target.radius,
          ),
        ]
      : [
          { ...FADED_IN, transform: current },
          { ...FADED_OUT, transform: current },
        ];
    if (target) setFlyingItemId(activeItem.id);
    flightRef.current = animateGalleryImage(
      entry.element,
      keyframes,
      finishClosing,
      // Holds the last frame until the viewer unmounts.
      "forwards",
    );
  };

  // Turns `open` into the animation phases. Runs before paint, so the close
  // flight measures the image where the user last saw it.
  useIsoLayoutEffect(() => {
    if (
      open &&
      (phase === GalleryPhase.Closed || phase === GalleryPhase.Closing)
    ) {
      stopFlight();
      zoom.reset();
      openFlightStartedRef.current = false;
      setControlsHidden(false);
      setPhase(GalleryPhase.Opening);
      openingTimeout.start(OPENING_FALLBACK_DELAY, finishOpening);
    } else if (
      !open &&
      (phase === GalleryPhase.Open || phase === GalleryPhase.Opening)
    ) {
      stopFlight();
      openingTimeout.clear();
      setPhase(GalleryPhase.Closing);
      startCloseFlight();
    }
  }, [open, phase]);

  useIsoLayoutEffect(() => {
    if (phase === GalleryPhase.Opening) tryStartOpenFlight();
  }, [phase, tryStartOpenFlight]);

  // Deleting the last item leaves nothing to show.
  React.useEffect(() => {
    if (open && items.length === 0) close();
  }, [open, items.length, close]);

  const goTo = useStableCallback((nextIndex: number) => {
    const target = clampGalleryIndex(nextIndex, items.length);
    const step = target - index;
    // Neighbours slide in; a longer jump just shows the new item.
    changeIndex(target, Math.abs(step) === 1 ? { step, offset: 0 } : null);
  });

  const stepIndex = useStableCallback((step: number, fromOffset: number) => {
    const target = clampGalleryIndex(index + step, items.length);
    if (target === index) return;
    changeIndex(target, { step: target - index, offset: fromOffset });
  });

  // Written to the elements directly: it changes at the start and end of each
  // gesture, and the popup shouldn't re-render for it.
  const setDragging = useStableCallback((dragging: boolean) => {
    for (const element of [popupRef.current, backdropRef.current]) {
      if (!element) continue;
      if (dragging) element.setAttribute("data-dragging", "");
      else element.removeAttribute("data-dragging");
    }
  });

  // Stable: `Gallery.Viewport` starts the slide in an effect that must only
  // re-run when the index changes, not whenever the context does (an image
  // loading mid-slide would otherwise cut the animation short).
  const takeTrackTransition = useStableCallback(() => {
    const transition = trackTransitionRef.current;
    trackTransitionRef.current = null;
    return transition;
  });

  const zoomTo = (scale: number) => {
    const entry = getActiveImage();
    if (!entry) return;
    const center = {
      x: entry.layout.itemWidth / 2,
      y: entry.layout.itemHeight / 2,
    };
    zoom.animateZoom(
      zoomGalleryAroundPoint(zoom.getTargetZoom(), scale, center, entry.layout),
      { clamp: true },
    );
  };

  const getFinalFocus = useStableCallback(() => {
    const target = activeItemId ? findTrigger(activeItemId) : null;
    if (target?.isConnected) return target;
    return openerRef.current?.isConnected ? openerRef.current : null;
  });

  const registerTrigger = useStableCallback(
    (itemId: string, element: HTMLElement) => {
      const triggers = triggersRef.current;
      const elements = triggers.get(itemId) ?? new Set();
      elements.add(element);
      triggers.set(itemId, elements);
      return () => {
        elements.delete(element);
        if (!elements.size) triggers.delete(itemId);
      };
    },
  );

  const registerImage = useStableCallback(
    (itemId: string, entry: GalleryImageEntry) => {
      imagesRef.current.set(itemId, entry);
      if (itemId === activeItemId) tryStartOpenFlight();
      return () => {
        if (imagesRef.current.get(itemId) === entry)
          imagesRef.current.delete(itemId);
      };
    },
  );

  const contextValue: GalleryRootContextValue = React.useMemo(
    () => ({
      items,
      index,
      activeItem,
      open,
      phase,
      pendingIndex,
      flyingItemId,
      zoomed,
      controlsHidden,
      hasPrevious: index > 0,
      hasNext: index < items.length - 1,
      minScale,
      maxScale,
      imageSizes,
      openAt,
      close,
      goTo,
      goToPrevious: () => goTo(index - 1),
      goToNext: () => goTo(index + 1),
      // Steps from where a running zoom ends, so quick presses add up.
      zoomIn: () =>
        zoomTo(zoom.getTargetZoom().scale + GALLERY_ZOOM_SCALE.step),
      zoomOut: () =>
        zoomTo(zoom.getTargetZoom().scale - GALLERY_ZOOM_SCALE.step),
      resetZoom: () => zoom.animateZoom({ scale: minScale, x: 0, y: 0 }),
      panBy: (deltaX, deltaY) => {
        const current = zoom.getZoom();
        zoom.animateZoom(
          { ...current, x: current.x + deltaX, y: current.y + deltaY },
          { clamp: true },
        );
      },
      toggleControls: () => setControlsHidden((hidden) => !hidden),
      getFinalFocus,
      setImageSize,
      registerTrigger,
      registerImage,
      getActiveImage,
      setPopupElement: (element) => {
        popupRef.current = element;
      },
      setBackdropElement: (element) => {
        backdropRef.current = element;
      },
      getZoom: zoom.getZoom,
      setZoom: zoom.setZoom,
      animateZoom: zoom.animateZoom,
      setDismiss: zoom.setDismiss,
      animateDismiss: zoom.animateDismiss,
      setDragging,
      stepIndex,
      takeTrackTransition,
    }),
    // The callbacks are stable; `zoomTo` only reads them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      items,
      index,
      activeItem,
      open,
      phase,
      pendingIndex,
      flyingItemId,
      zoomed,
      controlsHidden,
      minScale,
      maxScale,
      imageSizes,
    ],
  );

  const zoomValue: GalleryRootZoomContextValue = React.useMemo(
    () => ({
      scale: zoom.scale,
      canZoomIn: zoom.scale < maxScale,
      canZoomOut: zoomed,
    }),
    [zoom.scale, maxScale, zoomed],
  );

  return (
    <GalleryRootContext value={contextValue}>
      <GalleryRootZoomContext value={zoomValue}>
        <Dialog.Root
          // Stays open while the image flies back, then lets Base UI unmount it.
          open={open || phase === GalleryPhase.Closing}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) close();
          }}
        >
          {children}
        </Dialog.Root>
      </GalleryRootZoomContext>
    </GalleryRootContext>
  );
}
