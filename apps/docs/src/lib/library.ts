import "server-only";
import * as fs from "node:fs";
import * as path from "node:path";

/** Root of the published package, read from source like the demos. */
export const LIBRARY_ROOT = path.resolve(process.cwd(), "../../packages/react");
export const LIBRARY_SRC = path.join(LIBRARY_ROOT, "src");

function readJson(file: string): { version: string } {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getLibraryVersion(): string {
  return readJson(path.join(LIBRARY_ROOT, "package.json")).version;
}
