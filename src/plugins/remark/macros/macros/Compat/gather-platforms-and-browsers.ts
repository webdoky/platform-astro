import type { BrowserName, Identifier } from '@mdn/browser-compat-data';

import { PLATFORM_BROWSERS, type PlatformName } from './headers.ts';

export default function gatherPlatformsAndBrowsers(
  category: string | undefined,
  data: Identifier,
): [PlatformName[], BrowserName[]] {
  const hasNodeJSData = data.__compat && 'nodejs' in data.__compat.support;
  const hasDenoData = data.__compat && 'deno' in data.__compat.support;

  let platforms: PlatformName[] = ['desktop', 'mobile'];
  if (category === 'javascript' || hasNodeJSData || hasDenoData) {
    platforms.push('server');
  } else if (category === 'webextensions') {
    platforms = ['webextensions-desktop', 'webextensions-mobile'];
  }

  const browsers = new Set(
    platforms.flatMap((platform) => PLATFORM_BROWSERS[platform] || []),
  );

  // If there is no Node.js data for a category outside of "javascript", don't
  // show it. It ended up in the browser list because there is data for Deno.
  if (category !== 'javascript' && !hasNodeJSData) {
    browsers.delete('nodejs');
  }

  return [platforms, [...browsers]];
}
