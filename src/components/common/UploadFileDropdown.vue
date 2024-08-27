<template>
  <fwb-dropdown placement="top" text="top">
    <template #trigger>
      <Paperclip class="w-5 h-5 cursor-pointer focus:outline-none hover:text-blue-600 focus:text-blue-600 active:text-blue-800 focus:border-none transition-all" />
    </template>
    <fwb-list-group class="shadow-lg shadow-gray-500 transition-opacity">
      <fwb-file-input v-model="file" dropzone />
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { ref, watch } from 'vue'
import { FwbFileInput } from 'flowbite-vue'
import { Paperclip } from 'lucide-vue-next';

const file = ref(null)

const props = defineProps({
  resetFile: Boolean,
})

watch(() => props.resetFile, (newVal) => {
  if (newVal) {
    file.value = null
  }
})

import { FwbDropdown, FwbListGroup } from 'flowbite-vue'
</script>
