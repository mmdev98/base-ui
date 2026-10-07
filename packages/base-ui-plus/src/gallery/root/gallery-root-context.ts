"use client";

import { createContext, use } from "react";
import {
  type GalleryDismiss,
  type GalleryImageLayout,
  type GalleryImageSize,
  type GalleryItemData,
  GalleryPhase,
  type GalleryZoom,
} from "../types";

/**
 * Slide of the track after the index changed by `step`. `offset` is where a
 * swipe left it, in px along the reading direction (towards the end is negative).
 */
export type GalleryTrackTransition = {
  step: number;
  offset: number;
};

/** An image registered by `Gallery.Image`, for gestures and flights. */
export type GalleryImageEntry = {
  element: HTMLElement;
  itemElement: HTMLElement;
  layout: GalleryImageLayout;
};

export interface GalleryRootContextValue {
  items: GalleryItemData[];
  /** Index of the item shown in the viewer, or last shown. */
  index: number;
  activeItem: GalleryItemData | undefined;
  open: boolean;
  phase: GalleryPhase;
  /** Index of the item whose image loads before the viewer opens. */
  pendingIndex: number | null;
  /** Item whose image flies between its trigger and the viewer. */
  flyingItemId: string | null;
  /** Whether the active image is zoomed in. */
  zoomed: boolean;
  /** Whether a tap hid the controls (toolbar, caption, close button). */
  controlsHidden: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  minScale: number;
  maxScale: number;
  /** Natural sizes of the images loaded so far, by item id. */
  imageSizes: Record<string, GalleryImageSize>;
  /** Loads the item's image, then opens the viewer on it. The image flies from `trigger`, and focus returns to it on close. */
  openAt: (index: number, trigger?: HTMLElement | null) => Promise<void>;
  close: () => void;
  goTo: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  panBy: (deltaX: number, deltaY: number) => void;
  toggleControls: () => void;

  // Wiring between the gallery parts.
  /** Element focused when the viewer closes. */
  getFinalFocus: () => HTMLElement | null;
  setImageSize: (itemId: string, size: GalleryImageSize) => void;
  /** Registers a trigger to fly to and from. Returns the unregister function. */
  registerTrigger: (itemId: string, element: HTMLElement) => () => void;
  /** Registers an item's image. Returns the unregister function. */
  registerImage: (itemId: string, entry: GalleryImageEntry) => () => void;
  getActiveImage: () => GalleryImageEntry | undefined;
  setPopupElement: (element: HTMLElement | null) => void;
  setBackdropElement: (element: HTMLElement | null) => void;
  getZoom: () => GalleryZoom;
  /** Applies a zoom now, stopping any zoom animation. */
  setZoom: (zoom: GalleryZoom) => void;
  /** Animates to a zoom; `clamp` first brings it in bounds. */
  animateZoom: (zoom: GalleryZoom, options?: { clamp?: boolean }) => void;
  setDismiss: (dismiss: GalleryDismiss, progress: number) => void;
  /** Animates the close drag to `dismiss`, then calls `onComplete`. */
  animateDismiss: (dismiss: GalleryDismiss, onComplete?: () => void) => void;
  /** Sets `data-dragging` on the popup and the backdrop, so the app can turn transitions off. */
  setDragging: (dragging: boolean) => void;
  /** Moves the active item by `step` after a swipe left the track `fromOffset` px away. */
  stepIndex: (step: number, fromOffset: number) => void;
  /** How the track should slide to the new index, read once by `Gallery.Viewport`. */
  takeTrackTransition: () => GalleryTrackTransition | null;
}

/** Changes on every zoom frame, so it lives apart from `GalleryRootContext`. */
export interface GalleryRootZoomContextValue {
  scale: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export const GalleryRootContext = createContext<GalleryRootContextValue | null>(
  null,
);

export const GalleryRootZoomContext =
  createContext<GalleryRootZoomContextValue | null>(null);

export function useGalleryRootContext(): GalleryRootContextValue {
  const context = use(GalleryRootContext);
  if (!context) {
    throw new Error(
      "Base UI Plus: GalleryRootContext is missing. " +
        "Gallery parts must be placed within <Gallery.Root>.",
    );
  }
  return context;
}

export function useGalleryRootZoomContext(): GalleryRootZoomContextValue {
  const context = use(GalleryRootZoomContext);
  if (!context) {
    throw new Error(
      "Base UI Plus: GalleryRootZoomContext is missing. " +
        "Gallery parts must be placed within <Gallery.Root>.",
    );
  }
  return context;
}
