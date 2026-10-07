import {
  createTypesFactory,
  createMultipleTypesFactory,
} from '@mui/internal-docs-infra/abstractCreateTypes';
import { ReferenceTable } from '../components/ReferenceTable/ReferenceTable';
import { mdxComponents } from '../mdx-components';
import * as CodeBlock from '../components/CodeBlock';
import { CodeBlockPreComputed } from '../components/CodeBlock/CodeBlockPreComputed';
import { TableCode } from '../components/TableCode';

interface MDXComponents {
  [key: string]: React.FC<any> | MDXComponents;
}

const components: MDXComponents = {
  ...mdxComponents,
  pre: (props) => (
    <CodeBlock.Root>
      <CodeBlockPreComputed {...props} />
    </CodeBlock.Root>
  ),
};

/**
 * Creates a type doc component that renders a reference table for the given component.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param component The component to render a reference table for.
 * @param [meta] Additional meta for the typedocs.
 */
export const createTypes = createTypesFactory({
  TypesTable: ReferenceTable,
  components,
  TypePre: CodeBlock.PreInline,
  ShortTypePre: CodeBlock.TypeInline,
  ShortTypeCode: TableCode,
  DefaultCode: TableCode,
  typeRefComponent: 'TypeRef',
  typePropRefComponent: 'TypePropRef',
});

/**
 * Creates a type doc component that renders a reference table for the given component.
 * A variant is a different implementation style of the same component.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param components The components to render reference tables for.
 * @param [meta] Additional meta for the typedocs.
 */
const createMultipleTypesFromLoader = createMultipleTypesFactory({
  TypesTable: ReferenceTable,
  components,
  TypePre: CodeBlock.PreInline,
  ShortTypePre: CodeBlock.TypeInline,
  ShortTypeCode: TableCode,
  DefaultCode: TableCode,
  typeRefComponent: 'TypeRef',
  typePropRefComponent: 'TypePropRef',
});

/**
 * Base UI's re-exported components are documented from their published `.d.ts` files, where the
 * loader names some parts with the namespace (`Dialog.Handle`). Strip it so pages use the same
 * names as for source files: `<TypesDialog.Handle />`.
 */
function withoutNamespacePrefix<T extends Record<string, unknown>>(types: T): T {
  const result: Record<string, unknown> = { ...types };
  for (const [key, value] of Object.entries(types)) {
    const dot = key.indexOf('.');
    if (dot === -1) continue;
    const shortKey = key.slice(dot + 1);
    if (!(shortKey in result)) result[shortKey] = value;
  }
  return result as T;
}

/**
 * Creates a type doc component that renders a reference table for the given component.
 * A variant is a different implementation style of the same component.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param components The components to render reference tables for.
 * @param [meta] Additional meta for the typedocs.
 */
export const createMultipleTypes: typeof createMultipleTypesFromLoader = (url, typeDef, meta) => {
  const result = createMultipleTypesFromLoader(url, typeDef, meta);
  return { ...result, types: withoutNamespacePrefix(result.types) };
};
