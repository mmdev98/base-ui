"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { Toolbar } from "@logic-ui/react/toolbar";
import { photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** A large panorama, worth zooming far into. */
const items = [photos[3]];

export default function ExampleLightboxMaxScale() {
  return (
    <Lightbox.Root items={items} maxScale={8}>
      <Lightbox.Trigger value={items[0].id} className={classes.button}>
        Open the panorama (up to 800%)
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
