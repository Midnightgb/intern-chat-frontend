<template>
  <div class="w-full max-w-sm p-6 bg-orange-200 rounded-lg shadow-md">
    <h1 class="mb-6 text-2xl font-bold text-center text-gray-900">Login</h1>
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