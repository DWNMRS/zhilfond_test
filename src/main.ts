import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './stores/user.ts'
import '@/styles/main.scss'

createApp(App).use(store, key).mount('#app')