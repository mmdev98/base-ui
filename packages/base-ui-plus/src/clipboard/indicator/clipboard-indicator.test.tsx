import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Clipboard } from "..";
import { clickTrigger, mockClipboard } from "../test-utils";

beforeEach(mockClipboard);

describe("Clipboard.Indicator", () => {
  it("renders only while copied", async () => {
    render(
      <Clipboard.Root value="hello">
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
        <Clipboard.Indicator>Copied</Clipboard.Indicator>
      </Clipboard.Root>,
    );
    expect(screen.queryByText("Copied")).toBeNull();

    await clickTrigger();

    expect(screen.getByText("Copied").hasAttribute("data-copied")).toBe(true);
  });

  it("stays mounted with keepMounted", () => {
    render(
      <Clipboard.Root value="hello">
        <Clipboard.Indicator keepMounted>Copied</Clipboard.Indicator>
      </Clipboard.Root>,
    );

    const indicator = screen.getByText("Copied");
    expect(indicator.hasAttribute("data-copied")).toBe(false);
  });
});
