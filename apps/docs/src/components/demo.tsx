import * as React from "react";
import { readDemoFiles } from "@/lib/demo-files";
import { getLanguage, highlight } from "@/lib/highlight";
import { DemoFrame } from "./demo-frame";

/**
 * A live demo and its source. In MDX, write `<Demo src="./demos/grid.tsx" />`:
 * the `remark-demos` plugin imports the file as `component` and passes its
 * absolute `path`, read here with the local files it imports.
 */
export async function Demo(props: {
  component: React.ComponentType;
  path: string;
  className?: string;
}): Promise<React.ReactElement> {
  const { component: Component, path, className } = props;

  const files = await Promise.all(
    readDemoFiles(path).map(async (file) => ({
      name: file.name,
      code: file.code,
      html: await highlight(file.code.trimEnd(), getLanguage(file.name)),
    })),
  );

  return (
    <DemoFrame files={files} className={className}>
      <Component />
    </DemoFrame>
  );
}
