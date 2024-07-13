// src/handlers/auth.js
import { useRouter } from 'vue-router'

export const useAuthHandlers = () => { 
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.push({ name: 'Panel' })
  }

  const handleLogout = () => {
    router.push({ name: 'login' })
  }

  return {
    handleLoginSuccess,
    handleLogout
  }
}