<template>
  <div class="w-full max-w-sm p-6 bg-orange-200 rounded-lg shadow-md">
    <h1 class="mb-6 text-2xl font-bold text-center text-gray-900">Dashboard</h1>
    <p class="text-center text-gray-700">Welcome back, {{ user.name }}!</p>
    <button
      class="w-full py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
  import { useAuth } from '@/composables'
  import { useAuthHandlers } from '@/handlers'

  const { user } = useAuth()
  const { logout } = useAuthHandlers()
</script>