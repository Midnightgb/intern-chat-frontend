<template>
  <div>
    <LoginForm @login-success="onLoginSuccess" />
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import { useAuthHandlers } from '@/handlers/auth'

const { handleLoginSuccess } = useAuthHandlers()

const onLoginSuccess = () => {
  console.log('Login success handled in LoginView')
  handleLoginSuccess()
}
</script>