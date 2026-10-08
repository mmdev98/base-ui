import Link from "next/link";
import * as React from "react";
import { SiteHeader } from "@/components/site-header";

export default function NotFound(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-32">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="font-mono text-3xl font-semibold">Nothing here.</h1>
        <p className="text-muted">This page doesn&apos;t exist, or it moved.</p>
        <Link
          href="/docs"
          className="font-mono text-sm text-fg underline underline-offset-4"
        >
          Go to the docs →
        </Link>
      </main>
    </>
  );
}
