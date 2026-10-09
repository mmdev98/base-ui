"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useLightboxItemContext } from "../item/lightbox-item-context";
import { LightboxImageStatus } from "../types";
import { useLightboxDismissFollower } from "../use-lightbox-dismiss-follower";

export type LightboxFallbackState = {
  /** Whether the item's image failed to load. */
  error: boolean;
};

export interface LightboxFallbackProps extends useRender.ComponentProps<
  "div",
  LightboxFallbackState
> {
  /**
   * Whether to keep it in the DOM while the image hasn't failed.
   * @default false
   */
  keepMounted?: boolean;
}

/**
 * Shows when the image of its `Lightbox.Item` fails to load, like Base UI's
 * `Avatar.Fallback`: a message, an icon, a retry button. Renders nothing
 * otherwise. Place it inside `Lightbox.Item`. It takes the place of the
 * image: it flies from the trigger and back, and follows the drag to close
 * (through `translate` and `scale`, so keep those free).
 * Renders a `<div>` element.
 */
export function LightboxFallback(
  props: LightboxFallbackProps,
): React.ReactElement | null {
  const { keepMounted = false, render, ref, ...elementProps } = props;

  const { status } = useLightboxItemContext();
  // Moves with the close drag, like an image.
  const followerRef = useLightboxDismissFollower();
  const mergedRef = useMergedRefs(ref, followerRef);
  const error = status === LightboxImageStatus.Error;

  const state: LightboxFallbackState = React.useMemo(
    () => ({ error }),
    [error],
  );

  return useRender({
    defaultTagName: "div",
    render,
    ref: mergedRef,
    state,
    enabled: error || keepMounted,
    props: mergeProps<"div">({}, elementProps),
  });
}
