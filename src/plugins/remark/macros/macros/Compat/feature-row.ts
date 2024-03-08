// Note! This is in many ways copied verbatim from @mdn/yari

import type { BrowserName } from '@mdn/browser-compat-data';

import compatCell from './compat-cell.ts';
import type { Feature } from './list-features.ts';
import maybeLocalize from './maybe-localize.ts';
import statusIcons from './status-icons.ts';

export default function featureRow({
  /* index, */ feature,
  browsers,
  // activeCell,
}: {
  feature: Feature;
  browsers: BrowserName[];
  activeCell: undefined;
}) {
  const { name, compat, isRoot } = feature;
  if (!compat) {
    throw new Error(`Feature ${name} has no compat data`);
  }
  const title = compat.description
    ? `<span>${maybeLocalize(compat.description)}</span>`
    : `<code>${name}</code>`;

  let titleNode;
  const webDocumentUrl = compat.mdn_url
    ? compat.mdn_url.replace('developer.mozilla.org/', 'webdoky.org/uk/')
    : undefined;

  if ((compat as any).bad_url && webDocumentUrl) {
    titleNode = `<div class="bc-table-row-header">
          <abbr class="new" title="${webDocumentUrl} не існує">
            ${title}
          </abbr>
          ${compat.status && statusIcons({ status: compat.status })}</div>`;
  } else if (webDocumentUrl && !isRoot) {
    titleNode = `<a href="${webDocumentUrl}" class="bc-table-row-header">
          ${title}
          ${compat.status && statusIcons({ status: compat.status })}</a>`;
  } else {
    titleNode = `<div class="bc-table-row-header">
          ${title}
          ${compat.status && statusIcons({ status: compat.status })}</div>`;
  }

  return `<tr>
        <th scope="row">${titleNode}</th>
        ${browsers
          .map((browser /*, index_*/) =>
            compatCell({
              browser,
              support: compat.support[browser],
              // showNotes: activeCell === index_,
            }),
          )
          .join('')}
      </tr>`.trim();
}
