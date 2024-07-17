<template>
  <aside class="bg-background border-r border-gray-300 flex flex-col h-screen items-center gap-2 p-4 w-16 sm:w-64">
    <div class="flex flex-col items-center gap-2 w-full flex-grow overflow-y-auto">
      <div class="flex flex-col items-center gap-2 w-full">
        <a class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full" href="#">
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
            <span class="ml-2 text-sm font-medium hidden sm:inline">Direct Messages</span>
          </div>
        </a>
      </div>
      <!-- Aquí puedes agregar más elementos de la barra lateral si es necesario -->
    </div>
    
    <!-- Bloque de configuraciones de usuario -->
    <div class="mt-auto w-full flex-shrink-0">
      <div class="flex items-center gap-2 w-full mb-2">
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <img class="aspect-square h-full w-full" alt="User Avatar" src="/images/placeholder-user.png" />
        </span>
        <div class="text-sm font-medium hidden sm:inline">John Doe</div>
        <ToolTip 
        triggerIcon="Settings" 
        tooltipContent="Ajustes de usuario" />
      </div>
      <div>
        <fwb-button color="red" class="w-full" outline @click="handleLogout">Cerrar Sesión</fwb-button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import ToolTip from '../layout/ToolTip.vue';
import { FwbButton } from 'flowbite-vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthHandlers } from '@/handlers'

const { logout: authLogout } = useAuth()
const { handleLogout: handlersLogout } = useAuthHandlers()

const handleLogout = () => {
  authLogout()
  handlersLogout()
} 
</script>