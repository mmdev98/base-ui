"use client";

import { Clipboard } from "@mmdev98/base-ui-plus/clipboard";
import { cn } from "cn";
import * as React from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function CopyButton(props: {
  value: string;
  label?: string;
  className?: string;
}): React.ReactElement {
  const { value, label = "Copy code", className } = props;

  return (
    <Clipboard.Root value={value}>
      <Clipboard.Trigger
        aria-label={label}
        className={cn(
          "group relative flex size-7 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-raised hover:text-fg data-copied:text-accent",
          className,
        )}
      >
        <CopyIcon className="group-data-copied:invisible" />
        <Clipboard.Indicator className="absolute inset-0 flex items-center justify-center">
          <CheckIcon />
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
}
