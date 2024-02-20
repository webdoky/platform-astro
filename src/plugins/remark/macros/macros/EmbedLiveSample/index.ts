import GithubSlugger from 'github-slugger';
import type { Html, Root } from 'mdast';
import { SKIP } from 'unist-util-visit';
import { z } from 'zod';

import type { AstroFile } from '../../../validate-astro-file.ts';
import type { MacroFunction, MacroNode } from '../../types.js';
import { wrappedNumberSchema, wrappedStringSchema } from '../../validation.js';
import liveSampleUrl from '../live-sample-url.ts';

import extractSample from './extract-sample.ts';
const MIN_HEIGHT = 60;
const sampleSpecificClassName = 'wd--live-sample';
const className = 'sample-code-frame';
const slugger = new GithubSlugger();

function parseArguments(
  value: string[],
): [string, number | string | undefined, number | string | undefined] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedStringSchema.parse(value[0]),
    value[1]
      ? z.union([wrappedNumberSchema, wrappedStringSchema]).parse(value[1])
      : undefined,
    value[2]
      ? z.union([wrappedNumberSchema, wrappedStringSchema]).parse(value[2])
      : undefined,
  ];
}

function macro(node: MacroNode, tree: Root, file: AstroFile): Html {
  const targetLocale = process.env.TARGET_LOCALE;
  const [sampleId, width, heightParameter] = parseArguments(node.parameters);
  let height = heightParameter;
  const normalizedSampleId = sampleId.toLowerCase();
  extractSample(normalizedSampleId, tree, file.data.astro.frontmatter.slug);
  const title = sampleId.replaceAll(/_+/g, ' ');

  if (height && typeof height === 'number' && height < MIN_HEIGHT) {
    height = MIN_HEIGHT;
  }

  let sampleUrl = '';
  const url = liveSampleUrl(
    normalizedSampleId,
    sampleUrl,
    `/${targetLocale}/docs/${file.data.astro.frontmatter.slug}`,
  );

  return {
    type: 'html',
    value: `<iframe class="${className} ${sampleSpecificClassName}" title="${title} sample" id="frame_${slugger.slug(
      decodeURIComponent(normalizedSampleId),
    )}" ${width ? ` width="${width}"` : ''} ${
      height ? ` height="${height}"` : ''
    } src="${url}"></iframe>`,
  };
}

const EmbedLiveSample: MacroFunction = (node, index, parent, tree, file) => {
  slugger.reset();
  const replacement = macro(node, tree, file);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default EmbedLiveSample;
