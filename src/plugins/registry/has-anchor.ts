import { join } from 'node:path';

import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { read } from 'to-vfile';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { matter } from 'vfile-matter';

import getIdFromText from '../../utils/get-id-from-text.js';
import isDefinitionList from '../../utils/is-definition-list.ts';
import walk from '../utils/walk-async.js';

import { rawPageSchema } from './validation.js';

const anchorsRegistry = new Map<string, Set<string>>();
const slugger = new GithubSlugger();

export default function hasAnchor(slug: string, anchor: string): boolean {
  if (anchorsRegistry.size === 0) {
    throw new Error('Anchors registry is not initialized');
  }
  const anchors = anchorsRegistry.get(slug);
  if (!anchors) {
    throw new Error(`No anchors found for slug: ${slug}`);
  }
  return anchors.has(anchor);
}

const basicProcessor = unified().use(remarkParse);

export async function initAnchorsRegistry() {
  if (anchorsRegistry.size > 0) {
    return;
  }
  const PATH_TO_LOCALIZED_CONTENT = process.env.PATH_TO_LOCALIZED_CONTENT;
  if (!PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('process.env.PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  if (!process.env.TARGET_LOCALE) {
    throw new Error('process.env.TARGET_LOCALE is not defined');
  }
  await walk(
    join(PATH_TO_LOCALIZED_CONTENT, 'files', process.env.TARGET_LOCALE),
    async (filePath) => {
      if (!filePath.endsWith('/index.md')) {
        return;
      }
      slugger.reset();
      const markdownFile = await read(filePath);

      // console.log(markdownFile);
      matter(markdownFile);
      // console.log(markdownFile.data.matter);
      const data = rawPageSchema.parse(markdownFile.data.matter);
      const slug = data.slug;
      const anchors = new Set<string>();

      const tree = basicProcessor.parse(markdownFile);

      visit(tree, 'heading', (node) => {
        const text = toString(node);
        anchors.add(getIdFromText(text, slugger));
      });

      visit(tree, 'list', (node) => {
        if (!isDefinitionList(node)) return;
        for (const child of node.children) {
          if (child.type !== 'listItem') {
            continue;
          }
          const termNode = child.children[0];
          const text = toString(termNode);
          anchors.add(getIdFromText(text, slugger));
        }
      });

      anchorsRegistry.set(slug, anchors);
    },
  );
}
