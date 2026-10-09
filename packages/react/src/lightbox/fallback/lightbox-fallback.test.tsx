import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  onTestFinished,
  vi,
} from "vitest";
import { Lightbox } from "..";
import {
  firePointer,
  ITEMS,
  openLightboxAt,
  TestLightbox,
  type TestItem,
} from "../test-utils";

function fallback(keepMounted?: boolean) {
  return (item: TestItem) => (
    <Lightbox.Fallback keepMounted={keepMounted}>
      Can't load {item.alt}
    </Lightbox.Fallback>
  );
}

describe("Lightbox.Fallback", () => {
  it("renders only when the image fails to load", async () => {
    render(<TestLightbox itemChildren={fallback()} />);
    await openLightboxAt("Open image 1 of 3");
    expect(screen.queryByText("Can't load First")).toBeNull();

    fireEvent.error(screen.getByRole("img", { name: "First" }));

    const message = screen.getByText("Can't load First");
    expect(message.hasAttribute("data-error")).toBe(true);
  });

  it("stays in the DOM with keepMounted", async () => {
    render(<TestLightbox itemChildren={fallback(true)} />);
    await openLightboxAt("Open image 1 of 3");
    const message = screen.getByText("Can't load First");
    expect(message.hasAttribute("data-error")).toBe(false);

    fireEvent.error(screen.getByRole("img", { name: "First" }));

    expect(message.hasAttribute("data-error")).toBe(true);
  });

  it("throws outside Lightbox.Item", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() =>
      render(
        <Lightbox.Root items={ITEMS}>
          <Lightbox.Fallback />
        </Lightbox.Root>,
      ),
    ).toThrow("Base UI: LightboxItemContext is missing.");
    consoleError.mockRestore();
  });
});

describe("Lightbox.Fallback with a failed image", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(400);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function openFailed(onValueChange?: (value: unknown) => void) {
    render(
      <TestLightbox itemChildren={fallback()} onValueChange={onValueChange} />,
    );
    await openLightboxAt("Open image 1 of 3");
    fireEvent.error(screen.getByRole("img", { name: "First" }));
    return screen.getByText("Can't load First");
  }

  it("moves with the drag to close", async () => {
    const message = await openFailed();
    const viewport = screen.getByTestId("viewport");
    expect(message.style.translate).toBe("");

    await act(async () => {
      firePointer("pointerDown", viewport, 200, 100);
      firePointer("pointerMove", viewport, 205, 140);
      firePointer("pointerMove", viewport, 210, 160);
    });

    expect(message.style.translate).toBe("10px 60px");
    expect(Number(message.style.scale)).toBeLessThan(1);
  });

  it("closes after a long drag down", async () => {
    const onValueChange = vi.fn();
    await openFailed(onValueChange);
    const viewport = screen.getByTestId("viewport");

    await act(async () => {
      firePointer("pointerDown", viewport, 200, 100);
      firePointer("pointerMove", viewport, 205, 160);
      firePointer("pointerMove", viewport, 205, 250);
      firePointer("pointerUp", viewport, 205, 250);
    });

    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("stays open after a short drag", async () => {
    const onValueChange = vi.fn();
    await openFailed(onValueChange);
    const viewport = screen.getByTestId("viewport");

    await act(async () => {
      firePointer("pointerDown", viewport, 200, 100);
      firePointer("pointerMove", viewport, 202, 112);
      firePointer("pointerMove", viewport, 202, 120);
    });
    await wait(200);
    await act(async () => {
      firePointer("pointerUp", viewport, 202, 120);
    });

    expect(onValueChange).not.toHaveBeenCalledWith(null);
  });

  it("doesn't zoom the failed image", async () => {
    await openFailed();
    const popup = screen.getByTestId("popup");

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "+" });
    await wait(400);

    expect(popup.hasAttribute("data-zoomed")).toBe(false);
  });
});

function wait(ms: number) {
  return act(
    () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      }),
  );
}

describe("Lightbox.Fallback flight", () => {
  /** Records each flight: jsdom has no Web Animations. They never end. */
  function mockAnimate() {
    const animate = vi.fn(function (this: HTMLElement) {
      return {
        finished: new Promise(() => {}),
        cancel: () => {},
      } as unknown as Animation;
    });
    Object.defineProperty(HTMLElement.prototype, "animate", {
      configurable: true,
      value: animate,
    });
    onTestFinished(() => {
      delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
    });
    return animate;
  }

  it("flies the fallback in when the image fails while it opens", async () => {
    const animate = mockAnimate();
    render(<TestLightbox itemChildren={fallback()} />);
    await openLightboxAt("Open image 1 of 3");
    const image = screen.getByRole("img", { name: "First" });
    expect(animate.mock.contexts.at(-1)).toBe(image);

    fireEvent.error(image);

    const message = screen.getByText("Can't load First");
    expect(animate.mock.contexts.at(-1)).toBe(message);
  });

  it("flies the fallback back on close, from where the drag left it", async () => {
    const animate = mockAnimate();
    render(<TestLightbox itemChildren={fallback()} />);
    await openLightboxAt("Open image 1 of 3");
    fireEvent.error(screen.getByRole("img", { name: "First" }));
    const message = screen.getByText("Can't load First");
    message.style.translate = "10px 60px";
    message.style.scale = "0.9";
    animate.mockClear();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
    });

    expect(animate.mock.contexts[0]).toBe(message);
    const [keyframes] = animate.mock.calls[0] as unknown as [Keyframe[]];
    expect(keyframes[0]?.transform).toBe("translate(10px, 60px) scale(0.9)");
    // The flight takes the drag over as a `transform`.
    expect(message.style.translate).toBe("");
  });
});
