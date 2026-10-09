"use client";

import {
  ScrollArea as BaseScrollArea,
  type ScrollAreaRootProps,
  type ScrollAreaScrollbarProps,
  type ScrollAreaViewportProps,
} from "@logic-ui/react/scroll-area";
import { cn } from "cn";
import * as React from "react";

export interface ScrollAreaProps extends Omit<
  ScrollAreaRootProps,
  "className"
> {
  className?: string;
  /** Props of the element that scrolls (`className`, `ref`, `id`, `role` …). */
  viewportProps?: Omit<ScrollAreaViewportProps, "className"> & {
    className?: string;
  };
  /** Scrolls without showing a scrollbar. */
  hideScrollbar?: boolean;
  /**
   * Fades the content out at each edge while there is more to scroll that
   * way, hinting that the area scrolls.
   */
  fadeEdges?: boolean;
}

/** Base UI's `ScrollArea` with the docs' thin, auto-hiding scrollbars. */
export function ScrollArea(props: ScrollAreaProps): React.ReactElement {
  const {
    className,
    children,
    viewportProps,
    hideScrollbar = false,
    fadeEdges = false,
    ...rootProps
  } = props;
  const { className: viewportClassName, ...otherViewportProps } =
    viewportProps ?? {};

  return (
    <BaseScrollArea.Root
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden",
        className,
      )}
      {...rootProps}
    >
      <BaseScrollArea.Viewport
        className={cn(
          "flex size-full grow flex-col outline-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent",
          // Base UI sets the distance left to scroll towards each edge; each
          // fade grows with it up to 2rem, so it's gone once that edge is
          // reached. One mask layer per axis, intersected.
          fadeEdges && [
            "mask-[linear-gradient(to_bottom,transparent,black_min(2rem,var(--scroll-area-overflow-y-start,0px)),black_calc(100%-min(2rem,var(--scroll-area-overflow-y-end,0px))),transparent),linear-gradient(to_right,transparent,black_min(2rem,var(--scroll-area-overflow-x-start,0px)),black_calc(100%-min(2rem,var(--scroll-area-overflow-x-end,0px))),transparent)]",
            "mask-intersect",
          ],
          viewportClassName,
        )}
        {...otherViewportProps}
      >
        {/* Base UI measures again when this wrapper resizes, so the scrollbar
            follows content that grows. `min-w-0!` drops its `fit-content`
            minimum width, so wide content scrolls inside instead of widening
            the page. */}
        <BaseScrollArea.Content className="flex min-h-full min-w-0! shrink-0 flex-col">
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {hideScrollbar ? null : (
        <React.Fragment>
          <ScrollBar />
          <ScrollBar orientation="horizontal" />
        </React.Fragment>
      )}
    </BaseScrollArea.Root>
  );
}

/** A thin scrollbar, shown while the area is hovered or scrolled. */
export function ScrollBar(
  props: Omit<ScrollAreaScrollbarProps, "className"> & { className?: string },
): React.ReactElement {
  const { className, orientation = "vertical", ...scrollbarProps } = props;

  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "z-10 flex touch-none p-0.5 select-none print:hidden",
        "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2",
        "pointer-events-none opacity-0 transition-opacity duration-150",
        "data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0",
        className,
      )}
      {...scrollbarProps}
    >
      <BaseScrollArea.Thumb className="flex-1 rounded-full bg-line-strong transition-colors hover:bg-faint" />
    </BaseScrollArea.Scrollbar>
  );
}
