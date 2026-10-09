"use client";

import { Dialog, type DialogTitleProps } from "@base-ui/react/dialog";
import * as React from "react";

export type LightboxTitleProps = DialogTitleProps;

/**
 * Names the viewer for screen readers. Hide it visually if the design has no
 * visible title. Renders an `<h2>` element.
 */
export function LightboxTitle(props: LightboxTitleProps): React.ReactElement {
  return <Dialog.Title {...props} />;
}
