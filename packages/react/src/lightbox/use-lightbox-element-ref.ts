"use client";

import * as React from "react";
import type { LightboxItemValue } from "./types";

/**
 * Ref callback that registers its element under `itemValue` and unregisters
 * it when the element, the item or `register` changes. Handles `null`
 * itself, since wrapped refs may not run a returned cleanup.
 */
export function useLightboxElementRef(
  itemValue: LightboxItemValue | undefined,
  register: (itemValue: LightboxItemValue, element: HTMLElement) => () => void,
): (element: HTMLElement | null) => void {
  const unregisterRef = React.useRef<(() => void) | null>(null);

  return React.useCallback(
    (element: HTMLElement | null) => {
      unregisterRef.current?.();
      unregisterRef.current =
        element && itemValue !== undefined
          ? register(itemValue, element)
          : null;
    },
    [itemValue, register],
  );
}
