import { describe, expect, it } from "vitest";
import { clampLightboxIndex } from "./lightbox-items";

describe("clampLightboxIndex", () => {
  it("keeps the index in the list", () => {
    expect(clampLightboxIndex(-1, 3)).toBe(0);
    expect(clampLightboxIndex(5, 3)).toBe(2);
    expect(clampLightboxIndex(1, 0)).toBe(0);
  });
});
