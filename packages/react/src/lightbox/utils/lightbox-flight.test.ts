import { describe, expect, it } from "vitest";
import {
  getLightboxFlightKeyframe,
  getLightboxFlightRadii,
} from "./lightbox-flight";

describe("getLightboxFlightKeyframe", () => {
  it("covers the trigger with the image and clips it to the trigger", () => {
    const box = { left: 200, top: 150, width: 400, height: 300 };
    const trigger = { left: 10, top: 20, width: 60, height: 60 };
    const keyframe = getLightboxFlightKeyframe(trigger, box, [8, 8, 8, 8]);
    // Cover: the 4:3 image scales to the trigger's height, 80 × 60.
    expect(keyframe.transform).toBe(
      "translate3d(-360px, -250px, 0px) scale(0.2)",
    );
    // 60 px of the 80 px width show: 50 px of the box is clipped on each side.
    expect(keyframe.clipPath).toBe("inset(0px 50px round 40px 40px 40px 40px)");
  });

  it("keeps each corner's own radius", () => {
    const box = { left: 0, top: 0, width: 100, height: 100 };
    const trigger = { left: 0, top: 0, width: 50, height: 50 };
    const keyframe = getLightboxFlightKeyframe(trigger, box, [12, 0, 0, 12]);
    expect(keyframe.clipPath).toBe("inset(0px 0px round 24px 0px 0px 24px)");
  });
});

describe("getLightboxFlightRadii", () => {
  it("reads the four corners, capped at a circle", () => {
    const rect = { left: 0, top: 0, width: 40, height: 20 };
    expect(
      getLightboxFlightRadii(
        {
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "999px",
          borderBottomLeftRadius: "",
        },
        rect,
      ),
    ).toEqual([10, 0, 10, 0]);
  });
});
