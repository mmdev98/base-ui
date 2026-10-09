"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Grid: "grid w-full max-w-lg grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-1.5",
  Cell: "group aspect-square cursor-zoom-in overflow-hidden rounded border-none bg-neutral-100 p-0 data-flying:invisible data-popup-open:invisible dark:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white [&_img]:transition-[scale] [&_img]:duration-200 hover:[&_img]:scale-105",
};

export default function ExampleLightboxGrid() {
  return (
    <Lightbox.Root items={photos}>
      <div className={local.Grid}>
        {photos.map((photo) => (
          <Lightbox.Trigger
            key={photo.id}
            value={photo.id}
            className={local.Cell}
          >
            <img
              src={getThumbnailSrc(photo)}
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
