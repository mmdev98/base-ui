"use client";

import { Tabs } from "@logic-ui/react/tabs";
import * as React from "react";
import { CopyButton } from "./copy-button";
import { ScrollArea } from "./scroll-area";

export interface InstallTabsCommand {
  name: string;
  code: string;
  html: string;
}

export function InstallTabs(props: {
  commands: InstallTabsCommand[];
}): React.ReactElement {
  const { commands } = props;
  const [manager, setManager] = React.useState(commands[0]?.name ?? "");
  const current =
    commands.find((entry) => entry.name === manager) ?? commands[0];

  return (
    <Tabs.Root
      value={manager}
      onValueChange={(value) => setManager(String(value))}
      className="my-6 overflow-hidden border border-line bg-panel"
    >
      <div className="flex h-10 items-center gap-2 border-b border-line pr-1.5 pl-2">
        <ScrollArea className="min-w-0 flex-1" hideScrollbar fadeEdges>
          <Tabs.List className="flex w-max items-center gap-0.5">
            {commands.map((entry) => (
              <Tabs.Tab
                key={entry.name}
                value={entry.name}
                className="h-7 shrink-0 cursor-pointer px-2 font-mono text-xs text-faint hover:text-fg data-active:bg-raised data-active:text-fg"
              >
                {entry.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>
        {current ? (
          <CopyButton
            value={current.code}
            label={`Copy the ${current.name} command`}
          />
        ) : null}
      </div>
      {commands.map((entry) => (
        <Tabs.Panel key={entry.name} value={entry.name}>
          <ScrollArea>
            <div
              className="w-max min-w-full px-4 py-3.5 font-mono text-[13px] leading-6"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          </ScrollArea>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
