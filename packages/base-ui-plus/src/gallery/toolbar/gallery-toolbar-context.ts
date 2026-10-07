"use client";

import { createContext, use } from "react";

export interface GalleryToolbarContextValue {
  /** Whether the toolbar is laid out vertically. */
  vertical: boolean;
}

export const GalleryToolbarContext =
  createContext<GalleryToolbarContextValue | null>(null);

/**
 * Reads the context of `Gallery.Toolbar`. Returns `null` outside a toolbar,
 * since the actions also work on their own.
 */
export function useGalleryToolbarContext(): GalleryToolbarContextValue | null {
  return use(GalleryToolbarContext);
}
