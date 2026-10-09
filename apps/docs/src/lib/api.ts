import "server-only";
import * as fs from "node:fs";
import * as path from "node:path";
import ts from "typescript";
import { LIBRARY_SRC } from "./library";

/**
 * API reference extracted from the library's TypeScript source: parts and their
 * props, the `data-*` attributes and CSS variables each part documents in its
 * folder, and the value types and enums exported from the component's `index.ts`.
 */

export interface ApiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
  required: boolean;
}

export interface ApiAttribute {
  name: string;
  type?: string;
  description: string;
}

export interface ApiPart {
  /** Short name, as in `Gallery.Root`. */
  name: string;
  /** Full export name, as in `GalleryRoot`. */
  fullName: string;
  description: string;
  props: ApiProp[];
  dataAttributes: ApiAttribute[];
  cssVariables: ApiAttribute[];
}

export interface ApiType {
  name: string;
  kind: "object" | "enum";
  description: string;
  members: ApiProp[];
}

export interface ComponentApi {
  /** Namespace the parts are exported under (`Gallery`), or `null` for a single part. */
  namespace: string | null;
  parts: ApiPart[];
  types: ApiType[];
}

/** Props every part gets from `useRender.ComponentProps`, documented once here. */
const COMMON_PROPS: Record<string, Omit<ApiProp, "name" | "required">> = {
  className: {
    type: "string",
    description: "CSS class applied to the element.",
  },
  style: {
    type: "React.CSSProperties",
    description: "Style applied to the element.",
  },
  render: {
    type: "React.ReactElement | ((props, state) => React.ReactElement)",
    description:
      "Replaces the element with another tag or component, or composes it with one. " +
      "Takes an element, or a function that receives the props and the state.",
  },
};

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
};

const toPosix = (file: string): string => file.replaceAll("\\", "/");
const LIBRARY_SRC_POSIX = toPosix(LIBRARY_SRC);

const cache = new Map<string, { version: number; api: ComponentApi }>();

/** Reads the API of `packages/react/src/<component>`. Cached until a file there changes. */
export function getComponentApi(component: string): ComponentApi {
  const directory = path.join(LIBRARY_SRC, component);
  if (!fs.existsSync(path.join(directory, "index.ts"))) {
    throw new Error(`No library entry point at src/${component}/index.ts.`);
  }

  const version = getLatestChange(directory);
  const cached = cache.get(component);
  if (cached?.version === version) {
    return cached.api;
  }

  const api = extractComponentApi(directory);
  cache.set(component, { version, api });
  return api;
}

function getLatestChange(directory: string): number {
  let latest = 0;
  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
    recursive: true,
  })) {
    if (entry.isFile()) {
      latest = Math.max(
        latest,
        fs.statSync(path.join(entry.parentPath, entry.name)).mtimeMs,
      );
    }
  }
  return latest;
}

function extractComponentApi(directory: string): ComponentApi {
  const indexFile = path.join(directory, "index.ts");
  const partsFile = path.join(directory, "index.parts.ts");
  const hasParts = fs.existsSync(partsFile);

  const program = ts.createProgram(
    hasParts ? [indexFile, partsFile] : [indexFile],
    COMPILER_OPTIONS,
  );
  const checker = program.getTypeChecker();
  const getExports = (file: string): ts.Symbol[] => {
    const sourceFile = program.getSourceFile(file);
    const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
    return moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [];
  };
  const resolve = (symbol: ts.Symbol): ts.Symbol =>
    symbol.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(symbol)
      : symbol;

  const namespace =
    fs
      .readFileSync(indexFile, "utf8")
      .match(/export \* as (\w+) from "\.\/index\.parts"/)?.[1] ?? null;

  const parts = hasParts
    ? getExports(partsFile).flatMap((symbol) => {
        const part = extractPart(checker, symbol.name, resolve(symbol));
        return part ? [part] : [];
      })
    : [];

  const types = getExports(indexFile).flatMap((symbol) => {
    const type = extractType(checker, resolve(symbol));
    return type ? [type] : [];
  });

  return { namespace, parts, types };
}

function getDescription(checker: ts.TypeChecker, symbol: ts.Symbol): string {
  return ts
    .displayPartsToString(symbol.getDocumentationComment(checker))
    .trim();
}

function getDefault(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
): string | undefined {
  const tag = symbol
    .getJsDocTags(checker)
    .find((jsDocTag) => jsDocTag.name === "default");
  return tag?.text ? ts.displayPartsToString(tag.text).trim() : undefined;
}

function isOwnDeclaration(declaration: ts.Declaration): boolean {
  return toPosix(declaration.getSourceFile().fileName).startsWith(
    LIBRARY_SRC_POSIX,
  );
}

/** Props a part inherits from the Base UI part it wraps are part of its API too. */
function isDocumentedProp(declaration: ts.Declaration, name: string): boolean {
  if (name in COMMON_PROPS) {
    return false;
  }
  const file = toPosix(declaration.getSourceFile().fileName);
  return (
    file.startsWith(LIBRARY_SRC_POSIX) || file.includes("/@base-ui/react/")
  );
}

