import { cn } from "cn";
import * as React from "react";
import type { DocPage } from "@/nav";

const BADGE_CLASS: Record<NonNullable<DocPage["badge"]>, string> = {
  new: "border-accent/40 text-accent",
  preview: "border-amber-400/40 text-amber-400",
};

/** The badge set by `badge` in `nav.ts`: a recent page, or one whose API may still change. */
export function PageBadge(props: {
  badge: NonNullable<DocPage["badge"]>;
  className?: string;
}): React.ReactElement {
  return (
    <span
      title={
        props.badge === "preview"
          ? "In preview: the API may change in a minor version."
          : undefined
      }
      className={cn(
        "inline-flex h-4 items-center border px-1 font-mono text-[10px] leading-none font-medium tracking-wide uppercase",
        BADGE_CLASS[props.badge],
        props.className,
      )}
    >
      {props.badge}
    </span>
  );
}
