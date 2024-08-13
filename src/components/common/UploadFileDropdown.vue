//src/components/common/UploadFileTest.vue
<template>
  <fwb-dropdown placement="top" text="top">
    <template #trigger>
      <Paperclip class="w-5 h-5" />
    </template>
    <fwb-list-group class="shadow-lg shadow-gray-500 transition-opacity">
      <fwb-file-input v-model="file" dropzone />
    </fwb-list-group>
  </fwb-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { FwbFileInput } from 'flowbite-vue'
import { Paperclip } from 'lucide-vue-next';

const file = ref(null)

import { FwbDropdown, FwbListGroup } from 'flowbite-vue'
</script>
