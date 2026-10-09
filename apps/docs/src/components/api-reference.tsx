import * as React from "react";
import {
  getComponentApi,
  selectApiParts,
  type ApiAttribute,
  type ApiProp,
} from "@/lib/api";
import { getPartAnchor, getTypeAnchor } from "@/lib/markdown";
import { HeadingAnchor } from "./heading-anchor";
import { InlineMarkdown } from "./inline-markdown";

/**
 * Tables for every part of a library entry point, read from its TypeScript source.
 * In MDX: `<ApiReference component="lightbox" />`. `parts` picks and orders them.
 */
export function ApiReference(props: {
  component: string;
  parts?: string[];
}): React.ReactElement {
  const api = getComponentApi(props.component);
  const prefix = api.namespace ? `${api.namespace}.` : "";
  const parts = selectApiParts(api, props.parts);

  return (
    <div className="mt-6 flex flex-col gap-12">
      {parts.map((part) => (
        <section key={part.name}>
          <HeadingAnchor level={3} id={getPartAnchor(part.name)}>
            <span className="font-mono">
              {prefix}
              {part.name}
            </span>
          </HeadingAnchor>
          {part.description ? (
            <p className="mt-2 leading-7 text-muted">
              <InlineMarkdown>{part.description}</InlineMarkdown>
            </p>
          ) : null}
          <PropList title="Props" props={part.props} />
          <AttributeList
            title="Data attributes"
            attributes={part.dataAttributes}
          />
          <AttributeList title="CSS variables" attributes={part.cssVariables} />
        </section>
      ))}

      {api.types.map((type) => (
        <section key={type.name}>
          <HeadingAnchor level={3} id={getTypeAnchor(type.name)}>
            <span className="font-mono">{type.name}</span>
            <span className="ml-2 border border-line px-1.5 py-0.5 align-middle font-mono text-[10px] font-normal tracking-wider text-faint uppercase">
              {type.kind === "enum" ? "enum" : "type"}
            </span>
          </HeadingAnchor>
          {type.description ? (
            <p className="mt-2 leading-7 text-muted">
              <InlineMarkdown>{type.description}</InlineMarkdown>
            </p>
          ) : null}
          <PropList
            title={type.kind === "enum" ? "Members" : "Properties"}
            props={type.members}
            enumMembers={type.kind === "enum"}
          />
        </section>
      ))}
    </div>
  );
}

function ListTitle(props: { children: React.ReactNode }): React.ReactElement {
  return (
    <p className="mt-6 mb-2 font-mono text-[11px] tracking-widest text-faint uppercase">
      {props.children}
    </p>
  );
}

function PropList(props: {
  title: string;
  props: ApiProp[];
  enumMembers?: boolean;
}): React.ReactElement | null {
  const { title, props: entries, enumMembers = false } = props;
  if (entries.length === 0) {
    return null;
  }

  return (
    <div>
      <ListTitle>{title}</ListTitle>
      <dl className="border border-line">
        {entries.map((prop) => (
          <div
            key={prop.name}
            className="grid gap-x-6 gap-y-1.5 border-t border-line px-4 py-3 first:border-t-0 md:grid-cols-[11rem_1fr]"
          >
            <dt className="font-mono text-[13px] break-all text-fg">
              {prop.name}
              {prop.required && !enumMembers ? (
                <span className="text-accent" title="Required">
                  *
                </span>
              ) : null}
            </dt>
            <dd className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12.5px]">
                <code className="break-words text-accent/85">{prop.type}</code>
                {prop.default ? (
                  <span className="text-faint">
                    default <code className="text-muted">{prop.default}</code>
                  </span>
                ) : null}
              </div>
              {prop.description ? (
                <p className="mt-1.5 text-sm leading-6 text-muted">
                  <InlineMarkdown>{prop.description}</InlineMarkdown>
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function AttributeList(props: {
  title: string;
  attributes: ApiAttribute[];
}): React.ReactElement | null {
  const { title, attributes } = props;
  if (attributes.length === 0) {
    return null;
  }

  return (
    <div>
      <ListTitle>{title}</ListTitle>
      <dl className="border border-line">
        {attributes.map((attribute) => (
          <div
            key={attribute.name}
            className="grid gap-x-6 gap-y-1.5 border-t border-line px-4 py-3 first:border-t-0 md:grid-cols-[11rem_1fr]"
          >
            <dt className="font-mono text-[13px] break-all text-fg">
              {attribute.name}
            </dt>
            <dd className="text-sm leading-6 text-muted">
              <InlineMarkdown>{attribute.description}</InlineMarkdown>
              {attribute.type ? (
                <span className="ml-2 font-mono text-xs text-faint">
                  {attribute.type}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
