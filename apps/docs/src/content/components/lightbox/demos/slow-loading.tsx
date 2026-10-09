"use client";
import * as React from "react";
import { Lightbox, loadLightboxImage } from "@logic-ui/react/lightbox";
import { getThumbnailSrc, photos, type Photo } from "./_photos";
import { CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Spinner:
    'absolute inset-0 hidden bg-black/35 in-data-pending:block after:absolute after:inset-0 after:m-auto after:size-5 after:animate-spin after:rounded-full after:border-2 after:border-white/40 after:border-t-white after:content-[""]',
  Loading:
    "absolute inset-0 m-auto size-8 animate-spin rounded-full border-2 border-white/30 border-t-white",
  Fallback:
    "absolute inset-0 flex flex-col items-center justify-center gap-1 text-sm text-neutral-300",
  Broken: "flex size-full items-center justify-center text-xs text-neutral-500",
};

/** The last photo's URL is broken, to show `Lightbox.Fallback`. */
const items: Photo[] = [
  ...photos.slice(0, 3),
  {
    id: "missing",
    src: "https://picsum.photos/id/0/missing.jpg",
    alt: "A photo that no longer exists",
  },
];

/** Waits 1.5 seconds before loading, as on a slow network. */
async function loadImageSlowly(photo: Photo) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  return loadLightboxImage(photo);
}

export default function ExampleLightboxSlowLoading() {
  return (
    <Lightbox.Root items={items} loadImage={loadImageSlowly}>
      <div className={classes.row}>
        {items.map((photo) => (
          <Lightbox.Trigger
            key={photo.id}
            value={photo.id}
            className={classes.thumbnail}
          >
            {photo.id === "missing" ? (
              <span className={local.Broken}>?</span>
            ) : (
              <img
                src={getThumbnailSrc(photo)}
                alt=""
                className={classes.thumbnailImage}
              />
            )}
            {/* Shown while the trigger has `data-pending`. */}
            <span className={local.Spinner} aria-hidden />
          </Lightbox.Trigger>
        ))}
      </div>
      <Lightbox.Portal>
        <Lightbox.Backdrop className={classes.backdrop} />
        <Lightbox.Popup className={classes.popup}>
          <Lightbox.Title className="sr-only">Photos</Lightbox.Title>
          <Lightbox.Viewport className={classes.viewport}>
            {(photo: Photo) => (
              <Lightbox.Item className={classes.item}>
                <Lightbox.Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="data-error:invisible"
                />
                <Lightbox.LoadingIndicator className={local.Loading} />
                <Lightbox.Fallback className={local.Fallback}>
                  <strong>This photo can’t be shown</strong>
                  <span>{photo.alt}</span>
                </Lightbox.Fallback>
              </Lightbox.Item>
            )}
          </Lightbox.Viewport>
          <Lightbox.Close className={`${classes.close} ${classes.control}`}>
            <CloseIcon />
          </Lightbox.Close>
        </Lightbox.Popup>
      </Lightbox.Portal>
    </Lightbox.Root>
  );
}
