import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

export const useAuthHandlers = () => { 
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLoginSuccess = () => {
    console.log('Redirecting to dashboard with user:', user)
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