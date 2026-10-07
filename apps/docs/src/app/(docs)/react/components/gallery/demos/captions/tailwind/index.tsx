'use client';
import * as React from 'react';
import { Gallery, useGalleryRootContext } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { CloseIcon } from '../../_viewer';
import { classes } from '../../_classes';

/** Tailwind classes of this demo. */
const local = {
  Panel: 'absolute inset-x-0 bottom-0 flex items-end gap-4 bg-linear-to-t from-black/75 to-transparent px-6 pt-12 pb-[calc(1.25rem+env(safe-area-inset-bottom))]',
  Position: 'text-[0.8125rem] text-neutral-400 tabular-nums',
  Description: 'm-0 flex flex-col gap-0.5 text-sm [&_span]:text-neutral-300',
};

export default function ExampleGalleryCaptions() {
  return (
    <Gallery.Root items={photos}>
      <div className={classes.row}>
        {photos.slice(0, 4).map((photo, index) => (
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
          <Gallery.Close className={`${classes.close} ${classes.control}`}>
            <CloseIcon />
          </Gallery.Close>
          <CaptionPanel />
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}

/**
 * A caption panel built from the active item. `Gallery.Description` links it to the
 * dialog for screen readers; its children replace the item's `caption`.
 */
function CaptionPanel() {
  const { activeItem, index, items } = useGalleryRootContext();
  if (!activeItem) {
    return null;
  }

  return (
    <div className={`${local.Panel} ${classes.control}`}>
      <span className={local.Position}>
        {index + 1} / {items.length}
      </span>
      <Gallery.Description className={local.Description}>
        <strong>{activeItem.caption ?? 'Untitled'}</strong>
        <span>{activeItem.alt}</span>
      </Gallery.Description>
    </div>
  );
}
