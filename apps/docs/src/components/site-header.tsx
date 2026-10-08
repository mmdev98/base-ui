import Link from "next/link";
import * as React from "react";
import { SITE } from "@/nav";
import { GitHubIcon } from "./icons";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { Search } from "./search";

export function SiteHeader(props: { docs?: boolean }): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 md:px-6">
        {props.docs ? <MobileNav /> : null}
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 font-mono text-[13px] text-muted md:flex">
          <Link href="/docs" className="hover:text-fg">
            docs
          </Link>
          <Link href="/docs/components/gallery" className="hover:text-fg">
            components
          </Link>
          <Link href="/docs/base-ui" className="hover:text-fg">
            base-ui
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Search />
          <a
            href={SITE.repository}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-panel hover:text-fg"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
