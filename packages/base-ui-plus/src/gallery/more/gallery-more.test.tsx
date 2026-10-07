import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

describe("Gallery.More", () => {
  it("renders a labelled button with the hidden count", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.List limit={2}>
          <Gallery.More />
        </Gallery.List>
      </Gallery.Root>,
    );
    const more = screen.getByRole("button", { name: "Show 2 more" });
    expect(more).toHaveProperty("type", "button");
    expect(more.textContent).toBe("+2");
    expect(more.getAttribute("data-hidden-count")).toBe("2");
  });

  it("passes the state to a function child", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.List limit={1}>
          <Gallery.More>
            {(state) => `${state.hiddenCount} hidden`}
          </Gallery.More>
        </Gallery.List>
      </Gallery.Root>,
    );
    expect(screen.getByText("3 hidden")).toBeTruthy();
  });

  it("renders nothing once the list is expanded", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.List limit={2}>
          <Gallery.More />
        </Gallery.List>
      </Gallery.Root>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("throws outside Gallery.List", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Gallery.Root items={ITEMS}>
          <Gallery.More />
        </Gallery.Root>,
      ),
    ).toThrow("Base UI Plus: GalleryListContext is missing.");
    consoleError.mockRestore();
  });
});
