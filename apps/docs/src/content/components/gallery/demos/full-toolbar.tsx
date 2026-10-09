"use client";
import * as React from "react";
import { Gallery } from "@logic-ui/react/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { ChevronIcon, DemoViewer } from "./_viewer";
import { classes } from "./_classes";

export default function ExampleGalleryFullToolbar() {
  return (
    <Gallery.Root items={photos}>
      <Gallery.List limit={4} className={classes.row}>
        {photos.map((photo, index) => (
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
        <Gallery.More className={classes.thumbnail} />
      </Gallery.List>
      <DemoViewer
        toolbar={
          <Gallery.Toolbar className={classes.toolbar}>
            <Gallery.Previous className={classes.toolbarButton}>
              <ChevronIcon direction="left" />
            </Gallery.Previous>
            <Gallery.Value className={classes.value} />
            <Gallery.Next className={classes.toolbarButton}>
              <ChevronIcon direction="right" />
            </Gallery.Next>
            <Gallery.Separator className={classes.separator} />
            <Gallery.ZoomOut className={classes.toolbarButton}>
              −
            </Gallery.ZoomOut>
            <Gallery.ZoomValue className={classes.value} />
            <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
            <Gallery.ZoomReset className={classes.toolbarButton}>
              ↺
            </Gallery.ZoomReset>
          </Gallery.Toolbar>
        }
      />
    </Gallery.Root>
  );
}
