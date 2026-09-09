/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_LASTFM_API_KEY?: string;
  readonly VITE_LASTFM_USERNAME?: string;
  readonly VITE_ANILIST_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
