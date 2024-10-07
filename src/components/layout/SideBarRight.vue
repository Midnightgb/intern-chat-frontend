//src/components/partials/SideBarRight.vue
<template>
  <aside class="bg-background border-r border-gray-300 flex flex-col h-screen w-48 sm:w-56">
    <div class="flex-grow overflow-hidden">
      <DirectMessages />
    </div>

    <!-- Bloque de configuraciones de usuario -->
    <div class="flex-shrink-0 w-full p-4 bg-gradient-to-t from-gray-100 to-gray-200 rounded-lg">
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              v-if="userPhotoUrl"
              class="aspect-square h-full w-full"
              alt="User Avatar"
              :src="userPhotoUrl"
              @error="handleImageError"
            />
            <!-- parametros que recibe la función getUserAvatar: user y path -->
            <span v-else class="aspect-square h-full w-full">
              <CircleUserRound size="32" />
            </span>
          </span>
          <div class="text-sm font-medium inline capitalize">{{ user.networkUser }}</div>
          <ProfileModal />
        </div>
      </div>
      <div>
        <FwbButton
          color="red"
          :disabled="loading"
          :loading="loading"
          class="w-full transition-all"
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

currentUserStore.updateCurrentUser(user.value.id)

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
