'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { CloseIcon } from '../../_viewer';
import { classes } from '../../_classes';

/** Tailwind classes of this demo. */
const local = {
  Legend: 'absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(1rem+env(safe-area-inset-left))] m-0 flex flex-col gap-1.5 rounded-xl bg-neutral-900/85 px-4 py-3 text-[0.8125rem] pointer-coarse:hidden',
  Row: 'flex items-center gap-3 [&_dd]:m-0 [&_dd]:text-neutral-300 [&_dt]:flex [&_dt]:min-w-18 [&_dt]:gap-1',
  Key: 'min-w-5 rounded border border-white/25 px-1.5 py-px text-center font-[inherit]',
};

const shortcuts = [
  ['← →', 'Previous / next'],
  ['+ −', 'Zoom'],
  ['0', 'Reset zoom'],
  ['Home End', 'First / last'],
  ['Esc', 'Close'],
];

export default function ExampleGalleryKeyboardHints() {
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
          <dl className={`${local.Legend} ${classes.control}`}>
            {shortcuts.map(([keys, action]) => (
              <div key={keys} className={local.Row}>
                <dt>
                  {keys.split(' ').map((key) => (
                    <kbd key={key} className={local.Key}>
                      {key}
                    </kbd>
                  ))}
                </dt>
                <dd>{action}</dd>
              </div>
            ))}
          </dl>
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}
