import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Lightbox } from "..";
import {
  ITEMS,
  openLightboxAt,
  TestLightbox,
  type TestItem,
} from "../test-utils";

function renderWithThumbnails(
  thumbnail: (item: TestItem) => React.ReactNode,
): void {
  render(
    <TestLightbox
      popupChildren={<Lightbox.Thumbnails>{thumbnail}</Lightbox.Thumbnails>}
    />,
  );
}

describe("Lightbox.Thumbnail", () => {
  it("marks the active item with aria-current and data-active", async () => {
    renderWithThumbnails(() => <Lightbox.Thumbnail />);
    await openLightboxAt("Open image 1 of 3");
    const first = screen.getByRole("button", { name: "Show image 1 of 3" });
    const second = screen.getByRole("button", { name: "Show image 2 of 3" });

    expect(first).toHaveProperty("type", "button");
    expect(first.getAttribute("aria-current")).toBe("true");
    expect(first.hasAttribute("data-active")).toBe(true);
    expect(second.hasAttribute("aria-current")).toBe(false);
  });

  it("shows its item when clicked", async () => {
    renderWithThumbnails(() => <Lightbox.Thumbnail />);
    await openLightboxAt("Open image 1 of 3");
    const third = screen.getByRole("button", { name: "Show image 3 of 3" });
    expect(third.hasAttribute("data-active")).toBe(false);

    await act(async () => fireEvent.click(third));

    expect(screen.getByTestId("value").textContent).toBe("3 / 3");
    expect(third.hasAttribute("data-active")).toBe(true);
  });

  it("keeps the caller's label and onClick", async () => {
    const onClick = vi.fn();
    renderWithThumbnails((item) => (
      <Lightbox.Thumbnail aria-label={item.alt} onClick={onClick} />
    ));
    await openLightboxAt("Open image 1 of 3");

    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Second" })),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("value").textContent).toBe("2 / 3");
  });

  it("throws outside Lightbox.Thumbnails", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Lightbox.Root items={ITEMS}>
          <Lightbox.Thumbnail />
        </Lightbox.Root>,
      ),
    ).toThrow("Base UI: LightboxThumbnailsContext is missing.");
    consoleError.mockRestore();
  });
});
