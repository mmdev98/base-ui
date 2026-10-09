"use client";

import * as React from "react";
import { useLightboxRootContext } from "../root/lightbox-root-context";
import {
  type LightboxActionProps,
  type LightboxActionState,
  useLightboxAction,
} from "../use-lightbox-action";

export type LightboxZoomResetProps = LightboxActionProps;

export type LightboxZoomResetState = LightboxActionState;

/**
 * Puts the active image back at its original size. Disabled when it isn't
 * zoomed. Renders a `<button>` element.
 */
export function LightboxZoomReset(
  props: LightboxZoomResetProps,
): React.ReactElement {
  const { zoomed, resetZoom } = useLightboxRootContext();
  return useLightboxAction({
    props,
    disabled: !zoomed,
    onAction: resetZoom,
    label: "Reset zoom",
    shortcut: "0",
  });
}
