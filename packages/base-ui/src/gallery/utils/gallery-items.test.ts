import { describe, expect, it } from "vitest";
import { clampGalleryIndex } from "./gallery-items";

describe("clampGalleryIndex", () => {
  it("keeps the index in the list", () => {
    expect(clampGalleryIndex(-1, 3)).toBe(0);
    expect(clampGalleryIndex(5, 3)).toBe(2);
    expect(clampGalleryIndex(1, 0)).toBe(0);
  });
});
