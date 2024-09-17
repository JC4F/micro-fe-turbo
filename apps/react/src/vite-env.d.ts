/// <reference types="vite/client" />
declare module "vue/VuePage";
declare module "angular/AngularPage";

interface ImportMetaEnv {
  readonly VITE_VUE_APP: string;
  readonly VITE_ANGULAR_APP: string;
  readonly VITE_MODE: "development" | "production";
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
