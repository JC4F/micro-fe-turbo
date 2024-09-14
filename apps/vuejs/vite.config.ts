import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      federation({
        name: 'vue',
        filename: 'remoteEntry.js',
        remotes: {
          'react-shell': `${process.env.VITE_REACT_APP}/assets/remoteEntry.js`
        },
        exposes: {
          './VuePage': './src/main.ts'
        }
        // shared: ['vue']
      })
    ],
    server: {
      port: 4002
    },
    preview: {
      port: 4002
    },
    build: {
      target: 'ES2020'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@vue-ui': fileURLToPath(new URL('../../packages/vue-ui/src', import.meta.url))
      }
    }
  })
}
