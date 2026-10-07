import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Clipboard } from "..";
import { clickTrigger, mockClipboard, writeText } from "../test-utils";

beforeEach(mockClipboard);

afterEach(() => {
  vi.useRealTimers();
});

describe("Clipboard.Root", () => {
  it("copies the value and exposes data-copied", async () => {
    const onCopiedChange = vi.fn();
    render(
      <Clipboard.Root
        value="hello"
        onCopiedChange={onCopiedChange}
        data-testid="root"
      >
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
      </Clipboard.Root>,
    );
    const root = screen.getByTestId("root");
    expect(root.hasAttribute("data-copied")).toBe(false);

    await clickTrigger();

    expect(writeText).toHaveBeenCalledWith("hello");
    expect(onCopiedChange).toHaveBeenCalledWith(true);
    expect(root.hasAttribute("data-copied")).toBe(true);
  });

  it("resets the copied state after the timeout", async () => {
    vi.useFakeTimers();
    const onCopiedChange = vi.fn();
    render(
      <Clipboard.Root
        value="hello"
        timeout={500}
        onCopiedChange={onCopiedChange}
      >
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
        <Clipboard.Indicator>Copied</Clipboard.Indicator>
      </Clipboard.Root>,
    );

    await clickTrigger();
    expect(screen.getByText("Copied")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText("Copied")).toBeNull();
    expect(onCopiedChange).toHaveBeenLastCalledWith(false);
  });

  it("reports clipboard errors without entering the copied state", async () => {
    const error = new Error("denied");
    writeText.mockRejectedValue(error);
    const onCopyError = vi.fn();
    const onCopiedChange = vi.fn();
    render(
      <Clipboard.Root
        value="hello"
        onCopyError={onCopyError}
        onCopiedChange={onCopiedChange}
      >
        <Clipboard.Trigger>Copy</Clipboard.Trigger>
      </Clipboard.Root>,
    );

    await clickTrigger();

    expect(onCopyError).toHaveBeenCalledWith(error);
    expect(onCopiedChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button").hasAttribute("data-copied")).toBe(false);
  });

  it("throws when a part is used outside Clipboard.Root", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<Clipboard.Trigger>Copy</Clipboard.Trigger>)).toThrow(
      "Base UI Plus: ClipboardRootContext is missing. " +
        "Clipboard parts must be placed within <Clipboard.Root>.",
    );
    consoleError.mockRestore();
  });
});
