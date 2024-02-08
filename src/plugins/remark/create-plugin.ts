import type { Root } from 'mdast';
import type { VFile } from 'vfile';

import { astroFileSchema, type AstroFile } from './validate-astro-file.ts';

export default function createRemarkPlugin(
  callback:
    | ((tree: Root, file: AstroFile) => void)
    | ((tree: Root, file: AstroFile) => Promise<void>),
) {
  async function remarkPlugin(tree: Root, file: VFile) {
    astroFileSchema.parse(file);
    const astroFile = file as unknown as AstroFile;
    await callback(tree, astroFile);
  }
  return () => remarkPlugin;
}
