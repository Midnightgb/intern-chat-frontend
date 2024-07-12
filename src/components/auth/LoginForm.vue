// src/components/auth/LoginForm.vue
<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div>
      <label for="network_user" class="block text-sm font-medium text-gray-700">Usuario</label>
      <input
        id="network_user"
        v-model="state.network_user"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{ 'border-red-500': v$.network_user.$error }"
      >
      <p v-if="v$.network_user.$error" class="mt-2 text-sm text-red-600">{{ v$.network_user.$errors[0].$message }}</p>
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
      <input
        id="password"
        v-model="state.password"
        type="password"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        :class="{ 'border-red-500': v$.password.$error }"
      >
      <p v-if="v$.password.$error" class="mt-2 text-sm text-red-600">{{ v$.password.$errors[0].$message }}</p>
    </div>
    <div>
      <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sign in
      </button>
    </div>
  </form>
</template>

<script setup>
import useLogin from '@/composables/useLogin'

const emit = defineEmits(['login-success'])

const { state, v$, handleSubmit: originalHandleSubmit } = useLogin()

const handleSubmit = async () => {
  const loginSuccessful = await originalHandleSubmit()
  if (loginSuccessful) {
    console.log('Login exitoso, emitiendo evento')
    emit('login-success')
  }
}
</script>