"use client";

import { createContext, use } from "react";
import type { GalleryItemData } from "../types";

export interface GalleryItemContextValue {
  item: GalleryItemData;
  index: number;
  active: boolean;
  /** The item's element, which `Gallery.Image` measures. */
  element: HTMLElement | null;
}

export const GalleryItemContext = createContext<GalleryItemContextValue | null>(
  null,
);

export function useGalleryItemContext(): GalleryItemContextValue {
  const context = use(GalleryItemContext);
  if (!context) {
    throw new Error(
      "Base UI Plus: GalleryItemContext is missing. " +
        "Gallery.Image must be placed within <Gallery.Item>.",
    );
  }
  return context;
}
