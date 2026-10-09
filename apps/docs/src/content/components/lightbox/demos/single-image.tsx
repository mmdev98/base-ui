"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { Toolbar } from "@logic-ui/react/toolbar";
import { photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Avatar:
    "size-24 cursor-zoom-in overflow-hidden rounded-full border-2 border-white p-0 shadow-[0_0_0_1px] shadow-neutral-200 data-flying:invisible data-popup-open:invisible dark:border-neutral-950 dark:shadow-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white",
};

const avatar = [photos[1]];

export default function ExampleLightboxSingleImage() {
  return (
    <Lightbox.Root items={avatar}>
      <Lightbox.Trigger value={avatar[0].id} className={local.Avatar}>
        <img src={avatar[0].src} alt="" className={classes.thumbnailImage} />
      </Lightbox.Trigger>
      <DemoViewer
        toolbar={
          <Toolbar.Root className={classes.toolbar}>
            <Lightbox.ZoomOut
              render={<Toolbar.Button />}
              className={classes.toolbarButton}
            >
              −
            </Lightbox.ZoomOut>
            <Lightbox.ZoomValue className={classes.value} />
            <Lightbox.ZoomIn
              render={<Toolbar.Button />}
              className={classes.toolbarButton}
            >
              +
            </Lightbox.ZoomIn>
            <Lightbox.ZoomReset
              render={<Toolbar.Button />}
              className={classes.toolbarButton}
            >
              ↺
            </Lightbox.ZoomReset>
          </Toolbar.Root>
        }
      />
    </Lightbox.Root>
  );
}
