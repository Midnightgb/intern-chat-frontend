import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { loginValidators } from '@/utils/validators'
import { login as apiLogin } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

export default function useLogin() {
  const authStore = useAuthStore()

  const state = reactive({
    network_user: '',
    password: ''
  })

  const v$ = useVuelidate(loginValidators, state)

  const handleSubmit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
      try {
        const response = await apiLogin({
          network_user: state.network_user,
          password: state.password
        })
        
        console.log('Login successful', response.data)
        
        // Almacena el token en localStorage
        localStorage.setItem('token', response.data.token)
        
        // Actualiza el store de autenticación
        authStore.login({
          name: response.data.user.full_name,
          networkUser: response.data.user.network_user,
          profilePic: response.data.user.photo_url,
          role: response.data.role,
          token: response.data.token // Asegúrate de pasar el token aquí
        })
        
        return true
      } catch (error) {
        console.error('Login failed', error.response?.data || error.message)
        alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'))
        return false
      }
    } else {
      console.log('Form is invalid')
      return false
    }
  }

  return {
    state,
    v$,
    handleSubmit
  }
}