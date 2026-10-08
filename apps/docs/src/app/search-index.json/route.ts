import { getSearchEntries } from "@/lib/markdown";
import { pages } from "@/nav";

export const dynamic = "force-static";

/** The search index, built at build time and fetched by the search dialog. */
export function GET(): Response {
  return Response.json(pages.flatMap(getSearchEntries));
}
