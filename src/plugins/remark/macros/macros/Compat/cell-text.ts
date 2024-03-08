import type { BrowserName, SupportStatement } from '@mdn/browser-compat-data';

import { browserPreviewName } from './browser-name.ts';
import getFirst from './get-first.ts';
import getSupportClassName from './get-support-class-name.ts';
import labelFromString from './label-from-string.ts';

export default function cellText({
  support,
  browser,
}: {
  browser: BrowserName;
  support: SupportStatement;
}) {
  const currentSupport = getFirst(support);

  const added = currentSupport && currentSupport.version_added;
  const removed = currentSupport && currentSupport.version_removed;

  let status;

  switch (added) {
    // eslint-disable-next-line unicorn/no-null
    case null: {
      status = { isSupported: 'unknown' };
      break;
    }
    case true: {
      status = { isSupported: 'yes' };
      break;
    }
    case false: {
      status = { isSupported: 'no' };
      break;
    }
    case 'preview': {
      status = { isSupported: 'preview' };
      break;
    }
    default: {
      status = { isSupported: 'yes', label: labelFromString(added, browser) };
      break;
    }
  }

  if (removed) {
    status = {
      isSupported: 'no',
      label: `
          ${labelFromString(added, browser)}&#8202;&ndash;&#8202;
          ${labelFromString(removed, browser)}`,
    };
  } else if (currentSupport && currentSupport.partial_implementation) {
    status = {
      isSupported: 'partial',
      label:
        typeof added === 'string'
          ? labelFromString(added, browser)
          : 'Часткова',
    };
  }

  let label;
  let title = '';
  switch (status.isSupported) {
    case 'yes': {
      title = 'Повна підтримка';
      label = status.label || 'Так';
      break;
    }

    case 'partial': {
      title = 'Часткова підтримка';
      label = status.label || 'Частково';
      break;
    }

    case 'no': {
      title = 'Підтримки немає';
      label = status.label || 'Ні';
      break;
    }

    case 'preview': {
      title = 'Попередній перегляд браузерної підтримки';
      label = browserPreviewName(browser);
      break;
    }

    case 'unknown': {
      title = 'Сумісність невідома; будь ласка, оновіть.';
      label = '?';
      break;
    }
    default:
  }

  if (!currentSupport) {
    throw new Error('No support data');
  }

  return `<abbr class="bc-level-${getSupportClassName(
    currentSupport,
  )} only-icon icon" title="${title}">
        <span>${title}</span>
      </abbr>
      <span>${label}</span>`;
}
