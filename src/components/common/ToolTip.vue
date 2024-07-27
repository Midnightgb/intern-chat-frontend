//src/components/common/ToolTip.vue
<template>
  <fwb-tooltip :placement="placement">
    <template #trigger>
      <fwb-button :color="color" :outline="outline" :pill="pill" :square="square">
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
import { computed, defineAsyncComponent } from 'vue'

import { FwbButton, FwbTooltip } from 'flowbite-vue'

import { Settings, User, Server } from 'lucide-vue-next'

const iconMap = {
  Settings,
  User,
  Server,
  // Agregar más iconos aquí
}

const props = defineProps({
  triggerText: {
    type: String,
    required: false
  },
  triggerIcon: {
    type: String,
    required: false
  },
  tooltipContent: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top'
  },
  outline: {
    type: Boolean,
    default: false
  },
  pill: {
    type: Boolean,
    default: false
  },
  square: {
    type: Boolean,
    default: false
  }
})

const iconComponent = computed(() => {
  if (props.triggerIcon && iconMap[props.triggerIcon]) {
    return iconMap[props.triggerIcon]
  }
  // Si el icono no está en el mapa, intenta cargarlo dinámicamente
  if (props.triggerIcon) {
    return defineAsyncComponent(
      () =>
        import(
          `../../../node_modules/lucide-vue-next/dist/esm/icons/${props.triggerIcon.toLowerCase()}.js`
        )
    )
  }
  return null
})
</script>
