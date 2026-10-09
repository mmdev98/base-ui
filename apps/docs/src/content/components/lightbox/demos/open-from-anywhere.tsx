"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Links the triggers in the page to the lightbox, wherever they are. */
const lightbox = Lightbox.createHandle();

export default function ExampleLightboxOpenFromAnywhere() {
  return (
    <div className={classes.stack}>
      {/* Outside `Lightbox.Root`: the handle links each trigger to it. */}
      <div className={classes.row}>
        {photos.slice(0, 3).map((photo) => (
          <Lightbox.Trigger
            key={photo.id}
            handle={lightbox}
            value={photo.id}
            className={classes.thumbnail}
          >
            <img
              src={getThumbnailSrc(photo)}
              alt=""
              className={classes.thumbnailImage}
            />
          </Lightbox.Trigger>
        ))}
      </div>
      {/* Without a trigger to fly from, the image fades in. */}
      <button
        type="button"
        className={classes.button}
        onClick={() => lightbox.open(photos[0].id)}
      >
        View all {photos.length} photos
      </button>

      <Lightbox.Root handle={lightbox} items={photos}>
        <DemoViewer />
      </Lightbox.Root>
    </div>
  );
}
