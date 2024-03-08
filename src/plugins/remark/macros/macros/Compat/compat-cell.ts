import type { BrowserName, SupportStatement } from '@mdn/browser-compat-data';

import asList from './as-list.ts';
import { browserName } from './browser-name.ts';
import cellIcons from './cell-icons.ts';
import cellText from './cell-text.ts';
import getSupportBrowserReleaseDate from './get-support-browser-release-date.ts';
import getSupportClassName from './get-support-class-name.ts';

export default function compatCell({
  browser,
  support /* , showNotes */,
}: {
  browser: BrowserName;
  support?: SupportStatement;
}) {
  if (!support) {
    throw new Error('No support statement provided');
  }
  const supportClassName = getSupportClassName(support);
  const browserReleaseDate = getSupportBrowserReleaseDate(support);
  // Whenever the support statement is complex (array with more than one entry)
  // or if a single entry is complex (prefix, notes, etc.),
  // we need to render support details in `bc-history`
  const hasNotes =
    support &&
    (asList(support).length > 1 ||
      asList(support).some(
        (item) =>
          item.prefix || item.notes || item.alternative_name || item.flags,
      ));
  return `<td class="bc-browser-${browser} bc-supports-${supportClassName} ${
    hasNotes ? 'bc-has-history' : ''
  }" title="${browserReleaseDate ? `Випущено ${browserReleaseDate}` : ''}">
      <span class="bc-browser-name">
        ${browserName(browser)}
      </span>${cellText({ support, browser })}${cellIcons({ support })}
    </td>`.trim();
}
