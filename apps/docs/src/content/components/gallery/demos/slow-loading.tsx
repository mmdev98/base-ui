"use client";
import * as React from "react";
import {
  Gallery,
  loadGalleryImage,
  type GalleryItemData,
} from "@mmdev98/base-ui-plus/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Spinner:
    'absolute inset-0 hidden bg-black/35 in-data-pending:block after:absolute after:inset-0 after:m-auto after:size-5 after:animate-spin after:rounded-full after:border-2 after:border-white/40 after:border-t-white after:content-[""]',
};

const items = photos.slice(0, 4);

/** Waits 1.5 seconds before loading, as on a slow network. */
async function loadImageSlowly(item: GalleryItemData) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  return loadGalleryImage(item);
}

export default function ExampleGallerySlowLoading() {
  return (
    <Gallery.Root items={items} loadImage={loadImageSlowly}>
      <Gallery.List className={classes.row}>
        {items.map((photo, index) => (
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
            <span className={local.Spinner} aria-hidden />
          </Gallery.Trigger>
        ))}
      </Gallery.List>
      <DemoViewer />
    </Gallery.Root>
  );
}
