"use client";
import * as React from "react";
import { Clipboard } from "@mmdev98/base-ui/clipboard";

export default function ExampleClipboard() {
  return (
    <Clipboard.Root
      value="pnpm add @mmdev98/base-ui"
      className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white py-1 pr-1 pl-3 text-neutral-950 data-copied:border-green-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
    >
      <code className="font-mono text-sm">pnpm add @mmdev98/base-ui</code>
      <Clipboard.Trigger
        aria-label="Copy the install command"
        className="group relative flex size-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-0 text-inherit hover:bg-neutral-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:hover:bg-neutral-800 dark:focus-visible:outline-white"
      >
        {/* The copy icon gives way to the check while copied. */}
        <CopyIcon className="group-data-copied:invisible" />
        <Clipboard.Indicator className="absolute inset-0 flex items-center justify-center text-green-600">
          <CheckIcon />
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
}

function CopyIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <rect
        x="5"
        y="5"
        width="8.5"
        height="8.5"
        rx="1.5"
        stroke="currentColor"
      />
      <path
        d="M3 10.5V3.5A1 1 0 0 1 4 2.5h6.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
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
      aria-hidden
      {...props}
    >
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
