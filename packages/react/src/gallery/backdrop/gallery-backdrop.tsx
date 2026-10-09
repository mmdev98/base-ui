"use client";

import { Dialog, type DialogBackdropProps } from "@base-ui/react/dialog";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { GalleryPhase } from "../types";

export type GalleryBackdropProps = DialogBackdropProps;

/**
 * Covers the page behind the viewer. While the image is dragged to close, it
 * gets `--gallery-dismiss-progress` (0 to 1), to fade it out:
 * `opacity: calc(1 - var(--gallery-dismiss-progress, 0))`. While the image
 * flies back, it has `data-ending-style` like any Base UI popup. It has
 * `data-dragging` during a drag: turn its transition off then, or the fade
 * lags behind the finger.
 * Renders a `<div>` element.
 */
export function GalleryBackdrop(
  props: GalleryBackdropProps,
): React.ReactElement {
  const { ref, ...elementProps } = props;

  const { phase, setBackdropElement } = useGalleryRootContext();
  const mergedRef = useMergedRefs(ref, setBackdropElement);

  return (
    <Dialog.Backdrop
      ref={mergedRef}
      // The dialog stays open while the image flies back; fade out meanwhile.
      data-ending-style={phase === GalleryPhase.Closing ? "" : undefined}
      {...elementProps}
    />
  );
}
