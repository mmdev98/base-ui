"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Vertical:
    "absolute top-1/2 right-[calc(0.75rem+env(safe-area-inset-right))] -translate-y-1/2 flex-col",
  Separator: "my-1 h-px w-4 bg-white/20",
};

export default function ExampleGalleryVerticalToolbar() {
  return (
    <Gallery.Root items={photos}>
      <Gallery.List className={classes.row}>
        {photos.slice(0, 4).map((photo, index) => (
          <Gallery.Trigger
            key={photo.id}
            index={index}
            className={classes.thumbnail}
          >
            <img
              src={getThumbnailSrc(photo)}
              alt=""
              className={classes.thumbnailImage}
            />
          </Gallery.Trigger>
        ))}
      </Gallery.List>
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
          {/* ↑ ↓ move between the actions of a vertical toolbar. */}
          <Gallery.Toolbar
            orientation="vertical"
            className={`${classes.toolbar} ${local.Vertical} ${classes.control}`}
          >
            <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
            <Gallery.ZoomValue className={classes.value} />
            <Gallery.ZoomOut className={classes.toolbarButton}>
              −
            </Gallery.ZoomOut>
            <Gallery.Separator className={local.Separator} />
            <Gallery.ZoomReset className={classes.toolbarButton}>
              ↺
            </Gallery.ZoomReset>
          </Gallery.Toolbar>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
