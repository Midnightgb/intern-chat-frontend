import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { loginValidators } from '@/utils/validators';
import apiClient from '@/services/api'
import { useRouter } from 'vue-router'
import ToastNotification from '@/components/layout/ToastNotification.vue'; 

export default function useLogin() {
  const router = useRouter()

  const state = reactive({
    network_user: '',
    password: ''
  })

  const v$ = useVuelidate(loginValidators, state)

  const handleSubmit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
      try {
        const response = await apiClient.post('auth/login', {
          network_user: state.network_user,
          password: state.password
        })

        console.log('Login successful', response.data)

        localStorage.setItem('token', response.data.token)

        router.push('/dashboard')
        ToastNotification.methods.showToast('success', 'Login successful');

      } catch (error) {
        console.warn('LOG Login failed', error.response?.data || error.message)
          ToastNotification.methods.showToast('error', 'Login failed');
      }
    } else {
      console.log('Form is invalid')
    }
  }

  return {
    state,
    v$,
    handleSubmit
  }
}
