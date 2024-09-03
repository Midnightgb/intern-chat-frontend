//src/handlers/auth.js
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const useAuthHandlers = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const handleLoginSuccess = () => {
    router.push({ name: 'Panel' })
  }

  const handleLogout = async () => {
    await authStore.logout()
    router.push({ name: 'login' })
  }

  return {
    handleLoginSuccess,
    handleLogout
  }
}
