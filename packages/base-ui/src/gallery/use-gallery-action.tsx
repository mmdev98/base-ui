"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Toolbar, type ToolbarButtonProps } from "@base-ui/react/toolbar";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryToolbarContext } from "./toolbar/gallery-toolbar-context";

export type GalleryActionState = {
  /** Whether the action can't run now (no previous item, zoom at its limit …). */
  disabled: boolean;
};

export type GalleryActionProps = useRender.ComponentProps<
  "button",
  GalleryActionState
>;

export interface UseGalleryActionOptions {
  props: GalleryActionProps;
  disabled: boolean;
  onAction: () => void;
  /** Default `aria-label`; the caller's wins. */
  label: string;
  /** Key announced with `aria-keyshortcuts`. */
  shortcut?: string;
}

/**
 * Renders a viewer action that runs `onAction`: a `<button>`, or a Base UI
 * `Toolbar.Button` inside `Gallery.Toolbar`, which keeps a disabled action
 * focusable for the arrow keys.
 */
export function useGalleryAction(
  options: UseGalleryActionOptions,
): React.ReactElement {
  const { props, disabled, onAction, label, shortcut } = options;
  const { render, ref, ...elementProps } = props;

  const toolbar = useGalleryToolbarContext();

  const state: GalleryActionState = React.useMemo(
    () => ({ disabled }),
    [disabled],
  );

  const actionProps = mergeProps<"button">(
    {
      type: "button",
      "aria-label": label,
      "aria-keyshortcuts": shortcut,
      onClick: onAction,
    },
    elementProps,
  );

  const element = useRender({
    defaultTagName: "button",
    render,
    ref,
    state,
    enabled: !toolbar,
    props: { ...actionProps, disabled },
  });

  // `enabled` makes `element` null only inside a toolbar.
  if (!toolbar && element) return element;
  return (
    <Toolbar.Button
      {...(actionProps as ToolbarButtonProps)}
      ref={ref}
      // Both states have `disabled`, the only field the actions expose.
      render={render as ToolbarButtonProps["render"]}
      disabled={disabled}
    />
  );
}
