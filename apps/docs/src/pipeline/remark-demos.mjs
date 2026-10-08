import * as path from "node:path";
import { visit } from "unist-util-visit";

function program(body) {
  return { type: "Program", sourceType: "module", body };
}

/**
 * Turns `<Demo src="./demos/grid.tsx" />` into
 * `<Demo component={Demo0} path="/abs/path/demos/grid.tsx" />` and imports
 * `Demo0` from the file. `Demo` renders the component and reads the source
 * from `path` at render time, so the code shown is always the current file.
 */
export default function remarkDemos() {
  return (tree, file) => {
    const directory = file.path ? path.dirname(file.path) : file.cwd;
    const imports = [];

    visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], (node) => {
      if (node.name !== "Demo") {
        return;
      }
      const srcAttribute = node.attributes.find(
        (attribute) =>
          attribute.type === "mdxJsxAttribute" && attribute.name === "src",
      );
      if (!srcAttribute || typeof srcAttribute.value !== "string") {
        throw new Error(
          `<Demo> needs a \`src\` string attribute in ${file.path ?? "an MDX file"}.`,
        );
      }

      const source = srcAttribute.value;
      const name = `Demo${imports.length}`;
      imports.push({ name, source });

      node.attributes = node.attributes.filter(
        (attribute) => attribute !== srcAttribute,
      );
      node.attributes.push(
        {
          type: "mdxJsxAttribute",
          name: "component",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: name,
            data: {
              estree: program([
                {
                  type: "ExpressionStatement",
                  expression: { type: "Identifier", name },
                },
              ]),
            },
          },
        },
        {
          type: "mdxJsxAttribute",
          name: "path",
          value: path.resolve(directory, source).replaceAll("\\", "/"),
        },
      );
    });

    if (imports.length === 0) {
      return;
    }

    tree.children.unshift(
      ...imports.map(({ name, source }) => ({
        type: "mdxjsEsm",
        value: `import ${name} from ${JSON.stringify(source)};`,
        data: {
          estree: program([
            {
              type: "ImportDeclaration",
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: { type: "Identifier", name },
                },
              ],
              source: {
                type: "Literal",
                value: source,
                raw: JSON.stringify(source),
              },
            },
          ]),
        },
      })),
    );
  };
}
