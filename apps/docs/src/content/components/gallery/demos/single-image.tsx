"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Avatar:
    "size-24 cursor-zoom-in overflow-hidden rounded-full border-2 border-white p-0 shadow-[0_0_0_1px] shadow-neutral-200 data-flying:invisible data-popup-open:invisible dark:border-neutral-950 dark:shadow-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white",
};

const avatar = [photos[1]];

export default function ExampleGallerySingleImage() {
  return (
    <Gallery.Root items={avatar}>
      <Gallery.Trigger index={0} className={local.Avatar}>
        <img src={avatar[0].src} alt="" className={classes.thumbnailImage} />
      </Gallery.Trigger>
      <DemoViewer
        toolbar={
          <Gallery.Toolbar className={classes.toolbar}>
            <Gallery.ZoomOut className={classes.toolbarButton}>
              −
            </Gallery.ZoomOut>
            <Gallery.ZoomValue className={classes.value} />
            <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
            <Gallery.ZoomReset className={classes.toolbarButton}>
              ↺
            </Gallery.ZoomReset>
          </Gallery.Toolbar>
        }
      />
    </Gallery.Root>
  );
}
