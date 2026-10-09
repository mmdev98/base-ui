"use client";
import * as React from "react";
import { Lightbox } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

export default function ExampleLightboxDynamicItems() {
  const [count, setCount] = React.useState(2);
  const items = photos.slice(0, count);

  return (
    <div className={classes.stack}>
      <div className={classes.row}>
        <button
          type="button"
          className={classes.button}
          disabled={count === photos.length}
          onClick={() => setCount((current) => current + 1)}
        >
          Add a photo
        </button>
        <button
          type="button"
          className={classes.button}
          disabled={count === 0}
          onClick={() => setCount((current) => current - 1)}
        >
          Remove the last
        </button>
      </div>
      <Lightbox.Root items={items}>
        {items.length === 0 && <p className={classes.text}>No photos yet.</p>}
        <div className={classes.row}>
          {items.map((photo) => (
            <Lightbox.Trigger
              key={photo.id}
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
        <DemoViewer />
      </Lightbox.Root>
    </div>
  );
}
