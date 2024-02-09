import type { Html, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { SKIP } from 'unist-util-visit';

import getChildren from '../../../registry/get-children.ts';
import readBasicMarkdown from '../../../utils/read-basic-markdown.ts';
import type { AstroFile } from '../../validate-astro-file.ts';
import createMacro from '../create-macro.ts';

function macro(_tree: Root, file: AstroFile): Html {
  const currentSlug = file.data.astro.frontmatter.slug;
  const targetLocale = process.env.TARGET_LOCALE;
  const children = getChildren(currentSlug);
  children.sort((a, b) => a.title.localeCompare(b.title, targetLocale));
  const items = children.map((child) => {
    const tree = readBasicMarkdown(child.filePath);
    const descriptionNode = tree.children.find((node) => {
      if (node.type !== 'paragraph') {
        return false;
      }
      const text = toString(node);
      return !text.startsWith('{{');
    });
    if (!descriptionNode) {
      throw new Error('No description found');
    }
    const description = toString(descriptionNode);
    return [child.slug, child.title, description];
  });
  const definitionsHtmlItems = items.map(
    ([slug, title, description]) =>
      `<dt><a href="/${targetLocale}/docs/${slug}/">${title}</a></dt><dd>${description}</dd>`,
  );
  return {
    type: 'html',
    value: `<dl>${definitionsHtmlItems.join('')}</dl>`,
  };
}

const GlossaryDisambiguation = createMacro(
  'GlossaryDisambiguation',
  (_node, index, parent, tree, file) => {
    const replacement = macro(tree, file);
    parent.children[index] = replacement;
    return [SKIP, index];
  },
);

export default GlossaryDisambiguation;
