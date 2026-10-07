'use client';
import { usePathname } from 'next/navigation';
import { GitHubIcon } from '../../icons/GitHubIcon';

const SOURCE_CODE_REPO = process.env.SOURCE_CODE_REPO;
/** Components written in this repo; the others are re-exported from Base UI. */
const OWN_SOURCE_SLUGS = new Set((process.env.OWN_SOURCE_SLUGS ?? '').split(',').filter(Boolean));
const BASE_UI_REPO = 'https://github.com/mui/base-ui';
const BASE_UI_REF = process.env.BASE_UI_VERSION ? `v${process.env.BASE_UI_VERSION}` : undefined;
const SOURCE_PATH_PREFIXES = ['/react/components/', '/react/utils/'] as const;

function getSourceUrl(pathname: string) {
  const sourcePathPrefix = SOURCE_PATH_PREFIXES.find((prefix) => pathname.startsWith(prefix));

  if (sourcePathPrefix == null) {
    return null;
  }

  const sourceSlug = pathname.slice(sourcePathPrefix.length).split('/').filter(Boolean);

  if (sourceSlug.length !== 1) {
    return null;
  }

  const slug = sourceSlug[0];

  if (OWN_SOURCE_SLUGS.has(slug)) {
    return SOURCE_CODE_REPO == null
      ? null
      : `${SOURCE_CODE_REPO}/tree/main/packages/base-ui-plus/src/${slug}`;
  }

  // Re-exported components live in Base UI, at the release this package pins.
  return BASE_UI_REF == null ? null : `${BASE_UI_REPO}/tree/${BASE_UI_REF}/packages/react/src/${slug}`;
}

export function ViewSourceLink() {
  const pathname = usePathname();
  const sourceUrl = getSourceUrl(pathname);

  if (sourceUrl == null) {
    return null;
  }

  return (
    <a
      href={sourceUrl}
      className="SubtitleLink"
      aria-label="View source on GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="SubtitleLinkText">
        <GitHubIcon />
        View source
      </span>
    </a>
  );
}
