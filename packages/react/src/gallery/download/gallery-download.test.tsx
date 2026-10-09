import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

describe("Gallery.Download", () => {
  it.each([
    { index: 0, href: "/a.jpg" },
    { index: 2, href: "/c-full.jpg" },
  ])("links item $index to $href", ({ index, href }) => {
    render(
      <Gallery.Root items={ITEMS} defaultIndex={index}>
        <Gallery.Download />
      </Gallery.Root>,
    );
    const link = screen.getByRole("link", { name: "Download" });
    expect(link.getAttribute("href")).toBe(href);
    expect(link.hasAttribute("download")).toBe(true);
  });

  it("renders nothing without items", () => {
    render(
      <Gallery.Root items={[]}>
        <Gallery.Download />
      </Gallery.Root>,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });
});
