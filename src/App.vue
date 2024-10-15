//src/App.vue
<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-900">
    <template v-if="showAuthContent">
      <div class="flex flex-grow bg-gray-100 dark:bg-gray-800">
        <RouterView />
      </div>
    </template>
    <template v-else>
      <div class="dark:bg-gray-900">
        <RouterView />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCurrentUserStore } from '@/stores/user/currentUserStore'
import { initFlowbite } from 'flowbite'
import { theme, toggleTheme } from '@utils/themeUtils';

onMounted(() => {
  initFlowbite()
  toggleTheme(theme.value)
})

const route = useRoute()
const authStore = useAuthStore()
const currentUserStore = useCurrentUserStore()

authStore.checkAuth()
if (authStore.user) {
  currentUserStore.initializeFromAuth(authStore.user)
}

const showAuthContent = computed(() => {
  return authStore.isAuthenticated && route.name !== 'login'
})
</script>

