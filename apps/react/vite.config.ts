import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [
      react(),
      federation({
        name: "react-shell",
        filename: "remoteEntry.js",
        // @ts-ignore
        remotes: {
          vue: `${process.env.VITE_VUE_APP}/assets/remoteEntry.js`,
          angular: {
            external: `${process.env.VITE_ANGULAR_APP}/remoteEntry.js`,
            format: "esm",
            from: "webpack",
          },
        },
        // exposes: {
        //   "./Store": "./src/expose.ts",
        // },
      }),
    ],
    server: {
      port: 4001,
    },
    preview: {
      port: 4001,
    },
    build: {
      target: "ES2020",

      // hide source map error to output
      rollupOptions: {
        onLog(level, log, handler) {
          if (
            log.cause &&
            (log.cause as any).message ===
              `Can't resolve original location of error.`
          ) {
            return;
          }
          handler(level, log);
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@react-ui": fileURLToPath(
          new URL("../../packages/react-ui/src", import.meta.url)
        ),
      },
    },
  });
};
