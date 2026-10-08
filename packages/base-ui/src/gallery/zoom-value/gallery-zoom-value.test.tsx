import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

describe("Gallery.ZoomValue", () => {
  it("shows the scale as a percentage", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.ZoomValue />
      </Gallery.Root>,
    );
    expect(screen.getByText("100%")).toBeTruthy();
  });

  it("formats the scale with a function child", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.ZoomValue>{(scale) => `×${scale}`}</Gallery.ZoomValue>
      </Gallery.Root>,
    );
    expect(screen.getByText("×1")).toBeTruthy();
  });
});
