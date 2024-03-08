import bcd, {
  type CompatData,
  type Identifier,
} from '@mdn/browser-compat-data';
import specs from 'browser-specs/index.json';
import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import type { AstroFile } from '../../validate-astro-file.ts';
import type { MacroFunction } from '../types.ts';

function renderSpecifications({
  'browser-compat': browserCompat,
  'spec-urls': explicitSpecUrls,
}: {
  'browser-compat'?: string;
  'spec-urls'?: string | string[];
}) {
  let data: CompatData | Identifier | undefined = bcd;
  const specUrls: string[] = [];
  if (browserCompat) {
    for (const current of browserCompat.split('.')) {
      data =
        data && !(data as Identifier).__compat
          ? (data as Identifier)?.[current] || undefined
          : undefined;
    }
    if (data !== undefined) {
      for (const [key, value] of Object.entries(data)) {
        if (key === '__compat' && value.spec_url) {
          specUrls.push(
            ...(Array.isArray(value.spec_url)
              ? value.spec_url
              : [value.spec_url]),
          );
        }
      }
    }
  }
  if (explicitSpecUrls) {
    if (typeof explicitSpecUrls !== 'string') {
      explicitSpecUrls = explicitSpecUrls.join(',');
    }
    specUrls.push(...explicitSpecUrls.split(',').map((url) => url.trim()));
  }

  if (specUrls.length > 0) {
    // Use BCD specURLs to look up more specification data
    // from the browser-specs package
    const specificationsData = specUrls
      .map((specUrl) => {
        const spec = specs.find(
          (specItem) =>
            specUrl.startsWith(specItem.url) ||
            (specItem.nightly?.url &&
              specUrl.startsWith(specItem.nightly?.url || '')) ||
            (specItem.series.nightlyUrl &&
              specUrl.startsWith(specItem.series.nightlyUrl || '')),
        );
        const specItemData = {
          bcdSpecificationURL: specUrl,
          title: 'Невідома специфікація',
          shortTitle: 'Невідома специфікація',
        };
        if (spec) {
          specItemData.title = spec.title;
          specItemData.shortTitle = spec.shortTitle;
        }

        return specItemData;
      })
      .filter(Boolean);

    if (specificationsData.length > 0) {
      return `<table className="table--standard">
          <thead>
            <tr>
              <th scope="col">Специфікація</th>
            </tr>
          </thead>
          <tbody>
            ${specificationsData.map(
              (spec) =>
                `<tr>
                <td>
                  <a href="${spec.bcdSpecificationURL}">
                    ${spec.title}${' '}
                    ${
                      spec.title === spec.shortTitle
                        ? ''
                        : `(${spec.shortTitle})`
                    }
                    <br />
                    ${
                      spec.bcdSpecificationURL.includes('#')
                        ? `<small>
                        # ${`${spec.bcdSpecificationURL.split('#')[1]}`}
                      </small>`
                        : ''
                    }
                  </a>
                </td>
              </tr>`,
            )}
          </tbody>
        </table>`;
    }
    return `<div className="notecard__warning">
        <h3>Специфікації не знайдено</h3>
        <p>
          Не знайдено ніякої інформації про специфікацію для{' '}
          <code>${browserCompat}</code>.<br />
          <a href="#on-github">
            Перевірте на наявність проблем зі сторінкою тут
          </a>
          , або ж внесіть відсутнє посилання на специфікацію до{' '}
          <a href="https://github.com/mdn/browser-compat-data">
            mdn/browser-compat-data
          </a>
          . Також варто пересвідчитись, що специфікація включена до{' '}
          <a href="https://github.com/w3c/browser-specs">w3c/browser-specs</a>
          .
        </p>
      </div>`;
  }
  return `<div class="bcd__container">
      Якщо ви це бачите — значить, щось трапилося з цією сторінкою.
    </div>`;
}

function macro(file: AstroFile): Html {
  const { 'browser-compat': browserCompat, 'spec-urls': explicitSpecUrls } =
    file.data.astro.frontmatter;
  if (!browserCompat && !explicitSpecUrls) {
    throw new Error('No browser-compat or spec-urls provided');
  }
  if (Array.isArray(browserCompat)) {
    return {
      type: 'html',
      value: `<p>
          ${browserCompat.map((url) =>
            renderSpecifications({
              'browser-compat': url,
              'spec-urls': explicitSpecUrls,
            }),
          )}
        </p>`,
    };
  }
  return {
    type: 'html',
    value:
      '<p>' +
      renderSpecifications({
        'browser-compat': browserCompat,
        'spec-urls': explicitSpecUrls,
      }) +
      '</p>',
  };
}

const Specifications: MacroFunction = (_node, index, parent, _tree, file) => {
  const replacement = macro(file);
  // parent.children.splice(index, 1);
  parent.children[index] = replacement;
  return [SKIP, index];
};
export default Specifications;
