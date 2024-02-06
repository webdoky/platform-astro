import type { Root } from 'mdast';
import type { VFile } from 'vfile';

import { astroFileSchema, type AstroFile } from './validate-astro-file.ts';

export default function createRemarkPlugin(
  callback: (tree: Root, file: AstroFile) => void,
) {
  function remarkPlugin(tree: Root, file: VFile) {
    astroFileSchema.parse(file);
    const astroFile = file as unknown as AstroFile;
    callback(tree, astroFile);
  }
  return () => remarkPlugin;
}
