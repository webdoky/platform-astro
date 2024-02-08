import createRemarkPlugin from '../create-plugin.ts';

import expandMacros from './expand.js';

const expandMacrosPlugin = createRemarkPlugin(expandMacros);

export default expandMacrosPlugin;
