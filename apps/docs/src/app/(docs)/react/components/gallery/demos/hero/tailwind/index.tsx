'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { ChevronIcon, CloseIcon } from '../../_viewer';
import { classes } from '../../_classes';

const items = photos.slice(0, 5);

export default function ExampleGallery() {
  return (
    <Gallery.Root items={items}>
      <Gallery.List limit={4} className={classes.row}>
        {items.map((photo, index) => (
          <Gallery.Trigger key={photo.id} index={index} className={classes.thumbnail}>
            <img src={getThumbnailSrc(photo)} alt="" className={classes.thumbnailImage} />
          </Gallery.Trigger>
        ))}
        <Gallery.More className={classes.thumbnail} />
      </Gallery.List>

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
          <Gallery.Close className={`${classes.close} ${classes.control}`}>
            <CloseIcon />
          </Gallery.Close>
          <div className={`${classes.bottom} ${classes.control}`}>
            <Gallery.Description className={classes.caption} />
            <Gallery.Toolbar className={classes.toolbar}>
              <Gallery.Previous className={classes.toolbarButton}>
                <ChevronIcon direction="left" />
              </Gallery.Previous>
              <Gallery.Value className={classes.value} />
              <Gallery.Next className={classes.toolbarButton}>
                <ChevronIcon direction="right" />
              </Gallery.Next>
              <Gallery.Separator className={classes.separator} />
              <Gallery.ZoomOut className={classes.toolbarButton}>−</Gallery.ZoomOut>
              <Gallery.ZoomValue className={classes.value} />
              <Gallery.ZoomIn className={classes.toolbarButton}>+</Gallery.ZoomIn>
            </Gallery.Toolbar>
          </div>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
