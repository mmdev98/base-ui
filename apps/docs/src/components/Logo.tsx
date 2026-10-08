import * as React from "react";

export function Logo(): React.ReactElement {
  return (
    <span className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
      <span
        aria-hidden
        className="flex size-6 items-center justify-center rounded-md border border-line-strong bg-panel text-accent"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <span>
        base-ui<span className="text-accent">+</span>
      </span>
    </span>
  );
}
