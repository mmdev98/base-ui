"use client";

import { Separator, type SeparatorProps } from "@base-ui/react/separator";
import { Toolbar } from "@base-ui/react/toolbar";
import * as React from "react";
import { useGalleryToolbarContext } from "../toolbar/gallery-toolbar-context";

export type GallerySeparatorProps = SeparatorProps;

/**
 * Divides groups of actions. Inside `Gallery.Toolbar` it is a toolbar
 * separator, oriented across the toolbar. Renders a `<div>` element.
 */
export function GallerySeparator(
  props: GallerySeparatorProps,
): React.ReactElement {
  const toolbar = useGalleryToolbarContext();

  if (toolbar) return <Toolbar.Separator {...props} />;
  return <Separator {...props} />;
}
