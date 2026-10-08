import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";
import { pageContent } from "@/content/pages";
import { getPageSections } from "@/lib/markdown";
import {
  findPage,
  getPageHref,
  getSection,
  pages,
  SITE,
  type DocPage,
} from "@/nav";
import { ExternalLinkIcon, GitHubIcon, MarkdownIcon } from "./icons";
import { TableOfContents } from "./table-of-contents";

const pageActionClass =
  "group inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function getDocMetadata(slug: string): Metadata {
  const page = findPage(slug);
  return page ? { title: page.title, description: page.description } : {};
}

export function getMarkdownHref(page: DocPage): string {
  return `/md/${page.slug || "index"}.md`;
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
        <p className="mb-3 font-mono text-xs text-accent">
          {"// "}
          {getSection(page).title.toLowerCase()}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <h1 className="font-mono text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            {page.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <a href={getMarkdownHref(page)} className={pageActionClass}>
              <MarkdownIcon className="text-faint group-hover:text-accent" />
              View as Markdown
            </a>
            <a
              href={`${SITE.repository}/blob/main/apps/docs/src/content/${page.file}`}
              target="_blank"
              rel="noreferrer"
              className={pageActionClass}
            >
              <GitHubIcon
                width={14}
                height={14}
                className="text-faint group-hover:text-accent"
              />
              Edit on GitHub
              <ExternalLinkIcon className="text-faint" />
            </a>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">
          {page.description}
        </p>

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
              className="rounded-lg border border-line px-4 py-3 hover:border-line-strong hover:bg-panel"
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
              className="rounded-lg border border-line px-4 py-3 text-right hover:border-line-strong hover:bg-panel"
            >
              <span className="block font-mono text-xs text-faint">next →</span>
              <span className="text-sm text-fg">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>

      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 overflow-y-auto py-10 xl:block">
        <TableOfContents entries={sections} />
      </aside>
    </div>
  );
}
