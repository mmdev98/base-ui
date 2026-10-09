import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Lightbox } from "..";
import {
  ITEMS,
  openLightboxAt,
  TestLightbox,
  type TestItem,
} from "../test-utils";

function spinner(keepMounted?: boolean) {
  return (item: TestItem) => (
    <Lightbox.LoadingIndicator
      data-testid={`spinner-${item.id}`}
      keepMounted={keepMounted}
    />
  );
}

describe("Lightbox.LoadingIndicator", () => {
  it("renders while the image loads, hidden from screen readers", async () => {
    render(<TestLightbox itemChildren={spinner()} />);
    await openLightboxAt("Open image 1 of 3");
    const indicator = screen.getByTestId("spinner-a");
    expect(indicator.getAttribute("aria-hidden")).toBe("true");
    expect(indicator.hasAttribute("data-loading")).toBe(true);

    fireEvent.load(screen.getByRole("img", { name: "First" }));

    expect(screen.queryByTestId("spinner-a")).toBeNull();
  });

  it("stays in the DOM with keepMounted", async () => {
    render(<TestLightbox itemChildren={spinner(true)} />);
    await openLightboxAt("Open image 1 of 3");
    const indicator = screen.getByTestId("spinner-a");

    fireEvent.load(screen.getByRole("img", { name: "First" }));

    expect(screen.getByTestId("spinner-a")).toBe(indicator);
    expect(indicator.hasAttribute("data-loading")).toBe(false);
  });

  it("throws outside Lightbox.Item", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Lightbox.Root items={ITEMS}>
          <Lightbox.LoadingIndicator />
        </Lightbox.Root>,
      ),
    ).toThrow("Base UI: LightboxItemContext is missing.");
    consoleError.mockRestore();
  });
});
