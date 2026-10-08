import { getPageMarkdown } from "@/lib/markdown";
import { pages } from "@/nav";

export const dynamic = "force-static";

/** Every docs page as Markdown, in one file. */
export function GET(): Response {
  return new Response(pages.map(getPageMarkdown).join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
