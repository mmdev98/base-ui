"use client";

import { createContext, use } from "react";
import type { GalleryItemData } from "../types";

export interface GalleryListContextValue {
  /** Number of triggers shown; the ones after it render nothing. */
  visibleCount: number;
  /** Items hidden behind `Gallery.More`. */
  hiddenItems: GalleryItemData[];
  expanded: boolean;
  expand: () => void;
}

export const GalleryListContext = createContext<GalleryListContextValue | null>(
  null,
);

/**
 * Reads the context of `Gallery.List`. Returns `null` outside a list, since
 * `Gallery.Trigger` also works on its own.
 */
export function useGalleryListContext(): GalleryListContextValue | null {
  return use(GalleryListContext);
}
