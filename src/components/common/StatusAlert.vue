//src/components/common/StatusAlert.vue
<template>
  <div v-if="message">
    <fwb-alert :border="true" :type="type" class="font-semibold">
      {{ message }}
    </fwb-alert>
  </div>
</template>

<script setup>
import { FwbAlert } from 'flowbite-vue'

defineProps({
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
  }
})
</script>
