// src/composables/useLogin.js
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { loginValidators } from '@/utils/validators'
import { login as apiLogin } from '@/services/api'
import { useAuth } from './useAuth'

export default function useLogin() {
  const { login: authLogin } = useAuth()

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
        
        localStorage.setItem('token', response.data.token)
        console.log('networkUser', response.data.user.network_user);
        authLogin({
          name: response.data.user.full_name,
          networkUser: response.data.user.network_user,
          profilePic: response.data.user.photo_url,
          role: response.data.role
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