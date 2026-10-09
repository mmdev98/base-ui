import Link from "next/link";
import * as React from "react";
import { ArrowRightIcon, GitHubIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { withBasePath } from "@/lib/base-path";
import { getLibraryVersion } from "@/lib/library";
import { getPageHref, sections, SITE } from "@/nav";

const PRINCIPLES = [
  {
    key: "styles",
    value: "none. Parts render plain elements; style them however you like.",
  },
  {
    key: "state",
    value: "data-* attributes: data-open, data-copied, data-zoomed.",
  },
  {
    key: "a11y",
    value: "roles, ARIA, focus and keyboard, following WAI-ARIA patterns.",
  },
  {
    key: "render",
    value: "every part takes a render prop; props and handlers are merged.",
  },
  {
    key: "package",
    value: "one package, one copy and one context for every component.",
  },
  {
    key: "rsc",
    value: "parts are client components; namespaces import from the server.",
  },
];

export default function HomePage(): React.ReactElement {
  const version = getLibraryVersion();
  const ownComponents =
    sections.find((section) => section.title === "Components")?.pages ?? [];

  return (
    <>
      <SiteHeader />
      <div className="bg-hatch bg-fixed">
        <main className="mx-auto max-w-7xl border-line bg-canvas px-4 md:border-x md:px-6">
          {/* Hero */}
          <section className="relative -mx-4 flex flex-col items-center border-b border-line px-4 pt-24 pb-24 text-center md:-mx-6 md:px-6 md:pt-36 md:pb-32">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgb(255_255_255/0.06),transparent)]"
            />

            <p className="relative inline-flex items-center gap-2 border border-line bg-panel py-1 pr-3 pl-2.5 font-mono text-xs text-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-1.5 bg-accent" />
              </span>
              in development
              <span className="text-faint">v{version}</span>
            </p>

            <h1 className="relative mt-8 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tighter text-balance text-fg sm:text-5xl md:text-6xl">
              Unstyled advanced React components for accessible interfaces.
            </h1>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/docs/quick-start"
                className="inline-flex h-9 items-center justify-center gap-1.5 bg-fg px-4 text-sm font-medium text-canvas transition-colors hover:bg-white"
              >
                Get started <ArrowRightIcon />
              </Link>
              <a
                href={SITE.repository}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 border border-line px-4 text-sm text-fg transition-colors hover:border-line-strong hover:bg-panel"
              >
                <GitHubIcon width={13} height={13} /> GitHub
              </a>
            </div>

            <Cross className="-bottom-[5px] -left-[5px]" />
            <Cross className="-right-[5px] -bottom-[5px]" />
          </section>

          {/* Principles */}
          <section className="py-16 md:py-20">
            <SectionLabel>principles</SectionLabel>
            <dl className="mt-6 divide-y divide-line border-y border-line font-mono text-sm">
              {PRINCIPLES.map((item) => (
                <div
                  key={item.key}
                  className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <dt className="text-accent">{item.key}</dt>
                  <dd className="text-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Components */}
          <section className="pb-20 md:pb-28">
            <SectionLabel>components</SectionLabel>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {ownComponents.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={getPageHref(page)}
                    className="group grid gap-1 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-mono text-sm font-medium text-fg">
                      {page.title}
                    </span>
                    <span className="text-sm text-muted">
                      {page.description}
                    </span>
                    <code className="hidden font-mono text-sm text-faint group-hover:text-accent sm:block">
                      {SITE.packageName}/{page.api}
                    </code>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-faint">
              More primitives are on the way. Follow along on{" "}
              <a
                href={SITE.repository}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
              >
                GitHub
              </a>
              .
            </p>
          </section>
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 border-line bg-canvas px-4 py-8 font-mono text-xs text-faint md:flex-row md:items-center md:border-x md:px-6">
            <p>MIT</p>
            <nav className="flex gap-5 text-muted md:ml-auto">
              <Link href="/docs" className="hover:text-fg">
                docs
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
                github
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}

/** A `+` where a horizontal rule meets the side rails. */
function Cross(props: { className: string }): React.ReactElement {
  return (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 11 11"
      className={`absolute hidden text-line-strong md:block ${props.className}`}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" />
    </svg>
  );
}

function SectionLabel(props: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <h2 className="font-mono text-xs text-faint">
      {"// "}
      {props.children}
    </h2>
  );
}
