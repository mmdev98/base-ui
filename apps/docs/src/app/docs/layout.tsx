import * as React from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { SiteHeader } from "@/components/site-header";

export default function DocsLayout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <SiteHeader docs />
      <div className="mx-auto flex max-w-7xl px-4 md:px-6">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pr-4 md:block">
          <SidebarNav />
        </aside>
        <div className="min-w-0 flex-1">{props.children}</div>
      </div>
    </>
  );
}
