"use client";
import * as React from "react";
import { Lightbox, type LightboxItemValue } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

const items = photos.slice(0, 5);

export default function ExampleLightboxControlled() {
  // The open photo's id, or `null` while the viewer is closed.
  const [value, setValue] = React.useState<LightboxItemValue | null>(null);
  const openPhoto = items.find((photo) => photo.id === value);

  return (
    <div className={classes.stack}>
      <div className={classes.row}>
        <button
          type="button"
          className={classes.button}
          onClick={() => setValue(items[0].id)}
        >
          Open the viewer
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => setValue(items[items.length - 1].id)}
        >
          Open the last photo
        </button>
      </div>
      <p className={classes.text}>
        {openPhoto ? `Showing “${openPhoto.alt}”` : "Closed"}
      </p>
      <Lightbox.Root items={items} value={value} onValueChange={setValue}>
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
