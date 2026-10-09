"use client";

import { useLightboxItemContext } from "./item/lightbox-item-context";
import { useLightboxRootContext } from "./root/lightbox-root-context";
import { useLightboxElementRef } from "./use-lightbox-element-ref";

/**
 * Makes an element of a `Lightbox.Item` move with the close drag, like the
 * image does, and fade out on close when the item has no image to fly back.
 * Returns the ref callback to put on the element.
 */
export function useLightboxDismissFollower(): (
  element: HTMLElement | null,
) => void {
  const { value } = useLightboxItemContext();
  const { registerDismissFollower } = useLightboxRootContext();
  return useLightboxElementRef(value, registerDismissFollower);
}
