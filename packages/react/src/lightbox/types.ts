/**
 * Identifies an item, as returned by `itemToValue`: stable when items are
 * added, removed or reordered.
 */
export type LightboxItemValue = string | number;

export type LightboxImageSize = {
  width: number;
  height: number;
};

/** Box in px, as from `getBoundingClientRect`. */
export type LightboxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Box of an image inside its `Lightbox.Item`, in px from the item's corner. */
export type LightboxImageLayout = LightboxRect & {
  itemWidth: number;
  itemHeight: number;
};

/** Zoom of the active image: a scale around its centre, then a pan in px. */
export type LightboxZoom = {
  scale: number;
  x: number;
  y: number;
};

/** Offset of the image while it is dragged to close the viewer. */
export type LightboxDismiss = {
  x: number;
  y: number;
  /** Extra scale applied while dragging, 1 at rest. */
  scale: number;
};

/** Loading state of the image in a `Lightbox.Item`. */
export enum LightboxImageStatus {
  /** No `Lightbox.Image` in the item. */
  Idle = "idle",
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}

/** Where the viewer is in its open and close animation. */
export enum LightboxPhase {
  Closed = "closed",
  /** The image flies from its trigger, or fades in. */
  Opening = "opening",
  Open = "open",
  /** The image flies back to its trigger, or fades out. */
  Closing = "closing",
}
