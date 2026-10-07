'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { photos } from '../../_photos';
import { DemoViewer } from '../../_viewer';
import { classes } from '../../_classes';

/** A large panorama, worth zooming far into. */
const items = [photos[3]];

export default function ExampleGalleryMaxScale() {
  return (
    <Gallery.Root items={items} maxScale={8}>
      <Gallery.Trigger index={0} className={classes.button}>
        Open the panorama (up to 800%)
      </Gallery.Trigger>
      <DemoViewer
        toolbar={
          <Gallery.Toolbar className={classes.toolbar}>
            <Gallery.ZoomOut className={classes.toolbarButton}>−</Gallery.ZoomOut>
            <Gallery.ZoomValue className={classes.value} />
            <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
            <Gallery.ZoomReset className={classes.toolbarButton}>↺</Gallery.ZoomReset>
          </Gallery.Toolbar>
        }
      />
    </Gallery.Root>
  );
}
