import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openLightboxAt, TestLightbox } from "../test-utils";

describe("Lightbox.ZoomIn", () => {
  it("zooms in by one step and enables zooming out", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
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
    render(<TestLightbox maxScale={1.5} />);
    await openLightboxAt("Open image 1 of 3");
    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    expect(zoomIn).toHaveProperty("disabled", false);

    fireEvent.click(zoomIn);

    await waitFor(() => expect(zoomIn).toHaveProperty("disabled", true));
  });
});
