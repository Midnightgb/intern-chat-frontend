<template>
 <!--  <div class="w-full max-w-sm p-6 bg-orange-200 rounded-lg shadow-md">
    <h1 class="mb-6 text-2xl font-bold text-center text-gray-900">Dashboard</h1>
    <p class="text-center text-gray-700">Welcome back, {{ user.name }}!</p>
    <p class="text-center text-gray-700">You are logged in as {{ user.role }}.</p>
    <p class="text-center text-gray-700">Your full data is: {{ user }}</p>
    <button
      class="w-full py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      @click="handleLogout"
    >
      Logout
    </button>
  </div> -->

  <div>
    <NavBar />
  </div>
  <div class="flex justify-center items-center h-screen">
    <RouterView />
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
import NavBar from '@/components/partials/NavBar.vue'
import { RouterView } from 'vue-router'
/* import { useAuth } from '@/composables/useAuth'
import { useAuthHandlers } from '@/handlers'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const { logout: authLogout } = useAuth()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { handleLogout: handlersLogout } = useAuthHandlers()


const handleLogout = () => {
  authLogout()
  handlersLogout()
} */
</script>