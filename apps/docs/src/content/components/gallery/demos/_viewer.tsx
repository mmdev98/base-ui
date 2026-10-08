"use client";
import * as React from "react";
import { Gallery } from "@mmdev98/base-ui/gallery";
import { classes } from "./_classes";

/**
 * The standard viewer of the demos: the images, a close button, the caption and a toolbar.
 * Demos that are about something else render it so they can focus on that.
 */
export function DemoViewer(props: { toolbar?: React.ReactNode }) {
  const { toolbar } = props;

  return (
    <Gallery.Portal>
      <Gallery.Backdrop className={classes.backdrop} />
      <Gallery.Popup className={classes.popup}>
        <Gallery.Title className="sr-only">Photos</Gallery.Title>
        <Gallery.Viewport className={classes.viewport}>
          {(item, index) => (
            <Gallery.Item index={index} className={classes.item}>
              <Gallery.Image />
            </Gallery.Item>
          )}
        </Gallery.Viewport>
        <Gallery.Close className={`${classes.close} ${classes.control}`}>
          <CloseIcon />
        </Gallery.Close>
        <div className={`${classes.bottom} ${classes.control}`}>
          <Gallery.Description className={classes.caption} />
          {toolbar ?? (
            <Gallery.Toolbar className={classes.toolbar}>
              <Gallery.Previous className={classes.toolbarButton}>
                <ChevronIcon direction="left" />
              </Gallery.Previous>
              <Gallery.Value className={classes.value} />
              <Gallery.Next className={classes.toolbarButton}>
                <ChevronIcon direction="right" />
              </Gallery.Next>
              <Gallery.Separator className={classes.separator} />
              <Gallery.ZoomOut className={classes.toolbarButton}>
                −
              </Gallery.ZoomOut>
              <Gallery.ZoomValue className={classes.value} />
              <Gallery.ZoomIn className={classes.toolbarButton}>
                +
              </Gallery.ZoomIn>
            </Gallery.Toolbar>
          )}
        </div>
      </Gallery.Popup>
    </Gallery.Portal>
  );
}

export function CloseIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M4 4 12 12M12 4 4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronIcon(
  props: React.ComponentProps<"svg"> & { direction: "left" | "right" },
) {
  const { direction, ...svgProps } = props;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...svgProps}
    >
      <path
        d={direction === "left" ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
