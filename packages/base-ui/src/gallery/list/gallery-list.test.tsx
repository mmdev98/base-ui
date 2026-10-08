import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Gallery } from "..";
import { ITEMS } from "../test-utils";

function TestList(props: { onExpandedChange?: (expanded: boolean) => void }) {
  return (
    <Gallery.Root items={ITEMS}>
      <Gallery.List
        limit={2}
        data-testid="list"
        onExpandedChange={props.onExpandedChange}
      >
        {ITEMS.map((item, index) => (
          <Gallery.Trigger key={item.id} index={index} />
        ))}
        <Gallery.More />
      </Gallery.List>
    </Gallery.Root>
  );
}

const getTriggers = () =>
  screen.getAllByRole("button", { name: /^Open image/ });

describe("Gallery.List", () => {
  it("hides the triggers past the limit, keeping a place for More", () => {
    render(<TestList />);
    expect(getTriggers()).toHaveLength(1);
    expect(screen.getByTestId("list").hasAttribute("data-expanded")).toBe(
      false,
    );
  });

  it("shows every trigger once expanded", () => {
    const onExpandedChange = vi.fn();
    render(<TestList onExpandedChange={onExpandedChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Show 2 more" }));

    expect(getTriggers()).toHaveLength(3);
    expect(screen.getByTestId("list").hasAttribute("data-expanded")).toBe(true);
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it("shows every item without a limit", () => {
    render(
      <Gallery.Root items={ITEMS}>
        <Gallery.List>
          {ITEMS.map((item, index) => (
            <Gallery.Trigger key={item.id} index={index} />
          ))}
          <Gallery.More />
        </Gallery.List>
      </Gallery.Root>,
    );
    expect(getTriggers()).toHaveLength(3);
    expect(screen.queryByRole("button", { name: /more/ })).toBeNull();
  });
});