/** The type as written in the source, on one line. */
function getTypeText(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  declaration: ts.Declaration,
): string {
  if (
    (ts.isPropertySignature(declaration) ||
      ts.isPropertyDeclaration(declaration)) &&
    declaration.type
  ) {
    return declaration.type.getText().replace(/\s+/g, " ");
  }
  const type = checker.getNonNullableType(
    checker.getTypeOfSymbolAtLocation(symbol, declaration),
  );
  return checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
}

function extractProps(checker: ts.TypeChecker, type: ts.Type): ApiProp[] {
  const own: ApiProp[] = [];
  const common: ApiProp[] = [];

  for (const symbol of checker.getPropertiesOfType(type)) {
    const declaration = symbol.declarations?.[0];
    if (!declaration) {
      continue;
    }
    const required = !(symbol.flags & ts.SymbolFlags.Optional);

    if (isDocumentedProp(declaration, symbol.name)) {
      own.push({
        name: symbol.name,
        type: getTypeText(checker, symbol, declaration),
        default: getDefault(checker, symbol),
        description: getDescription(checker, symbol),
        required,
      });
    } else if (symbol.name in COMMON_PROPS) {
      common.push({
        name: symbol.name,
        required,
        ...COMMON_PROPS[symbol.name]!,
      });
    }
  }

  const order = Object.keys(COMMON_PROPS);
  common.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  return [...own, ...common];
}

function extractPart(
  checker: ts.TypeChecker,
  name: string,
  symbol: ts.Symbol,
): ApiPart | null {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!declaration) {
    return null;
  }

  const signature = checker
    .getTypeOfSymbolAtLocation(symbol, declaration)
    .getCallSignatures()[0];
  const propsSymbol = signature?.parameters[0];
  const props = propsSymbol
    ? extractProps(
        checker,
        checker.getTypeOfSymbolAtLocation(propsSymbol, declaration),
      )
    : [];

  const partDirectory = path.dirname(declaration.getSourceFile().fileName);
  const documented = (suffix: string): ApiAttribute[] =>
    fs
      .readdirSync(partDirectory)
      .filter((file) => file.endsWith(suffix))
      .flatMap((file) =>
        readDocumentedConstants(path.join(partDirectory, file)),
      );

  return {
    name,
    fullName: symbol.name,
    description: getDescription(checker, symbol),
    props,
    dataAttributes: documented("-data-attributes.ts"),
    cssVariables: documented("-css-vars.ts"),
  };
}

/** Reads `export const zoomed = "data-zoomed";` constants and their JSDoc. */
function readDocumentedConstants(file: string): ApiAttribute[] {
  const sourceFile = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const constants: ApiAttribute[] = [];

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }
    for (const declaration of statement.declarationList.declarations) {
      if (
        !declaration.initializer ||
        !ts.isStringLiteral(declaration.initializer)
      ) {
        continue;
      }
      const jsDoc = ts.getJSDocCommentsAndTags(declaration).find(ts.isJSDoc);
      constants.push({
        name: declaration.initializer.text,
        type: ts.getJSDocType(declaration)?.getText(),
        description: (ts.getTextOfJSDocComment(jsDoc?.comment) ?? "").replace(
          /\s*\n\s*/g,
          " ",
        ),
      });
    }
  }
  return constants;
}

const SKIPPED_TYPE_SUFFIXES = ["Props", "State", "ContextValue"];

function extractType(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
): ApiType | null {
  const declaration = symbol.declarations?.[0];
  if (!declaration || !isOwnDeclaration(declaration)) {
    return null;
  }
  if (SKIPPED_TYPE_SUFFIXES.some((suffix) => symbol.name.endsWith(suffix))) {
    return null;
  }

  if (symbol.flags & ts.SymbolFlags.Enum && ts.isEnumDeclaration(declaration)) {
    return {
      name: symbol.name,
      kind: "enum",
      description: getDescription(checker, symbol),
      members: declaration.members.map((member) => {
        const memberSymbol = checker.getSymbolAtLocation(member.name);
        return {
          name: member.name.getText(),
          type: member.initializer?.getText() ?? "",
          description: memberSymbol
            ? getDescription(checker, memberSymbol)
            : "",
          required: true,
        };
      }),
    };
  }

  if (symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface)) {
    const type = checker.getDeclaredTypeOfSymbol(symbol);
    const properties = checker.getPropertiesOfType(type);
    if (properties.length === 0 || type.getCallSignatures().length > 0) {
      return null;
    }
    return {
      name: symbol.name,
      kind: "object",
      description: getDescription(checker, symbol),
      members: extractProps(checker, type),
    };
  }

  return null;
}

/** The parts in the given order, or all of them in export order. */
export function selectApiParts(api: ComponentApi, order?: string[]): ApiPart[] {
  return order
    ? order.flatMap((name) => api.parts.filter((part) => part.name === name))
    : api.parts;
}
