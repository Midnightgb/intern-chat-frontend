import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

// Plugins
import vuetify from '@/plugins/vuetify'
import pinia from '@/plugins/pinia'

// Styles
import '@/assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')