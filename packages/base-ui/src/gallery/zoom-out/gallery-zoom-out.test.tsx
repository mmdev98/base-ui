import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.ZoomOut", () => {
  it("zooms out by one step and is disabled at rest", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const zoomValue = screen.getByTestId("zoom-value");
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    await waitFor(() => expect(zoomValue.textContent).toBe("150%"));

    fireEvent.click(zoomOut);

    await waitFor(() => expect(zoomValue.textContent).toBe("100%"));
    expect(zoomOut).toHaveProperty("disabled", true);
  });
});
