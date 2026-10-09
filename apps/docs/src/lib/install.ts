/** Package managers shown by `InstallCommand`, in tab order. */
export const PACKAGE_MANAGERS = [
  { name: "pnpm", command: "pnpm add" },
  { name: "npm", command: "npm install" },
  { name: "yarn", command: "yarn add" },
  { name: "bun", command: "bun add" },
] as const;

export interface InstallCommandEntry {
  /** The package manager. */
  name: string;
  command: string;
}

/**
 * The install command of each package manager for `packageName`, at its
 * `latest` tag.
 */
export function getInstallCommands(packageName: string): InstallCommandEntry[] {
  return PACKAGE_MANAGERS.map((manager) => ({
    name: manager.name,
    command: `${manager.command} ${packageName}@latest`,
  }));
}
