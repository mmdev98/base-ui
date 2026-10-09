import { getPageMarkdown } from "@/lib/markdown";
import { findPage, pages } from "@/nav";

type Params = Promise<{ slug: string[] }>;

export const dynamic = "force-static";
export const dynamicParams = false;

/** `/md/components/lightbox.md`; `/md/index.md` is the introduction. */
export function generateStaticParams(): { slug: string[] }[] {
  return pages.map((page) => ({
    slug: `${page.slug || "index"}.md`.split("/"),
  }));
}

export async function GET(
  _request: Request,
  context: { params: Params },
): Promise<Response> {
  const { slug } = await context.params;
  const path = slug.join("/").replace(/\.md$/, "");
  const page = findPage(path === "index" ? "" : path);
  if (!page) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(getPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
