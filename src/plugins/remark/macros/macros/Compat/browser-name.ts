// Note! This is in many ways copied verbatim from @mdn/yari
import bcd, { type BrowserName } from '@mdn/browser-compat-data';

import maybeLocalize from './maybe-localize.ts';

export function browserName(id: BrowserName) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }

  return maybeLocalize(browserInfo[id].name);
}

export function browserPreviewName(id: BrowserName) {
  const { browsers: browserInfo } = bcd;

  if (!browserInfo) {
    throw new Error('Missing browser info');
  }
  return maybeLocalize(browserInfo[id].preview_name);
}
