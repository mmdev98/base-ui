"use client";
import * as React from "react";
import { Gallery, useGalleryRootContext } from "@mmdev98/base-ui/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { CloseIcon } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  // Leaves room for the strip below the image.
  Viewport:
    "absolute inset-x-0 top-0 bottom-24 cursor-zoom-in gap-x-4 in-data-zoomed:cursor-grab data-dragging:cursor-grabbing",
  Item: "px-4 pt-14 pb-4 md:px-24 md:pt-16",
  Strip:
    "absolute inset-x-0 bottom-0 flex h-24 gap-1.5 overflow-x-auto px-[calc(50%-2rem)] pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] scrollbar-none",
  Frame:
    "size-16 flex-none cursor-pointer overflow-hidden rounded-md border-2 border-transparent bg-transparent p-0 opacity-50 transition-opacity duration-150 hover:opacity-100 aria-[current=true]:border-white aria-[current=true]:opacity-100 [&_img]:size-full [&_img]:object-cover",
};

export default function ExampleGalleryFilmstrip() {
  return (
    <Gallery.Root items={photos}>
      <Gallery.List limit={4} className={classes.row}>
        {photos.map((photo, index) => (
          <Gallery.Trigger
            key={photo.id}
            index={index}
            className={classes.thumbnail}
          >
            <img
              src={getThumbnailSrc(photo)}
              alt=""
              className={classes.thumbnailImage}
            />
          </Gallery.Trigger>
        ))}
        <Gallery.More className={classes.thumbnail} />
      </Gallery.List>
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
          <Gallery.Close className={`${classes.close} ${classes.control}`}>
            <CloseIcon />
          </Gallery.Close>
          <Filmstrip />
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}

/** Thumbnails inside the viewer, built on the root context's `index` and `goTo`. */
function Filmstrip() {
  const { items, index, goTo } = useGalleryRootContext();
  const activeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [index]);

  return (
    <div
      className={`${local.Strip} ${classes.control}`}
      role="group"
      aria-label="Photos"
    >
      {items.map((item, itemIndex) => (
        <button
          key={item.id}
          ref={itemIndex === index ? activeRef : undefined}
          type="button"
          className={local.Frame}
          aria-label={`Show photo ${itemIndex + 1}`}
          aria-current={itemIndex === index || undefined}
          onClick={() => goTo(itemIndex)}
        >
          <img src={getThumbnailSrc(item)} alt="" />
        </button>
      ))}
    </div>
  );
}
