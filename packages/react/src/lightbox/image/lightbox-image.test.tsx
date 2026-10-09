import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Lightbox } from "..";
import {
  ITEMS,
  loadImage,
  openLightboxAt,
  TestLightbox,
  type TestItem,
} from "../test-utils";

function renderWithImage(image: (item: TestItem) => React.ReactNode): void {
  render(
    <Lightbox.Root items={ITEMS} loadImage={loadImage}>
      <Lightbox.Trigger value="a" />
      <Lightbox.Portal>
        <Lightbox.Popup>
          <Lightbox.Viewport>
            {(item: TestItem) => <Lightbox.Item>{image(item)}</Lightbox.Item>}
          </Lightbox.Viewport>
        </Lightbox.Popup>
      </Lightbox.Portal>
    </Lightbox.Root>,
  );
}

describe("Lightbox.Image", () => {
  it("renders its src and alt, not draggable", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });

    expect(image.getAttribute("src")).toBe("/a.jpg");
    expect(image.getAttribute("draggable")).toBe("false");
    expect(image.hasAttribute("data-active")).toBe(true);
  });

  it("exposes data-loading until the image loads", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });
    expect(image.hasAttribute("data-loading")).toBe(true);

    fireEvent.load(image);

    expect(image.hasAttribute("data-loading")).toBe(false);
    expect(image.hasAttribute("data-error")).toBe(false);
  });

  it("exposes data-error when the image fails", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });
    expect(image.hasAttribute("data-error")).toBe(false);

    fireEvent.error(image);

    expect(image.hasAttribute("data-error")).toBe(true);
  });

  it("keeps its size and position over the caller's style", async () => {
    renderWithImage((item) => (
      <Lightbox.Image
        src={item.src}
        alt={item.alt}
        width={800}
        height={600}
        style={{ position: "static", transition: "opacity 1s" }}
      />
    ));
    await openLightboxAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });

    expect(image.style.position).toBe("absolute");
    expect(image.style.transition).toBe("opacity 1s");
  });

  it("renders another image component through render", async () => {
    renderWithImage((item) => (
      <Lightbox.Image
        src={item.src}
        render={(props) => (
          <img {...props} data-custom="" alt={`Custom ${item.id}`} />
        )}
      />
    ));
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    const image = await screen.findByRole("img", { name: "Custom a" });
    expect(image.hasAttribute("data-custom")).toBe(true);
    expect(image.getAttribute("src")).toBe("/a.jpg");
  });

  it("throws outside Lightbox.Item", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Lightbox.Root items={ITEMS}>
          <Lightbox.Image />
        </Lightbox.Root>,
      ),
    ).toThrow("Base UI: LightboxItemContext is missing.");
    consoleError.mockRestore();
  });
});
