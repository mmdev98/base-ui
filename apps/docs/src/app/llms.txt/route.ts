import { withBasePath } from "@/lib/base-path";
import { getPageMarkdown } from "@/lib/markdown";
import { getLibraryVersion } from "@/lib/library";
import { pages, sections, SITE } from "@/nav";

export const dynamic = "force-static";

/**
 * The docs for language models (https://llmstxt.org), in one file: the page
 * index, then every page as Markdown.
 */
export function GET(): Response {
  const index = [
    `# ${SITE.name}`,
    "",
    `> Unstyled React components for accessible interfaces ` +
      `(\`${SITE.packageName}@${getLibraryVersion()}\`).`,
    "",
    ...sections.flatMap((section) => [
      `## ${section.title}`,
      "",
      ...section.pages.map(
        (page) =>
          `- [${page.title}](${withBasePath(`/md/${page.slug || "index"}.md`)}): ${page.description}`,
      ),
      "",
    ]),
  ].join("\n");

  const body = [index, ...pages.map(getPageMarkdown)].join("\n\n---\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
