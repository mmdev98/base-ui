import * as React from 'react';

/** Wordmark of Base UI Plus: plain text, so it follows the header's colour. */
export function Logo(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="104" height="24" viewBox="0 0 104 24" fill="currentColor" {...props}>
      <text
        x="0"
        y="17"
        fontFamily="inherit"
        fontSize="16"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Base UI Plus
      </text>
    </svg>
  );
}
