import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS, openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Item", () => {
  it("renders a labelled slide and marks the active one", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const first = screen.getByTestId("item-a");
    const second = screen.getByTestId("item-b");

    expect(first.getAttribute("aria-roledescription")).toBe("slide");
    expect(first.getAttribute("aria-label")).toBe("1 of 3");
    expect(first.hasAttribute("data-active")).toBe(true);
    expect(second.hasAttribute("data-active")).toBe(false);
    expect(second.getAttribute("aria-hidden")).toBe("true");

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    });
    expect(second.hasAttribute("data-active")).toBe(true);
  });

  it("throws outside Gallery.Viewport", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Gallery.Root items={ITEMS}>
          <Gallery.Item index={0} />
        </Gallery.Root>,
      ),
    ).toThrow("Base UI: GalleryViewportContext is missing.");
    consoleError.mockRestore();
  });
});
