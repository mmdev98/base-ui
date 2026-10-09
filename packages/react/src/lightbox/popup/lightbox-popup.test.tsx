import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toolbar } from "@base-ui/react/toolbar";
import { openLightboxAt, TestLightbox } from "../test-utils";

describe("Lightbox.Popup", () => {
  it("renders a dialog named by the title", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    expect(screen.getByRole("dialog", { name: "Photos" })).toBeTruthy();
  });

  it("closes with Escape", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");

    await act(async () => {
      fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    });

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it.each([
    { key: "ArrowRight", from: 0, to: "2 / 3" },
    { key: "ArrowLeft", from: 1, to: "1 / 3" },
    { key: "End", from: 0, to: "3 / 3" },
    { key: "Home", from: 2, to: "1 / 3" },
  ])("moves with $key", async ({ key, from, to }) => {
    render(<TestLightbox />);
    await openLightboxAt(`Open image ${from + 1} of 3`);
    expect(screen.getByTestId("value").textContent).not.toBe(to);

    await act(async () => {
      fireEvent.keyDown(screen.getByRole("dialog"), { key });
    });

    expect(screen.getByTestId("value").textContent).toBe(to);
  });

  it("leaves the arrow keys to a Base UI toolbar inside it", async () => {
    render(
      <TestLightbox
        popupChildren={
          <Toolbar.Root>
            <Toolbar.Button>Rotate</Toolbar.Button>
            <Toolbar.Button>Share</Toolbar.Button>
          </Toolbar.Root>
        }
      />,
    );
    await openLightboxAt("Open image 1 of 3");
    const rotate = screen.getByRole("button", { name: "Rotate" });
    act(() => rotate.focus());

    await act(async () => {
      fireEvent.keyDown(rotate, { key: "ArrowRight" });
    });

    expect(screen.getByTestId("value").textContent).toBe("1 / 3");
  });

  it("leaves the arrow keys to a text field inside it", async () => {
    render(<TestLightbox popupChildren={<input aria-label="Comment" />} />);
    await openLightboxAt("Open image 1 of 3");
    const input = screen.getByRole("textbox", { name: "Comment" });
    act(() => input.focus());

    await act(async () => {
      fireEvent.keyDown(input, { key: "ArrowRight" });
    });

    expect(screen.getByTestId("value").textContent).toBe("1 / 3");
  });

  it("exposes data-zoomed and resets the zoom with 0", async () => {
    render(<TestLightbox />);
    await openLightboxAt("Open image 1 of 3");
    const popup = screen.getByTestId("popup");
    expect(popup.hasAttribute("data-zoomed")).toBe(false);

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "+" });
    await waitFor(() => expect(popup.hasAttribute("data-zoomed")).toBe(true));

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "0" });
    await waitFor(() => expect(popup.hasAttribute("data-zoomed")).toBe(false));
  });
});
