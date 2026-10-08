import * as React from "react";

/** Renders the `code` spans and **bold** of a JSDoc description. */
export function InlineMarkdown(props: {
  children: string;
}): React.ReactElement {
  const parts = props.children.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return (
            <code
              key={index}
              className="bg-raised px-1 py-px font-mono text-[0.85em] text-fg"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-medium text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
