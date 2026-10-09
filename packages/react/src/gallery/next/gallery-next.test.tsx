import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS, openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Next", () => {
  it("shows the next item and is disabled on the last one", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 2 of 3");
    const next = screen.getByRole("button", { name: "Next image" });
    expect(next).toHaveProperty("disabled", false);
    expect(next.getAttribute("aria-keyshortcuts")).toBe("ArrowRight");

    await act(async () => fireEvent.click(next));

    expect(screen.getByTestId("value").textContent).toBe("3 / 3");
    expect(next).toHaveProperty("disabled", true);
    expect(next.hasAttribute("data-disabled")).toBe(true);
  });

  it("keeps the caller's onClick", () => {
    const onClick = vi.fn();
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.Next onClick={onClick} />
        <Gallery.Value />
      </Gallery.Root>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText("2 / 3")).toBeTruthy();
  });
});
