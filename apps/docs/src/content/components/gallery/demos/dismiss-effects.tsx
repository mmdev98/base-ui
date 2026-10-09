"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Backdrop:
    "fixed inset-0 bg-[rgb(10_10_20/calc(0.85*(1_-_var(--gallery-dismiss-progress,0))))] backdrop-blur-[calc(16px*(1_-_var(--gallery-dismiss-progress,0)))] transition-[background-color,backdrop-filter] duration-300 data-dragging:transition-none data-starting-style:bg-transparent data-starting-style:backdrop-blur-none data-ending-style:bg-transparent data-ending-style:backdrop-blur-none",
  SlideUp:
    "-translate-y-[calc(4rem*var(--gallery-dismiss-progress,0))] transition-[translate,opacity] duration-200 in-data-dragging:transition-none in-data-ending-style:opacity-0 in-data-starting-style:opacity-0",
  SlideDown:
    "translate-y-[calc(4rem*var(--gallery-dismiss-progress,0))] transition-[translate,opacity] duration-200 in-data-dragging:transition-none in-data-ending-style:opacity-0 in-data-starting-style:opacity-0",
};

/**
 * Drag the image down or up to close. `--gallery-dismiss-progress` goes from 0 to 1 on the
 * backdrop and the popup: here it fades and un-blurs the page, and slides the controls away.
 */
export default function ExampleGalleryDismissEffects() {
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
        <Gallery.Backdrop className={local.Backdrop} />
        <Gallery.Popup className={classes.popup}>
          <Gallery.Title className="sr-only">Photos</Gallery.Title>
          <Gallery.Viewport className={classes.viewport}>
            {(item, index) => (
              <Gallery.Item index={index} className={classes.item}>
                <Gallery.Image />
              </Gallery.Item>
            )}
          </Gallery.Viewport>
          <Gallery.Close className={`${classes.close} ${local.SlideUp}`}>
            <CloseIcon />
          </Gallery.Close>
          <div className={`${classes.bottom} ${local.SlideDown}`}>
            <Gallery.Value className={classes.caption} />
          </div>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
