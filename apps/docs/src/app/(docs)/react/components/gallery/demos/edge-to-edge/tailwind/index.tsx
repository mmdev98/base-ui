'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { CloseIcon } from '../../_viewer';
import { classes } from '../../_classes';

/** Tailwind classes of this demo. */
const local = {
  Viewport:
    'absolute inset-0 cursor-zoom-in gap-x-2 in-data-zoomed:cursor-grab data-dragging:cursor-grabbing',
  Item: 'p-0',
  TopBar: 'absolute inset-x-0 top-0 flex items-center justify-between bg-black/55 px-2 pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] backdrop-blur-md',
  BottomBar: 'absolute inset-x-0 bottom-0 flex min-h-12 items-center justify-center bg-black/55 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md',
  Title: 'text-[0.9375rem] font-semibold tabular-nums',
  Caption: 'm-0 text-sm',
  BarButton: 'flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-lg text-inherit no-underline',
};

/**
 * Like a phone's photo app: the image fills the screen width, and a tap hides the bars.
 * Try it on a phone, or with the browser's device toolbar.
 */
export default function ExampleGalleryEdgeToEdge() {
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
          <Gallery.Viewport className={local.Viewport}>
            {(item, index) => (
              <Gallery.Item index={index} className={local.Item}>
                <Gallery.Image />
              </Gallery.Item>
            )}
          </Gallery.Viewport>
          <header className={`${local.TopBar} ${classes.control}`}>
            <Gallery.Close className={local.BarButton}>
              <CloseIcon />
            </Gallery.Close>
            <Gallery.Value className={local.Title} />
            <Gallery.Download className={local.BarButton}>⤓</Gallery.Download>
          </header>
          <footer className={`${local.BottomBar} ${classes.control}`}>
            <Gallery.Description className={local.Caption} />
          </footer>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
