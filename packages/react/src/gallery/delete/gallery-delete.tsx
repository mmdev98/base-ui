"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Toolbar, type ToolbarButtonProps } from "@base-ui/react/toolbar";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { useGalleryToolbarContext } from "../toolbar/gallery-toolbar-context";
import type { GalleryItemData } from "../types";

export type GalleryDeleteState = {
  /** Whether `onDelete` is running. */
  pending: boolean;
};

export interface GalleryDeleteProps extends useRender.ComponentProps<
  "button",
  GalleryDeleteState
> {
  /**
   * Deletes the item. It confirms and reports errors itself; the button only
   * shows the pending state. Remove the item from `items` when it's done.
   */
  onDelete: (item: GalleryItemData) => Promise<unknown> | unknown;
}

/**
 * Deletes the active item through `onDelete`. Renders nothing when there is
 * no active item. Inside `Gallery.Toolbar` it is a toolbar button.
 * Renders a `<button>` element.
 */
export function GalleryDelete(
  props: GalleryDeleteProps,
): React.ReactElement | null {
  const { onDelete, render, ref, ...elementProps } = props;

  const { activeItem } = useGalleryRootContext();
  const [pending, startTransition] = React.useTransition();
  const toolbar = useGalleryToolbarContext();

  const state: GalleryDeleteState = React.useMemo(
    () => ({ pending }),
    [pending],
  );

  const buttonProps = mergeProps<"button">(
    {
      type: "button",
      "aria-label": "Delete",
      "aria-busy": pending || undefined,
      onClick: () => {
        if (!activeItem) return;
        startTransition(async () => {
          try {
            await onDelete(activeItem);
          } catch {
            // `onDelete` reports its own errors; the viewer stays open to retry.
          }
        });
      },
    },
    elementProps,
  );

  const element = useRender({
    defaultTagName: "button",
    render,
    ref,
    state,
    enabled: activeItem !== undefined && !toolbar,
    props: { ...buttonProps, disabled: pending },
  });

  if (!activeItem) return null;
  if (!toolbar) return element;
  return (
    <Toolbar.Button
      {...(buttonProps as ToolbarButtonProps)}
      ref={ref}
      render={render as ToolbarButtonProps["render"]}
      disabled={pending}
      data-pending={pending ? "" : undefined}
    />
  );
}
