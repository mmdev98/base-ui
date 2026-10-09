"use client";

import { Dialog, type DialogDescriptionProps } from "@base-ui/react/dialog";
import * as React from "react";
import { useLightboxRootContext } from "../root/lightbox-root-context";

export interface LightboxDescriptionProps extends Omit<
  DialogDescriptionProps,
  "children"
> {
  /**
   * Content. A function receives the item shown in the viewer, as passed to
   * `items`, to show its caption: `{(photo) => photo.caption}`.
   */
  // The items can have any shape, like Base UI's `Combobox.List` children.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactNode | ((item: any) => React.ReactNode);
}

/**
 * Describes the item shown in the viewer, such as its caption, linked to the
 * viewer for screen readers. Renders nothing when its content is empty.
 * Renders a `<p>` element.
 */
export function LightboxDescription(
  props: LightboxDescriptionProps,
): React.ReactElement | null {
  const { children, ...elementProps } = props;

  const { activeItem } = useLightboxRootContext();
  let content: React.ReactNode = children as React.ReactNode;
  if (typeof children === "function")
    content = activeItem === undefined ? null : children(activeItem);

  if (content === undefined || content === null || content === "") return null;

  return <Dialog.Description {...elementProps}>{content}</Dialog.Description>;
}
