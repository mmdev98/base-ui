"use client";

import { createContext, use } from "react";

export interface GalleryViewportContextValue {
  /** Width of the viewport, and of each item (px). */
  width: number;
  /** Space between items, from the viewport's CSS `column-gap` (px). */
  gap: number;
  /** `-1` in right-to-left layouts, where the next item is on the left. */
  directionSign: 1 | -1;
}

export const GalleryViewportContext =
  createContext<GalleryViewportContextValue | null>(null);

export function useGalleryViewportContext(): GalleryViewportContextValue {
  const context = use(GalleryViewportContext);
  if (!context) {
    throw new Error(
      "Base UI: GalleryViewportContext is missing. " +
        "Gallery.Item must be placed within <Gallery.Viewport>.",
    );
  }
  return context;
}
