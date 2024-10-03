//src/handlers/auth.js
import { useAuthStore } from '@stores/auth'
import { useRouter } from 'vue-router'

export const useAuthHandlers = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.push({ name: 'Panel' })
  }

  const handleLogout = async () => {
    if (!authStore.isAuthenticated) {
      // Si ya no está autenticado, solo redirigir
      router.push({ name: 'login' })
      return
    }

    try {
      await authStore.logout()
    } catch (error) {
      console.error('Error durante el logout:', error)
    } finally {
      // Asegurarse de que el usuario sea redirigido y la sesión se limpie
      router.push({ name: 'login' })
    }
  }

  return {
    handleLogout,
    handleLoginSuccess
  }
}
