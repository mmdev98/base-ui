"use client";

import { Clipboard } from "@mmdev98/base-ui-plus/clipboard";
import * as React from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function InstallCommand(props: { command: string }): React.ReactElement {
  const { command } = props;

  return (
    <Clipboard.Root
      value={command}
      className="group flex h-11 items-center gap-3 rounded-lg border border-line bg-panel/80 pr-1.5 pl-4 font-mono text-sm backdrop-blur transition-colors data-copied:border-accent/60"
    >
      <span aria-hidden className="text-accent select-none">
        $
      </span>
      <code className="text-fg">{command}</code>
      <Clipboard.Trigger
        aria-label="Copy the install command"
        className="relative ml-auto flex size-8 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg data-copied:text-accent"
      >
        <CopyIcon className="group-data-copied:invisible" />
        <Clipboard.Indicator className="absolute inset-0 flex items-center justify-center">
          <CheckIcon />
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
}
