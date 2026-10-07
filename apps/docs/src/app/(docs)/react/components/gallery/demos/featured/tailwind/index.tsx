'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { DemoViewer } from '../../_viewer';
import { classes } from '../../_classes';

/** Tailwind classes of this demo. */
const local = {
  Layout: 'grid w-full max-w-lg grid-cols-[2fr_1fr_1fr] grid-rows-[repeat(2,7rem)] gap-1.5 overflow-hidden rounded-xl',
  Tile: 'cursor-zoom-in overflow-hidden border-none bg-neutral-100 p-0 data-featured:row-span-2 data-flying:invisible data-popup-open:invisible focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-950 dark:bg-neutral-900',
};

const items = photos.slice(0, 5);

export default function ExampleGalleryFeatured() {
  return (
    <Gallery.Root items={items}>
      <div className={local.Layout}>
        {items.map((photo, index) => (
          <Gallery.Trigger
            key={photo.id}
            index={index}
            className={local.Tile}
            data-featured={index === 0 || undefined}
          >
            <img
              src={index === 0 ? photo.src : getThumbnailSrc(photo)}
              alt=""
              className={classes.thumbnailImage}
            />
          </Gallery.Trigger>
        ))}
      </div>
      <DemoViewer />
    </Gallery.Root>
  );
}
