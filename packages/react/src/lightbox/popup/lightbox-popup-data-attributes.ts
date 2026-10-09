/**
 * Present while the active image is zoomed in.
 */
export const zoomed = "data-zoomed";

/**
 * Present after a tap hid the controls (toolbar, caption, close button).
 */
export const controlsHidden = "data-controls-hidden";

/**
 * Present while the image flies back or fades out. Fade the controls then, not the popup: the image is inside it.
 */
export const endingStyle = "data-ending-style";

/**
 * Present while a finger or the mouse drags the image, and until it settles back after a drag
 * to close. Turn transitions off meanwhile, so what follows `--lightbox-dismiss-progress` keeps
 * up with the finger.
 */
export const dragging = "data-dragging";
