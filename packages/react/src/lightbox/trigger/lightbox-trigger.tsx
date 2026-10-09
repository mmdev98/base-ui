"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import type { LightboxHandle } from "../root/lightbox-handle";
import {
  type LightboxRootContextValue,
  useLightboxRootContextOptional,
} from "../root/lightbox-root-context";
import { LightboxPhase, type LightboxItemValue } from "../types";
import { useLightboxElementRef } from "../use-lightbox-element-ref";

export type LightboxTriggerState = {
  /** Whether its image loads before the viewer opens. */
  pending: boolean;
  /** Whether its image flies to or from the viewer. Hide the trigger meanwhile. */
  flying: boolean;
  /** Whether another trigger's image is loading. */
  disabled: boolean;
  /**
   * Whether the viewer shows its item, from the start of the opening flight
   * to the end of the closing one. Hide the thumbnail meanwhile and keep its
   * space (`visibility: hidden`): the image looks like it left its slot.
   */
  popupOpen: boolean;
};

export interface LightboxTriggerProps extends useRender.ComponentProps<
  "button",
  LightboxTriggerState
> {
  /** Value of the item it opens, as returned by `itemToValue`. */
  value: LightboxItemValue;
  /**
   * Links a trigger placed outside `Lightbox.Root` to it, from
   * `Lightbox.createHandle()`.
   */
  handle?: LightboxHandle;
}

function subscribeToNothing(): () => void {
  return () => {};
}

function registerNothing(): () => void {
  return () => {};
}

/** The root of a trigger: its context, or the one its `handle` links to. */
function useLightboxTriggerRoot(
  handle: LightboxHandle | undefined,
): LightboxRootContextValue | null {
  const context = useLightboxRootContextOptional();
  const linked = React.useSyncExternalStore(
    handle?.subscribe ?? subscribeToNothing,
    () => handle?.getRoot() ?? null,
    () => null,
  );
  if (!handle && !context) {
    throw new Error(
      "Base UI: LightboxRootContext is missing. " +
        "Lightbox.Trigger must be placed within <Lightbox.Root>, " +
        "or be given the `handle` passed to <Lightbox.Root>.",
    );
  }
  return handle ? linked : context;
}

/**
 * Opens the viewer on one item. The image flies from the trigger to the
 * viewer and back. Put the thumbnail inside it, or lay it over the thumbnail.
 * It has `data-popup-open` while the viewer shows its item: hide it then,
 * keeping its space. When `value` matches no item, only the children render,
 * without the button. Renders a `<button>` element.
 */
export function LightboxTrigger(
  props: LightboxTriggerProps,
): React.ReactElement | null {
  const { value, handle, render, ref, children, ...elementProps } = props;

  const root = useLightboxTriggerRoot(handle);
  const index = root ? root.values.indexOf(value) : -1;
  const exists = !root || index !== -1;

  const registerRef = useLightboxElementRef(
    exists ? value : undefined,
    root?.registerTrigger ?? registerNothing,
  );
  const mergedRef = useMergedRefs(ref, registerRef);

  const pending = root?.pendingValue === value;
  const flying = root?.flyingValue === value;
  const disabled = (root?.pendingValue ?? null) !== null;
  const popupOpen =
    root !== null &&
    root.phase !== LightboxPhase.Closed &&
    root.activeValue === value;

  const state: LightboxTriggerState = React.useMemo(
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
      popupOpen: (isOpen) => (isOpen ? { "data-popup-open": "" } : null),
    },
    enabled: exists,
    props: mergeProps<"button">(
      {
        type: "button",
        "aria-label": root
          ? `Open image ${index + 1} of ${root.items.length}`
          : undefined,
        "aria-haspopup": "dialog",
        "aria-busy": pending || undefined,
        // Stays focusable while disabled, so focus isn't lost while loading.
        "aria-disabled": disabled || undefined,
        onClick: (event) => {
          if (disabled || !root) return;
          void root.openValue(value, event.currentTarget);
        },
        children,
      },
      elementProps,
    ),
  });

  // Nothing to open: still show the children (an avatar without a photo).
  if (!exists) return <>{children}</>;
  return element;
}
