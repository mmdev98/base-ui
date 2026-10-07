import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS, loadImage, openGalleryAt, TestGallery } from "../test-utils";

afterEach(() => {
  loadImage.mockClear();
});

describe("Gallery.Trigger", () => {
  it("renders a labelled button per item that does not submit forms", () => {
    render(<TestGallery />);
    const trigger = screen.getByRole("button", { name: "Open image 1 of 3" });
    expect(trigger).toHaveProperty("type", "button");
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("loads the image, then opens the viewer on its item", async () => {
    const onOpenChange = vi.fn();
    const onIndexChange = vi.fn();
    render(
      <TestGallery onOpenChange={onOpenChange} onIndexChange={onIndexChange} />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();

    await openGalleryAt("Open image 2 of 3");

    expect(loadImage).toHaveBeenCalledWith(ITEMS[1]);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByTestId("value").textContent).toBe("2 / 3");
    expect(screen.getByRole("img", { name: "Second" })).toBeTruthy();
  });

  it("exposes data-pending while the image loads, and disables the others", async () => {
    let resolve: (value: null) => void = () => {};
    loadImage.mockImplementationOnce(
      () => new Promise((done) => (resolve = done)),
    );
    render(<TestGallery />);
    const trigger = screen.getByRole("button", { name: "Open image 1 of 3" });
    const other = screen.getByRole("button", { name: "Open image 2 of 3" });
    expect(trigger.hasAttribute("data-pending")).toBe(false);

    fireEvent.click(trigger);

    await waitFor(() =>
      expect(trigger.hasAttribute("data-pending")).toBe(true),
    );
    expect(trigger.getAttribute("aria-busy")).toBe("true");
    expect(other.hasAttribute("data-disabled")).toBe(true);

    await act(async () => resolve(null));
    await screen.findByRole("dialog");
    expect(trigger.hasAttribute("data-pending")).toBe(false);
  });

  it("marks the trigger of the image the viewer shows with data-popup-open", async () => {
    render(<TestGallery />);
    const first = screen.getByRole("button", { name: "Open image 1 of 3" });
    const second = screen.getByRole("button", { name: "Open image 2 of 3" });
    expect(second.hasAttribute("data-popup-open")).toBe(false);

    await openGalleryAt("Open image 2 of 3");
    expect(second.hasAttribute("data-popup-open")).toBe(true);
    expect(first.hasAttribute("data-popup-open")).toBe(false);

    // It follows the image as the viewer moves to another one.
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
    });
    expect(first.hasAttribute("data-popup-open")).toBe(true);
    expect(second.hasAttribute("data-popup-open")).toBe(false);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(first.hasAttribute("data-popup-open")).toBe(false);
  });

  it("renders only its children when the index has no item", () => {
    render(
      <Gallery.Root items={[]}>
        <Gallery.Trigger index={0}>
          <span>Avatar</span>
        </Gallery.Trigger>
      </Gallery.Root>,
    );
    expect(screen.getByText("Avatar")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("keeps the caller's handlers with the render prop", async () => {
    const onClick = vi.fn();
    render(
      <Gallery.Root items={ITEMS} loadImage={loadImage}>
        <Gallery.Trigger index={0} render={<a href="#a" />} onClick={onClick}>
          Open
        </Gallery.Trigger>
        <Gallery.Portal>
          <Gallery.Popup />
        </Gallery.Portal>
      </Gallery.Root>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Open"));
    });

    expect(onClick).toHaveBeenCalled();
    expect(await screen.findByRole("dialog")).toBeTruthy();
  });
});
