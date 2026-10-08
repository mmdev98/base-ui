import { withBasePath } from "@/lib/base-path";
import { getLibraryVersion } from "@/lib/library";
import { sections, SITE } from "@/nav";

export const dynamic = "force-static";

/** Index of the docs for language models (https://llmstxt.org). */
export function GET(): Response {
  const body = [
    `# ${SITE.name}`,
    "",
    `> Unstyled React components for accessible interfaces, built on Base UI ` +
      `(\`${SITE.packageName}@${getLibraryVersion()}\`). Every Base UI component is re-exported ` +
      "under the same path, plus components Base UI doesn't have. State is exposed as `data-*` attributes.",
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
    "## Optional",
    "",
    `- [Full docs](${withBasePath("/llms-full.txt")}): every page in one file`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
