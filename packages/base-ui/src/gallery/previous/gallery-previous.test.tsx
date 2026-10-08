import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { openGalleryAt, TestGallery } from "../test-utils";

describe("Gallery.Previous", () => {
  it("shows the previous item and is disabled on the first one", async () => {
    render(<TestGallery />);
    await openGalleryAt("Open image 2 of 3");
    const previous = screen.getByRole("button", { name: "Previous image" });
    expect(previous).toHaveProperty("disabled", false);

    await act(async () => fireEvent.click(previous));

    expect(screen.getByTestId("value").textContent).toBe("1 / 3");
    expect(previous).toHaveProperty("disabled", true);
    expect(previous.hasAttribute("data-disabled")).toBe(true);
  });
});
