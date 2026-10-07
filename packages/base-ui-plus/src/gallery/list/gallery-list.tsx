"use client";

import { useRender } from "@base-ui/react/use-render";
import { useControlled } from "@base-ui/utils/useControlled";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import * as React from "react";
import { useGalleryRootContext } from "../root/gallery-root-context";
import {
  GalleryListContext,
  type GalleryListContextValue,
} from "./gallery-list-context";

export type GalleryListState = {
  /** Whether all the triggers are shown. */
  expanded: boolean;
};

export interface GalleryListProps extends useRender.ComponentProps<
  "div",
  GalleryListState
> {
  /**
   * Most places shown, `Gallery.More` included. Beyond it, the triggers after
   * `limit - 1` render nothing and `Gallery.More` shows the rest. Shows every
   * item when unset.
   */
  limit?: number;
  /** Whether all the triggers are shown, ignoring `limit`. */
  expanded?: boolean;
  /**
   * Whether all the triggers are shown at first, when `expanded` is not controlled.
   * @default false
   */
  defaultExpanded?: boolean;
  /** Called when `Gallery.More` shows all the triggers. */
  onExpandedChange?: (expanded: boolean) => void;
}

/**
 * Groups the triggers of a gallery and hides the ones past `limit` behind
 * `Gallery.More`. Place one `Gallery.Trigger` per item and a `Gallery.More`
 * inside it. Renders a `<div>` element.
 */
export function GalleryList(props: GalleryListProps): React.ReactElement {
  const {
    limit,
    expanded: expandedProp,
    defaultExpanded = false,
    onExpandedChange,
    render,
    ref,
    ...elementProps
  } = props;

  const { items } = useGalleryRootContext();
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: "Gallery.List",
    state: "expanded",
  });

  const expand = useStableCallback(() => {
    if (expanded) return;
    setExpandedState(true);
    onExpandedChange?.(true);
  });

  const collapsed =
    !expanded && limit !== undefined && limit > 0 && items.length > limit;
  const visibleCount = collapsed ? limit - 1 : items.length;

  const contextValue: GalleryListContextValue = React.useMemo(
    () => ({
      visibleCount,
      hiddenItems: items.slice(visibleCount),
      expanded,
      expand,
    }),
    [visibleCount, items, expanded, expand],
  );

  const state: GalleryListState = React.useMemo(
    () => ({ expanded }),
    [expanded],
  );

  const element = useRender({
    defaultTagName: "div",
    render,
    ref,
    state,
    props: elementProps,
  });

  return (
    <GalleryListContext value={contextValue}>{element}</GalleryListContext>
  );
}
