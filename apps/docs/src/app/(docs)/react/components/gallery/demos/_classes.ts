/** Tailwind classes shared by the gallery demos. */
export const classes = {
  row: 'flex flex-wrap items-center gap-2',
  stack: 'flex flex-col items-start gap-4',
  text: 'm-0 text-sm text-neutral-600 dark:text-neutral-400',
  button:
    'flex h-8 items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 text-sm whitespace-nowrap text-neutral-950 select-none hover:not-disabled:bg-neutral-100 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:not-disabled:bg-neutral-900 dark:focus-visible:outline-white',

  // Triggers. While the viewer shows a thumbnail's image, hide the thumbnail
  // but keep its space (`invisible`): the image looks like it left its slot.
  thumbnail:
    'relative flex size-18 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 p-0 text-sm font-semibold text-neutral-950 data-flying:invisible data-popup-open:invisible data-pending:cursor-wait data-pending:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus-visible:outline-white',
  thumbnailImage: 'size-full object-cover',

  // Viewer. The backdrop and the controls fade with the drag to close; their
  // transitions are off while dragging, so they keep up with the finger.
  backdrop:
    'fixed inset-0 bg-black opacity-[calc(1_-_var(--gallery-dismiss-progress,0))] transition-opacity duration-300 data-dragging:transition-none data-starting-style:opacity-0 data-ending-style:opacity-0',
  popup: 'fixed inset-0 text-white outline-none',
  viewport:
    'absolute inset-0 cursor-zoom-in gap-x-4 in-data-zoomed:cursor-grab data-dragging:cursor-grabbing',
  item: 'pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:px-24 md:py-18',
  control:
    'opacity-[calc(1_-_var(--gallery-dismiss-progress,0)*2)] transition-opacity duration-200 in-data-dragging:transition-none in-data-controls-hidden:pointer-events-none in-data-controls-hidden:opacity-0 in-data-starting-style:opacity-0 in-data-ending-style:pointer-events-none in-data-ending-style:opacity-0',
  close:
    'absolute top-[calc(0.75rem+env(safe-area-inset-top))] right-[calc(0.75rem+env(safe-area-inset-right))] flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-white/15 text-inherit',
  bottom:
    'absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
  caption: 'm-0 rounded-lg bg-black/50 px-2.5 py-1 text-sm',
  toolbar:
    'flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl bg-neutral-900/85 p-1',
  toolbarButton:
    'flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent px-2 text-lg text-inherit no-underline hover:not-data-disabled:bg-white/12 data-disabled:cursor-default data-disabled:opacity-35 data-pending:cursor-wait data-pending:opacity-60',
  value: 'min-w-12 text-center text-[0.8125rem] text-neutral-400 tabular-nums',
  separator: 'mx-1 h-4 w-px bg-white/20',
};
