"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

const items = photos.slice(0, 5);

export default function ExampleGalleryControlled() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <div className={classes.stack}>
      <div className={classes.row}>
        <button
          type="button"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          Open the viewer
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => {
            setIndex(items.length - 1);
            setOpen(true);
          }}
        >
          Open the last photo
        </button>
      </div>
      <p className={classes.text}>
        {open ? "Open" : "Closed"} on photo {index + 1} of {items.length}
      </p>
      <Gallery.Root
        items={items}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
      >
        <Gallery.List className={classes.row}>
          {items.map((photo, photoIndex) => (
            <Gallery.Trigger
              key={photo.id}
              index={photoIndex}
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
        <DemoViewer />
      </Gallery.Root>
    </div>
  );
}
