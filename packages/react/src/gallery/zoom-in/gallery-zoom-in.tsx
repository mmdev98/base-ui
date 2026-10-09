"use client";

import * as React from "react";
import {
  useGalleryRootContext,
  useGalleryRootZoomContext,
} from "../root/gallery-root-context";
import {
  type GalleryActionProps,
  type GalleryActionState,
  useGalleryAction,
} from "../use-gallery-action";

export type GalleryZoomInProps = GalleryActionProps;

export type GalleryZoomInState = GalleryActionState;

/**
 * Zooms the active image in by one step. Disabled at the largest scale.
 * Renders a `<button>` element.
 */
export function GalleryZoomIn(props: GalleryZoomInProps): React.ReactElement {
  const { zoomIn } = useGalleryRootContext();
  const { canZoomIn } = useGalleryRootZoomContext();
  return useGalleryAction({
    props,
    disabled: !canZoomIn,
    onAction: zoomIn,
    label: "Zoom in",
    shortcut: "+",
  });
}
