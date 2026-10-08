"use client";

import { cn } from "cn";
import * as React from "react";

export interface TocEntry {
  id: string;
  heading: string;
  level: number;
}

/** Links to the page's h2 and h3 headings, highlighting the one in view. */
export function TableOfContents(props: {
  entries: TocEntry[];
}): React.ReactElement | null {
  const entries = React.useMemo(
    () => props.entries.filter((entry) => entry.level <= 3),
    [props.entries],
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((heading) => heading !== null);
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <nav aria-label="On this page">
      <p className="mb-3 font-mono text-[11px] tracking-widest text-faint uppercase">
        On this page
      </p>
      <ul className="flex flex-col border-l border-line text-[13px]">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l py-1 leading-5 transition-colors hover:text-fg",
                entry.level === 3 ? "pl-6" : "pl-3",
                entry.id === activeId
                  ? "border-accent text-fg"
                  : "border-transparent text-faint",
              )}
            >
              {entry.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
