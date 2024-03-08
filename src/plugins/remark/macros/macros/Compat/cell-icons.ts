import type { SupportStatement } from '@mdn/browser-compat-data';

import getFirst from './get-first.ts';
import icon from './icon.ts';

export default function cellIcons({ support }: { support: SupportStatement }) {
  const supportItem = getFirst(support);
  if (!supportItem) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
  return `<div class="bc-icons">${
    supportItem.prefix ? icon({ name: 'prefix' }) : ''
  }${supportItem.alternative_name ? icon({ name: 'altname' }) : ''}${
    supportItem.flags ? icon({ name: 'disabled' }) : ''
  }${supportItem.notes ? icon({ name: 'footnote' }) : ''}</div>`;
}
