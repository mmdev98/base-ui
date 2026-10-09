"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { ChevronIcon, DemoViewer } from "./_viewer";
import { classes } from "./_classes";

const zoomFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

export default function ExampleGalleryCustomValues() {
  return (
    <Gallery.Root items={photos}>
      <Gallery.List className={classes.row}>
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
      <DemoViewer
        toolbar={
          <Gallery.Toolbar className={classes.toolbar}>
            <Gallery.Previous className={classes.toolbarButton}>
              <ChevronIcon direction="left" />
            </Gallery.Previous>
            {/* A function child formats the position and the scale. */}
            <Gallery.Value className={classes.value}>
              {(state) => `Photo ${state.index + 1} of ${state.count}`}
            </Gallery.Value>
            <Gallery.Next className={classes.toolbarButton}>
              <ChevronIcon direction="right" />
            </Gallery.Next>
            <Gallery.Separator className={classes.separator} />
            <Gallery.ZoomOut className={classes.toolbarButton}>
              −
            </Gallery.ZoomOut>
            <Gallery.ZoomValue className={classes.value}>
              {(scale) => `${zoomFormat.format(scale)}×`}
            </Gallery.ZoomValue>
            <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
          </Gallery.Toolbar>
        }
      />
    </Gallery.Root>
  );
}
