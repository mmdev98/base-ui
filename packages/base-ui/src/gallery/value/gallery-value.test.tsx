import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

describe("Gallery.Value", () => {
  it("shows the position of the active item and announces it", () => {
    render(
      <Gallery.Root items={ITEMS} defaultIndex={1}>
        <Gallery.Value />
      </Gallery.Root>,
    );
    const value = screen.getByText("2 / 3");
    expect(value.getAttribute("aria-live")).toBe("polite");
  });

  it("formats the position with a function child", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.Value>
          {(state) => `${state.index + 1} of ${state.count}`}
        </Gallery.Value>
      </Gallery.Root>,
    );
    expect(screen.getByText("1 of 3")).toBeTruthy();
  });
});
