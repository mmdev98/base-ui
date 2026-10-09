"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { getPageHref, sections } from "@/nav";
import { NewBadge } from "./new-badge";

export function SidebarNav(props: {
  onNavigate?: () => void;
}): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="flex flex-col gap-7">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 font-mono text-xs text-faint">
            {"// "}
            {section.title.toLowerCase()}
          </p>
          <ul className="flex flex-col gap-px">
            {section.pages.map((page) => {
              const href = getPageHref(page);
              const current = pathname === href;
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    onClick={props.onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "relative flex h-8 items-center px-3 text-sm text-muted transition-colors hover:bg-panel hover:text-fg",
                      current &&
                        "bg-panel text-fg before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-accent",
                    )}
                  >
                    {page.title}
                    {page.new ? <NewBadge className="ml-auto" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
