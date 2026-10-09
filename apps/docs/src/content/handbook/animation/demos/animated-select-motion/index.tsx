"use client";
import * as React from "react";
import { Select } from "@logic-ui/react/select";
import { AnimatePresence, motion } from "motion/react";

const fonts = [
  { label: "Select font", value: null },
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

export default function AnimatedSelectMotionDemo() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const positionerRef = React.useCallback(() => {
    setMounted(true);
  }, []);

  const portalMounted = open || mounted;

  // Once the trigger has been interacted with, the popup will always be
  // mounted in the DOM. We can use this to determine which animation variant
  // to use: if it's already mounted, we switch to use "keepMounted" animations.
  const motionElement = mounted ? (
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        scale: open ? 1 : 0.8,
      }}
    />
  ) : (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    />
  );

  return (
    <Select.Root items={fonts} open={open} onOpenChange={setOpen}>
      <Select.Trigger className="flex h-8 min-w-36 items-center justify-between gap-3 pl-2 pr-1 text-sm leading-5 font-normal border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 data-pressed:bg-neutral-100 dark:data-pressed:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
        <Select.Value className="data-placeholder:text-neutral-500 dark:data-placeholder:text-neutral-400" />
        <Select.Icon>
          <CaretUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <AnimatePresence>
        {portalMounted && (
          <Select.Portal>
            <Select.Positioner
              className="z-10 outline-hidden select-none"
              sideOffset={4}
              ref={positionerRef}
            >
              <Select.Popup
                className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] bg-clip-padding border border-neutral-950 bg-white text-neutral-950 outline-hidden shadow-[0.25rem_0.25rem_0] shadow-black/12 data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none"
                render={motionElement}
              >
                <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950 data-[side=none]:before:top-[-100%]" />
                <Select.List className="relative max-h-[var(--available-height)] scroll-py-6 overflow-y-auto py-1">
                  {fonts.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-neutral-950 data-highlighted:text-white dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
                    >
                      <Select.ItemIndicator className="col-start-1">
                        <CheckIcon />
                      </Select.ItemIndicator>
                      <Select.ItemText className="col-start-2">
                        {label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
                <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950 data-[side=none]:before:bottom-[-100%]" />
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        )}
      </AnimatePresence>
    </Select.Root>
  );
}

function CaretUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
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
