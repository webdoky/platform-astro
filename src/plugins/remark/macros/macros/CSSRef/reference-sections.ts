import getAll from '../../../../registry/get-all.ts';
import getSectionFromSlug from '../../../../utils/get-section-from-slug.ts';
import sortByTitle from '../../../../utils/sort-by-slug.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.ts';

export default function referenceSections(file: AstroFile) {
  // const targetLocale = process.env.TARGET_LOCALE;
  const currentSlug = file.data.astro.frontmatter.slug;
  const cssPages = getAll().filter(
    ({ slug }) => getSectionFromSlug(slug) === 'css',
  );

  const standardPages = cssPages.filter(
    ({ status }) => !status?.includes('non-standard'),
  );

  const groups = [];
  const properties = [];
  const selectors = [];
  const combinators = [];
  const pseudoClasses = [];
  const pseudoElements = [];
  const atRules = [];
  const functions = [];
  const types = [];

  for (const page of standardPages) {
    switch (page['page-type']) {
      case 'css-module': {
        groups.push(page);
        break;
      }
      case 'css-shorthand-property':
      case 'css-property': {
        properties.push(page);
        break;
      }
      case 'css-selector': {
        selectors.push(page);
        break;
      }
      case 'css-combinator': {
        combinators.push(page);
        break;
      }
      case 'css-pseudo-class': {
        pseudoClasses.push(page);
        break;
      }
      case 'css-pseudo-element': {
        pseudoElements.push(page);
        break;
      }
      case 'css-at-rule': {
        atRules.push(page);
        break;
      }
      case 'css-function': {
        functions.push(page);
        break;
      }
      case 'css-type': {
        types.push(page);
        break;
      }
      default:
    }
  }

  const pageToNavItem = ({ slug, title }: { slug: string; title: string }) => ({
    hasTranslation: true,
    isCurrent: slug === currentSlug,
    path: `/uk/docs/${slug}/`,
    slug,
    title,
  });

  return [
    {
      title: labels.Modules,
      items: groups.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: groups.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Properties,
      items: properties.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: properties.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Selectors,
      items: selectors.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: selectors.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Combinators,
      items: combinators.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: combinators.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels['Pseudo-classes'],
      items: pseudoClasses.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: pseudoClasses.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels['Pseudo-elements'],
      items: pseudoElements
        .map((item) => pageToNavItem(item))
        .sort(sortByTitle),
      expanded: pseudoElements.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels['At-rules'],
      items: atRules.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: atRules.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Functions,
      items: functions.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: functions.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Types,
      items: types.map((item) => pageToNavItem(item)).sort(sortByTitle),
      expanded: types.some(({ slug }) => slug === currentSlug),
    },
  ].filter(({ items }) => items.length > 0);
}
