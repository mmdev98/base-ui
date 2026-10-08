import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import * as React from "react";
import { ApiReference } from "./components/api-reference";
import { CodeBlock } from "./components/code-block";
import { Demo } from "./components/demo";
import { HeadingAnchor } from "./components/heading-anchor";

type CodeElementProps = {
  className?: string;
  children?: React.ReactNode;
  "data-meta"?: string;
};

const components: MDXComponents = {
  Demo,
  ApiReference,
  h1: (props) => (
    <h1
      className="font-mono text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h2: ({ id, children }) => (
    <HeadingAnchor level={2} id={id}>
      {children}
    </HeadingAnchor>
  ),
  h3: ({ id, children }) => (
    <HeadingAnchor level={3} id={id}>
      {children}
    </HeadingAnchor>
  ),
  h4: ({ id, children }) => (
    <HeadingAnchor level={4} id={id}>
      {children}
    </HeadingAnchor>
  ),
  p: (props) => <p className="my-4 leading-7 text-muted" {...props} />,
  a: ({ href = "", ...props }) => {
    const className =
      "text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent";
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-medium text-fg" {...props} />,
  ul: (props) => (
    <ul
      className="my-4 list-disc space-y-2 pl-5 leading-7 text-muted marker:text-faint"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-5 leading-7 text-muted marker:text-faint"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-4 text-muted [&>p]:my-2"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto border border-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-line bg-panel px-4 py-2.5 font-mono text-xs font-medium text-muted"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-t border-line px-4 py-2.5 text-muted first:text-fg"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="border border-line bg-panel px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
      {...props}
    />
  ),
  pre: ({ children }) => {
    const code = React.isValidElement<CodeElementProps>(children)
      ? children.props
      : {};
    const language = code.className?.match(/language-(\w+)/)?.[1];
    const title = code["data-meta"]?.match(/title="([^"]+)"/)?.[1];
    return (
      <CodeBlock
        code={String(code.children ?? "")}
        language={language}
        title={title}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
