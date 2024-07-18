//src/App.vue
<template>
  <div class="min-h-screen flex flex-col">
    <template v-if="showAuthContent">
      <div class="flex flex-grow bg-gray-100">
        <SidebarLeft />
        <SideBarRight />
        <MainContent>
          <RouterView />
        </MainContent>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center bg-green-100 flex-grow">
        <RouterView />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { initFlowbite } from 'flowbite'
import SidebarLeft from './components/partials/SideBarLeft.vue'
import SideBarRight from './components/partials/SideBarRight.vue'
import MainContent from './components/MainContent.vue'

onMounted(() => {
  initFlowbite()
  authStore.checkAuth() 
})

const route = useRoute()
const authStore = useAuthStore()

const showAuthContent = computed(() => {
  return authStore.isAuthenticated && route.name !== 'login'
})
</script>