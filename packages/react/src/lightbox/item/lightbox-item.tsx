"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import { useLightboxRootContext } from "../root/lightbox-root-context";
import { LightboxImageStatus } from "../types";
import {
  useLightboxViewportContext,
  useLightboxViewportItemContext,
} from "../viewport/lightbox-viewport-context";
import {
  LightboxItemContext,
  type LightboxItemContextValue,
} from "./lightbox-item-context";

export type LightboxItemState = {
  /** Whether it is the item shown in the viewer. */
  active: boolean;
  /** Whether its `Lightbox.Image` is loading. */
  loading: boolean;
  /** Whether its `Lightbox.Image` failed to load. */
  error: boolean;
};

export type LightboxItemProps = useRender.ComponentProps<
  "div",
  LightboxItemState
>;

/**
 * One slide of the viewport, as large as the viewport. Return it from the
 * function passed to `Lightbox.Viewport`. Its padding is the space kept
 * around the image (`p-6 md:p-24`, or `p-0` for edge to edge). Put a
 * `Lightbox.Image` inside, or any other content.
 * Renders a `<div>` element.
 */
export function LightboxItem(
  props: LightboxItemProps,
): React.ReactElement | null {
  const { render, ref, children, ...elementProps } = props;

  const { items, values, index: activeIndex } = useLightboxRootContext();
  const { width, gap, directionSign } = useLightboxViewportContext();
  const { index, position } = useLightboxViewportItemContext();
  const [element, setElement] = React.useState<HTMLElement | null>(null);
  const [status, setStatus] = React.useState(LightboxImageStatus.Idle);
  const handleElement = React.useCallback(
    (node: HTMLElement | null) => setElement(node),
    [],
  );
  const mergedRef = useMergedRefs(ref, handleElement);

  const item: unknown = items[index];
  const value = values[index];
  const active = index === activeIndex;

  const contextValue: LightboxItemContextValue | null = React.useMemo(
    () =>
      value === undefined
        ? null
        : { item, value, index, active, element, status, setStatus },
    [item, value, index, active, element, status],
  );

  const state: LightboxItemState = React.useMemo(
    () => ({
      active,
      loading: status === LightboxImageStatus.Loading,
      error: status === LightboxImageStatus.Error,
    }),
    [active, status],
  );

  const rendered = useRender({
    defaultTagName: "div",
    render,
    ref: mergedRef,
    state,
    enabled: contextValue !== null,
    props: mergeProps<"div">(
      {
        role: "group",
        "aria-roledescription": "slide",
        "aria-label": `${index + 1} of ${items.length}`,
        "aria-hidden": active ? undefined : true,
        "aria-busy": state.loading || undefined,
        style: {
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          transform: `translate3d(${position * (width + gap) * directionSign}px, 0px, 0px)`,
        },
        children,
      },
      elementProps,
    ),
  });

  if (!contextValue) return null;
  return (
    <LightboxItemContext value={contextValue}>{rendered}</LightboxItemContext>
  );
}
