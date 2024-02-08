import type { Html, Text } from 'mdast';
import { describe, expect, test } from 'vitest';

import stringifyMdastToHtml from './stringify-mdast-to-html.js';

describe('stringifyMdastToHtml', () => {
  test('stringifies a text node', () => {
    const node: Text = {
      type: 'text',
      value: 'Hello, world!',
    };
    expect(stringifyMdastToHtml(node)).toEqual('Hello, world!');
  });

  test('stringifies an HTML node', () => {
    const node: Html = {
      type: 'html',
      value: '<div>Hello, world!</div>',
    };
    expect(stringifyMdastToHtml(node)).toEqual('<div>Hello, world!</div>');
  });
});
