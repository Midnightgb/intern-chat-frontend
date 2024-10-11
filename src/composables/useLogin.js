//src/composables/useLogin.js
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { authValidators } from '@utils/validators'
import { login as apiLogin } from '@services/api'
import { useAuthStore } from '@stores/auth'
import { useCurrentUserStore } from '@stores/user/currentUserStore'

export default function useLogin() {
  const authStore = useAuthStore()
  const currentUserStore = useCurrentUserStore()

  const state = reactive({
    network_user: '',
    password: ''
  })

  const error = ref('')

  const v$ = useVuelidate(authValidators, state)

  const handleSubmit = async () => {
    error.value = ''
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
      try {
        const response = await apiLogin({
          network_user: state.network_user,
          password: state.password
        })
        console.log('Login successful', response.data)
        // Actualiza el store de autenticación con los datos del usuario y el token
        const data = {
          role: response.data.role,
          data: response.data.user
        }
        authStore.login(data, response.data.token)
        currentUserStore.updateCurrentUserRole(response.data.role)

        return true
      } catch (err) {
        console.error('Login failed', err.response?.data || err.message)
        error.value = err.response?.data?.error || 'Error al iniciar sesión'
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
    handleSubmit,
    error
  }
}
