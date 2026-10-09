import { act, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Lightbox, type LightboxRootProps } from ".";

export type TestItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export const ITEMS: TestItem[] = [
  { id: "a", src: "/a.jpg", alt: "First", caption: "Caption A" },
  { id: "b", src: "/b.jpg", alt: "Second" },
  { id: "c", src: "/c.jpg", alt: "Third" },
];

/** Resolves at once, so the viewer opens without loading a real image. */
export const loadImage = vi.fn<
  NonNullable<LightboxRootProps<TestItem>["loadImage"]>
>(() => Promise.resolve({ width: 400, height: 300 }));

export type TestLightboxProps = Partial<LightboxRootProps<TestItem>> & {
  /** Rendered inside each item, after the image. */
  itemChildren?: (item: TestItem) => React.ReactNode;
  /** Rendered inside the popup, after the controls. */
  popupChildren?: React.ReactNode;
};

/** A trigger per item and a viewer with every control. */
export function TestLightbox(props: TestLightboxProps): React.ReactElement {
  const { items = ITEMS, itemChildren, popupChildren, ...rootProps } = props;
  return (
    <Lightbox.Root items={items} loadImage={loadImage} {...rootProps}>
      {items.map((item) => (
        <Lightbox.Trigger key={item.id} value={item.id} />
      ))}
      <Lightbox.Portal>
        <Lightbox.Backdrop data-testid="backdrop" />
        <Lightbox.Popup data-testid="popup">
          <Lightbox.Title>Photos</Lightbox.Title>
          <Lightbox.Viewport data-testid="viewport">
            {(item: TestItem) => (
              <Lightbox.Item data-testid={`item-${item.id}`}>
                <Lightbox.Image src={item.src} alt={item.alt} />
                {itemChildren?.(item)}
              </Lightbox.Item>
            )}
          </Lightbox.Viewport>
          <Lightbox.Description>
            {(item: TestItem) => item.caption}
          </Lightbox.Description>
          <Lightbox.Close>Close</Lightbox.Close>
          <Lightbox.Previous />
          <Lightbox.Value data-testid="value" />
          <Lightbox.Next />
          <Lightbox.ZoomOut />
          <Lightbox.ZoomValue data-testid="zoom-value" />
          <Lightbox.ZoomIn />
          <Lightbox.ZoomReset />
          {popupChildren}
        </Lightbox.Popup>
      </Lightbox.Portal>
    </Lightbox.Root>
  );
}

/** Clicks the trigger named `name` and waits for the viewer. */
export async function openLightboxAt(name: string): Promise<void> {
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
