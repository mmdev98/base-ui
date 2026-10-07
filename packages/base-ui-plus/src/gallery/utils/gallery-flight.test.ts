import { describe, expect, it } from "vitest";
import { getGalleryFlightKeyframe } from "./gallery-flight";

describe("getGalleryFlightKeyframe", () => {
  it("covers the trigger with the image and clips it to the trigger", () => {
    const box = { left: 200, top: 150, width: 400, height: 300 };
    const trigger = { left: 10, top: 20, width: 60, height: 60 };
    const keyframe = getGalleryFlightKeyframe(trigger, box, 8);
    // Cover: the 4:3 image scales to the trigger's height, 80 × 60.
    expect(keyframe.transform).toBe(
      "translate3d(-360px, -250px, 0px) scale(0.2)",
    );
    // 60 px of the 80 px width show: 50 px of the box is clipped on each side.
    expect(keyframe.clipPath).toBe("inset(0px 50px round 40px)");
  });
});
