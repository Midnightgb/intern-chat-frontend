//src/components/common/DropDown.vue
<template>
  <fwb-dropdown placement="left" text="Left">
    <template #trigger>
      <EllipsisVertical class="w-5 h-5 text-gray-500" />
    </template>
    <fwb-list-group>
      <fwb-list-group-item hover>
              <template #prefix>
                <Pencil size="16"/> 
              </template>
              Editar
      </fwb-list-group-item>
      <fwb-list-group-item hover>
              <template #suffix>
                <Trash2 size="16"/> 
              </template>
              Eliminar
      </fwb-list-group-item>
      <fwb-list-group-item hover>
              <template #prefix>
                <Copy size="16"/>
              </template>
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { EllipsisVertical, Copy, Pencil, Trash2 } from 'lucide-vue-next'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
</script>

