import Link from "next/link";
import * as React from "react";
import { SiteHeader } from "@/components/site-header";

export default function NotFound(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <div className="bg-hatch bg-fixed">
        <main className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-7xl flex-col items-start gap-4 border-line bg-canvas px-4 py-32 md:border-x md:px-6">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="font-mono text-3xl font-semibold">Nothing here.</h1>
          <p className="text-muted">
            This page doesn&apos;t exist, or it moved.
          </p>
          <Link
            href="/docs"
            className="font-mono text-sm text-fg underline underline-offset-4"
          >
            Go to the docs →
          </Link>
        </main>
      </div>
    </>
  );
}
