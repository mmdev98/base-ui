'use client';
import * as React from 'react';
import { Gallery, type GalleryItemData } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { ChevronIcon, DemoViewer } from '../../_viewer';
import { classes } from '../../_classes';

export default function ExampleGalleryDelete() {
  const [items, setItems] = React.useState(() => photos.slice(0, 5));

  /** Pretends to call an API, then removes the item. The viewer moves to its neighbour. */
  async function deleteItem(item: GalleryItemData) {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
    setItems((current) => current.filter(({ id }) => id !== item.id));
  }

  return (
    <div className={classes.stack}>
      <Gallery.Root items={items}>
        <div className={classes.row}>
          {items.length === 0 && <p className={classes.text}>Every photo was deleted.</p>}
          {items.map((photo, index) => (
            <Gallery.Trigger key={photo.id} index={index} className={classes.thumbnail}>
              <img src={getThumbnailSrc(photo)} alt="" className={classes.thumbnailImage} />
            </Gallery.Trigger>
          ))}
        </div>
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
              {/* Has `data-pending` while `onDelete` runs. */}
              <Gallery.Delete className={classes.toolbarButton} onDelete={deleteItem}>
                🗑
              </Gallery.Delete>
            </Gallery.Toolbar>
          }
        />
      </Gallery.Root>
      <button
        type="button"
        className={classes.button}
        disabled={items.length === 5}
        onClick={() => setItems(photos.slice(0, 5))}
      >
        Restore the photos
      </button>
    </div>
  );
}
