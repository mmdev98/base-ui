"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";

export type GalleryValueState = {
  /** Index of the active item. */
  index: number;
  /** Number of items. */
  count: number;
};

export interface GalleryValueProps extends Omit<
  useRender.ComponentProps<"span", GalleryValueState>,
  "children"
> {
  /**
   * Content. A function receives the state, to format it.
   * @default `${index + 1} / ${count}`
   */
  children?: React.ReactNode | ((state: GalleryValueState) => React.ReactNode);
}

/**
 * Position of the active item, as "2 / 5". Announced to screen readers when
 * it changes. Renders a `<span>` element.
 */
export function GalleryValue(props: GalleryValueProps): React.ReactElement {
  const { children, render, ref, ...elementProps } = props;

  const { index, items } = useGalleryRootContext();
  const count = items.length;

  const state: GalleryValueState = React.useMemo(
    () => ({ index, count }),
    [index, count],
  );

  return useRender({
    defaultTagName: "span",
    render,
    ref,
    state,
    stateAttributesMapping: { index: () => null, count: () => null },
    props: mergeProps<"span">(
      {
        "aria-live": "polite",
        children:
          typeof children === "function"
            ? children(state)
            : (children ?? `${index + 1} / ${count}`),
      },
      elementProps,
    ),
  });
}
