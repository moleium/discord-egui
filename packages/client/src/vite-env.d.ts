/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: '';
  readonly CLIENT_SECRET: '';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
