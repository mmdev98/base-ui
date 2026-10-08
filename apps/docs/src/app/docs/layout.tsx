import * as React from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { SiteHeader } from "@/components/site-header";
import { getLibraryVersion } from "@/lib/library";

export default function DocsLayout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <SiteHeader docs />
      <div className="bg-hatch bg-fixed">
        <div className="mx-auto flex max-w-7xl border-line bg-canvas px-4 md:border-x md:px-6">
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto py-8 pr-4 md:flex">
            <SidebarNav />
            <p className="mt-auto flex items-center gap-2 px-3 pt-8 font-mono text-[11px] text-faint">
              <span className="size-1.5 bg-accent" />
              in development · v{getLibraryVersion()}
            </p>
          </aside>
          <div className="min-w-0 flex-1">{props.children}</div>
        </div>
      </div>
    </>
  );
}
