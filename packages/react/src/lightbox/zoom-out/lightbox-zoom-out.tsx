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

export type LightboxZoomOutProps = LightboxActionProps;

export type LightboxZoomOutState = LightboxActionState;

/**
 * Zooms the active image out by one step. Disabled when it isn't zoomed.
 * Renders a `<button>` element.
 */
export function LightboxZoomOut(
  props: LightboxZoomOutProps,
): React.ReactElement {
  const { zoomOut } = useLightboxRootContext();
  const { canZoomOut } = useLightboxRootZoomContext();
  return useLightboxAction({
    props,
    disabled: !canZoomOut,
    onAction: zoomOut,
    label: "Zoom out",
    shortcut: "-",
  });
}
