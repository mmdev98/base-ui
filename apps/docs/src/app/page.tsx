import Link from "next/link";
import * as React from "react";
import { CodeBlock } from "@/components/code-block";
import { ArrowRightIcon } from "@/components/icons";
import { InstallCommand } from "@/components/install-command";
import { Logo } from "@/components/logo";
import { SiteHeader } from "@/components/site-header";
import GalleryDemo from "@/content/components/gallery/demos/hero";
import {
  getBaseUiEntries,
  getBaseUiVersion,
  getLibraryVersion,
} from "@/lib/library";
import { getPageHref, sections, SITE } from "@/nav";

const HERO_CODE = `import { Gallery } from "@mmdev98/base-ui-plus/gallery";

<Gallery.Root items={photos}>
  {photos.map((photo, index) => (
    <Gallery.Trigger key={photo.id} index={index}
      className="data-popup-open:invisible">
      <img src={photo.thumbnail} alt="" />
    </Gallery.Trigger>
  ))}
  <Gallery.Portal>
    <Gallery.Backdrop className="fixed inset-0 bg-black" />
    <Gallery.Popup className="fixed inset-0">
      <Gallery.Viewport className="absolute inset-0">
        {(item, index) => (
          <Gallery.Item index={index}>
            <Gallery.Image />
          </Gallery.Item>
        )}
      </Gallery.Viewport>
    </Gallery.Popup>
  </Gallery.Portal>
</Gallery.Root>`;

const FEATURES = [
  {
    title: "headless",
    text: "No CSS ships with the package. Parts render plain elements; you style them with Tailwind, CSS Modules or anything else.",
  },
  {
    title: "accessible",
    text: "Roles, ARIA, focus and keyboard handling are built into every part, following the WAI-ARIA patterns.",
  },
  {
    title: "data-* state",
    text: "State is exposed as attributes: data-copied, data-zoomed, data-pending. Style it with variants, not with props.",
  },
  {
    title: "render prop",
    text: "Swap any part's element or compose it with your own components. Props and handlers are merged, not lost.",
  },
  {
    title: "one base ui",
    text: "Every Base UI component is re-exported from the same package, so there is one copy and the contexts line up.",
  },
  {
    title: "rsc-friendly",
    text: "Parts are client components; namespaces aren't. Import them in Server Components, tree-shaken by entry point.",
  },
];

export default function HomePage(): React.ReactElement {
  const version = getLibraryVersion();
  const baseUiEntries = getBaseUiEntries().filter((entry) => !entry.utility);
  const ownComponents =
    sections.find((section) => section.title === "Components")?.pages ?? [];

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        {/* Hero */}
        <section className="relative border-b border-line">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-20 md:px-6 md:pt-28">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 py-1 pr-3 pl-1 font-mono text-xs text-muted backdrop-blur hover:border-line-strong hover:text-fg"
            >
              <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-canvas">
                v{version}
              </span>
              built on Base UI {getBaseUiVersion()}
            </Link>

            <h1 className="mt-8 max-w-4xl font-mono text-4xl leading-[1.1] font-semibold tracking-tighter text-fg sm:text-5xl md:text-6xl">
              Headless primitives
              <br />
              <span className="text-muted">for the parts Base UI</span>{" "}
              <span className="text-accent">doesn&apos;t ship.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Every Base UI component, plus a gallery with mobile gestures, a
              clipboard and more. Unstyled, accessible, and built on the same
              API, so it all fits together.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/docs/quick-start"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 font-mono text-sm font-medium text-canvas transition-colors hover:bg-accent/90"
              >
                get started <ArrowRightIcon />
              </Link>
              <div className="sm:w-[26rem]">
                <InstallCommand command={`pnpm add ${SITE.packageName}`} />
              </div>
            </div>
          </div>
        </section>

        {/* Code and live demo */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl md:grid-cols-2">
            <div className="min-w-0 border-line px-4 py-12 md:border-r md:px-6 md:py-16">
              <SectionLabel index="01">write the behaviour once</SectionLabel>
              <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight">
                Parts in, any design out.
              </h2>
              <p className="mt-3 max-w-md leading-7 text-muted">
                Compose the parts you need and style them with your classes.
                Swipe, pinch to zoom, drag to close and the keyboard come with
                them.
              </p>
              <CodeBlock
                code={HERO_CODE}
                language="tsx"
                title="gallery.tsx"
                className="mb-0"
              />
            </div>
            <div className="flex min-w-0 flex-col px-4 py-12 md:px-6 md:py-16">
              <SectionLabel index="02">live</SectionLabel>
              <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight">
                Click a photo. Then swipe.
              </h2>
              <p className="mt-3 max-w-md leading-7 text-muted">
                The image flies out of its thumbnail and back. On a phone, pinch
                it, drag it down, or double tap.
              </p>
              <div className="bg-dots mt-6 flex flex-1 items-center justify-center rounded-lg border border-line bg-canvas p-8 md:min-h-80">
                <GalleryDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel index="03">principles</SectionLabel>
            <h2 className="mt-3 max-w-xl font-mono text-2xl font-semibold tracking-tight md:text-3xl">
              Behaviour and accessibility. Nothing else.
            </h2>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <li
                  key={feature.title}
                  className="bg-canvas p-6 transition-colors hover:bg-panel"
                >
                  <p className="font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-accent"> /</span>
                  </p>
                  <h3 className="mt-3 font-mono text-sm font-medium text-fg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {feature.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Components */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel index="04">components</SectionLabel>
            <h2 className="mt-3 font-mono text-2xl font-semibold tracking-tight md:text-3xl">
              What&apos;s in the box.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {ownComponents.map((page) => (
                <Link
                  key={page.slug}
                  href={getPageHref(page)}
                  className="group flex flex-col gap-2 rounded-xl border border-line bg-panel p-6 transition-colors hover:border-accent/50"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-lg font-medium text-fg">
                      {page.title}
                    </span>
                    <span className="rounded border border-accent/30 bg-accent-dim px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
                      plus
                    </span>
                  </span>
                  <span className="text-sm leading-6 text-muted">
                    {page.description}
                  </span>
                  <span className="mt-2 flex items-center gap-1.5 font-mono text-xs text-faint group-hover:text-accent">
                    read the docs <ArrowRightIcon />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <p className="font-mono text-xs text-faint">
                + {baseUiEntries.length} Base UI components, re-exported under
                the same path
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {baseUiEntries.map((entry) => (
                  <li key={entry.slug}>
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {entry.slug}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:px-6">
          <Logo />
          <p className="font-mono text-xs text-faint">
            MIT licensed · built on{" "}
            <a
              href="https://base-ui.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              Base UI
            </a>
          </p>
          <nav className="flex gap-5 font-mono text-xs text-muted md:ml-auto">
            <Link href="/docs" className="hover:text-fg">
              docs
            </Link>
            <a href="/llms.txt" className="hover:text-fg">
              llms.txt
            </a>
            <a
              href={SITE.repository}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              github
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function SectionLabel(props: {
  index: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <p className="font-mono text-xs text-accent">
      <span className="text-faint">[{props.index}]</span> {props.children}
    </p>
  );
}
