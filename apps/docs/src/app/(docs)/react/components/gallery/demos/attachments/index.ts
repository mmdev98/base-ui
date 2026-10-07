import { createDemoWithVariants } from 'docs/src/utils/createDemo';
import Tailwind from './tailwind';

export const DemoGalleryAttachments = createDemoWithVariants(
  import.meta.url,
  { Tailwind },
  { highlightAfter: 'init', enhanceAfter: 'init' },
);
