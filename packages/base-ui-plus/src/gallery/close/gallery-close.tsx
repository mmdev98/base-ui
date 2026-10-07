"use client";

import { Dialog, type DialogCloseProps } from "@base-ui/react/dialog";
import * as React from "react";

export type GalleryCloseProps = DialogCloseProps;

/**
 * Closes the viewer; the image flies back to its trigger.
 * Renders a `<button>` element.
 */
export function GalleryClose(props: GalleryCloseProps): React.ReactElement {
  return <Dialog.Close aria-label="Close" {...props} />;
}
