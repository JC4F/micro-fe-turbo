import './assets/globals.scss'

import { defineCustomElement } from 'vue'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

// createApp(App).mount('#app')

const vuePage = defineCustomElement(App, {
  shadowRoot: false,
  configureApp: (app) => {
    app.use(VueQueryPlugin)
  }
})

customElements.define('vue-page', vuePage)
