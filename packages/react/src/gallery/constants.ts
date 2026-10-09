/** Scales of the zoom: limits, button step and double-tap target. */
export const GALLERY_ZOOM_SCALE = {
  min: 1,
  max: 4,
  step: 0.5,
  doubleTap: 2.5,
} as const;

/** The viewer opens anyway when the image takes longer than this to load (ms). */
export const GALLERY_PRELOAD_TIMEOUT = 3000;

/** Items rendered on each side of the active one; the others stay empty. */
export const GALLERY_RENDERED_NEIGHBORS = 1;

/** Pixels an arrow key pans a zoomed image. */
export const GALLERY_KEYBOARD_PAN_STEP = 80;

/** Motion of the image flying between a trigger and the viewer. */
export const GALLERY_FLIGHT_DURATION = 350;
export const GALLERY_FLIGHT_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Time a swipe, zoom or drag takes to settle after release (ms). */
export const GALLERY_SETTLE_DURATION = 300;

/** Distance a press moves before it becomes a drag (px). */
export const GALLERY_DRAG_THRESHOLD = 8;

/** A swipe moves to the next item past this share of the width, or this speed (px/ms). */
export const GALLERY_SWIPE_DISTANCE = 0.25;
export const GALLERY_SWIPE_VELOCITY = 0.3;

/** A vertical drag closes the viewer past this share of the height, or this speed (px/ms). */
export const GALLERY_DISMISS_DISTANCE = 0.15;
export const GALLERY_DISMISS_VELOCITY = 0.5;

/** Two taps closer than this in time (ms) and space (px) are a double tap. */
export const GALLERY_DOUBLE_TAP_DELAY = 300;
export const GALLERY_DOUBLE_TAP_DISTANCE = 30;

/** CSS variable the app sets on `Gallery.Viewport` for the space between items. */
export const GALLERY_ITEM_GAP_VARIABLE = "--gallery-item-gap";

/**
 * CSS variable set on `Gallery.Popup` and `Gallery.Backdrop` while the image
 * is dragged to close: 0 at rest, 1 at the closing distance.
 */
export const GALLERY_DISMISS_PROGRESS_VARIABLE = "--gallery-dismiss-progress";
