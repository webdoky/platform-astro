import hasPage from '../../../../registry/has-page.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.ts';

export default function quickLinksSections(file: AstroFile) {
  const targetLocale = process.env.TARGET_LOCALE;
  const currentSlug = file.data.astro.frontmatter.slug;
  const completeBeginners = [
    {
      slug: `Learn/Getting_started_with_the_web/JavaScript_basics`,
      title: labels.Basics,
      isCurrent:
        currentSlug === 'Learn/Getting_started_with_the_web/JavaScript_basics',
    },
    {
      slug: `Learn/JavaScript/First_steps`,
      title: labels.First_steps,
      isCurrent: currentSlug === 'Learn/JavaScript/First_steps',
    },
    {
      slug: `Learn/JavaScript/Building_blocks`,
      title: labels.Building_blocks,
      isCurrent: currentSlug === 'Learn/JavaScript/Building_blocks',
    },
    {
      slug: `Learn/JavaScript/Objects`,
      title: labels.Introducing_objects,
      isCurrent: currentSlug === 'Learn/JavaScript/Objects',
    },
  ];

  const guide = [
    {
      slug: `Web/JavaScript/Guide/Introduction`,
      title: labels.Guide_Introduction,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Introduction',
    },
    {
      slug: `Web/JavaScript/Guide/Grammar_and_Types`,
      title: labels.Guide_Grammar,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Grammar_and_Types',
    },
    {
      slug: `Web/JavaScript/Guide/Control_flow_and_error_handling`,
      title: labels.Guide_Control_flow,
      isCurrent:
        currentSlug === 'Web/JavaScript/Guide/Control_flow_and_error_handling',
    },
    {
      slug: `Web/JavaScript/Guide/Loops_and_iteration`,
      title: labels.Guide_Loops,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Loops_and_iteration',
    },
    {
      slug: `Web/JavaScript/Guide/Functions`,
      title: labels.Guide_Functions,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Functions',
    },
    {
      slug: `Web/JavaScript/Guide/Expressions_and_Operators`,
      title: labels.Guide_Expressions,
      isCurrent:
        currentSlug === 'Web/JavaScript/Guide/Expressions_and_Operators',
    },
    {
      slug: `Web/JavaScript/Guide/Numbers_and_dates`,
      title: labels.Guide_Numbers,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Numbers_and_dates',
    },
    {
      slug: `Web/JavaScript/Guide/Text_formatting`,
      title: labels.Guide_Text,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Text_formatting',
    },
    {
      slug: `Web/JavaScript/Guide/Regular_Expressions`,
      title: labels.Guide_RegExp,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Regular_Expressions',
    },
    {
      slug: `Web/JavaScript/Guide/Indexed_collections`,
      title: labels.Guide_Indexed_collections,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Indexed_collections',
    },
    {
      slug: `Web/JavaScript/Guide/Keyed_collections`,
      title: labels.Guide_keyed_collections,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Keyed_collections',
    },
    {
      slug: `Web/JavaScript/Guide/Working_with_Objects`,
      title: labels.Guide_Objects,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Working_with_Objects',
    },
    {
      slug: `Web/JavaScript/Guide/Details_of_the_Object_Model`,
      title: labels.Guide_OOP,
      isCurrent:
        currentSlug === 'Web/JavaScript/Guide/Details_of_the_Object_Model',
    },
    {
      slug: `Web/JavaScript/Guide/Using_promises`,
      title: labels.Guide_promises,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Using_promises',
    },
    {
      slug: `Web/JavaScript/Guide/Iterators_and_generators`,
      title: labels.Guide_Iterators_Generators,
      isCurrent:
        currentSlug === 'Web/JavaScript/Guide/Iterators_and_generators',
    },
    {
      slug: `Web/JavaScript/Guide/Meta_programming`,
      title: labels.Guide_Meta,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Meta_programming',
    },
    {
      slug: `Web/JavaScript/Guide/Modules`,
      title: labels.Guide_Modules,
      isCurrent: currentSlug === 'Web/JavaScript/Guide/Modules',
    },
  ];

  const intermediate = [
    {
      slug: `Learn/Tools_and_testing/Client-side_JavaScript_frameworks`,
      title: labels.Frameworks,
      isCurrent:
        currentSlug ===
        'Learn/Tools_and_testing/Client-side_JavaScript_frameworks',
    },
    {
      slug: `Learn/JavaScript/Client-side_web_APIs`,
      title: labels['Client-side_APIs'],
      isCurrent: currentSlug === 'Learn/JavaScript/Client-side_web_APIs',
    },
    {
      slug: `Web/JavaScript/A_re-introduction_to_JavaScript`,
      title: labels['Re-introduction'],
      isCurrent:
        currentSlug === 'Web/JavaScript/A_re-introduction_to_JavaScript',
    },
    {
      slug: `Web/JavaScript/Data_structures`,
      title: labels.Data_structures,
      isCurrent: currentSlug === 'Web/JavaScript/Data_structures',
    },
    {
      slug: `Web/JavaScript/Equality_comparisons_and_sameness`,
      title: labels.Equality,
      isCurrent:
        currentSlug === 'Web/JavaScript/Equality_comparisons_and_sameness',
    },
    {
      slug: `Web/JavaScript/Closures`,
      title: labels.Closures,
      isCurrent: currentSlug === 'Web/JavaScript/Closures',
    },
  ];

  const advanced = [
    {
      slug: `Web/JavaScript/Inheritance_and_the_prototype_chain`,
      title: labels.Inheritance,
      isCurrent:
        currentSlug === 'Web/JavaScript/Inheritance_and_the_prototype_chain',
    },
    {
      slug: `Web/JavaScript/Reference/Strict_mode`,
      title: labels.Strict_mode,
      isCurrent: currentSlug === 'Web/JavaScript/Reference/Strict_mode',
    },
    {
      slug: `Web/JavaScript/Typed_arrays`,
      title: labels.Typed_arrays,
      isCurrent: currentSlug === 'Web/JavaScript/Typed_arrays',
    },
    {
      slug: `Web/JavaScript/Memory_Management`,
      title: labels.Memory_Management,
      isCurrent: currentSlug === 'Web/JavaScript/Memory_Management',
    },
    {
      slug: `Web/JavaScript/EventLoop`,
      title: labels.Event_Loop,
      isCurrent: currentSlug === 'Web/JavaScript/EventLoop',
    },
  ];

  return [
    {
      title: labels.Complete_beginners,
      items: completeBeginners.map((item) => ({
        ...item,
        hasTranslation: hasPage(item.slug),
        path: `/${targetLocale}/docs/${item.slug}`,
      })),
      expanded: completeBeginners.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Guide,
      items: guide.map((item) => ({
        ...item,
        hasTranslation: hasPage(item.slug),
        path: `/${targetLocale}/docs/${item.slug}`,
      })),
      expanded: guide.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Intermediate,
      items: intermediate.map((item) => ({
        ...item,
        hasTranslation: hasPage(item.slug),
        path: `/${targetLocale}/docs/${item.slug}`,
      })),
      expanded: intermediate.some(({ slug }) => slug === currentSlug),
    },
    {
      title: labels.Advanced,
      items: advanced.map((item) => ({
        ...item,
        hasTranslation: hasPage(item.slug),
        path: `/${targetLocale}/docs/${item.slug}`,
      })),
      expanded: advanced.some(({ slug }) => slug === currentSlug),
    },
  ];
}
