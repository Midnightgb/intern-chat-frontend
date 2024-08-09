import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

// Vuetify
import { createVuetify } from 'vuetify'

// Styles
import '@/assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

const vuetify = createVuetify()

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)

const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')