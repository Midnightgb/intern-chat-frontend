//src/components/common/ToolTip.vue
<template>
  <fwb-tooltip :placement="placement" :theme="currentTheme">
    <template #trigger>
      <div
        class="relative inline-block"
        :class="{ 'w-full h-full': showOnParent }"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
      >
        <fwb-button :color="color" :outline="outline" :pill="pill" :square="square" class="p-0 overflow-hidden">
          <div v-if="!imgChannel" class="w-full h-full flex items-center justify-center">
            {{ triggerText }}
            <component :is="iconComponent" v-if="iconComponent" class="dark:text-gray-200 w-6 h-6" />
          </div>

          <div v-if="imgChannel" class="w-full h-full">
            <img :src="imgChannel" class="w-full h-full object-cover" alt="Channel image" />
          </div>
        </fwb-button>
      </div>
    </template>
    <template #content>
      <TruncatedContent :content="tooltipContent" :maxLength="32" class="font-semibold text-gray-200 dark:text-gray-800" />
    </template>
  </fwb-tooltip>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { FwbButton, FwbTooltip } from 'flowbite-vue'
import { Settings, User, Server, ShieldEllipsis } from 'lucide-vue-next'
import TruncatedContent from './TruncatedContent.vue';
import { theme } from '@utils/themeUtils';

const iconMap = {
  Settings,
  User,
  Server,
  ShieldEllipsis,
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
  },
  imgChannel: {
    type: String,
    default: ''
  },
  showOnParent: {
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

const isTooltipVisible = ref(false)

const showTooltip = () => {
  isTooltipVisible.value = true
}

const hideTooltip = () => {
  isTooltipVisible.value = false
}

const currentTheme = computed(() => theme.value === 'dark' ? 'light' : 'dark')
</script>
