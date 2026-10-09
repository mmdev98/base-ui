import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Clipboard } from "..";
import { clickTrigger, mockClipboard, writeText } from "../test-utils";

beforeEach(mockClipboard);

describe("Clipboard.Trigger", () => {
  it("renders a button that does not submit forms", () => {
    render(
      <Clipboard.Root value="hello">
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
      </Clipboard.Root>,
    );

    expect(screen.getByRole("button")).toHaveProperty("type", "button");
  });

  it("exposes data-copied after copying", async () => {
    render(
      <Clipboard.Root value="hello">
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
      </Clipboard.Root>,
    );
    expect(screen.getByRole("button").hasAttribute("data-copied")).toBe(false);

    await clickTrigger();

    expect(screen.getByRole("button").hasAttribute("data-copied")).toBe(true);
  });

  it("supports the render prop and keeps the caller's onClick", async () => {
    const onClick = vi.fn();
    render(
      <Clipboard.Root value="hello">
        <Clipboard.Trigger render={<span role="button" />} onClick={onClick}>
          Copy
        </Clipboard.Trigger>
      </Clipboard.Root>,
    );

    expect(screen.getByRole("button").tagName).toBe("SPAN");

    await clickTrigger();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("hello");
  });
});
