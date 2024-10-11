//src/components/partials/SideBarRight.vue
<template>
  <aside class="bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col h-screen w-48 sm:w-56">
    <div class="flex-grow overflow-hidden">
      <DirectMessages />
    </div>

    <!-- Bloque de configuraciones de usuario -->
    <div class="flex-shrink-0 w-full p-4 bg-gradient-to-t from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg">
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              v-if="userPhotoUrl && user"
              class="aspect-square h-full w-full"
              alt="User Avatar"
              :src="userPhotoUrl"
              @error="handleImageError"
            />
            <span v-else class="aspect-square h-full w-full">
              <CircleUserRound size="32" class="text-gray-600 dark:text-gray-300" />
            </span>
          </span>
          <div v-if="user && user.networkUser" class="text-sm font-medium inline capitalize text-gray-800 dark:text-gray-200">{{ user.networkUser }}</div>
          <ProfileModal />
        </div>
      </div>
      <div>
        <FwbButton
          color="red"
          :disabled="loading"
          :loading="loading"
          class="w-full transition-all dark:bg-red-600 dark:hover:bg-red-700 dark:text-white mt-2"
          outline
          @click="clickLogout"
        >
          Cerrar Sesión
        </FwbButton>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { storeToRefs } from 'pinia'
// Stores
import { useAuthStore } from '@stores/auth'
import { useCurrentUserStore } from '@stores/user/currentUserStore'
// Components
import { FwbButton } from 'flowbite-vue'
import { CircleUserRound } from 'lucide-vue-next'
import useLogout from '@composables/useLogout'
import DirectMessages from '@components/common/DirectMessages.vue'
import ProfileModal from '@components/common/ProfileModal.vue'
// Utils
import { getUserAvatar } from '@/utils/helpers'
import { onMounted, ref } from 'vue'

const loading = ref(false)

const authStore = useAuthStore()
const currentUserStore = useCurrentUserStore()
const { user } = storeToRefs(authStore)

if (user.value && user.value.id) {
  currentUserStore.updateCurrentUser(user.value.id)
}

const userPhotoUrl = ref(null)

const { handleLogout } = useLogout()
const clickLogout = async () => {
  loading.value = true
  await handleLogout()
}

const handleImageError = () => {
  console.error('Error loading user avatar')
  userPhotoUrl.value = null // Esto hará que se muestre el icono por defecto
}

onMounted(() => {
  userPhotoUrl.value = getUserAvatar({ user: user.value }, 'user')
})
</script>

<style>
@import '@/assets/sidebar-scrollbar.css';
</style>
