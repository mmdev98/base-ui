"use client";

import { Dialog, type DialogDescriptionProps } from "@base-ui/react/dialog";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";

export type GalleryDescriptionProps = DialogDescriptionProps;

/**
 * Caption of the active item, linked to the viewer for screen readers.
 * Shows `children`, or else the item's `caption`, and renders nothing when
 * there is neither. Renders a `<p>` element.
 */
export function GalleryDescription(
  props: GalleryDescriptionProps,
): React.ReactElement | null {
  const { children, ...elementProps } = props;

  const { activeItem } = useGalleryRootContext();
  const content = children ?? activeItem?.caption;

  if (content === undefined || content === null || content === "") return null;

  return <Dialog.Description {...elementProps}>{content}</Dialog.Description>;
}
