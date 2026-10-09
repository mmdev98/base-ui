"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Layout:
    "grid w-full max-w-lg grid-cols-[2fr_1fr_1fr] grid-rows-[repeat(2,7rem)] gap-1.5 overflow-hidden rounded-xl",
  Tile: "cursor-zoom-in overflow-hidden border-none bg-neutral-100 p-0 data-featured:row-span-2 data-flying:invisible data-popup-open:invisible focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-950 dark:bg-neutral-900",
};

const items = photos.slice(0, 5);

export default function ExampleLightboxFeatured() {
  return (
    <Lightbox.Root items={items}>
      <div className={local.Layout}>
        {items.map((photo, index) => (
          <Lightbox.Trigger
            key={photo.id}
            value={photo.id}
            className={local.Tile}
            data-featured={index === 0 || undefined}
          >
            <img
              src={index === 0 ? photo.src : getThumbnailSrc(photo)}
              alt=""
              className={classes.thumbnailImage}
            />
          </Lightbox.Trigger>
        ))}
      </div>
      <DemoViewer />
    </Lightbox.Root>
  );
}
