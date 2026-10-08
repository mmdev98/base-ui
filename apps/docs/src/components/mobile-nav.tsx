"use client";

import { Dialog } from "@mmdev98/base-ui-plus/dialog";
import * as React from "react";
import { MenuIcon } from "./icons";
import { Logo } from "./logo";
import { SidebarNav } from "./sidebar-nav";

export function MobileNav(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open navigation"
        className="-ml-1.5 flex size-8 items-center justify-center rounded-md text-muted hover:bg-panel hover:text-fg md:hidden"
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/70 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r border-line bg-canvas p-4 transition-transform duration-200 data-ending-style:-translate-x-full data-starting-style:-translate-x-full">
          <Dialog.Title className="mb-6 px-3">
            <Logo />
          </Dialog.Title>
          <SidebarNav onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
