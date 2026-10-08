import { visit } from "unist-util-visit";

/**
 * Keeps the meta string of a code fence (```tsx title="Anatomy") on the
 * `<code>` element as `data-meta`, so `CodeBlock` can show the title.
 */
export default function remarkCodeMeta() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.meta) {
        return;
      }
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        "data-meta": node.meta,
      };
    });
  };
}
