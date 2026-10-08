"use client";

import { Toolbar, type ToolbarRootProps } from "@base-ui/react/toolbar";
import * as React from "react";
import {
  GalleryToolbarContext,
  type GalleryToolbarContextValue,
} from "./gallery-toolbar-context";

export type GalleryToolbarProps = ToolbarRootProps;

/**
 * Groups the viewer's actions. Arrow keys move between them, and the actions
 * inside (`Gallery.Previous`, `Gallery.ZoomIn`, `Gallery.Download` …) become
 * its buttons and links, disabled ones staying focusable.
 */
export function GalleryToolbar(props: GalleryToolbarProps): React.ReactElement {
  const { orientation = "horizontal" } = props;

  const contextValue: GalleryToolbarContextValue = React.useMemo(
    () => ({ vertical: orientation === "vertical" }),
    [orientation],
  );

  return (
    <GalleryToolbarContext value={contextValue}>
      <Toolbar.Root {...props} />
    </GalleryToolbarContext>
  );
}
