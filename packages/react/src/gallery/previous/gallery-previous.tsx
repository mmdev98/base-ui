"use client";

import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import {
  type GalleryActionProps,
  type GalleryActionState,
  useGalleryAction,
} from "../use-gallery-action";

export type GalleryPreviousProps = GalleryActionProps;

export type GalleryPreviousState = GalleryActionState;

/**
 * Shows the previous item. Disabled on the first one.
 * Renders a `<button>` element.
 */
export function GalleryPrevious(
  props: GalleryPreviousProps,
): React.ReactElement {
  const { hasPrevious, goToPrevious } = useGalleryRootContext();
  return useGalleryAction({
    props,
    disabled: !hasPrevious,
    onAction: goToPrevious,
    label: "Previous image",
    shortcut: "ArrowLeft",
  });
}
