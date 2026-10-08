import "server-only";
import type { MDXContent } from "mdx/types";

/** Loads each page's MDX, by slug (see `src/nav.ts`). */
export const pageContent: Record<
  string,
  () => Promise<{ default: MDXContent }>
> = {
  "": () => import("./introduction.mdx"),
  "quick-start": () => import("./quick-start.mdx"),
  "components/clipboard": () => import("./components/clipboard/index.mdx"),
  "components/gallery": () => import("./components/gallery/index.mdx"),
};
