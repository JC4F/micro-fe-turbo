/// <reference types="vite/client" />
declare module "vue/VuePage";
declare module "angular/AngularPage";

interface ImportMetaEnv {
  readonly VITE_VUE_APP: string;
  readonly VITE_ANGULAR_APP: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
