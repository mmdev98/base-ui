import type { Metadata } from "next";
import * as React from "react";
import { DocPageView, getDocMetadata } from "@/components/doc-page";

export const metadata: Metadata = getDocMetadata("");

export default function DocsIndexPage(): React.ReactElement {
  return <DocPageView slug="" />;
}
