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

export type GalleryZoomOutProps = GalleryActionProps;

export type GalleryZoomOutState = GalleryActionState;

/**
 * Zooms the active image out by one step. Disabled when it isn't zoomed.
 * Renders a `<button>` element.
 */
export function GalleryZoomOut(props: GalleryZoomOutProps): React.ReactElement {
  const { zoomOut } = useGalleryRootContext();
  const { canZoomOut } = useGalleryRootZoomContext();
  return useGalleryAction({
    props,
    disabled: !canZoomOut,
    onAction: zoomOut,
    label: "Zoom out",
    shortcut: "-",
  });
}
