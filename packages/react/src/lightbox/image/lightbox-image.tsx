"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ownerWindow } from "@base-ui/utils/owner";
import { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import { useLightboxItemContext } from "../item/lightbox-item-context";
import { useLightboxRootContext } from "../root/lightbox-root-context";
import { type LightboxImageLayout, LightboxImageStatus } from "../types";
import { getLightboxContainedSize } from "../utils/lightbox-geometry";
import {
  getLightboxAspectRatio,
  toLightboxDimension,
} from "../utils/lightbox-items";

export type LightboxImageState = {
  /** Whether its item is the one shown in the viewer. */
  active: boolean;
  /** Whether the image is loading. */
  loading: boolean;
  /** Whether the image failed to load. */
  error: boolean;
};

export type LightboxImageProps = useRender.ComponentProps<
  "img",
  LightboxImageState
>;

function isSameLayout(a: LightboxImageLayout | null, b: LightboxImageLayout) {
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
 * The image of a `Lightbox.Item`, fitted inside the item's padding. It is
 * the element that zooms, pans and flies. Give it `src` and `alt`, and the
 * natural `width` and `height` when known: they give it the right shape
 * before it has loaded. To render another element (a `srcSet`, a framework
 * image), pass `render` and spread the props. Its position and size come
 * from these props, and its `transform` is set while it moves.
 * Renders an `<img>` element.
 */
export function LightboxImage(props: LightboxImageProps): React.ReactElement {
  const { render, ref, ...elementProps } = props;
  const { src, width, height } = elementProps;

  const {
    value,
    active,
    status,
    setStatus,
    element: itemElement,
  } = useLightboxItemContext();
  const { imageSizes, setImageSize, registerImage } = useLightboxRootContext();
  const [layout, setLayout] = React.useState<LightboxImageLayout | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const mergedRef = useMergedRefs(ref, imageRef);

  const aspectRatio = getLightboxAspectRatio(
    imageSizes.get(value),
    toLightboxDimension(width),
    toLightboxDimension(height),
  );

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
    const size = getLightboxContainedSize(ratio, contentWidth, contentHeight);
    const next: LightboxImageLayout = {
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

  // A failed image is no longer the one to zoom, drag or fly back: the
  // item's `Lightbox.Fallback` moves with the close drag instead.
  const failed = status === LightboxImageStatus.Error;
  useIsoLayoutEffect(() => {
    const element = imageRef.current;
    if (!layout || !element || !itemElement || failed) return undefined;
    return registerImage(value, { element, itemElement, layout });
  }, [layout, itemElement, value, registerImage, failed]);

  // A new `src` loads again; a cached image may be complete already.
  useIsoLayoutEffect(() => {
    const element = imageRef.current;
    if (element?.complete && element.naturalWidth > 0)
      setStatus(LightboxImageStatus.Loaded);
    else setStatus(LightboxImageStatus.Loading);
    return () => setStatus(LightboxImageStatus.Idle);
  }, [src, setStatus]);

  const state: LightboxImageState = React.useMemo(
    () => ({
      active,
      loading: status === LightboxImageStatus.Loading,
      error: status === LightboxImageStatus.Error,
    }),
    [active, status],
  );

  return useRender({
    defaultTagName: "img",
    render,
    ref: mergedRef,
    state,
    props: mergeProps<"img">(
      {
        alt: "",
        draggable: false,
        decoding: "async",
        onLoad: (event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth && naturalHeight) {
            setImageSize(value, {
              width: naturalWidth,
              height: naturalHeight,
            });
          }
          setStatus(LightboxImageStatus.Loaded);
        },
        onError: () => setStatus(LightboxImageStatus.Error),
      },
      elementProps,
      // Last, so the caller's `width`, `height` and `style` can't move it.
      {
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
    ),
  });
}
