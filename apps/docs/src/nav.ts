/**
 * Every docs page, in sidebar order. This is the one list the sidebar, the
 * routes, search and llms.txt read. Add a page here and its MDX file in
 * `src/content/pages.ts`.
 */
export interface DocPage {
  /** URL under `/docs`; `""` is `/docs` itself. */
  slug: string;
  title: string;
  description: string;
  /** MDX file under `src/content`. */
  file: string;
  /** Library entry point whose API the page documents (`src/<api>`). */
  api?: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export const sections: DocSection[] = [
  {
    title: "Overview",
    pages: [
      {
        slug: "",
        title: "Introduction",
        description:
          "Unstyled React components for accessible interfaces, built on Base UI.",
        file: "introduction.mdx",
      },
      {
        slug: "quick-start",
        title: "Quick start",
        description:
          "Install the package, render a primitive and style it with its data attributes.",
        file: "quick-start.mdx",
      },
      {
        slug: "changelog",
        title: "Changelog",
        description: "What changed in each release.",
        file: "changelog.mdx",
      },
    ],
  },
  {
    title: "Components",
    pages: [
      {
        slug: "components/gallery",
        title: "Gallery",
        description:
          "Thumbnails that open a full-screen image viewer with mobile gestures.",
        file: "components/gallery/index.mdx",
        api: "gallery",
      },
      {
        slug: "components/clipboard",
        title: "Clipboard",
        description:
          "A button that copies a value and shows that it was copied.",
        file: "components/clipboard/index.mdx",
        api: "clipboard",
      },
    ],
  },
];

export const pages: DocPage[] = sections.flatMap((section) => section.pages);

export function getPageHref(page: DocPage): string {
  return page.slug ? `/docs/${page.slug}` : "/docs";
}

export function findPage(slug: string): DocPage | undefined {
  return pages.find((page) => page.slug === slug);
}

export function getSection(page: DocPage): DocSection {
  return sections.find((section) => section.pages.includes(page))!;
}

export const SITE = {
  name: "Base UI",
  packageName: "@mmdev98/base-ui",
  repository: "https://github.com/mmdev98/base-ui",
};
