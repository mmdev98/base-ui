"use client";
import * as React from "react";
import { Checkbox } from "@mmdev98/base-ui/checkbox";
import { CheckboxGroup } from "@mmdev98/base-ui/checkbox-group";

const groupClassName =
  "ml-4 flex flex-col items-start gap-1 text-neutral-950 dark:text-white";
const itemClassName = "flex items-center gap-2 text-sm font-normal";
const checkboxClassName =
  "flex size-4 shrink-0 items-center justify-center border rounded-none p-0 border-neutral-950 bg-white text-white dark:border-white dark:bg-neutral-950 dark:text-neutral-950 data-checked:bg-neutral-950 data-checked:text-white dark:data-checked:bg-white dark:data-checked:text-neutral-950 data-indeterminate:bg-neutral-950 data-indeterminate:text-white dark:data-indeterminate:bg-white dark:data-indeterminate:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white";
const indicatorClassName = "flex data-unchecked:hidden";

const fruits = ["fuji-apple", "gala-apple", "granny-smith-apple"];

export default function ExampleCheckboxGroup() {
  const id = React.useId();
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={value}
      onValueChange={setValue}
      allValues={fruits}
      className={groupClassName}
    >
      <label className={`${itemClassName} -ml-4`} id={id}>
        <Checkbox.Root className={checkboxClassName} parent>
          <Checkbox.Indicator
            className={indicatorClassName}
            render={(props, state) => (
              <span {...props}>
                {state.indeterminate ? <HorizontalRuleIcon /> : <CheckIcon />}
              </span>
            )}
          />
        </Checkbox.Root>
        Apples
      </label>

      <label className={itemClassName}>
        <Checkbox.Root value="fuji-apple" className={checkboxClassName}>
          <Checkbox.Indicator className={indicatorClassName}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Fuji
      </label>

      <label className={itemClassName}>
        <Checkbox.Root value="gala-apple" className={checkboxClassName}>
          <Checkbox.Indicator className={indicatorClassName}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Gala
      </label>

      <label className={itemClassName}>
        <Checkbox.Root value="granny-smith-apple" className={checkboxClassName}>
          <Checkbox.Indicator className={indicatorClassName}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Granny Smith
      </label>
    </CheckboxGroup>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function HorizontalRuleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      strokeWidth={1}
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
