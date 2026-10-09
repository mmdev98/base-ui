"use client";

import { Dialog, type DialogPortalProps } from "@base-ui/react/dialog";
import * as React from "react";

export type GalleryPortalProps = DialogPortalProps;

/**
 * Moves the viewer to the end of `<body>` while it is open.
 * Renders a `<div>` element.
 */
export function GalleryPortal(props: GalleryPortalProps): React.ReactElement {
  return <Dialog.Portal {...props} />;
}
