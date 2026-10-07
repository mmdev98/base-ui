import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS, loadImage, openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Image", () => {
  it("renders the item's image, not draggable, with its size known", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });

    expect(image.getAttribute("src")).toBe("/a.jpg");
    expect(image.getAttribute("draggable")).toBe("false");
    expect(image.hasAttribute("data-active")).toBe(true);
    // `loadImage` reported the natural size before the viewer opened.
    expect(image.hasAttribute("data-loaded")).toBe(true);
  });

  it("renders another image component through render", async () => {
    render(
      <Gallery.Root items={ITEMS} loadImage={loadImage}>
        <Gallery.Trigger index={0} />
        <Gallery.Portal>
          <Gallery.Popup>
            <Gallery.Viewport>
              {(item, index) => (
                <Gallery.Item index={index}>
                  <Gallery.Image
                    render={(props) => (
                      <img
                        {...props}
                        data-custom=""
                        alt={`Custom ${item.id}`}
                      />
                    )}
                  />
                </Gallery.Item>
              )}
            </Gallery.Viewport>
          </Gallery.Popup>
        </Gallery.Portal>
      </Gallery.Root>,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    const image = await screen.findByRole("img", { name: "Custom a" });
    expect(image.hasAttribute("data-custom")).toBe(true);
    expect(image.getAttribute("src")).toBe("/a.jpg");
  });

  it("uses the caller's src and srcSet over the item's", async () => {
    render(
      <Gallery.Root items={ITEMS} loadImage={loadImage}>
        <Gallery.Trigger index={0} />
        <Gallery.Portal>
          <Gallery.Popup>
            <Gallery.Viewport>
              {(item, index) => (
                <Gallery.Item index={index}>
                  <Gallery.Image
                    src={`${item.src}?width=2000`}
                    srcSet={`${item.src}?width=1000 1000w`}
                  />
                </Gallery.Item>
              )}
            </Gallery.Viewport>
          </Gallery.Popup>
        </Gallery.Portal>
      </Gallery.Root>,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    const image = await screen.findByRole("img", { name: "First" });
    expect(image.getAttribute("src")).toBe("/a.jpg?width=2000");
    expect(image.getAttribute("srcset")).toBe("/a.jpg?width=1000 1000w");
  });

  it("throws outside Gallery.Item", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Gallery.Root items={ITEMS}>
          <Gallery.Image />
        </Gallery.Root>,
      ),
    ).toThrow("Base UI Plus: GalleryItemContext is missing.");
    consoleError.mockRestore();
  });
});
