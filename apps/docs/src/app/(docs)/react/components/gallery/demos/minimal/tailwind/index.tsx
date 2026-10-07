'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { classes } from '../../_classes';

const items = photos.slice(0, 3);

/** Only the parts a viewer needs: swipe, zoom and Esc still work. */
export default function ExampleGalleryMinimal() {
  return (
    <Gallery.Root items={items}>
      <div className={classes.row}>
        {items.map((photo, index) => (
          <Gallery.Trigger key={photo.id} index={index} className={classes.thumbnail}>
            <img src={getThumbnailSrc(photo)} alt="" className={classes.thumbnailImage} />
          </Gallery.Trigger>
        ))}
      </div>
      <Gallery.Portal>
        <Gallery.Backdrop className={classes.backdrop} />
        <Gallery.Popup className={classes.popup}>
          <Gallery.Title className="sr-only">Photos</Gallery.Title>
          <Gallery.Viewport className={classes.viewport}>
            {(item, index) => (
              <Gallery.Item index={index} className={classes.item}>
                <Gallery.Image />
              </Gallery.Item>
            )}
          </Gallery.Viewport>
          <Gallery.Close className={`${classes.close} ${classes.control}`}>✕</Gallery.Close>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
