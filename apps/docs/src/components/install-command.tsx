import * as React from "react";
import { highlight } from "@/lib/highlight";
import { getInstallCommands } from "@/lib/install";
import { InstallTabs } from "./install-tabs";

/**
 * The install command for each package manager, in tabs. In MDX, write
 * `<InstallCommand package="@mmdev98/base-ui" />`. Add `alias="@base-ui/react"`
 * to install it under another name.
 */
export async function InstallCommand(props: {
  package: string;
  alias?: string;
}): Promise<React.ReactElement> {
  const { package: packageName, alias } = props;

  const commands = await Promise.all(
    getInstallCommands(packageName, alias).map(async (entry) => ({
      name: entry.name,
      code: entry.command,
      html: await highlight(entry.command, "bash"),
    })),
  );

  return <InstallTabs commands={commands} />;
}
