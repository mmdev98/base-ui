import * as React from 'react';

/**
 * Base UI's docs report to MUI's Google Analytics here. These docs don't track
 * anything, so this only renders its children.
 */
export function GoogleAnalytics({ children }: { children?: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
