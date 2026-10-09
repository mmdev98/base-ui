import { cn } from "cn";
import * as React from "react";

/** Marks a page added in a recent release (`new: true` in `nav.ts`). */
export function NewBadge(props: { className?: string }): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex h-4 items-center border border-accent/40 px-1 font-mono text-[10px] leading-none font-medium tracking-wide text-accent uppercase",
        props.className,
      )}
    >
      new
    </span>
  );
}
