import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.ZoomIn", () => {
  it("zooms in by one step and enables zooming out", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 1 of 3");
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });
    expect(screen.getByTestId("zoom-value").textContent).toBe("100%");
    expect(zoomOut).toHaveProperty("disabled", true);

    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));

    await waitFor(() =>
      expect(screen.getByTestId("zoom-value").textContent).toBe("150%"),
    );
    expect(zoomOut).toHaveProperty("disabled", false);
  });

  it("is disabled at the largest scale", async () => {
    render(<TestGallery maxScale={1.5} />);
    await openGalleryAt("Open image 1 of 3");
    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    expect(zoomIn).toHaveProperty("disabled", false);

    fireEvent.click(zoomIn);

    await waitFor(() => expect(zoomIn).toHaveProperty("disabled", true));
  });
});
