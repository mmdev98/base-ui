"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useClipboardRootContext } from "../root/clipboard-root-context";

export type ClipboardTriggerState = {
  /** Whether the value was just copied. */
  copied: boolean;
};

export type ClipboardTriggerProps = useRender.ComponentProps<
  "button",
  ClipboardTriggerState
>;

/**
 * A button that copies the value of `Clipboard.Root`.
 * Renders a `<button>` element.
 */
export function ClipboardTrigger(
  props: ClipboardTriggerProps,
): React.ReactElement {
  const { render, ref, ...elementProps } = props;
  const { copied, copy } = useClipboardRootContext();

  const state: ClipboardTriggerState = React.useMemo(
    () => ({ copied }),
    [copied],
  );

  return useRender({
    defaultTagName: "button",
    render,
    ref,
    state,
    props: mergeProps<"button">(
      {
        type: "button",
        onClick: () => {
          void copy();
        },
      },
      elementProps,
    ),
  });
}
