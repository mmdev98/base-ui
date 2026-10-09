import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Lightbox } from "..";
import { ITEMS } from "../test-utils";

describe("Lightbox.Value", () => {
  it("shows the position of the active item and announces it", () => {
    render(
      <Lightbox.Root items={ITEMS} defaultValue="b">
        <Lightbox.Value />
      </Lightbox.Root>,
    );
    const value = screen.getByText("2 / 3");
    expect(value.getAttribute("aria-live")).toBe("polite");
  });

  it("formats the position with a function child", () => {
    render(
      <Lightbox.Root items={ITEMS}>
        <Lightbox.Value>
          {(state) => `${state.index + 1} of ${state.count}`}
        </Lightbox.Value>
      </Lightbox.Root>,
    );
    expect(screen.getByText("1 of 3")).toBeTruthy();
  });
});
