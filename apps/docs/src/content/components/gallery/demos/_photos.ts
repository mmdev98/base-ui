import type { GalleryItemData } from "@logic-ui/react/gallery";

/** Photos of different shapes, shared by the gallery demos. */
export const photos: GalleryItemData[] = [
  {
    id: "valley",
    src: "https://picsum.photos/id/1015/1600/1067",
    width: 1600,
    height: 1067,
    alt: "River valley between cliffs",
    caption: "River valley",
  },
  {
    id: "portrait",
    src: "https://picsum.photos/id/1027/1067/1600",
    width: 1067,
    height: 1600,
    alt: "Portrait of a woman",
    caption: "A portrait, taller than wide",
  },
  {
    id: "waterfall",
    src: "https://picsum.photos/id/1035/1600/1600",
    width: 1600,
    height: 1600,
    alt: "Waterfall in a forest",
    caption: "A square image",
  },
  {
    id: "panorama",
    src: "https://picsum.photos/id/1043/2400/1000",
    width: 2400,
    height: 1000,
    alt: "Panorama of a valley",
    caption: "A wide panorama",
  },
  {
    id: "coast",
    src: "https://picsum.photos/id/1050/1600/1067",
    width: 1600,
    height: 1067,
    alt: "Rocky coast",
  },
  {
    id: "jellyfish",
    src: "https://picsum.photos/id/1069/1600/1067",
    width: 1600,
    height: 1067,
    alt: "Jellyfish in dark water",
    caption: "Jellyfish",
  },
  {
    id: "bridge",
    src: "https://picsum.photos/id/1067/1067/1600",
    width: 1067,
    height: 1600,
    alt: "City street",
  },
  {
    id: "mountains",
    src: "https://picsum.photos/id/1018/1600/1067",
    width: 1600,
    height: 1067,
    alt: "Mountains under a cloudy sky",
    caption: "Mountains",
  },
];

/** A smaller version of a photo, for thumbnails. */
export function getThumbnailSrc(photo: GalleryItemData) {
  return photo.src.replace(
    /\/(\d+)\/(\d+)$/,
    (_, width: string, height: string) => {
      const scale = 240 / Math.max(Number(width), Number(height));
      return `/${Math.round(Number(width) * scale)}/${Math.round(Number(height) * scale)}`;
    },
  );
}
