// main.js
import '@/assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')
