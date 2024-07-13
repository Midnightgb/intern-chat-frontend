// src/handlers/auth/handleSubmit.js
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginValidators } from '@/utils/validators';
import { useVuelidate } from '@vuelidate/core'
import ToastNotification from '@/components/layout/ToastNotification.vue';
import { login, getChannels } from '@/services/api'


export default function useHandleSubmit () { 
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
            const response = await login({
              network_user: state.network_user,
              password: state.password
            })
            
            console.log('Login successful', response.data)
            
            localStorage.setItem('token', response.data.token)
            
            if (response.data.success === true) {
              const channels = await getChannels()
              console.log('Channels', channels.data)
            }
    
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