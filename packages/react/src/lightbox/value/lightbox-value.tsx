"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useLightboxRootContext } from "../root/lightbox-root-context";

export type LightboxValueState = {
  /** Index of the active item. */
  index: number;
  /** Number of items. */
  count: number;
};

export interface LightboxValueProps extends Omit<
  useRender.ComponentProps<"span", LightboxValueState>,
  "children"
> {
  /**
   * Content. A function receives the state, to format it.
   * @default `${index + 1} / ${count}`
   */
  children?: React.ReactNode | ((state: LightboxValueState) => React.ReactNode);
}

/**
 * Position of the active item, as "2 / 5". Announced to screen readers when
 * it changes. Renders a `<span>` element.
 */
export function LightboxValue(props: LightboxValueProps): React.ReactElement {
  const { children, render, ref, ...elementProps } = props;

  const { index, items } = useLightboxRootContext();
  const count = items.length;

  const state: LightboxValueState = React.useMemo(
    () => ({ index, count }),
    [index, count],
  );

  return useRender({
    defaultTagName: "span",
    render,
    ref,
    state,
    stateAttributesMapping: { index: () => null, count: () => null },
    props: mergeProps<"span">(
      {
        "aria-live": "polite",
        children:
          typeof children === "function"
            ? children(state)
            : (children ?? `${index + 1} / ${count}`),
      },
      elementProps,
    ),
  });
}
