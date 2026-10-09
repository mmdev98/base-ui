"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Image:
    "opacity-0 blur-md transition-[opacity,filter] duration-400 data-visible:opacity-100 data-visible:blur-none",
};

/** Items without `width` and `height`: the size is only known once the image loads. */
const items = photos.map((photo) => ({
  ...photo,
  width: undefined,
  height: undefined,
}));

export default function ExampleGalleryFadeInImages() {
  return (
    <Gallery.Root items={items}>
      <Gallery.List className={classes.row}>
        {items.slice(0, 4).map((photo, index) => (
          <Gallery.Trigger
            key={photo.id}
            index={index}
            className={classes.thumbnail}
          >
            <img
              src={getThumbnailSrc(photos[index])}
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
                {/* `render` receives the state: fade the image in once it has loaded. */}
                <Gallery.Image
                  render={(props, state) => (
                    <img
                      {...props}
                      className={local.Image}
                      data-visible={state.loaded || undefined}
                    />
                  )}
                />
              </Gallery.Item>
            )}
          </Gallery.Viewport>
          <Gallery.Close className={`${classes.close} ${classes.control}`}>
            <CloseIcon />
          </Gallery.Close>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
