import { act, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Gallery, type GalleryItemData, type GalleryRootProps } from ".";

export const ITEMS: GalleryItemData[] = [
  { id: "a", src: "/a.jpg", alt: "First", caption: "Caption A" },
  { id: "b", src: "/b.jpg", alt: "Second" },
  { id: "c", src: "/c.jpg", alt: "Third", downloadUrl: "/c-full.jpg" },
];

/** Resolves at once, so the viewer opens without loading a real image. */
export const loadImage = vi.fn<NonNullable<GalleryRootProps["loadImage"]>>(() =>
  Promise.resolve({ width: 400, height: 300 }),
);

export type TestGalleryProps = Partial<GalleryRootProps> & {
  onDelete?: (item: GalleryItemData) => unknown;
};

/** A trigger per item and a viewer with every control. */
export function TestGallery(props: TestGalleryProps): React.ReactElement {
  const { onDelete, items = ITEMS, ...rootProps } = props;
  return (
    <Gallery.Root items={items} loadImage={loadImage} {...rootProps}>
      {items.map((item, index) => (
        <Gallery.Trigger key={item.id} index={index}>
          {item.alt}
        </Gallery.Trigger>
      ))}
      <Gallery.Portal>
        <Gallery.Backdrop data-testid="backdrop" />
        <Gallery.Popup data-testid="popup">
          <Gallery.Title>Photos</Gallery.Title>
          <Gallery.Viewport data-testid="viewport">
            {(item, index) => (
              <Gallery.Item index={index} data-testid={`item-${item.id}`}>
                <Gallery.Image />
              </Gallery.Item>
            )}
          </Gallery.Viewport>
          <Gallery.Description />
          <Gallery.Close>Close</Gallery.Close>
          <Gallery.Previous />
          <Gallery.Value data-testid="value" />
          <Gallery.Next />
          <Gallery.ZoomOut />
          <Gallery.ZoomValue data-testid="zoom-value" />
          <Gallery.ZoomIn />
          <Gallery.ZoomReset />
          <Gallery.Download />
          {onDelete && <Gallery.Delete onDelete={onDelete} />}
        </Gallery.Popup>
      </Gallery.Portal>
    </Gallery.Root>
  );
}

/** Clicks the trigger named `name` and waits for the viewer. */
export async function openGalleryAt(name: string): Promise<void> {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name }));
  });
  await screen.findByRole("dialog");
}

export function firePointer(
  type: "pointerDown" | "pointerMove" | "pointerUp",
  element: Element,
  x: number,
  y: number,
  pointerType = "touch",
): void {
  fireEvent[type](element, {
    pointerId: 1,
    pointerType,
    button: 0,
    clientX: x,
    clientY: y,
  });
}
