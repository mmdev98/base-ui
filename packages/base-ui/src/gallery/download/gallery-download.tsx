"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Toolbar, type ToolbarLinkProps } from "@base-ui/react/toolbar";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import { useGalleryToolbarContext } from "../toolbar/gallery-toolbar-context";

export type GalleryDownloadProps = useRender.ComponentProps<"a">;

/**
 * Downloads the active image: its `downloadUrl`, or else its `src`. Renders
 * nothing when there is no active item. Inside `Gallery.Toolbar` it is a
 * toolbar link. Renders an `<a>` element.
 */
export function GalleryDownload(
  props: GalleryDownloadProps,
): React.ReactElement | null {
  const { render, ref, ...elementProps } = props;

  const { activeItem } = useGalleryRootContext();
  const toolbar = useGalleryToolbarContext();

  const linkProps = mergeProps<"a">(
    {
      href: activeItem?.downloadUrl ?? activeItem?.src,
      download: "",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Download",
    },
    elementProps,
  );

  const element = useRender({
    defaultTagName: "a",
    render,
    ref,
    enabled: activeItem !== undefined && !toolbar,
    props: linkProps,
  });

  if (!activeItem) return null;
  if (!toolbar) return element;
  return (
    <Toolbar.Link
      {...(linkProps as ToolbarLinkProps)}
      ref={ref}
      render={render as ToolbarLinkProps["render"]}
    />
  );
}
