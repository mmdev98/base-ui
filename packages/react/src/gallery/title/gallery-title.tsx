"use client";

import { Dialog, type DialogTitleProps } from "@base-ui/react/dialog";
import * as React from "react";

export type GalleryTitleProps = DialogTitleProps;

/**
 * Names the viewer for screen readers. Hide it visually if the design has no
 * visible title. Renders an `<h2>` element.
 */
export function GalleryTitle(props: GalleryTitleProps): React.ReactElement {
  return <Dialog.Title {...props} />;
}
