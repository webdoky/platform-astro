import createRemarkPlugin from '../create-plugin.ts';

import injectHistory from './inject-history.ts';

const injectHistoryPlugin = createRemarkPlugin(injectHistory);

export default injectHistoryPlugin;
