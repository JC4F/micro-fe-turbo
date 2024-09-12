import './assets/main.css'

import { defineCustomElement } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')

const vuePage = defineCustomElement(App, {
  shadowRoot: false
})

customElements.define('vue-page', vuePage)
