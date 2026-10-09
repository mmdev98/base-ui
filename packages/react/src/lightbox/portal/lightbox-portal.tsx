"use client";

import { Dialog, type DialogPortalProps } from "@base-ui/react/dialog";
import * as React from "react";

export type LightboxPortalProps = DialogPortalProps;

/**
 * Moves the viewer to the end of `<body>` while it is open.
 * Renders a `<div>` element.
 */
export function LightboxPortal(props: LightboxPortalProps): React.ReactElement {
  return <Dialog.Portal {...props} />;
}
