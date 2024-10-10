//src/components/common/DropDown.vue
<template>
  <fwb-dropdown placement="left" text="Left">
    <template #trigger>
      <EllipsisVertical class="w-5 h-5 text-gray-500 transition-all cursor-pointer focus:outline-none hover:text-blue-600 focus:text-blue-600 active:text-blue-950 focus:border-none dark:text-gray-400 dark:hover:text-blue-400 dark:focus:text-blue-400 dark:active:text-blue-300" />
    </template>
    <fwb-list-group class="-mt-4 dark:bg-gray-700">
      <fwb-list-group-item v-if="props.canEdit" hover @click="$emit('edit')" class="dark:hover:bg-gray-600 dark:text-gray-200">
        <template #prefix>
          <Pencil size="16" class="dark:text-gray-400"/> 
        </template>
        Editar
      </fwb-list-group-item>
      <fwb-list-group-item hover @click="$emit('delete')" class="dark:hover:bg-gray-600 dark:text-gray-200">
        <template #prefix>
          <Trash2 size="16" class="dark:text-gray-400"/> 
        </template>
        Eliminar
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const props = defineProps({
  canEdit: Boolean,
})
</script>
