// src/composables/useLogin.js
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { authValidators } from '@/utils/validators'
import { login as apiLogin } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

export default function useLogin() {
  const authStore = useAuthStore()

  const state = reactive({
    network_user: '',
    password: ''
  })

  const v$ = useVuelidate(authValidators, state)

  const handleSubmit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
      try {
        const response = await apiLogin({
          network_user: state.network_user,
          password: state.password
        })
        
        console.log('Login successful', response.data)
        
        // Actualiza el store de autenticación con los datos del usuario y el token
        authStore.login(response.data.user, response.data.token)
        
        return true
      } catch (error) {
        console.error('Login failed', error.response?.data || error.message)
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