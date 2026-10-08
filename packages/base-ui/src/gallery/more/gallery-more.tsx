"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryListContext } from "../list/gallery-list-context";
import type { GalleryItemData } from "../types";

export type GalleryMoreState = {
  /** Number of items hidden behind it. */
  hiddenCount: number;
  /** The hidden items, to draw a stack of their thumbnails. */
  hiddenItems: GalleryItemData[];
};

export interface GalleryMoreProps extends Omit<
  useRender.ComponentProps<"button", GalleryMoreState>,
  "children"
> {
  /**
   * Content of the button. A function receives the state, to show the count.
   * @default `+${hiddenCount}`
   */
  children?: React.ReactNode | ((state: GalleryMoreState) => React.ReactNode);
}

/**
 * Shows the triggers hidden by the `limit` of `Gallery.List`. Renders a
 * `<button>` element while some are hidden, and nothing otherwise.
 */
export function GalleryMore(
  props: GalleryMoreProps,
): React.ReactElement | null {
  const { children, render, ref, ...elementProps } = props;

  const list = useGalleryListContext();
  if (!list) {
    throw new Error(
      "Base UI: GalleryListContext is missing. " +
        "Gallery.More shows the triggers hidden by a list, so it must be placed within <Gallery.List>.",
    );
  }
  const { hiddenItems, expand } = list;
  const hiddenCount = hiddenItems.length;

  const state: GalleryMoreState = React.useMemo(
    () => ({ hiddenCount, hiddenItems }),
    [hiddenCount, hiddenItems],
  );

  const element = useRender({
    defaultTagName: "button",
    render,
    ref,
    state,
    stateAttributesMapping: {
      hiddenCount: (value) => ({ "data-hidden-count": String(value) }),
      hiddenItems: () => null,
    },
    props: mergeProps<"button">(
      {
        type: "button",
        "aria-label": `Show ${hiddenCount} more`,
        onClick: expand,
        children:
          typeof children === "function"
            ? children(state)
            : (children ?? `+${hiddenCount}`),
      },
      elementProps,
    ),
  });

  return hiddenCount > 0 ? element : null;
}
