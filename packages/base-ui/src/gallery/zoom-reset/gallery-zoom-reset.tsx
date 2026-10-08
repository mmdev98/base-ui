"use client";

import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import {
  type GalleryActionProps,
  type GalleryActionState,
  useGalleryAction,
} from "../use-gallery-action";

export type GalleryZoomResetProps = GalleryActionProps;

export type GalleryZoomResetState = GalleryActionState;

/**
 * Puts the active image back at its original size. Disabled when it isn't
 * zoomed. Renders a `<button>` element.
 */
export function GalleryZoomReset(
  props: GalleryZoomResetProps,
): React.ReactElement {
  const { zoomed, resetZoom } = useGalleryRootContext();
  return useGalleryAction({
    props,
    disabled: !zoomed,
    onAction: resetZoom,
    label: "Reset zoom",
    shortcut: "0",
  });
}
