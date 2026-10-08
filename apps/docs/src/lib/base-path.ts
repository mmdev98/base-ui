/**
 * Path the site is served under (`/base-ui-plus` on GitHub Pages, `""` locally), set by
 * `DOCS_BASE_PATH` at build time. `next/link` and the router add it themselves; plain `<a>`,
 * `fetch` and metadata URLs need {@link withBasePath}.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
