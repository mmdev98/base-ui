// @ts-check
import * as path from "node:path";
import nextMdx from "@next/mdx";

/** @param {string} name */
const pipeline = (name) => path.join(import.meta.dirname, "src/pipeline", name);

const withMdx = nextMdx({
  options: {
    remarkPlugins: [
      "remark-gfm",
      pipeline("remark-code-meta.mjs"),
      pipeline("remark-demos.mjs"),
    ],
    rehypePlugins: ["rehype-slug"],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
  serverExternalPackages: ["typescript", "shiki"],
  devIndicators: false,
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    distDir: "export",
  }),
};

export default withMdx(nextConfig);
