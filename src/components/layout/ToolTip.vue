<template>
  <fwb-tooltip>
    <template #trigger>
      <fwb-button color="dark">
        {{ triggerText }}
        <component :is="iconComponent" v-if="iconComponent" />
      </fwb-button>
    </template>
    <template #content>
      {{ tooltipContent }}
    </template>
  </fwb-tooltip>
</template>

<script setup>
import { FwbButton, FwbTooltip } from 'flowbite-vue'
import { computed, defineAsyncComponent } from 'vue'

import { Settings, User} from 'lucide-vue-next'

const iconMap = {
  Settings,
  User,
  // Agregar más iconos aquí
}

const props = defineProps({
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

const iconComponent = computed(() => {
  if (props.triggerIcon && iconMap[props.triggerIcon]) {
    return iconMap[props.triggerIcon]
  }
  // Si el icono no está en el mapa, intenta cargarlo dinámicamente
  if (props.triggerIcon) {
    return defineAsyncComponent(() => import(`../../../node_modules/lucide-vue-next/dist/esm/icons/${props.triggerIcon.toLowerCase()}.js`))
  }
  return null
})
</script>