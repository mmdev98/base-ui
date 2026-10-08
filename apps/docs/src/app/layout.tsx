import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import * as React from "react";
import { SITE } from "@/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — headless React primitives`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Unstyled, accessible React primitives built on Base UI: every Base UI component, plus the ones it doesn't ship.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
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
