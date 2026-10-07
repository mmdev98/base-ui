import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.ZoomReset", () => {
  it("puts the image back at its size, and is disabled when not zoomed", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const zoomValue = screen.getByTestId("zoom-value");
    const zoomReset = screen.getByRole("button", { name: "Reset zoom" });
    expect(zoomReset).toHaveProperty("disabled", true);
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    await waitFor(() => expect(zoomValue.textContent).toBe("200%"));

    fireEvent.click(zoomReset);

    await waitFor(() => expect(zoomValue.textContent).toBe("100%"));
    expect(zoomReset).toHaveProperty("disabled", true);
  });
});
