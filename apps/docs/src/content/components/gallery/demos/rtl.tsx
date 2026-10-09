"use client";
import * as React from "react";
import { DirectionProvider } from "@logic-ui/react/direction-provider";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { ChevronIcon, CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/**
 * In a right-to-left layout the next photo is on the left: swipe right to go forward, and
 * ← shows the next photo. The viewer reads the direction from CSS. It is portaled to the end
 * of `<body>`, so set `dir` on `Gallery.Popup` itself.
 */
export default function ExampleGalleryRtl() {
  return (
    <DirectionProvider direction="rtl">
      <Gallery.Root items={photos}>
        <Gallery.List dir="rtl" className={classes.row}>
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
          <Gallery.Popup dir="rtl" className={classes.popup}>
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
              <Gallery.Toolbar className={classes.toolbar}>
                <Gallery.Previous className={classes.toolbarButton}>
                  <ChevronIcon direction="right" />
                </Gallery.Previous>
                <Gallery.Value className={classes.value} />
                <Gallery.Next className={classes.toolbarButton}>
                  <ChevronIcon direction="left" />
                </Gallery.Next>
              </Gallery.Toolbar>
            </div>
          </Gallery.Popup>
        </Gallery.Portal>
      </Gallery.Root>
    </DirectionProvider>
  );
}
