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
 * `latest` tag. With an `alias`, the package is installed under that name
 * (`npm:` alias).
 */
export function getInstallCommands(
  packageName: string,
  alias?: string,
): InstallCommandEntry[] {
  const spec = alias
    ? `${alias}@npm:${packageName}@latest`
    : `${packageName}@latest`;
  return PACKAGE_MANAGERS.map((manager) => ({
    name: manager.name,
    command: `${manager.command} ${spec}`,
  }));
}
