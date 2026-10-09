"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useLightboxItemContext } from "../item/lightbox-item-context";
import { LightboxImageStatus } from "../types";
import { useLightboxDismissFollower } from "../use-lightbox-dismiss-follower";

export type LightboxLoadingIndicatorState = {
  /** Whether the item's image is loading. */
  loading: boolean;
};

export interface LightboxLoadingIndicatorProps extends useRender.ComponentProps<
  "span",
  LightboxLoadingIndicatorState
> {
  /**
   * Whether to keep it in the DOM while the image isn't loading.
   * @default false
   */
  keepMounted?: boolean;
}

/**
 * Shows while the image of its `Lightbox.Item` loads, such as a spinner.
 * Renders nothing otherwise. Place it inside `Lightbox.Item`.
 * Renders a `<span>` element.
 */
export function LightboxLoadingIndicator(
  props: LightboxLoadingIndicatorProps,
): React.ReactElement | null {
  const { keepMounted = false, render, ref, ...elementProps } = props;

  const { status } = useLightboxItemContext();
  // Moves with the close drag, like an image.
  const followerRef = useLightboxDismissFollower();
  const mergedRef = useMergedRefs(ref, followerRef);
  const loading = status === LightboxImageStatus.Loading;

  const state: LightboxLoadingIndicatorState = React.useMemo(
    () => ({ loading }),
    [loading],
  );

  // Decorative: `Lightbox.Item` has `aria-busy` while its image loads.
  return useRender({
    defaultTagName: "span",
    render,
    ref: mergedRef,
    state,
    enabled: loading || keepMounted,
    props: mergeProps<"span">({ "aria-hidden": true }, elementProps),
  });
}
