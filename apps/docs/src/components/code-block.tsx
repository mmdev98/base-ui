import { cn } from "cn";
import * as React from "react";
import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export async function CodeBlock(props: {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}): Promise<React.ReactElement> {
  const { code, language, title, className } = props;
  const trimmed = code.replace(/\n$/, "");
  const html = await highlight(trimmed, language);

  return (
    <figure
      className={cn(
        "group/code relative my-6 overflow-hidden border border-line bg-panel",
        className,
      )}
    >
      {title ? (
        <figcaption className="flex h-10 items-center justify-between border-b border-line pr-1.5 pl-4 font-mono text-xs text-muted">
          {title}
          <CopyButton value={trimmed} />
        </figcaption>
      ) : (
        <CopyButton
          value={trimmed}
          className="absolute top-2 right-2 bg-panel opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100"
        />
      )}
      <div
        className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
