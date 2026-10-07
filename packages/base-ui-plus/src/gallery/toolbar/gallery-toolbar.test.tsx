import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

function TestToolbar(props: { onDelete?: () => void }) {
  return (
    <Gallery.Root items={ITEMS}>
      <Gallery.Toolbar>
        <Gallery.Previous />
        <Gallery.Value />
        <Gallery.Next />
        <Gallery.Separator data-testid="separator" />
        <Gallery.ZoomIn />
        <Gallery.Download />
        {props.onDelete && <Gallery.Delete onDelete={props.onDelete} />}
      </Gallery.Toolbar>
    </Gallery.Root>
  );
}

describe("Gallery.Toolbar", () => {
  it("renders a toolbar whose actions are its buttons and links", () => {
    render(<TestToolbar />);
    const toolbar = screen.getByRole("toolbar");
    const previous = screen.getByRole("button", { name: "Previous image" });

    expect(toolbar.contains(previous)).toBe(true);
    expect(screen.getByRole("link", { name: "Download" })).toBeTruthy();
    expect(screen.getByTestId("separator").getAttribute("role")).toBe(
      "separator",
    );
  });

  it("keeps a disabled action focusable, with aria-disabled", () => {
    render(<TestToolbar />);
    const previous = screen.getByRole("button", { name: "Previous image" });

    expect(previous.getAttribute("aria-disabled")).toBe("true");
    expect(previous.hasAttribute("data-disabled")).toBe(true);
    expect(previous).toHaveProperty("disabled", false);
  });

  it("ignores a press on a disabled action", () => {
    render(<TestToolbar />);
    expect(screen.getByText("1 / 3")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByText("1 / 3")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByText("2 / 3")).toBeTruthy();
  });

  it("moves focus between the actions with the arrow keys", async () => {
    render(<TestToolbar />);
    const previous = screen.getByRole("button", { name: "Previous image" });
    const next = screen.getByRole("button", { name: "Next image" });
    await act(async () => previous.focus());
    expect(document.activeElement).toBe(previous);

    await act(async () => {
      fireEvent.keyDown(previous, { key: "ArrowRight" });
    });

    expect(document.activeElement).toBe(next);
  });

  it("shows the pending state of Delete", async () => {
    let finish: () => void = () => {};
    const onDelete = vi.fn(
      () => new Promise<void>((resolve) => (finish = resolve)),
    );
    render(<TestToolbar onDelete={onDelete} />);
    const button = screen.getByRole("button", { name: "Delete" });

    await act(async () => fireEvent.click(button));
    expect(button.hasAttribute("data-pending")).toBe(true);

    await act(async () => finish());
    expect(button.hasAttribute("data-pending")).toBe(false);
  });
});
