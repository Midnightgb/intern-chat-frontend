// src/handlers/auth.js
import { useRouter } from 'vue-router'

export const useAuthHandlers = () => { 
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.push({ name: 'Dashboard' })
  }

  const handleLogout = () => {
    // Lógica de logout...
    router.push({ name: 'Login' })
  }

  return {
    handleLoginSuccess,
    handleLogout
  }
}