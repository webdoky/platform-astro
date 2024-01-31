/*
https://github.com/mdn/yari/blob/4a663e173d419dd509dd24335f998a713586f472/markdown/m2h/handlers/dl.ts
*/

import type { List } from 'mdast';
export const DEFINITION_PREFIX = ': ';

export default function isDefinitionList(node: List): boolean {
  return (
    !node.ordered &&
    node.children.length > 0 &&
    node.children.every((listItem) => {
      if (!listItem.children || listItem.children.length < 2) {
        return false;
      }
      const definitions = listItem.children.at(-1);
      return (
        definitions &&
        definitions.type == 'list' &&
        definitions.children.length == 1 &&
        definitions.children.every((definition) => {
          const [paragraph] = definition.children || [];
          return (
            paragraph &&
            paragraph.type == 'paragraph' &&
            paragraph.children?.length &&
            paragraph.children[0] &&
            paragraph.children[0].type === 'text' &&
            paragraph.children[0].value.startsWith(DEFINITION_PREFIX)
          );
        })
      );
    })
  );
}
