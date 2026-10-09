"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryRootZoomContext } from "../root/gallery-root-context";

export type GalleryZoomValueState = {
  /** Scale of the active image: 1 at its original size. */
  scale: number;
};

export interface GalleryZoomValueProps extends Omit<
  useRender.ComponentProps<"span", GalleryZoomValueState>,
  "children"
> {
  /**
   * Content. A function receives the scale, to format it.
   * @default `${Math.round(scale * 100)}%`
   */
  children?: React.ReactNode | ((scale: number) => React.ReactNode);
}

/**
 * Zoom level of the active image, as a percentage.
 * Renders a `<span>` element.
 */
export function GalleryZoomValue(
  props: GalleryZoomValueProps,
): React.ReactElement {
  const { children, render, ref, ...elementProps } = props;

  const { scale } = useGalleryRootZoomContext();

  const state: GalleryZoomValueState = React.useMemo(
    () => ({ scale }),
    [scale],
  );

  return useRender({
    defaultTagName: "span",
    render,
    ref,
    state,
    stateAttributesMapping: { scale: () => null },
    props: mergeProps<"span">(
      {
        children:
          typeof children === "function"
            ? children(scale)
            : (children ?? `${Math.round(scale * 100)}%`),
      },
      elementProps,
    ),
  });
}
