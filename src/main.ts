import './assets/main.css'

import { createApp, type InjectionKey } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const app = createApp(App)

const notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'warn',
      background: '#fb923c',
      icon: '<svg class="w-8 h-8"  viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\
              <path d="M28.3265 12C29.8661 9.33333 33.7151 9.33333 35.2547 12L56.0393 48C57.5789 50.6667 55.6544 54 52.5752 54H11.006C7.92676 54 6.00227 50.6667 7.54187 48L28.3265 12Z" fill="white"/>\
              <circle cx="32" cy="47" r="3" fill="#FB923C"/>\
              <rect x="29" y="23" width="6" height="18" rx="3" fill="#FB923C"/>\
            </svg>'
    },
    {
      type: 'error',
      background: '#b91c1c'
    }
  ]
})
export const NOTYF_INJECTION_KEY: InjectionKey<Notyf> = Symbol('Notyf')

app.use(createPinia())
app.provide(NOTYF_INJECTION_KEY, notyf)
app.use(router)

app.mount('#app')
