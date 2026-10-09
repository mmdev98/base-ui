"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useLightboxRootContext } from "../root/lightbox-root-context";
import {
  useLightboxThumbnailsContext,
  useLightboxThumbnailsItemContext,
} from "../thumbnails/lightbox-thumbnails-context";

export type LightboxThumbnailState = {
  /** Whether its item is the one shown in the viewer. */
  active: boolean;
};

export type LightboxThumbnailProps = useRender.ComponentProps<
  "button",
  LightboxThumbnailState
>;

/**
 * Shows its item in the viewer. Return it from the function passed to
 * `Lightbox.Thumbnails`, with the thumbnail image inside, such as a Base UI
 * `Avatar` that handles loading and errors. Has `aria-current` and
 * `data-active` while its item is shown; the strip keeps it centred.
 * Renders a `<button>` element.
 */
export function LightboxThumbnail(
  props: LightboxThumbnailProps,
): React.ReactElement {
  const { render, ref, ...elementProps } = props;

  const { items, index: activeIndex, goTo } = useLightboxRootContext();
  const { focusIndex, setFocusIndex, registerThumbnail } =
    useLightboxThumbnailsContext();
  const { index } = useLightboxThumbnailsItemContext();
  const elementRef = React.useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(ref, elementRef);

  const active = index === activeIndex;

  // A layout effect: registered before `Lightbox.Thumbnails` centres the active one.
  useIsoLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    return registerThumbnail(index, element);
  }, [index, registerThumbnail]);

  const state: LightboxThumbnailState = React.useMemo(
    () => ({ active }),
    [active],
  );

  return useRender({
    defaultTagName: "button",
    render,
    ref: mergedRef,
    state,
    props: mergeProps<"button">(
      {
        type: "button",
        "aria-label": `Show image ${index + 1} of ${items.length}`,
        "aria-current": active ? "true" : undefined,
        tabIndex: index === focusIndex ? 0 : -1,
        onFocus: () => setFocusIndex(index),
        onClick: () => goTo(index),
      },
      elementProps,
    ),
  });
}
