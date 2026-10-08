import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import * as React from "react";
import { withBasePath } from "@/lib/base-path";
import { SITE } from "@/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `Unstyled React components for accessible interfaces - ${SITE.name}`,
    template: `%s - ${SITE.name}`,
  },
  description:
    "Unstyled React components for accessible interfaces, built on Base UI.",
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico"), sizes: "32x32" },
      { url: withBasePath("/favicon.svg"), type: "image/svg+xml" },
    ],
    apple: withBasePath("/apple-touch-icon.png"),
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-dvh font-sans">
        {/* Base UI popups portal next to this root and stack above it. */}
        <div className="isolate">{props.children}</div>
      </body>
    </html>
  );
}
