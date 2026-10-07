import { createDemoWithVariants } from 'docs/src/utils/createDemo';
import Tailwind from './tailwind';

export const DemoGalleryFadeInImages = createDemoWithVariants(
  import.meta.url,
  { Tailwind },
  { highlightAfter: 'init', enhanceAfter: 'init' },
);
