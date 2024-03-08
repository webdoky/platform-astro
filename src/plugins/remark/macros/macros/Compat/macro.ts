import bcd, {
  type CompatData,
  type Identifier,
} from '@mdn/browser-compat-data';
import type { Html, Root } from 'mdast';

import type { AstroFile } from '../../../validate-astro-file.ts';
import type { MacroNode } from '../../types.ts';

import featureListAccordion from './feature-list-accordion.ts';
import gatherPlatformsAndBrowsers from './gather-platforms-and-browsers.ts';
import { headers } from './headers.ts';
import listFeatures from './list-features.ts';
function renderMacro(
  browserCompat: AstroFile['data']['astro']['frontmatter']['browser-compat'],
): string {
  const query = browserCompat;
  if (!query) {
    throw new Error('No query provided');
  }
  if (typeof query !== 'string') {
    return query.map((q) => renderMacro(q)).join('');
  }

  const { browsers: browserInfo } = bcd;
  let data = bcd as CompatData | Identifier | undefined;
  for (const current of query.split('.')) {
    if (data && !(data as Identifier).__compat) {
      data = (data as Identifier)?.[current] || undefined;
    }
  }

  if (data !== undefined) {
    const browserReleaseData = new Map();
    for (const [name, browser] of Object.entries(browserInfo)) {
      const releaseData = new Map();
      for (const [version, releaseInfo] of Object.entries(
        browser.releases || [],
      )) {
        if (releaseInfo) {
          releaseData.set(version, releaseInfo);
        }
      }
      browserReleaseData.set(name, releaseData);
    }

    for (const [key, compatData] of Object.entries(data)) {
      let block: Identifier | undefined = undefined;
      if (key === '__compat') {
        block = compatData;
      } else if (compatData.__compat) {
        block = compatData.__compat;
      }
      if (block) {
        if (!block.support) {
          throw new Error('No support data');
        }
        // eslint-disable-next-line prefer-const
        for (let [browserData, info] of Object.entries(block.support)) {
          if ('__support' in info) {
            throw new Error('Unexpected __support key');
          }
          // `info` here will be one of the following:
          //  - a single simple_support_statement:
          //    { version_added: 42 }
          //  - an array of simple_support_statements:
          //    [ { version_added: 42 }, { prefix: '-moz', version_added: 35 } ]
          //
          // Standardize the first version to an array of one, so we don't have
          // to deal with two different forms below
          const infoArray = Array.isArray(info)
            ? (info as unknown as Identifier[])
            : ([info] as Identifier[]);
          for (const infoEntry of infoArray) {
            const added = infoEntry.version_added;
            if (
              browserReleaseData.has(browserData) &&
              browserReleaseData.get(browserData).has(added)
            ) {
              infoEntry.release_date = browserReleaseData
                .get(browserData)
                .get(added).release_date;
            }
          }
        }
      }
    }

    const breadcrumbs = query.split('.');
    const category = breadcrumbs[0];
    const name = breadcrumbs.at(-1);

    const [platforms, browsers] = gatherPlatformsAndBrowsers(
      category,
      data as Identifier,
    );

    return `<figure class="table-container">
      <figure class="table-container-inner">
          <table class="bc-table">
          ${headers({ platforms, browsers })}
            <tbody>
              ${featureListAccordion({
                browsers,
                features: listFeatures(data as Identifier, '', name),
              })}
            </tbody>
          </table>
        </figure>
      </figure>${
        '' // \<Legend compat={data} name={name} /\>
      }`.trim();
  }

  return `
      <div class="bcd__container">
        Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
      </div>`.trim();
}
export default function macro(
  _node: MacroNode,
  _tree: Root,
  file: AstroFile,
): Html {
  return {
    type: 'html',
    value: renderMacro(file.data.astro.frontmatter['browser-compat']),
  };
}
