/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MODE: 'development' | 'production';
  readonly ROLLBAR_ACCESS_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ContentEntryMap {
  translatedContent: typeof translatedContent;
}
