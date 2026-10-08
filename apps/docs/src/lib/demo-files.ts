import "server-only";
import * as fs from "node:fs";
import * as path from "node:path";

export interface DemoFile {
  name: string;
  code: string;
}

const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"];

function resolveImport(from: string, specifier: string): string | null {
  const base = path.resolve(path.dirname(from), specifier);
  if (fs.existsSync(base) && fs.statSync(base).isFile()) {
    return base;
  }
  return (
    EXTENSIONS.map((extension) => base + extension).find((file) =>
      fs.existsSync(file),
    ) ?? null
  );
}

/**
 * Reads a demo and the local files it imports (`./_classes`), so the code shown
 * is everything needed to copy the demo. The demo comes first.
 */
export function readDemoFiles(entry: string): DemoFile[] {
  const root = path.dirname(entry);
  const files: DemoFile[] = [];
  const seen = new Set<string>();
  const queue = [path.resolve(entry)];

  while (queue.length > 0) {
    const file = queue.shift()!;
    if (seen.has(file)) {
      continue;
    }
    seen.add(file);

    const code = fs.readFileSync(file, "utf8");
    files.push({ name: path.relative(root, file).replaceAll("\\", "/"), code });

    for (const [, specifier] of code.matchAll(
      /from\s+["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      const resolved = resolveImport(file, specifier!);
      if (resolved) {
        queue.push(resolved);
      }
    }
  }
  return files;
}
