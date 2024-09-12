import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  server: {
    port: 4001,
  },
  preview: {
    port: 4001,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@react-ui": fileURLToPath(
        new URL("../../packages/react-ui/src", import.meta.url)
      ),
    },
  },
});
