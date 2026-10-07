import * as React from 'react';
import { Link } from 'docs/src/components/Link';

export default function Homepage() {
  return (
    <React.Fragment>
      <section className="bui-d-c">
        <h1 className="Text sz-3 bp2:sz-4 bui-gcs-1 bui-gce-9 bp4:bui-gce-6">
          Headless React primitives: every Base UI component, plus more
        </h1>
        <div className="bui-gcs-1 bui-gce-9 bp4:bui-gce-6 bui-d-f bui-fd-c bui-g-4">
          <p className="Text sz-2">
            Base UI Plus re-exports every <Link href="https://base-ui.com">Base UI</Link>{' '}
            component under the same path and adds unstyled components built the same way, such as
            Clipboard and Gallery. Install one package and import everything from it.
          </p>
          <pre className="Text sz-1">
            <code>pnpm add @mmdev98/base-ui-plus</code>
          </pre>
          <p className="Text sz-2">
            <Link href="/react/overview/quick-start">Get started</Link> ·{' '}
            <Link href="/react/components/gallery">Gallery</Link> ·{' '}
            <Link href="/react/components/clipboard">Clipboard</Link>
          </p>
        </div>
      </section>
    </React.Fragment>
  );
}
