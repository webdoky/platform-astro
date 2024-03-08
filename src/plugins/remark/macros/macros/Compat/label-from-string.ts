import type { BrowserName } from '@mdn/browser-compat-data';

import { browserPreviewName } from './browser-name.ts';

export default function labelFromString(
  version: string | unknown,
  browser: BrowserName,
) {
  if (typeof version !== 'string') {
    return '?';
  }
  // Treat BCD ranges as exact versions to avoid confusion for the reader
  // See https://github.com/mdn/yari/issues/3238
  if (version.startsWith('≤')) {
    return `${version.slice(1)}`;
  }
  if (version === 'preview') {
    return browserPreviewName(browser);
  }
  return version;
}
