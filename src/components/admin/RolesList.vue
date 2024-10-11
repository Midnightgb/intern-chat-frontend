<template>
  <HeaderTab title="Roles" description="Gestiona todos los roles existentes o añade uno nuevo">
    <fwb-button>
      <template #prefix>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
          aria-hidden="true">
          <path
            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      </template>
      Añadir nuevo rol
    </fwb-button>
  </HeaderTab>
</template>

<script setup>
import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbButton } from 'flowbite-vue'
</script>
