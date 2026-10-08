import * as React from "react";
import { getBaseUiEntries, getBaseUiVersion } from "@/lib/library";
import { SITE } from "@/nav";

/** Every Base UI entry point the package re-exports, read from the library's folders. */
export function BaseUiComponents(): React.ReactElement {
  const entries = getBaseUiEntries();
  const groups = [
    { title: "Components", entries: entries.filter((entry) => !entry.utility) },
    { title: "Utilities", entries: entries.filter((entry) => entry.utility) },
  ];

  return (
    <div className="my-6 flex flex-col gap-8">
      <p className="font-mono text-xs text-faint">
        @base-ui/react@{getBaseUiVersion()} · {entries.length} entry points
      </p>
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-3 font-mono text-[11px] tracking-widest text-faint uppercase">
            {group.title}
          </p>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {group.entries.map((entry) => (
              <li key={entry.slug} className="bg-canvas">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col gap-0.5 px-4 py-3 hover:bg-panel"
                >
                  <span className="text-sm text-fg">{entry.name} ↗</span>
                  <code className="font-mono text-xs text-faint">
                    {SITE.packageName}/{entry.slug}
                  </code>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
