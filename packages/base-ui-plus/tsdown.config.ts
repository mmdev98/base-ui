import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsdown";

const OUT_DIR = "build";

// The package is published from `build/` (`publishConfig.directory`), so the
// tarball has `dialog/index.js` at its root like Base UI. pnpm reads the
// `package.json` inside `build/`, so write one whose `exports` point at the
// files next to it and leave out what is only needed to build the package.
function writePublishedPackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const publishConfig = { ...packageJson.publishConfig };
  delete publishConfig.directory;
  delete publishConfig.linkDirectory;

  const published = { ...packageJson, publishConfig };
  delete published.scripts;
  delete published.devDependencies;
  delete published.files;
  if (Object.keys(publishConfig).length === 0) delete published.publishConfig;

  // Rewrite `./build/dialog/index.js` to `./dialog/index.js`.
  published.exports = JSON.parse(
    JSON.stringify(packageJson.exports).replaceAll(`"./${OUT_DIR}/`, `"./`),
  );

  fs.writeFileSync(
    path.join(OUT_DIR, "package.json"),
    `${JSON.stringify(published, null, 2)}\n`,
  );
}

export default defineConfig({
  // One entry per export path: `src/dialog/index.ts` → `build/dialog/index.js`.
  entry: ["src/index.ts", "src/*/index.ts"],
  root: "src",
  outDir: OUT_DIR,
  format: "esm",
  platform: "neutral",
  // Mirror `src/`, one output file per source file, so `"use client"` stays at
  // the top of each part and there are no shared hashed chunks.
  unbundle: true,
  // Rolldown warns that `"use client"` may be lost when files are merged. With
  // `unbundle` they never are, so the directive is always kept.
  checks: { moduleLevelDirective: false },
  dts: true,
  clean: true,
  copy: ["README.md", "LICENSE"],
  hooks: {
    "build:done": writePublishedPackageJson,
  },
});
