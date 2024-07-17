<template>
  <div class="min-h-screen">
    <template v-if="showAuthContent">
      <div class="flex bg-gray-100 ">
        <SidebarLeft />
        <SideBarRight />
        <MainContent>
          <RouterView />
        </MainContent>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center bg-green-100">
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
})

const route = useRoute()
const authStore = useAuthStore()

const showAuthContent = computed(() => {
  return authStore.isAuthenticated && route.name !== 'login'
})
</script>