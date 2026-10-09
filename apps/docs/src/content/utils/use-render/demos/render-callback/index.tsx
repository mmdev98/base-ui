"use client";
import * as React from "react";
import { useRender } from "@logic-ui/react/use-render";
import { mergeProps } from "@logic-ui/react/merge-props";

interface CounterState {
  odd: boolean;
}

type CounterProps = useRender.ComponentProps<"button", CounterState>;

function Counter(props: CounterProps) {
  const { render, ...otherProps } = props;

  const [count, setCount] = React.useState(0);
  const odd = count % 2 === 1;
  const state = React.useMemo(() => ({ odd }), [odd]);

  const defaultProps: useRender.ElementProps<"button"> = {
    className:
      "m-0 flex h-8 items-center justify-center gap-1 rounded-none border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-3 text-sm leading-5 font-normal text-neutral-950 dark:text-white outline-0 select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white",
    type: "button",
    children: (
      <React.Fragment>
        Counter:{" "}
        <span className="inline-block min-w-[2ch] text-end tabular-nums">
          {count}
        </span>
      </React.Fragment>
    ),
    onClick() {
      setCount((prev) => prev + 1);
    },
    "aria-label": `Count is ${count}, click to increase.`,
  };

  const element = useRender({
    defaultTagName: "button",
    render,
    state,
    props: mergeProps<"button">(defaultProps, otherProps),
  });

  return element;
}

export default function ExampleCounter() {
  return (
    <Counter
      render={(props, state) => (
        <button {...props}>
          {props.children}
          <span className="ml-2 border-l border-current pl-2 text-xs leading-4 font-bold uppercase">
            {state.odd ? "👎" : "👍"}
          </span>
        </button>
      )}
    />
  );
}
