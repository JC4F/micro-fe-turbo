import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    federation({
      name: 'vue',
      filename: 'remoteEntry.js',
      exposes: {
        './VuePage': './src/App.vue'
      },
      shared: ['vue']
    })
  ],
  server: {
    port: 4002
  },
  preview: {
    port: 4002
  },
  build: {
    target: 'ESNext'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
