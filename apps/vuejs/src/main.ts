import './assets/globals.scss'

import { defineCustomElement } from 'vue'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { QueryClientManager } from '@repo/util'

// createApp(App).mount('#app')

const vuePage = defineCustomElement(App, {
  shadowRoot: false,
  configureApp: (app) => {
    app.use(VueQueryPlugin, {
      queryClient: QueryClientManager.getInstance()
    })
  }
})

customElements.define('vue-page', vuePage)
