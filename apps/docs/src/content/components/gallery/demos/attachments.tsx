"use client";
import * as React from "react";
import { Gallery } from "@mmdev98/base-ui/gallery";
import { getThumbnailSrc, photos } from "./_photos";
import { DemoViewer } from "./_viewer";
import { classes } from "./_classes";

/** Tailwind classes of this demo. */
const local = {
  Thread: "flex w-full max-w-104 flex-col gap-3",
  Message:
    "flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950",
  Author: "text-[0.8125rem]",
  Body: "m-0 text-sm",
  Attachment:
    "relative flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 p-0 text-[0.8125rem] font-semibold text-inherit data-flying:invisible data-popup-open:invisible dark:border-neutral-800 dark:bg-neutral-900",
};

const messages = [
  {
    id: "m1",
    author: "Ana",
    text: "Here are the photos from the inspection.",
    images: photos.slice(0, 3),
  },
  {
    id: "m2",
    author: "Sam",
    text: "And the one from the other side.",
    images: photos.slice(4, 5),
  },
  {
    id: "m3",
    author: "Ana",
    text: "Full set below.",
    images: photos.slice(1, 8),
  },
];

/** Each message has its own gallery: the viewer only shows that message's images. */
export default function ExampleGalleryAttachments() {
  return (
    <div className={local.Thread}>
      {messages.map((message) => (
        <article key={message.id} className={local.Message}>
          <strong className={local.Author}>{message.author}</strong>
          <p className={local.Body}>{message.text}</p>
          <Gallery.Root items={message.images}>
            <Gallery.List limit={4} className={classes.row}>
              {message.images.map((photo, index) => (
                <Gallery.Trigger
                  key={photo.id}
                  index={index}
                  className={local.Attachment}
                >
                  <img
                    src={getThumbnailSrc(photo)}
                    alt=""
                    className={classes.thumbnailImage}
                  />
                </Gallery.Trigger>
              ))}
              <Gallery.More className={local.Attachment} />
            </Gallery.List>
            <DemoViewer />
          </Gallery.Root>
        </article>
      ))}
    </div>
  );
}
