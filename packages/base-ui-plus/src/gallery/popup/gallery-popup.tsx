"use client";

import { Dialog, type DialogPopupProps } from "@base-ui/react/dialog";
import { ownerWindow } from "@base-ui/utils/owner";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { GALLERY_KEYBOARD_PAN_STEP } from "../constants";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { GalleryPhase } from "../types";

export type GalleryPopupProps = DialogPopupProps;

type GalleryPopupKeyboardEvent = Parameters<
  NonNullable<DialogPopupProps["onKeyDown"]>
>[0];

/**
 * The full-screen viewer. Place `Gallery.Viewport` and the controls inside.
 *
 * Keys: ← → previous / next (pan while zoomed), ↑ ↓ pan, Home / End first /
 * last, + − zoom, 0 reset zoom, Esc close.
 *
 * Has `data-zoomed` while the image is zoomed, `data-controls-hidden` after a
 * tap hides the controls, and `data-ending-style` while the image flies back
 * (fade the controls then, not the popup: the image is inside it). Gets
 * `--gallery-dismiss-progress` while the image is dragged to close, and has
 * `data-dragging` during a drag: turn transitions off then.
 * Renders a `<div>` element.
 */
export function GalleryPopup(props: GalleryPopupProps): React.ReactElement {
  const { ref, onKeyDown, ...elementProps } = props;

  const {
    items,
    phase,
    zoomed,
    controlsHidden,
    getFinalFocus,
    goTo,
    goToPrevious,
    goToNext,
    zoomIn,
    zoomOut,
    resetZoom,
    panBy,
    setPopupElement,
  } = useGalleryRootContext();
  const mergedRef = useMergedRefs(ref, setPopupElement);

  const handleKeyDown = (event: GalleryPopupKeyboardEvent) => {
    // The caller's handler runs first and can prevent the shortcut.
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const isRtl =
      ownerWindow(event.currentTarget).getComputedStyle(event.currentTarget)
        .direction === "rtl";
    const step = GALLERY_KEYBOARD_PAN_STEP;

    const actions: Record<string, () => void> = {
      ArrowLeft: () => {
        if (zoomed) panBy(step, 0);
        else if (isRtl) goToNext();
        else goToPrevious();
      },
      ArrowRight: () => {
        if (zoomed) panBy(-step, 0);
        else if (isRtl) goToPrevious();
        else goToNext();
      },
      ArrowUp: () => panBy(0, step),
      ArrowDown: () => panBy(0, -step),
      Home: () => goTo(0),
      End: () => goTo(items.length - 1),
      "+": zoomIn,
      "=": zoomIn,
      "-": zoomOut,
      "0": resetZoom,
    };

    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  return (
    <Dialog.Popup
      ref={mergedRef}
      finalFocus={() => getFinalFocus() ?? true}
      data-zoomed={zoomed ? "" : undefined}
      data-controls-hidden={controlsHidden ? "" : undefined}
      // The dialog stays open while the image flies back.
      data-ending-style={phase === GalleryPhase.Closing ? "" : undefined}
      {...elementProps}
      onKeyDown={handleKeyDown}
    />
  );
}
