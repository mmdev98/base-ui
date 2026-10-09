import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";
import { pageContent } from "@/content/pages";
import { withBasePath } from "@/lib/base-path";
import { getPageSections } from "@/lib/markdown";
import {
  findPage,
  getPageHref,
  getSection,
  pages,
  SITE,
  type DocPage,
} from "@/nav";
import { CopyButton } from "./copy-button";
import { ExternalLinkIcon, GitHubIcon, MarkdownIcon } from "./icons";
import { NewBadge } from "./new-badge";
import { ScrollArea } from "./scroll-area";
import { TableOfContents } from "./table-of-contents";

const pageActionClass =
  "inline-flex items-center gap-1.5 text-faint transition-colors hover:text-accent";

export function getDocMetadata(slug: string): Metadata {
  const page = findPage(slug);
  return page ? { title: page.title, description: page.description } : {};
}

export function getMarkdownHref(page: DocPage): string {
  return withBasePath(`/md/${page.slug || "index"}.md`);
}

export async function DocPageView(props: {
  slug: string;
}): Promise<React.ReactElement> {
  const page = findPage(props.slug);
  const load = page && pageContent[page.slug];
  if (!page || !load) {
    notFound();
  }

  const { default: Content } = await load();
  const sections = getPageSections(page).map(({ id, heading, level }) => ({
    id,
    heading,
    level,
  }));
  const index = pages.indexOf(page);
  const previous = pages[index - 1];
  const next = pages[index + 1];

  return (
    <div className="flex gap-10">
      <article
        data-doc-content
        className="min-w-0 flex-1 pt-10 pb-24 md:pl-8 xl:pl-12"
      >
        <p className="mb-4 font-mono text-xs text-faint">
          <Link href="/docs" className="hover:text-fg">
            docs
          </Link>
          <span className="px-1.5 text-line-strong">/</span>
          {getSection(page).title.toLowerCase()}
          {page.slug ? (
            <>
              <span className="px-1.5 text-line-strong">/</span>
              <span className="text-accent">{page.slug.split("/").pop()}</span>
            </>
          ) : null}
        </p>
        <h1 className="flex items-center gap-3 font-mono text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          {page.title}
          {page.new ? <NewBadge /> : null}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">
          {page.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-3 font-mono text-xs">
          {page.api ? (
            <span className="flex min-w-0 items-center gap-1 text-muted">
              <code className="truncate">
                <span className="text-faint">import</span> {"{ "}
                <span className="text-fg">{page.title}</span>
                {" }"} <span className="text-faint">from</span>{" "}
                <span className="text-accent">
                  &quot;{SITE.packageName}/{page.api}&quot;
                </span>
              </code>
              <CopyButton
                value={`import { ${page.title} } from "${SITE.packageName}/${page.api}";`}
                label="Copy the import"
                className="size-6 shrink-0"
              />
            </span>
          ) : null}
          <span className="flex gap-4 sm:ml-auto">
            {page.api ? (
              <a
                href={`${SITE.repository}/tree/main/packages/react/src/${page.api}`}
                target="_blank"
                rel="noreferrer"
                className={pageActionClass}
              >
                <GitHubIcon width={12} height={12} />
                source
              </a>
            ) : null}
            <a href={getMarkdownHref(page)} className={pageActionClass}>
              <MarkdownIcon />
              markdown
            </a>
            <a
              href={`${SITE.repository}/blob/main/apps/docs/src/content/${page.file}`}
              target="_blank"
              rel="noreferrer"
              className={pageActionClass}
            >
              edit
              <ExternalLinkIcon />
            </a>
          </span>
        </div>

        <div className="mt-8">
          <Content />
        </div>

        <nav
          aria-label="Pagination"
          className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={getPageHref(previous)}
              className="border border-line px-4 py-3 hover:border-line-strong hover:bg-panel"
            >
              <span className="block font-mono text-xs text-faint">
                ← previous
              </span>
              <span className="text-sm text-fg">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={getPageHref(next)}
              className="border border-line px-4 py-3 text-right hover:border-line-strong hover:bg-panel"
            >
              <span className="block font-mono text-xs text-faint">next →</span>
              <span className="text-sm text-fg">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>

      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 flex-col xl:flex">
        <ScrollArea className="flex-1" fadeEdges>
          <div className="py-10">
            <TableOfContents entries={sections} />
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
