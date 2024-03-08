import type { SupportStatement } from '@mdn/browser-compat-data';

import getFirst from './get-first.ts';

export default function getSupportClassName(support: SupportStatement) {
  const supportItem = getFirst(support);
  if (!supportItem) {
    return 'unknown';
  }

  const { flags, version_added, version_removed, partial_implementation } =
    supportItem;

  let className;
  if (version_added === null) {
    className = 'unknown';
  } else if (version_added === 'preview') {
    className = 'preview';
  } else if (version_added) {
    className = 'yes';
    if (version_removed || (flags && flags.length > 0)) {
      className = 'no';
    }
  } else {
    className = 'no';
  }
  if (partial_implementation && !version_removed) {
    className = 'partial';
  }

  return className;
}
