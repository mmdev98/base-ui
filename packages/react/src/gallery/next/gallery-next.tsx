"use client";

import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import {
  type GalleryActionProps,
  type GalleryActionState,
  useGalleryAction,
} from "../use-gallery-action";

export type GalleryNextProps = GalleryActionProps;

export type GalleryNextState = GalleryActionState;

/**
 * Shows the next item. Disabled on the last one.
 * Renders a `<button>` element.
 */
export function GalleryNext(props: GalleryNextProps): React.ReactElement {
  const { hasNext, goToNext } = useGalleryRootContext();
  return useGalleryAction({
    props,
    disabled: !hasNext,
    onAction: goToNext,
    label: "Next image",
    shortcut: "ArrowRight",
  });
}
