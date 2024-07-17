<template>
  <fwb-tooltip>
    <template #trigger>
      <fwb-button color="dark">
        {{ triggerText }}
        <slot name="triggerIcon"></slot>
        <Settings />
      </fwb-button>
    </template>
    <template #content>
      {{ tooltipContent }}
    </template>
  </fwb-tooltip>
</template>

<script setup>
import { FwbButton, FwbTooltip } from 'flowbite-vue'
import { Settings } from 'lucide-vue-next';

defineProps({
  triggerText: {
    type: String,
    required: true
  },
  triggerIcon: {
    type: String,
    required: false
  },
  tooltipContent: {
    type: String,
    required: true
  }
})

</script>