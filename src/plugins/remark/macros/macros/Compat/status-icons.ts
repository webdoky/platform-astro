import type { StatusBlock } from '@mdn/browser-compat-data';

export default function statusIcons({ status }: { status: StatusBlock }) {
  const icons: {
    class: string;
    text: string;
    title: string;
  }[] = [
    status.experimental && {
      class: 'experimental',
      title:
        'Експериментальне. Варто очікувати змін цієї функціональності в майбутньому.',
      text: 'Експериментальне',
    },
    status.deprecated && {
      class: 'deprecated',
      title: 'Нерекомендоване. Не для застосування в нових вебсайтах.',
      text: 'Нерекомендоване',
    },
    !status.standard_track && {
      class: 'non-standard',
      title:
        'Нестандартне. Слід розраховувати на погану міжбраузерну підтримку.',
      text: 'Нестандартне',
    },
  ].filter(Boolean);

  return icons.length === 0
    ? ''
    : `<div class="bc-icons">
      ${icons
        .map(
          (
            iconItem,
          ) => `<abbr class="only-icon icon ${iconItem.class}" title="${iconItem.title}">
          <span>${iconItem.text}</span>
        </abbr>`,
        )
        .join('')}
    </div>`.trim();
}
