//src/components/partials/SideBarRight.vue
<template>
  <aside
    class="bg-background border-r border-gray-300 flex flex-col h-screen items-center gap-2 p-4 w-48 sm:w-56"
  >
    <div class="flex flex-col items-center gap-2 w-full flex-grow overflow-y-auto">
      <div class="flex flex-col items-center gap-2 w-full">
        <DirectMessages />
      </div>
      <!-- Aquí agregar los mensajes directos -->
    </div>

    <!-- Bloque de configuraciones de usuario -->
    <div class="mt-auto w-full flex-shrink-0">
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              class="aspect-square h-full w-full"
              alt="User Avatar"
              src="/images/placeholder-user.png"
            />
          </span>
          <div class="text-sm font-medium inline capitalize">{{ user.networkUser }}</div>
          <ToolTip
                triggerIcon="Settings"
                tooltipContent="Ajustes de usuario"
                :outline="true"
                :pill="true"
                :square="true"
              />
        </div>
      </div>
      <div>
        <fwb-button color="red" class="w-full" outline @click="handleLogout"
          >Cerrar Sesión</fwb-button
        >
      </div>
    </div>
  </aside>
</template>

<script setup>
import { storeToRefs } from 'pinia'
// Stores
import { useAuthStore } from '@/stores/auth'
// Components
import { FwbButton } from 'flowbite-vue'
import ToolTip from '@/components/common/ToolTip.vue'
import useLogout from '@/composables/useLogout'
import DirectMessages from '@/components/common/DirectMessages.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { handleLogout } = useLogout()
</script>
