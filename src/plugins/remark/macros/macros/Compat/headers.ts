// Note! This is in many ways copied verbatim from @mdn/yari

import type { BrowserName } from '@mdn/browser-compat-data';

import { browserName } from './browser-name.ts';

export const PLATFORM_BROWSERS = {
  desktop: [
    'chrome',
    'edge',
    'firefox',
    // 'ie',
    'opera',
    'safari',
  ] satisfies BrowserName[],
  mobile: [
    'chrome_android',
    'firefox_android',
    'opera_android',
    'safari_ios',
    'samsunginternet_android',
    'webview_android',
  ] satisfies BrowserName[],
  server: ['deno', 'nodejs'] satisfies BrowserName[],
  'webextensions-desktop': [
    'chrome',
    'edge',
    'firefox',
    'opera',
    'safari',
  ] as BrowserName[],
  'webextensions-mobile': [
    'firefox_android',
    'safari_ios',
  ] satisfies BrowserName[],
} as const;

export type PlatformName = keyof typeof PLATFORM_BROWSERS;

function platformHeaders({
  platforms,
  browsers,
}: {
  platforms: PlatformName[];
  browsers: BrowserName[];
}) {
  return `<tr class="bc-platforms">
      <td></td>
      ${platforms
        .map((platform) => {
          // Get the intersection of browsers in the `browsers` array and the
          // `PLATFORM_BROWSERS[platform]`.
          const browsersInPlatform = PLATFORM_BROWSERS[platform].filter(
            (browser) => browsers.includes(browser),
          );
          const browserCount = Object.keys(browsersInPlatform).length;
          const platformId = platform.replace('webextensions-', '');
          return `<th class="bc-platform-${platformId}" colSpan="${browserCount}">
            <span>${platform}</span>
          </th>`;
        })
        .join('')}
    </tr>`.trim();
}

function browserHeaders({ browsers }: { browsers: BrowserName[] }) {
  return `<tr class="bc-browsers">
      <td></td>
      ${browsers
        .map(
          (browser) => `<th class="bc-browser-${browser}">
          <span class="bc-head-txt-label bc-head-icon-${browser}">
            ${browserName(browser)}
          </span>
        </th>`,
        )
        .join('')}
    </tr>`.trim();
}

export function headers({
  platforms,
  browsers,
}: {
  platforms: PlatformName[];
  browsers: BrowserName[];
}) {
  return `<thead>
      ${platformHeaders({ platforms, browsers })}
      ${browserHeaders({ browsers })}
    </thead>`.trim();
}
