// src/handlers/auth.js
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

export const useAuthHandlers = () => { 
  const router = useRouter()
  const { logout } = useAuth()

  const handleLoginSuccess = () => {
    router.push({ name: 'Panel' })
  }

  const handleLogout = () => {
    logout()
    router.push({ name: 'login' })
  }

  return {
    handleLoginSuccess,
    handleLogout
  }
}