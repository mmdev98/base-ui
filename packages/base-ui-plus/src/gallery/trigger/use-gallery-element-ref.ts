"use client";

import * as React from "react";

/**
 * Ref callback that registers its element under `itemId` and unregisters it
 * when the element or the item changes. Handles `null` itself, since wrapped
 * refs may not run a returned cleanup.
 */
export function useGalleryElementRef(
  itemId: string | undefined,
  register: (itemId: string, element: HTMLElement) => () => void,
): (element: HTMLElement | null) => void {
  const unregisterRef = React.useRef<(() => void) | null>(null);

  return React.useCallback(
    (element: HTMLElement | null) => {
      unregisterRef.current?.();
      unregisterRef.current =
        element && itemId ? register(itemId, element) : null;
    },
    [itemId, register],
  );
}
