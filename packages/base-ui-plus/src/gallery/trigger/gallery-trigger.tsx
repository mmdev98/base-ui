"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useGalleryListContext } from "../list/gallery-list-context";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { GalleryPhase } from "../types";
import { useGalleryElementRef } from "./use-gallery-element-ref";

export type GalleryTriggerState = {
  /** Whether its image loads before the viewer opens. */
  pending: boolean;
  /** Whether its image flies to or from the viewer. Hide the trigger meanwhile. */
  flying: boolean;
  /** Whether another trigger's image is loading. */
  disabled: boolean;
  /**
   * Whether the viewer shows its image, from the start of the opening flight
   * to the end of the closing one. Hide the thumbnail meanwhile and keep its
   * space (`visibility: hidden`): the image looks like it left its slot.
   */
  popupOpen: boolean;
};

export interface GalleryTriggerProps extends useRender.ComponentProps<
  "button",
  GalleryTriggerState
> {
  /** Index of the item it opens. */
  index: number;
}

/**
 * Opens the viewer on one item. The image flies from the trigger to the
 * viewer and back. Put the thumbnail inside it. It has `data-popup-open` while
 * the viewer shows its image: hide it then, keeping its space. When `index` has no item,
 * only the children render, without the button. Inside `Gallery.List`, a
 * trigger past the list's limit renders nothing.
 * Renders a `<button>` element.
 */
export function GalleryTrigger(
  props: GalleryTriggerProps,
): React.ReactElement | null {
  const { index, render, ref, children, ...elementProps } = props;

  const {
    items,
    index: activeIndex,
    phase,
    pendingIndex,
    flyingItemId,
    openAt,
    registerTrigger,
  } = useGalleryRootContext();
  const list = useGalleryListContext();

  const item = items[index];
  const registerRef = useGalleryElementRef(item?.id, registerTrigger);
  const mergedRef = useMergedRefs(ref, registerRef);

  const pending = pendingIndex === index;
  const flying = item !== undefined && flyingItemId === item.id;
  const disabled = pendingIndex !== null;
  const popupOpen = phase !== GalleryPhase.Closed && index === activeIndex;

  const state: GalleryTriggerState = React.useMemo(
    () => ({ pending, flying, disabled, popupOpen }),
    [pending, flying, disabled, popupOpen],
  );

  const element = useRender({
    defaultTagName: "button",
    render,
    ref: mergedRef,
    state,
    // Named like Base UI's triggers: `data-popup-open`.
    stateAttributesMapping: {
      popupOpen: (value) => (value ? { "data-popup-open": "" } : null),
    },
    enabled: item !== undefined,
    props: mergeProps<"button">(
      {
        type: "button",
        "aria-label": `Open image ${index + 1} of ${items.length}`,
        "aria-busy": pending || undefined,
        // Stays focusable while disabled, so focus isn't lost while loading.
        "aria-disabled": disabled || undefined,
        onClick: (event) => {
          if (disabled) return;
          void openAt(index, event.currentTarget);
        },
        children,
      },
      elementProps,
    ),
  });

  if (list && index >= list.visibleCount) return null;
  // Nothing to open: still show the children (an avatar without a photo).
  if (!item) return <>{children}</>;
  return element;
}
