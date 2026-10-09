"use client";

import { createContext, use } from "react";

export interface LightboxThumbnailsContextValue {
  /** Index of the thumbnail in the tab order (roving `tabIndex`). */
  focusIndex: number;
  setFocusIndex: (index: number) => void;
  /** Registers a thumbnail for the arrow keys. Returns the unregister function. */
  registerThumbnail: (index: number, element: HTMLElement) => () => void;
}

/** The item a `Lightbox.Thumbnails` child renders, so `Lightbox.Thumbnail` needs no props. */
export interface LightboxThumbnailsItemContextValue {
  index: number;
}

export const LightboxThumbnailsContext =
  createContext<LightboxThumbnailsContextValue | null>(null);

export const LightboxThumbnailsItemContext =
  createContext<LightboxThumbnailsItemContextValue | null>(null);

export function useLightboxThumbnailsContext(): LightboxThumbnailsContextValue {
  const context = use(LightboxThumbnailsContext);
  if (!context) {
    throw new Error(
      "Base UI: LightboxThumbnailsContext is missing. " +
        "Lightbox.Thumbnail must be placed within <Lightbox.Thumbnails>.",
    );
  }
  return context;
}

export function useLightboxThumbnailsItemContext(): LightboxThumbnailsItemContextValue {
  const context = use(LightboxThumbnailsItemContext);
  if (!context) {
    throw new Error(
      "Base UI: LightboxThumbnailsItemContext is missing. " +
        "Lightbox.Thumbnail must be returned by the function passed to <Lightbox.Thumbnails>.",
    );
  }
  return context;
}
