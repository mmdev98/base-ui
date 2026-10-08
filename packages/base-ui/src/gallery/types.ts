import type * as React from "react";

export type GalleryItemData = {
  /** Stable id, kept when items are added or removed. */
  id: string;
  src: string;
  alt?: string;
  /** Natural size. Gives the right aspect ratio before the image has loaded. */
  width?: number;
  height?: number;
  /** Shown by `Gallery.Description` while the item is active. */
  caption?: React.ReactNode;
  /** URL `Gallery.Download` links to. Defaults to `src`. */
  downloadUrl?: string;
};

export type GalleryImageSize = {
  width: number;
  height: number;
};

/** Box in px, as from `getBoundingClientRect`. */
export type GalleryRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Box of an image inside its `Gallery.Item`, in px from the item's corner. */
export type GalleryImageLayout = GalleryRect & {
  itemWidth: number;
  itemHeight: number;
};

/** Zoom of the active image: a scale around its centre, then a pan in px. */
export type GalleryZoom = {
  scale: number;
  x: number;
  y: number;
};

/** Offset of the image while it is dragged to close the viewer. */
export type GalleryDismiss = {
  x: number;
  y: number;
  /** Extra scale applied while dragging, 1 at rest. */
  scale: number;
};

/** Where the viewer is in its open and close animation. */
export enum GalleryPhase {
  Closed = "closed",
  /** The image flies from its trigger, or fades in. */
  Opening = "opening",
  Open = "open",
  /** The image flies back to its trigger, or fades out. */
  Closing = "closing",
}
