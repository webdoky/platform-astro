import type { SupportStatement } from '@mdn/browser-compat-data';

import getFirst from './get-first.ts';

export default function getSupportBrowserReleaseDate(
  support: SupportStatement,
) {
  if (!support) {
    return;
  }
  return (getFirst(support) as any).release_date;
}
