"use client";
import * as React from "react";
import { Gallery, useGalleryRootContext } from "@mmdev98/base-ui-plus/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

export default function ExampleGalleryOpenFromAnywhere() {
  return (
    <Gallery.Root items={photos}>
      <div className={classes.stack}>
        <Gallery.List className={classes.row}>
          {photos.slice(0, 3).map((photo, index) => (
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
        <ViewAllButton />
      </div>
      <DemoViewer />
    </Gallery.Root>
  );
}

/** Any component inside `Gallery.Root` can open the viewer through the context. */
function ViewAllButton() {
  const { items, openAt, pendingIndex } = useGalleryRootContext();

  return (
    <button
      type="button"
      className={classes.button}
      disabled={pendingIndex !== null}
      // Without a trigger to fly from, the image fades in.
      onClick={() => openAt(0)}
    >
      View all {items.length} photos
    </button>
  );
}
