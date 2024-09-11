//src/components/common/DropDown.vue
<template>
  <fwb-dropdown placement="left" text="Left">
    <template #trigger>
      <EllipsisVertical class="w-5 h-5 text-gray-500 transition-all cursor-pointer focus:outline-none hover:text-blue-600 focus:text-blue-600 active:text-blue-950 focus:border-none" />
    </template>
    <fwb-list-group>
      <fwb-list-group-item v-if="props.canEdit" hover @click="$emit('edit')">
        <template #prefix>
          <Pencil size="16"/> 
        </template>
        Editar
      </fwb-list-group-item>
      <fwb-list-group-item hover @click="$emit('delete')">
        <template #prefix>
          <Trash2 size="16"/> 
        </template>
        Eliminar
      </fwb-list-group-item>
      <fwb-list-group-item hover>
        <template #prefix>
          <Copy size="16"/>
        </template>
        Copiar
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { EllipsisVertical, Copy, Pencil, Trash2 } from 'lucide-vue-next'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const props = defineProps({
  canEdit: Boolean,
})
</script>
