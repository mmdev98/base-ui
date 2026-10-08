import type { Metadata } from "next";
import * as React from "react";
import { DocPageView, getDocMetadata } from "@/components/doc-page";
import { pages } from "@/nav";

type Params = Promise<{ slug: string[] }>;

export const dynamicParams = false;

export function generateStaticParams(): { slug: string[] }[] {
  return pages
    .filter((page) => page.slug)
    .map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  return getDocMetadata(slug.join("/"));
}

export default async function DocsPage(props: {
  params: Params;
}): Promise<React.ReactElement> {
  const { slug } = await props.params;
  return <DocPageView slug={slug.join("/")} />;
}
