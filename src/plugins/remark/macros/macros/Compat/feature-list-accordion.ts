import type { BrowserName } from '@mdn/browser-compat-data';

import featureRow from './feature-row.ts';
import type { Feature } from './list-features.ts';

export default function featureListAccordion({
  features,
  browsers,
}: {
  browsers: BrowserName[];
  features: Feature[];
}) {
  return features
    .map((feature) =>
      featureRow({
        activeCell: undefined,
        feature,
        browsers,
        // index,
      }),
    )
    .join('');
}
