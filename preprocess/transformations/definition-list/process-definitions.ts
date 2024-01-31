import type { Root } from 'mdast';

// import { saveData } from '../../save-data.js';

import expandDefinitions from './expand-definitions.js';
import parseDefinitions from './parse-definitions.js';

export default function processDefinitions(tree: Root) {
  // const identity = JSON.stringify(tree);
  // saveData('processDefinitions', 'start', tree, identity);
  parseDefinitions(tree);
  // saveData('processDefinitions', 'afterParse', tree, identity);

  expandDefinitions(tree);
  // saveData('processDefinitions', 'end', tree, identity);
}
