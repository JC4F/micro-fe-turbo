import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    react(),
    federation({
      name: "react-shell",
      remotes: {
        vue: "http://localhost:4002/assets/remoteEntry.js",
      },
      shared: ["vue"],
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
