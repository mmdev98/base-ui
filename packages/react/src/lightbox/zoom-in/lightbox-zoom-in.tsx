"use client";

import * as React from "react";
import {
  useLightboxRootContext,
  useLightboxRootZoomContext,
} from "../root/lightbox-root-context";
import {
  type LightboxActionProps,
  type LightboxActionState,
  useLightboxAction,
} from "../use-lightbox-action";

export type LightboxZoomInProps = LightboxActionProps;

export type LightboxZoomInState = LightboxActionState;

/**
 * Zooms the active image in by one step. Disabled at the largest scale.
 * Renders a `<button>` element.
 */
export function LightboxZoomIn(props: LightboxZoomInProps): React.ReactElement {
  const { zoomIn } = useLightboxRootContext();
  const { canZoomIn } = useLightboxRootZoomContext();
  return useLightboxAction({
    props,
    disabled: !canZoomIn,
    onAction: zoomIn,
    label: "Zoom in",
    shortcut: "+",
  });
}
