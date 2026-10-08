import Link from "next/link";
import * as React from "react";
import { withBasePath } from "@/lib/base-path";
import { SITE } from "@/nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { Search } from "./search";

export function SiteHeader(props: { docs?: boolean }): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 border-line px-4 md:border-x md:px-6">
        {props.docs ? <MobileNav /> : null}
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 font-mono text-[13px] text-muted md:flex">
          <Link href="/docs" className="hover:text-fg">
            Docs
          </Link>
          <a href={withBasePath("/llms.txt")} className="hover:text-fg">
            llms.txt
          </a>
          <a
            href={SITE.repository}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            GitHub
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Search />
        </div>
      </div>
    </header>
  );
}
