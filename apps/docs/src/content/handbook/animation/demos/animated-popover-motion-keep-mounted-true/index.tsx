"use client";
import * as React from "react";
import { Popover } from "@logic-ui/react/popover";
import { motion, type HTMLMotionProps } from "motion/react";

export default function AnimatedPopoverMotionKeepMountedTrueDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex h-8 items-center justify-center border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-3 text-sm leading-5 font-normal text-neutral-950 dark:text-white select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 data-pressed:bg-neutral-100 dark:data-pressed:bg-neutral-800 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
        Trigger
      </Popover.Trigger>
      <Popover.Portal keepMounted>
        <Popover.Positioner
          className="h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]"
          sideOffset={8}
        >
          <Popover.Popup
            className="h-[var(--popup-height,auto)] w-[var(--popup-width,auto)] max-w-[500px] origin-[var(--transform-origin)] border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-950 dark:text-white outline-none shadow-[0.25rem_0.25rem_0] shadow-black/12 dark:shadow-none"
            render={(props, state) => (
              <motion.div
                {...(props as HTMLMotionProps<"div">)}
                initial={false}
                animate={{
                  opacity: state.open ? 1 : 0,
                  scale: state.open ? 1 : 0.8,
                }}
              />
            )}
          >
            Popup
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
