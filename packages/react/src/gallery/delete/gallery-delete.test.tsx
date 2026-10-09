import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

describe("Gallery.Delete", () => {
  it("deletes the active item and shows the pending state", async () => {
    let finish: () => void = () => {};
    const onDelete = vi.fn(
      () => new Promise<void>((resolve) => (finish = resolve)),
    );
    render(
      <Gallery.Root items={ITEMS} defaultIndex={1}>
        <Gallery.Delete onDelete={onDelete} />
      </Gallery.Root>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.hasAttribute("data-pending")).toBe(false);

    await act(async () => {
      fireEvent.click(button);
    });
    expect(onDelete).toHaveBeenCalledWith(ITEMS[1]);
    expect(button.hasAttribute("data-pending")).toBe(true);
    expect(button).toHaveProperty("disabled", true);

    await act(async () => finish());
    expect(button.hasAttribute("data-pending")).toBe(false);
  });

  it("stays usable after onDelete fails", async () => {
    const onDelete = vi.fn(() => Promise.reject(new Error("Nope")));
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.Delete onDelete={onDelete} />
      </Gallery.Root>,
    );
    const button = screen.getByRole("button", { name: "Delete" });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(button).toHaveProperty("disabled", false);
  });
});
