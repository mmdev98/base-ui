import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Description", () => {
  it("shows the active item's caption and describes the dialog", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const caption = screen.getByText("Caption A");

    expect(screen.getByRole("dialog").getAttribute("aria-describedby")).toBe(
      caption.id,
    );
  });

  it("renders nothing for an item without a caption", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    expect(screen.getByText("Caption A")).toBeTruthy();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    });

    expect(screen.queryByText("Caption A")).toBeNull();
  });
});
