"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ownerWindow } from "@base-ui/utils/owner";
import { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import { useGalleryItemContext } from "../item/gallery-item-context";
import { useGalleryRootContext } from "../root/gallery-root-context";
import type { GalleryImageLayout } from "../types";
import { getGalleryContainedSize } from "../utils/gallery-geometry";
import { getGalleryItemAspectRatio } from "../utils/gallery-items";

export type GalleryImageState = {
  /** Whether its item is the one shown in the viewer. */
  active: boolean;
  /** Whether its natural size is known, from loading or from the item. */
  loaded: boolean;
};

export type GalleryImageProps = useRender.ComponentProps<
  "img",
  GalleryImageState
>;

function isSameLayout(a: GalleryImageLayout | null, b: GalleryImageLayout) {
  return (
    a !== null &&
    a.left === b.left &&
    a.top === b.top &&
    a.width === b.width &&
    a.height === b.height &&
    a.itemWidth === b.itemWidth &&
    a.itemHeight === b.itemHeight
  );
}

/**
 * The image of a `Gallery.Item`, fitted inside the item's padding. It is the
 * element that zooms, pans and flies. To change the image (a resized
 * `src`, a `srcSet`, another component), pass `render` and spread the
 * props: `render={(props) => <img {...props} srcSet={…} />}`. Its position
 * and size come from these props, and its `transform` is set while it moves.
 * Renders an `<img>` element.
 */
export function GalleryImage(props: GalleryImageProps): React.ReactElement {
  const { render, ref, ...elementProps } = props;

  const { item, active, element: itemElement } = useGalleryItemContext();
  const { imageSizes, setImageSize, registerImage } = useGalleryRootContext();
  const [layout, setLayout] = React.useState<GalleryImageLayout | null>(null);
  const imageRef = React.useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(ref, imageRef);

  const aspectRatio = getGalleryItemAspectRatio(item, imageSizes[item.id]);

  const measure = useStableCallback(() => {
    if (!itemElement) return;
    const style = ownerWindow(itemElement).getComputedStyle(itemElement);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const itemWidth = itemElement.clientWidth;
    const itemHeight = itemElement.clientHeight;
    const contentWidth = Math.max(
      0,
      itemWidth - paddingLeft - (parseFloat(style.paddingRight) || 0),
    );
    const contentHeight = Math.max(
      0,
      itemHeight - paddingTop - (parseFloat(style.paddingBottom) || 0),
    );
    // Until the size is known, the image fills the space.
    const ratio =
      aspectRatio ?? (contentHeight > 0 ? contentWidth / contentHeight : 1);
    const size = getGalleryContainedSize(ratio, contentWidth, contentHeight);
    const next: GalleryImageLayout = {
      left: paddingLeft + (contentWidth - size.width) / 2,
      top: paddingTop + (contentHeight - size.height) / 2,
      width: size.width,
      height: size.height,
      itemWidth,
      itemHeight,
    };
    setLayout((current) => (isSameLayout(current, next) ? current : next));
  });

  useIsoLayoutEffect(() => {
    measure();
    if (!itemElement || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(itemElement);
    return () => observer.disconnect();
  }, [itemElement, aspectRatio, measure]);

  useIsoLayoutEffect(() => {
    const element = imageRef.current;
    if (!layout || !element || !itemElement) return undefined;
    return registerImage(item.id, { element, itemElement, layout });
  }, [layout, itemElement, item.id, registerImage]);

  const state: GalleryImageState = React.useMemo(
    () => ({ active, loaded: aspectRatio !== null }),
    [active, aspectRatio],
  );

  return useRender({
    defaultTagName: "img",
    render,
    ref: mergedRef,
    state,
    props: mergeProps<"img">(
      {
        src: item.src,
        alt: item.alt ?? "",
        draggable: false,
        decoding: "async",
        onLoad: (event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth && naturalHeight) {
            setImageSize(item.id, {
              width: naturalWidth,
              height: naturalHeight,
            });
          }
        },
        style: {
          position: "absolute",
          left: layout?.left ?? 0,
          top: layout?.top ?? 0,
          width: layout?.width ?? 0,
          height: layout?.height ?? 0,
          maxWidth: "none",
          maxHeight: "none",
          visibility: layout ? undefined : "hidden",
          willChange: active ? "transform" : undefined,
        },
      },
      elementProps,
    ),
  });
}
