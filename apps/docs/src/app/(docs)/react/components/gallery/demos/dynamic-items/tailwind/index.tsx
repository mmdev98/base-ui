'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { DemoViewer } from '../../_viewer';
import { classes } from '../../_classes';

export default function ExampleGalleryDynamicItems() {
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
      <Gallery.Root items={items}>
        <div className={classes.row}>
          {items.length === 0 && <p className={classes.text}>No photos yet.</p>}
          {items.map((photo, index) => (
            <Gallery.Trigger key={photo.id} index={index} className={classes.thumbnail}>
              <img src={getThumbnailSrc(photo)} alt="" className={classes.thumbnailImage} />
            </Gallery.Trigger>
          ))}
        </div>
        <DemoViewer />
      </Gallery.Root>
    </div>
  );
}
