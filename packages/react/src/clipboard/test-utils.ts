import { act, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

/** `navigator.clipboard.writeText`, replaced by `mockClipboard`. */
export const writeText = vi.fn<(text: string) => Promise<void>>();

/** jsdom has no clipboard: install a mock that resolves. Call in `beforeEach`. */
export function mockClipboard(): void {
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

export async function clickTrigger(): Promise<void> {
  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });
}
