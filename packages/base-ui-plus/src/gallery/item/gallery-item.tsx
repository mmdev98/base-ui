"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { useGalleryViewportContext } from "../viewport/gallery-viewport-context";
import {
  GalleryItemContext,
  type GalleryItemContextValue,
} from "./gallery-item-context";

export type GalleryItemState = {
  /** Whether it is the item shown in the viewer. */
  active: boolean;
};

export interface GalleryItemProps extends useRender.ComponentProps<
  "div",
  GalleryItemState
> {
  /** Index of the item, as passed to the `Gallery.Viewport` children. */
  index: number;
}

/**
 * One slide of the viewport, as large as the viewport. Its padding is the
 * space kept around the image (`p-6 md:p-24`, or `p-0` for edge to edge).
 * Renders a `<div>` element.
 */
export function GalleryItem(
  props: GalleryItemProps,
): React.ReactElement | null {
  const { index, render, ref, children, ...elementProps } = props;

  const { items, index: activeIndex } = useGalleryRootContext();
  const { width, gap, directionSign } = useGalleryViewportContext();
  const [element, setElement] = React.useState<HTMLElement | null>(null);
  const handleElement = React.useCallback(
    (node: HTMLElement | null) => setElement(node),
    [],
  );
  const mergedRef = useMergedRefs(ref, handleElement);

  const item = items[index];
  const active = index === activeIndex;

  const contextValue: GalleryItemContextValue | null = React.useMemo(
    () => (item ? { item, index, active, element } : null),
    [item, index, active, element],
  );

  const state: GalleryItemState = React.useMemo(() => ({ active }), [active]);

  const rendered = useRender({
    defaultTagName: "div",
    render,
    ref: mergedRef,
    state,
    enabled: item !== undefined,
    props: mergeProps<"div">(
      {
        role: "group",
        "aria-roledescription": "slide",
        "aria-label": `${index + 1} of ${items.length}`,
        "aria-hidden": active ? undefined : true,
        style: {
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          transform: `translate3d(${index * (width + gap) * directionSign}px, 0px, 0px)`,
        },
        children,
      },
      elementProps,
    ),
  });

  if (!contextValue) return null;
  return (
    <GalleryItemContext value={contextValue}>{rendered}</GalleryItemContext>
  );
}
