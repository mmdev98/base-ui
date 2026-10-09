import * as React from "react";
import { highlight } from "@/lib/highlight";
import { getInstallCommands } from "@/lib/install";
import { InstallTabs } from "./install-tabs";

/**
 * The install command for each package manager, in tabs. In MDX, write
 * `<InstallCommand package="@logic-ui/react" />`.
 */
export async function InstallCommand(props: {
  package: string;
}): Promise<React.ReactElement> {
  const { package: packageName } = props;

  const commands = await Promise.all(
    getInstallCommands(packageName).map(async (entry) => ({
      name: entry.name,
      code: entry.command,
      html: await highlight(entry.command, "bash"),
    })),
  );

  return <InstallTabs commands={commands} />;
}
