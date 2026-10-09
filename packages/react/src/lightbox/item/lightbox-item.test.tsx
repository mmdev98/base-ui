import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Lightbox } from "..";
import { ITEMS, openLightboxAt, TestLightbox } from "../test-utils";

describe("Lightbox.Item", () => {
  it("renders a labelled slide and marks the active one", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
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

  it("exposes data-loading, then data-error when its image fails", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    const item = screen.getByTestId("item-a");
    expect(item.hasAttribute("data-loading")).toBe(true);
    expect(item.getAttribute("aria-busy")).toBe("true");
    expect(item.hasAttribute("data-error")).toBe(false);

    fireEvent.error(screen.getByRole("img", { name: "First" }));

    expect(item.hasAttribute("data-loading")).toBe(false);
    expect(item.hasAttribute("data-error")).toBe(true);
  });

  it("throws outside Lightbox.Viewport", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Lightbox.Root items={ITEMS}>
          <Lightbox.Item />
        </Lightbox.Root>,
      ),
    ).toThrow("Base UI: LightboxViewportContext is missing.");
    consoleError.mockRestore();
  });
});
