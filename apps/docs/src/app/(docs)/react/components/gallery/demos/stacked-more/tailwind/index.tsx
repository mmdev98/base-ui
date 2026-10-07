'use client';
import * as React from 'react';
import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { getThumbnailSrc, photos } from '../../_photos';
import { DemoViewer } from '../../_viewer';
import { classes } from '../../_classes';

/** Tailwind classes of this demo. */
const local = {
  Stack: 'group relative size-18 cursor-pointer rounded-lg border-none bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white focus-visible:outline-offset-6',
  Card: 'absolute inset-0 size-full rounded-lg border-2 border-white object-cover blur-[1px] transition-[translate,rotate] duration-200 data-[card=0]:z-3 data-[card=1]:z-2 data-[card=1]:translate-x-1.5 data-[card=1]:translate-y-0.5 data-[card=1]:rotate-4 group-hover:data-[card=1]:translate-x-2 group-hover:data-[card=1]:rotate-6 data-[card=2]:z-1 data-[card=2]:translate-x-3 data-[card=2]:translate-y-1 data-[card=2]:rotate-8 group-hover:data-[card=2]:translate-x-4 group-hover:data-[card=2]:rotate-12',
  Count: 'absolute inset-0 z-4 flex items-center justify-center rounded-lg bg-black/45 text-sm font-bold text-white',
};

export default function ExampleGalleryStackedMore() {
  return (
    <Gallery.Root items={photos}>
      <Gallery.List limit={3} className={classes.row}>
        {photos.map((photo, index) => (
          <Gallery.Trigger key={photo.id} index={index} className={classes.thumbnail}>
            <img src={getThumbnailSrc(photo)} alt="" className={classes.thumbnailImage} />
          </Gallery.Trigger>
        ))}
        {/* The hidden photos come with the state, to draw them as a pile of cards. */}
        <Gallery.More className={local.Stack}>
          {(state) => (
            <React.Fragment>
              {state.hiddenItems.slice(0, 3).map((photo, cardIndex) => (
                <img
                  key={photo.id}
                  src={getThumbnailSrc(photo)}
                  alt=""
                  className={local.Card}
                  data-card={cardIndex}
                />
              ))}
              <span className={local.Count}>+{state.hiddenCount}</span>
            </React.Fragment>
          )}
        </Gallery.More>
      </Gallery.List>
      <DemoViewer />
    </Gallery.Root>
  );
}
