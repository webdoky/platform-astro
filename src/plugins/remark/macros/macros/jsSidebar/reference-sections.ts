import getAll from '../../../../registry/get-all.ts';
import hasPage from '../../../../registry/has-page.ts';
import type { RawPage } from '../../../../registry/validation.ts';
import sortBySlug from '../../../../utils/sort-by-slug.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.ts';

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB, process.env.TARGET_LOCALE);
}

export default function referenceSections(file: AstroFile) {
  const targetLocale = process.env.TARGET_LOCALE;
  const currentPath = `/${targetLocale}/docs/${file.data.astro.frontmatter.slug}`;
  const jsPages = getAll().filter(({ slug }) =>
    slug.startsWith('Web/JavaScript/Reference/'),
  );

  const globalObjectsPages = jsPages.filter(({ slug }) =>
    slug.startsWith('Web/JavaScript/Reference/Global_Objects'),
  );
  const operatorsPages = jsPages.filter(({ slug }) =>
    slug.startsWith(`Web/JavaScript/Reference/Operators`),
  );
  const statementsPages = jsPages.filter(({ slug }) =>
    slug.startsWith(`Web/JavaScript/Reference/Statements`),
  );
  const functionsPages = jsPages.filter(({ slug }) =>
    slug.startsWith(`Web/JavaScript/Reference/Functions`),
  );
  const classesPages = jsPages.filter(({ slug }) =>
    slug.startsWith(`Web/JavaScript/Reference/Classes`),
  );
  const errorsPages = jsPages.filter(({ slug }) =>
    slug.startsWith(`Web/JavaScript/Reference/Errors`),
  );

  const morePages = [
    {
      slug: `Web/JavaScript/JavaScript_technologies_overview`,
      title: labels.Overview,
    },
    {
      slug: `Web/JavaScript/Reference/Lexical_grammar`,
      title: labels.Lexical_grammar,
    },
    {
      slug: `Web/JavaScript/Data_structures`,
      title: labels.Data_structures,
    },
    {
      slug: `Web/JavaScript/Enumerability_and_ownership_of_properties`,
      title: labels.Enumerability,
    },
    {
      slug: `Web/JavaScript/Reference/Iteration_protocols`,
      title: labels.Iteration_protocols,
    },
    {
      slug: `Web/JavaScript/Reference/Strict_mode`,
      title: labels.Strict_mode,
    },
    {
      slug: `Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode`,
      title: labels.Transitioning_to_strict_mode,
    },
    {
      slug: `Web/JavaScript/Reference/Template_literals`,
      title: labels.Template_strings,
    },
    {
      slug: `Web/JavaScript/Reference/Deprecated_and_obsolete_features`,
      title: labels.Deprecated_features,
    },
  ].map(({ slug, ...otherAttributes }) => ({
    ...otherAttributes,
    hasTranslation: hasPage(slug),
    path: `/${targetLocale}/docs/${slug}/`,
    isCurrent: slug === file.data.astro.frontmatter.slug,
  }));

  const pageToNavItem = ({ slug, title }: RawPage) => {
    const path = `/${targetLocale}/docs/${slug}/`;
    return {
      hasTranslation: hasPage(slug),
      isCurrent: path === currentPath,
      path: path,
      slug,
      title,
    };
  };

  return [
    {
      title: labels.Global_Objects,
      items: globalObjectsPages
        .map((item) => pageToNavItem(item))
        .sort(sortBySlug),
      expanded: globalObjectsPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.Operators,
      items: operatorsPages.map((item) => pageToNavItem(item)).sort(sortBySlug),
      expanded: operatorsPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.Statements,
      items: statementsPages
        .map((item) => pageToNavItem(item))
        .sort(sortBySlug),
      expanded: statementsPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.Functions,
      items: functionsPages.map((item) => pageToNavItem(item)).sort(sortBySlug),
      expanded: functionsPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.Classes,
      items: classesPages.map((item) => pageToNavItem(item)).sort(sortBySlug),
      expanded: classesPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.Errors,
      items: errorsPages.map((item) => pageToNavItem(item)).sort(sortBySlug),
      expanded: errorsPages.some(
        ({ slug }) => slug === file.data.astro.frontmatter.slug,
      ),
    },
    {
      title: labels.More,
      items: morePages,
      expanded: morePages.some(({ path }) => path === currentPath),
    },
  ];
}
