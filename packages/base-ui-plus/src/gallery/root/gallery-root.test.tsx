import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery, useGalleryRootContext } from "..";
import { ITEMS, openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Root", () => {
  it("returns focus to the trigger when the viewer closes", async () => {
    const onOpenChange = vi.fn();
    render(<TestGallery onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Open image 1 of 3" });
    await openGalleryAt("Open image 1 of 3");
    expect(document.activeElement).not.toBe(trigger);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
    });

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(document.activeElement).toBe(trigger);
  });

  it("can control open and index", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <TestGallery open={false} index={2} onOpenChange={onOpenChange} />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();

    rerender(<TestGallery open index={2} onOpenChange={onOpenChange} />);
    await screen.findByRole("dialog");
    expect(screen.getByTestId("value").textContent).toBe("3 / 3");

    // A controlled index only changes through the prop.
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
    });
    expect(screen.getByTestId("value").textContent).toBe("3 / 3");

    // A controlled `open` only reports the request to close.
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("closes when the last item is removed", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <TestGallery items={ITEMS.slice(0, 1)} onOpenChange={onOpenChange} />,
    );
    await openGalleryAt("Open image 1 of 1");

    rerender(<TestGallery items={[]} onOpenChange={onOpenChange} />);

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("throws when a part is used outside Gallery.Root", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    function Reader() {
      useGalleryRootContext();
      return null;
    }

    expect(() => render(<Reader />)).toThrow(
      "Base UI Plus: GalleryRootContext is missing.",
    );
    expect(() => render(<Gallery.Next />)).toThrow(
      "Gallery parts must be placed within <Gallery.Root>.",
    );
    consoleError.mockRestore();
  });
});
