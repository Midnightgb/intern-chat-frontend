//src/components/common/DropDown.vue
<template>
  <fwb-dropdown placement="left" text="Left">
    <template #trigger>
      <EllipsisVertical class="w-5 h-5 text-gray-500" />
    </template>
    <fwb-list-group>
      <fwb-list-group-item>
        Profile
      </fwb-list-group-item>
      <fwb-list-group-item>
        Settings
      </fwb-list-group-item>
      <fwb-list-group-item>
        Messages
      </fwb-list-group-item>
      <fwb-list-group-item>
        Download
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { EllipsisVertical } from 'lucide-vue-next'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
</script>

