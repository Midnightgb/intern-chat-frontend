<template>
  <div class="min-h-screen flex flex-col">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { initFlowbite } from 'flowbite'

const authStore = useAuthStore()

onMounted(() => {
  initFlowbite()
  authStore.checkAuth()
})
</script>